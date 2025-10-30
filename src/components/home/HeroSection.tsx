import Image from 'next/image'
import { getPageContent, getFallbackContent } from '@/lib/content'
import { type Locale } from '@/lib/locale'
import { Navigation } from './Navigation'

interface HeroSectionProps {
  locale?: Locale
}

// Server Component - fetches data at build/request time
export default async function HeroSection({ locale = 'en' }: HeroSectionProps) {
  // Fetch hero content server-side
  const heroContent = await getPageContent('hero', locale)

  // Get fallback content from seedData
  const fallbackContent = getFallbackContent('hero', locale)

  // Get logo from hero content or fallback
  const logoData = heroContent?.media?.logo
    ? {
        url: heroContent.media.logo.url,
        alt: heroContent.media.logo.alt || 'Codeious logo',
      }
    : fallbackContent?.media?.logo
      ? {
          url: `/api/media/file/${fallbackContent.media.logo}`,
          alt: 'Codeious logo',
        }
      : null

  // Get background image from CMS or fallback to default
  const backgroundImageSrc =
    heroContent?.media?.backgroundImage?.url || '/api/media/file/bg-image.png'
  const backgroundImageAlt = heroContent?.media?.backgroundImage?.alt || 'Hero background'

  return (
    <section className="relative h-[600px] sm:h-[700px] md:h-[800px] overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImageSrc}
          alt={backgroundImageAlt}
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Navigation */}
      <Navigation logoData={logoData} />

      {/* Hero Content - bundled inline */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-4 md:pb-4">
        <div className="mx-auto w-full max-w-[1720px] px-4 md:px-12">
          <div className="max-w-[1200px]">
            <h2
              className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[90px] font-light tracking-tight mb-2 md:mb-4"
              style={{ color: '#4BB95F' }}
            >
              {heroContent?.title || fallbackContent?.title || 'Welcome to codeious'}
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[90px] font-bold text-white tracking-tight leading-[0.9]">
              {heroContent?.subtitle ||
                fallbackContent?.subtitle ||
                'We build next-gen, cloud-based eCommerce for Enterprise'}
            </h1>
          </div>
        </div>
      </div>
    </section>
  )
}
