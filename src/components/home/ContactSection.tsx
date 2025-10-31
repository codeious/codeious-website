import { getPageContent } from '@/lib/content'
import { type Locale } from '@/lib/locale'
import ContactForm from './ContactForm'

interface ContactSectionProps {
  locale?: Locale
}

export default async function ContactSection({ locale = 'en' }: ContactSectionProps) {
  // Fetch contact content server-side
  const contactContent = await getPageContent('contact', locale)

  return (
    <section id="contact" className="py-20 px-4 md:px-8" style={{ backgroundColor: '#60EF7A' }}>
      <div className="mx-auto max-w-[1720px] space-y-12">
        <div className="space-y-6">
          <div className="w-12 h-3 md:w-12 md:h-4 bg-white rounded-sm"></div>
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
              {contactContent?.title || 'Get in touch'}
            </h2>
          </div>
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
