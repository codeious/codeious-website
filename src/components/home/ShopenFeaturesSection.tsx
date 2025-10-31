import { Zap, Palette, MousePointer, Brain, MessageCircle, Clock } from 'lucide-react'
import { getPageContent, richTextToPlainText, getFallbackContent } from '@/lib/content'
import { type Locale } from '@/lib/locale'
import { SectionTitle } from '@/components/common/SectionTitle'

interface ShopenFeaturesSectionProps {
  locale?: Locale
}

export default async function ShopenFeaturesSection({ locale = 'en' }: ShopenFeaturesSectionProps) {
  // Fetch shopen-features content server-side
  const shopenFeaturesContent = await getPageContent('shopen-features', locale)

  // Get fallback content from seedData
  const fallbackContent = getFallbackContent('shopen-features', locale)

  // Define icons for each feature
  const icons = [Zap, Palette, MousePointer, Brain, MessageCircle, Clock]

  // Transform CMS carousel data to component format or use fallback
  const features =
    shopenFeaturesContent?.carouselItems?.map((item, index) => ({
      id: index + 1,
      icon: icons[index] || Zap,
      title: item.title || '',
      description: item.description ? richTextToPlainText(item.description) : '',
    })) ||
    fallbackContent?.carouselItems?.map((item, index) => ({
      id: index + 1,
      icon: icons[index] || Zap,
      title: item.title || '',
      description: item.description || '',
    })) ||
    []

  return (
    <section className="mx-auto max-w-[1721px] py-20 px-4 md:px-8">
      <div className="mb-16">
        <SectionTitle
          title={shopenFeaturesContent?.title || fallbackContent?.title || 'Shopen in a nutshell'}
          markerColor="green"
          textColor="text-gray-800"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((feature) => {
          const IconComponent = feature.icon
          return (
            <div key={feature.id} className="bg-gray-50 p-10 space-y-5">
              <div className="w-[86px] h-[86px] bg-green-100 rounded-full flex items-center justify-center">
                <IconComponent className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-gray-800">
                {feature.title}
              </h3>
              <p className="text-xl font-light tracking-tight text-gray-800">
                {feature.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
