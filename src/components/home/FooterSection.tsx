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
    <footer className="bg-black text-white px-4 py-4 md:py-8 md:px-12 min-h-[370px] flex items-start">
      <div className="mx-auto max-w-[1720px] flex flex-col items-center sm:flex-row sm:justify-center md:justify-between sm:items-center gap-4 sm:gap-8 w-full">
        <p className="text-lg md:text-xl font-light tracking-tight text-center md:text-left">
          {footerContent?.title || 'Copyright @ Codeious 2025'}
        </p>
        <FooterClient />
      </div>
    </footer>
  )
}
