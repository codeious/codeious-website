import Image from 'next/image'
import { AppCarousel } from '@/components/common/AppCarousel'
import { getPageContent, richTextToPlainText, getFallbackContent } from '@/lib/content'
import { type Locale } from '@/lib/locale'
import { SectionTitle } from '@/components/common/SectionTitle'

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

  const sectionData = shopenContent?.media?.sectionImage
    ? {
        url: shopenContent.media.sectionImage.url,
        alt: shopenContent.media.sectionImage.alt || 'Codeious logo',
      }
    : fallbackContent?.media?.sectionImage
      ? {
          url: `/api/media/file/${fallbackContent.media.sectionImage}`,
          alt: 'Codeious logo',
        }
      : null

  const renderShopenContent = (content: (typeof carouselItems)[0]) => (
    <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-16">
      {/* Text Content */}
      <div className="w-full md:w-1/2 space-y-8">
        <div className="space-y-6">
          <SectionTitle title={content.title} textColor="text-white" />
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

      {/* Image Content */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end">
        <div className="relative w-full max-w-[500px] xl:max-w-[700px] h-[300px] md:h-[400px] xl:h-[600px]">
          <Image
            src={sectionData?.url || '/api/media/file/shopen-section-image.png'}
            alt={sectionData?.alt || 'Shopen platform interface on laptop'}
            fill
            className="object-cover object-center rounded-lg"
          />
        </div>
      </div>
    </div>
  )

  return (
    <section id="shopen" className="relative py-20 bg-primary overflow-hidden">
      <div className="mx-auto max-w-[1720px] px-4 md:px-8">
        <AppCarousel
          showNavigation={false}
          showIndicators={true}
          indicatorMode="dark"
          className="h-full"
        >
          {carouselItems.map((content) => renderShopenContent(content))}
        </AppCarousel>
      </div>
    </section>
  )
}
