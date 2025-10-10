import { getPayload } from 'payload'
import payloadConfig from '../payload.config'
import { defaultContent, mediaFiles } from './seedData'
import fs from 'fs'
import path from 'path'

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

// Helper function to upload media files
const uploadMediaFile = async (
  payload: any,
  filename: string,
  alt: string,
  description: string,
) => {
  // Try assets folder first (for production seeding), then fallback to media folder (for local dev)
  let mediaPath = path.join(process.cwd(), 'assets', filename)

  if (!fs.existsSync(mediaPath)) {
    mediaPath = path.join(process.cwd(), 'media', filename)
  }

  if (!fs.existsSync(mediaPath)) {
    console.log(`⚠️  Media file not found in both assets/ and media/ folders: ${filename}`)
    return null
  }

  try {
    // Check if media already exists
    const existingMedia = await payload.find({
      collection: 'media',
      where: {
        filename: {
          equals: filename,
        },
      },
    })

    if (existingMedia.docs.length > 0) {
      console.log(`📁 Media file already exists: ${filename}`)
      return existingMedia.docs[0].id
    }

    // Read the file
    const fileBuffer = fs.readFileSync(mediaPath)

    // Create form data
    const formData = new FormData()
    const blob = new Blob([fileBuffer])
    formData.append('file', blob, filename)
    formData.append('alt', alt)

    // Upload the file
    const uploadedMedia = await payload.create({
      collection: 'media',
      data: {
        alt,
        filename,
      },
      file: {
        data: fileBuffer,
        mimetype: `image/${path.extname(filename).slice(1)}`,
        name: filename,
        size: fileBuffer.length,
      },
    })

    console.log(`📁 Uploaded media file: ${filename}`)
    return uploadedMedia.id
  } catch (error) {
    console.error(`❌ Error uploading media file ${filename}:`, error)
    return null
  }
}

const seed = async () => {
  console.log('🌱 Seeding/Overwriting page content...')

  const payload = await getPayload({ config: payloadConfig })

  try {
    // First, upload all media files
    console.log('📁 Uploading media files...')
    const mediaMap: Record<string, string> = {}

    for (const mediaFile of mediaFiles) {
      const mediaId = await uploadMediaFile(
        payload,
        mediaFile.filename,
        mediaFile.alt,
        mediaFile.description,
      )
      if (mediaId) {
        mediaMap[mediaFile.filename] = mediaId
      }
    }

    console.log('🌱 Overwriting all page content with default values...')

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

      // Prepare media references
      const mediaData: any = {}
      if (content.media) {
        if (content.media.backgroundImage && mediaMap[content.media.backgroundImage]) {
          mediaData.backgroundImage = mediaMap[content.media.backgroundImage]
        }
        if (content.media.sectionImage && mediaMap[content.media.sectionImage]) {
          mediaData.sectionImage = mediaMap[content.media.sectionImage]
        }
        if (content.media.logo && mediaMap[content.media.logo]) {
          mediaData.logo = mediaMap[content.media.logo]
        }
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
            // Add media reference for carousel items
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

    console.log('🎉 Seeding completed successfully!')
  } catch (error) {
    console.error('❌ Error seeding content:', error)
  }

  process.exit(0)
}

seed()
