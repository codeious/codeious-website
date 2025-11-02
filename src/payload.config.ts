// storage-adapter-import-placeholder
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare'
import { GetPlatformProxyOptions } from 'wrangler'
import { r2Storage } from '@payloadcms/storage-r2'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { ContactMessages } from './collections/ContactMessages'
import { PageContent } from './collections/PageContent'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isMigrationOrGenerate = process.argv.find((value) => value.match(/^(generate|migrate):?/))
const cloudflareRemoteBindings = process.env.NODE_ENV === 'production' && !isMigrationOrGenerate
const cloudflare =
  isMigrationOrGenerate || !cloudflareRemoteBindings
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true })

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, ContactMessages, PageContent],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
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
      collections: {
        media: {
          generateFileURL: ({ filename }) =>
            `https://pub-3609f4891cb542738b202ce8474db4eb.r2.dev/${filename}`,
        },
      },
    }),
  ],
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        experimental: { remoteBindings: cloudflareRemoteBindings },
      } satisfies GetPlatformProxyOptions),
  )
}
