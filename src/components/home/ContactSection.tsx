import { getPageContent } from '@/lib/content'
import { type Locale } from '@/lib/locale'
import { SectionTitle } from '@/components/common/SectionTitle'
import ContactForm from './ContactForm'

interface ContactSectionProps {
  locale?: Locale
}

export default async function ContactSection({ locale = 'en' }: ContactSectionProps) {
  // Fetch contact content server-side
  const contactContent = await getPageContent('contact', locale)

  return (
    <section
      id="contact"
      className="px-4 py-8 md:py-12 md:px-12"
      style={{ backgroundColor: '#60EF7A' }}
    >
      <div className="mx-auto max-w-[1720px] space-y-12">
        <div className="space-y-6">
          <SectionTitle
            title={contactContent?.title || 'Get in touch'}
            markerColor="white"
            textColor="text-gray-800"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <ContactForm ctaText={contactContent?.ctaText} />

          <div className="lg:w-1/3 space-y-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-normal text-gray-800">
                {contactContent?.subtitle || 'Connect with us'}
              </h3>
            </div>
            <div className="space-y-6">
              <a
                href="mailto:contact@codeious.io"
                className="!text-gray-800 text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight underline cursor-pointer hover:opacity-75 transition-opacity duration-200 block"
              >
                contact@codeious.io
              </a>
              <p className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-800">
                +48 500.400.400
              </p>
              <p className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-800">
                ul. Domaniewska 34/5
                <br />
                Kraków, Poland
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
