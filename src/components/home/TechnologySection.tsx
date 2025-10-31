import Image from 'next/image'
import { AppCarousel } from '@/components/common/AppCarousel'
import { getPageContent, richTextToPlainText, getFallbackContent } from '@/lib/content'
import { renderRichText } from '@/lib/renderUtils'
import { type Locale } from '@/lib/locale'

interface TechnologySectionProps {
  locale?: Locale
}

export default async function TechnologySection({ locale = 'en' }: TechnologySectionProps) {
  // Fetch technology content server-side
  const technologyContent = await getPageContent('technology', locale)

  // Get fallback content from seedData
  const fallbackContent = getFallbackContent('technology', locale)

  // Transform CMS carousel data to component format, with fallback from seedData
  const carouselItems =
    technologyContent?.carouselItems?.map((item, index) => ({
      id: index + 1,
      title: item.title || '',
      descriptions: [
        item.description ? richTextToPlainText(item.description) : '',
        item.additionalText ? richTextToPlainText(item.additionalText) : '',
      ].filter((desc) => desc.length > 0),
    })) ||
    fallbackContent?.carouselItems?.map((item, index) => ({
      id: index + 1,
      title: item.title || '',
      descriptions: [item.description || '', item.additionalText || ''].filter(
        (desc) => desc.length > 0,
      ),
    })) ||
    []

  const renderTechnologyContent = (content: (typeof carouselItems)[0]) => (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-8 md:space-y-6">
        <div className="space-y-6">
          <div className="w-12 h-3 md:w-12 md:h-4 bg-green-500 rounded-sm"></div>
          <div>
            <h2 className="text-2xl md:text-4xl lg:text-4xl font-bold text-white leading-tight whitespace-pre-line">
              {content.title}
            </h2>
          </div>
        </div>
        <div className="space-y-6">
          {content.descriptions.map((description, index) => (
            <p key={index} className="text-lg md:text-lg lg:text-xl text-white tracking-tight">
              {description}
            </p>
          ))}
        </div>
      </div>
    </div>
  )

  // Get background image from CMS or fallback to default
  const backgroundImageSrc =
    technologyContent?.media?.backgroundImage?.url || '/api/media/file/technology-background.png'
  const backgroundImageAlt =
    technologyContent?.media?.backgroundImage?.alt || 'Technology background'

  return (
    <section id="technology" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <Image src={backgroundImageSrc} alt={backgroundImageAlt} fill className="object-cover" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1720px] px-4 md:px-8 flex flex-col xl:flex-row gap-16 xl:gap-32">
        <div className="xl:w-1/2">
          <AppCarousel showNavigation={false} className="h-full">
            {carouselItems.map((content) => renderTechnologyContent(content))}
          </AppCarousel>
        </div>

        <div className="xl:w-1/2 flex justify-center xl:justify-end">
          <div className="bg-white p-8 md:p-12 lg:p-16 space-y-6 md:space-y-8 w-full max-w-[600px] relative">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-full"></div>
            </div>

            {/* Render the additional content from CMS which includes the Go section */}
            {technologyContent?.additionalContent ? (
              <div className="space-y-6">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
                  {technologyContent.ctaText || fallbackContent?.ctaText || "Let's GO!"}
                </h3>
                <div className="space-y-4">
                  {renderRichText(technologyContent.additionalContent)}
                </div>
              </div>
            ) : (
              // Fallback content from seedData
              <div className="space-y-6">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
                  {fallbackContent?.ctaText || "Let's GO!"}
                </h3>
                {fallbackContent?.additionalContent && (
                  <div
                    className="space-y-4"
                    dangerouslySetInnerHTML={{ __html: fallbackContent.additionalContent }}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
