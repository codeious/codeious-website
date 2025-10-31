import { getPageContent } from '@/lib/content'
import { type Locale } from '@/lib/locale'
import FooterClient from './FooterClient'

interface FooterSectionProps {
  locale?: Locale
}

export default async function FooterSection({ locale = 'en' }: FooterSectionProps) {
  // Fetch footer content server-side
  const footerContent = await getPageContent('footer', locale)

  return (
    <footer className="bg-black text-white px-4 md:px-8 min-h-[370px] flex items-start">
      <div className="mx-auto max-w-[1720px] flex justify-between items-center w-full pt-4">
        <p className="text-lg md:text-xl font-light tracking-tight">
          {footerContent?.title || 'Copyright @ Codeious 2025'}
        </p>
        <FooterClient />
      </div>
    </footer>
  )
}
