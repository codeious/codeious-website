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
    <footer className="bg-black text-white px-4 py-4 md:py-4 md:px-12 min-h-[370px] flex items-start">
      <div className="mx-auto max-w-[1720px] flex justify-between items-center w-full">
        <p className="text-lg md:text-xl font-light tracking-tight">
          {footerContent?.title || 'Copyright @ Codeious 2025'}
        </p>
        <FooterClient />
      </div>
    </footer>
  )
}
