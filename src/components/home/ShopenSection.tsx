import Image from 'next/image'
import { AppCarousel } from '@/components/common/AppCarousel'
import { getPageContent, richTextToPlainText, getFallbackContent } from '@/lib/content'
import { renderRichText } from '@/lib/renderUtils'
import { type Locale } from '@/lib/locale'

interface ShopenSectionProps {
  locale?: Locale
}

export default async function ShopenSection({ locale = 'en' }: ShopenSectionProps) {
  // Fetch shopen content server-side
  const shopenContent = await getPageContent('shopen', locale)

  // Get fallback content from seedData
  const fallbackContent = getFallbackContent('shopen', locale)

  // Transform CMS carousel data to component format
  const carouselItems =
    shopenContent?.carouselItems?.map((item, index) => ({
      id: index + 1,
      title: item.title || '',
      mainText: item.description ? richTextToPlainText(item.description) : '',
      additionalText: item.additionalText ? richTextToPlainText(item.additionalText) : '',
    })) ||
    fallbackContent?.carouselItems?.map((item, index) => ({
      id: index + 1,
      title: item.title || '',
      mainText: item.description || '',
      additionalText: item.additionalText || '',
    })) ||
    []

  const renderShopenContent = (content: (typeof carouselItems)[0]) => (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-8 md:space-y-16">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-white">{content.title}</h2>
          </div>
        </div>
        <div className="space-y-4 md:space-y-6">
          <p className="text-lg md:text-xl lg:text-2xl text-white tracking-tight font-bold">
            {content.mainText}
          </p>
          <div className="mt-4">
            <p className="text-lg md:text-xl lg:text-2xl text-white tracking-tight">
              {content.additionalText}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
  return (
    <section id="shopen" className="relative py-20 bg-primary overflow-hidden">
      <div className="mx-auto max-w-[1720px] px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-16 lg:gap-32">
        <div className="lg:w-1/2 z-10 lg:pr-16">
          <AppCarousel showNavigation={false} className="h-full">
            {carouselItems.map((content) => renderShopenContent(content))}
          </AppCarousel>
        </div>

        <div className="lg:w-1/2 lg:absolute lg:right-8 lg:top-8 lg:bottom-0 flex justify-center lg:justify-end">
          <div className="relative w-full lg:w-[55vw] h-full min-h-[400px] lg:min-h-full">
            <Image
              src="/api/media/file/shopen-section-image.png"
              alt="Shopen platform interface on laptop"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
