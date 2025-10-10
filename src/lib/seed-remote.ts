import { getPayload } from 'payload'
import { buildConfig } from 'payload'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { r2Storage } from '@payloadcms/storage-r2'
import path from 'path'
import { fileURLToPath } from 'url'
import { defaultContent } from './seedData'
import { Users } from '../collections/Users'
import { Media } from '../collections/Media'
import { ContactMessages } from '../collections/ContactMessages'
import { PageContent } from '../collections/PageContent'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Helper function to convert HTML strings to Lexical format
const htmlToLexical = (html: string) => {
  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      children: [
        {
          type: 'paragraph',
          format: '' as const,
          indent: 0,
          version: 1,
          children: [
            {
              type: 'text',
              format: 0,
              text: html.replace(/<[^>]*>/g, ''), // Strip HTML tags for now
              style: '',
              mode: 'normal',
              detail: 0,
              version: 1,
            },
          ],
          direction: 'ltr' as const,
        },
      ],
      direction: 'ltr' as const,
    },
  }
}

const seedRemote = async () => {
  console.log('🌱 Seeding page content to REMOTE Cloudflare D1 database...')
  console.log('⚠️  NOTE: Media files must already exist in R2 bucket!')
  console.log('   Upload media first: wrangler r2 object put codeious-website/image.jpg --file=./assets/image.jpg')

  // Get Wrangler bindings for remote Cloudflare
  const { getPlatformProxy } = await import('wrangler')
  const cloudflare = await getPlatformProxy({
    environment: process.env.CLOUDFLARE_ENV,
    experimental: { remoteBindings: true },
  })

  // Build Payload config with Wrangler bindings
  const config = buildConfig({
    admin: {
      user: Users.slug,
      importMap: {
        baseDir: path.resolve(dirname, '..'),
      },
    },
    collections: [Users, Media, ContactMessages, PageContent],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
      outputFile: path.resolve(dirname, '..', 'payload-types.ts'),
    },
    db: sqliteD1Adapter({ binding: cloudflare.env.D1 }),
    localization: {
      locales: [
        {
          label: 'English',
          code: 'en',
        },
        {
          label: 'Polish',
          code: 'pl',
        },
      ],
      defaultLocale: 'en',
      fallback: true,
    },
    plugins: [
      payloadCloudPlugin(),
      r2Storage({
        bucket: cloudflare.env.R2,
        collections: { media: true },
      }),
    ],
  })

  const payload = await getPayload({ config })

  try {
    console.log('🌱 Overwriting all page content with default values...')

    // Skip media upload - assume media is already in R2
    // We'll create content without media references for now
    const mediaMap: Record<string, string> = {}

    // Always overwrite content - delete existing content first
    for (const content of defaultContent) {
      // Find and delete existing content for this section
      const existing = await payload.find({
        collection: 'page-content',
        where: {
          sectionId: {
            equals: content.sectionId,
          },
        },
      })

      // Delete existing content if found
      if (existing.docs.length > 0) {
        for (const doc of existing.docs) {
          await payload.delete({
            collection: 'page-content',
            id: doc.id,
          })
        }
        console.log(`🗑️  Deleted existing content for ${content.sectionId} section`)
      }

      // Prepare media references (skip for now - requires manual R2 upload)
      const mediaData: any = {}
      if (content.media) {
        console.log(`⚠️  Section ${content.sectionId} has media references - skipping media (upload to R2 manually)`)
      }

      // Create content document with all locales handled properly
      const createdDoc = await payload.create({
        collection: 'page-content',
        data: {
          sectionId: content.sectionId as any,
          title: content.title.en,
          subtitle: content.subtitle?.en,
          description: content.description?.en ? htmlToLexical(content.description.en) : undefined,
          additionalContent: content.additionalContent?.en
            ? htmlToLexical(content.additionalContent.en)
            : undefined,
          ctaText: content.ctaText?.en,
          media: mediaData,
          metadata: content.metadata,
          carouselItems: content.carouselItems?.map((item) => {
            const baseItem: any = {
              title: item.title.en,
              description: item.description?.en ? htmlToLexical(item.description.en) : undefined,
              additionalText: (item as any).additionalText?.en
                ? htmlToLexical((item as any).additionalText.en)
                : undefined,
            }

            // Add role and image only if they exist (for team section)
            if ('role' in item && item.role) {
              baseItem.role = item.role.en
            }
            if ('image' in item && item.image) {
              baseItem.image = item.image
            }
            // Add media reference for carousel items (skip for now)
            if (
              'media' in item &&
              (item as any).media?.image &&
              mediaMap[(item as any).media.image]
            ) {
              baseItem.image = mediaMap[(item as any).media.image]
            }

            return baseItem
          }),
        },
        locale: 'en',
      })

      // Only update Polish locale for basic localized fields
      if (content.title.pl || content.subtitle?.pl || content.description?.pl) {
        const updateData: any = {
          title: content.title.pl,
          subtitle: content.subtitle?.pl,
          description: content.description?.pl ? htmlToLexical(content.description.pl) : undefined,
          additionalContent: content.additionalContent?.pl
            ? htmlToLexical(content.additionalContent.pl)
            : undefined,
          ctaText: content.ctaText?.pl,
        }

        // For carousel items, we need to fetch the current items and update only the localized fields
        if (content.carouselItems && content.carouselItems.length > 0) {
          // Get the current document with carousel items to preserve IDs
          const currentDoc = await payload.findByID({
            collection: 'page-content',
            id: createdDoc.id,
            locale: 'en',
          })

          if (currentDoc.carouselItems) {
            updateData.carouselItems = currentDoc.carouselItems.map(
              (existingItem: any, index: number) => {
                const polishContent = content.carouselItems?.[index]
                if (!polishContent) return existingItem

                return {
                  ...existingItem, // Preserve all existing data including non-localized fields like image
                  id: existingItem.id, // Preserve the ID
                  title: polishContent.title.pl,
                  description: polishContent.description?.pl
                    ? htmlToLexical(polishContent.description.pl)
                    : existingItem.description,
                  additionalText: (polishContent as any).additionalText?.pl
                    ? htmlToLexical((polishContent as any).additionalText.pl)
                    : existingItem.additionalText,
                  // Only update role if it exists in the Polish content
                  ...('role' in polishContent && (polishContent as any).role?.pl
                    ? { role: (polishContent as any).role.pl }
                    : {}),
                }
              },
            )
          }
        }

        await payload.update({
          collection: 'page-content',
          id: createdDoc.id,
          data: updateData,
          locale: 'pl',
        })
      }

      console.log(`✅ Created/Updated content for ${content.sectionId} section`)
    }

    console.log('🎉 Remote seeding completed successfully!')
    console.log('')
    console.log('📝 Next steps:')
    console.log('   1. Upload media files to R2 if needed:')
    console.log('      wrangler r2 object put codeious-website/your-image.jpg --file=./assets/your-image.jpg')
    console.log('   2. Link media in Payload admin panel: /admin')
    console.log('   3. Deploy: pnpm deploy')
  } catch (error) {
    console.error('❌ Error seeding content:', error)
    process.exit(1)
  }

  process.exit(0)
}

seedRemote()
