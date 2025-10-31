import { getPageContent } from '@/lib/content'
import { renderRichText } from '@/lib/renderUtils'
import { type Locale } from '@/lib/locale'
import { SectionTitle } from '@/components/common/SectionTitle'

interface AboutUsSectionProps {
  locale?: Locale
}

export default async function AboutUsSection({ locale = 'en' }: AboutUsSectionProps) {
  // Fetch about-us content server-side
  const aboutUsContent = await getPageContent('about-us', locale)

  return (
    <section id="about-us" className="mx-auto max-w-[1720px] py-20 px-4 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-10 items-center">
        <div className="flex items-start">
          <SectionTitle title={aboutUsContent?.title || 'About Us'} markerColor="green" />
        </div>
        <div className="flex items-start">
          <div className="text-xl md:text-3xl tracking-tight text-gray-800 leading-tight">
            {aboutUsContent?.description ? (
              renderRichText(aboutUsContent.description)
            ) : (
              <p>
                Since 2015, our IT company has powered ecommerce success with a robust platform
                built on cutting-edge technology. Trusted by high-volume clients processing
                thousands of transactions daily, we deliver seamless, scalable solutions tailored to
                drive growth.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        <div className="space-y-4">
          <div className="lg:-space-y-6">
            <p className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-gray-900 !m-0 lg:leading-none">
              12
            </p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-extralight tracking-tight text-gray-700 !m-0 lg:leading-none">
              years
            </p>
          </div>
          <p className="text-base sm:text-lg lg:text-xl font-light tracking-tight text-gray-600">
            With 15 years of experience, we&apos;ve honed our expertise to deliver cutting-edge
            solutions in the ecommerce space.
          </p>
        </div>

        <div className="space-y-4">
          <div className="lg:-space-y-6">
            <p className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-gray-900 !m-0 lg:leading-none">
              1
            </p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-extralight tracking-tight text-gray-700 !m-0 lg:leading-none">
              market
            </p>
          </div>
          <p className="text-base sm:text-lg lg:text-xl font-light tracking-tight text-gray-600">
            Our focus on the e-grocery market ensures tailored, innovative platforms that meet the
            unique needs of online grocery businesses.
          </p>
        </div>

        <div className="space-y-4">
          <div className="lg:-space-y-6">
            <p className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-gray-900 !m-0 lg:leading-none">
              100k
            </p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-extralight tracking-tight text-gray-700 !m-0 lg:leading-none">
              users
            </p>
          </div>
          <p className="text-base sm:text-lg lg:text-xl font-light tracking-tight text-gray-600">
            Our platform seamlessly handles over 1 million daily operations, powering high-volume
            transactions with unmatched reliability.
          </p>
        </div>

        <div className="space-y-4">
          <div className="lg:-space-y-6">
            <p className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-gray-900 !m-0 lg:leading-none">
              1k+
            </p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-extralight tracking-tight text-gray-700 !m-0 lg:leading-none">
              transactions
            </p>
          </div>
          <p className="text-base sm:text-lg lg:text-xl font-light tracking-tight text-gray-600">
            Serving 10 million active users, we provide a scalable and secure experience for
            businesses and their customers.
          </p>
        </div>
      </div>
    </section>
  )
}
