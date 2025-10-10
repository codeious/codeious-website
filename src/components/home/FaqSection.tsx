import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { getPageContent } from '@/lib/content'
import { type Locale } from '@/lib/locale'

interface FaqSectionProps {
  locale?: Locale
}

export default async function FaqSection({ locale = 'en' }: FaqSectionProps) {
  // Fetch FAQ content server-side
  const faqContent = await getPageContent('faq', locale)

  return (
    <section id="faq" className="py-20 mx-auto max-w-[1720px] px-4 md:px-8">
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="space-y-6 lg:w-1/3">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-800">
              {faqContent?.title || 'FAQ - Find answers to your questions'}
            </h2>
          </div>
        </div>

        <div className="lg:w-2/3">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-gray-50 border-none rounded-none">
              <AccordionTrigger className="text-xl md:text-xl lg:text-2xl font-semibold tracking-tight text-gray-800 p-8 hover:no-underline">
                How quickly can I start using shopen?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-lg md:text-xl lg:text-2xl font-light tracking-tight text-gray-800">
                Once you purchase our ecommerce platform software, it typically becomes available
                within 3-5 business days, depending on your specific requirements. Our team conducts
                thorough testing, sets up your account, processes payment, and configures the
                servers to ensure optimal performance. The ecommerce platform is then tailored to
                your needs, enabling a seamless launch. For urgent setups, we offer expedited
                options - contact our 24/7 support for details.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-gray-50 border-none rounded-none">
              <AccordionTrigger className="text-xl md:text-xl lg:text-2xl font-semibold tracking-tight text-gray-800 p-8 hover:no-underline">
                How much would it cost me?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-lg md:text-xl lg:text-2xl font-light tracking-tight text-gray-800">
                Our pricing is customized based on your specific needs and requirements. We offer
                flexible pricing models including one-time licenses, subscription plans, and
                enterprise solutions. Contact our sales team for a personalized quote that fits your
                budget and business goals.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-gray-50 border-none rounded-none">
              <AccordionTrigger className="text-xl md:text-xl lg:text-2xl font-semibold tracking-tight text-gray-800 p-8 hover:no-underline">
                Are you offering any customization?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-lg md:text-xl lg:text-2xl font-light tracking-tight text-gray-800">
                Yes, we offer extensive customization options to match your brand and business
                requirements. Our platform is designed to be highly flexible, allowing custom
                themes, features, integrations, and workflows. Our development team can work with
                you to implement specific customizations.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-gray-50 border-none rounded-none">
              <AccordionTrigger className="text-xl md:text-xl lg:text-2xl font-semibold tracking-tight text-gray-800 p-8 hover:no-underline">
                Can I see a demo?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-lg md:text-xl lg:text-2xl font-light tracking-tight text-gray-800">
                Absolutely! We offer live demos and trial access to showcase our platform&apos;s
                capabilities. Schedule a personalized demo with our team to see how Shopen can
                transform your ecommerce operations. Contact us to book your demo session.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-gray-50 border-none rounded-none">
              <AccordionTrigger className="text-xl md:text-xl lg:text-2xl font-semibold tracking-tight text-gray-800 p-8 hover:no-underline">
                Is there a way to view your Roadmap?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-lg md:text-xl lg:text-2xl font-light tracking-tight text-gray-800">
                Yes, we maintain a public roadmap that outlines our planned features and
                improvements. You can access it through our documentation portal or contact our team
                for detailed information about upcoming releases and feature timelines.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}
