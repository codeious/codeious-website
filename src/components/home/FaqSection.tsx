import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { getPageContent } from '@/lib/content'
import { type Locale } from '@/lib/locale'
import { SectionTitle } from '@/components/common/SectionTitle'

interface FaqSectionProps {
  locale?: Locale
}

export default async function FaqSection({ locale = 'en' }: FaqSectionProps) {
  // Fetch FAQ content server-side
  const faqContent = await getPageContent('faq', locale)

  return (
    <section id="faq" className="mx-auto max-w-[1720px] px-4 py-8 md:py-12 md:px-12">
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="space-y-6 lg:w-1/3">
          <SectionTitle
            title={faqContent?.title || 'FAQ - Find answers to your questions'}
            markerColor="green"
            textColor="text-black"
          />
        </div>

        <div className="lg:w-2/3">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-gray-50 border-none rounded-none">
              <AccordionTrigger className="text-xl md:text-xl lg:text-2xl font-semibold tracking-tight text-black p-8 hover:no-underline">
                1. What makes Shopen different from traditional, all-in-one e-commerce platforms?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-lg md:text-xl lg:text-2xl font-light tracking-tight text-black">
                Unlike monolithic platforms that bundle all functionalities into one rigid system,
                Shopen is built on a modern, composable architecture. This means it consists of
                specialized, independent components (like order management, content, and search)
                that work together seamlessly. This approach provides superior flexibility,
                eliminates vendor lock-in, and allows your business to innovate faster by upgrading
                or replacing individual components without disrupting the entire system.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-gray-50 border-none rounded-none">
              <AccordionTrigger className="text-xl md:text-xl lg:text-2xl font-semibold tracking-tight text-black p-8 hover:no-underline">
                2. Our business relies on an existing ecosystem (ERP, WMS, PIM). How does Shopen
                handle integration?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-lg md:text-xl lg:text-2xl font-light tracking-tight text-black">
                Shopen is designed with an &quot;API-first&quot; philosophy, meaning it&apos;s built
                to communicate and connect with external systems from the ground up. We utilize
                modern standards like GraphQL to ensure efficient and streamlined data exchange.
                This allows Shopen to act as a powerful central hub that orchestrates data flow
                between your existing enterprise systems, rather than forcing you to replace them.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-gray-50 border-none rounded-none">
              <AccordionTrigger className="text-xl md:text-xl lg:text-2xl font-semibold tracking-tight text-black p-8 hover:no-underline">
                3. How does the platform ensure high performance and reliability, especially during
                peak sales periods?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-lg md:text-xl lg:text-2xl font-light tracking-tight text-black">
                <p className="mb-4">
                  The platform is built using a Cloud-Native approach, leveraging the power of
                  technologies like Kubernetes. This provides two key advantages:
                </p>
                <ul className="space-y-4 list-disc list-inside">
                  <li>
                    <b>Automatic Scaling:</b> The system instantly allocates more resources during
                    traffic spikes (e.g., Black Friday) to ensure fast load times and a smooth
                    customer experience, then scales back down to optimize costs.
                  </li>
                  <li>
                    <b>High Availability:</b> Its self-healing architecture automatically detects
                    and resolves issues, ensuring maximum uptime and operational continuity for your
                    business.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-gray-50 border-none rounded-none">
              <AccordionTrigger className="text-xl md:text-xl lg:text-2xl font-semibold tracking-tight text-black p-8 hover:no-underline">
                4. We need to launch new marketing campaigns and update content quickly. How does
                Shopen empower our business teams?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-lg md:text-xl lg:text-2xl font-light tracking-tight text-black">
                Shopen utilizes a Headless architecture, which separates the customer-facing
                frontend from the backend business logic. This is complemented by a dedicated
                Headless CMS, giving your marketing and e-commerce teams complete autonomy. They can
                create, modify, and publish content or launch new landing pages across any channel
                (web, mobile app, etc.) independently and instantly, without needing developer
                intervention for every change.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-gray-50 border-none rounded-none">
              <AccordionTrigger className="text-xl md:text-xl lg:text-2xl font-semibold tracking-tight text-black p-8 hover:no-underline">
                5. Is Shopen just a storefront, or does it also manage our complex backend
                operations?
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 text-lg md:text-xl lg:text-2xl font-light tracking-tight text-black">
                Shopen is far more than a storefront; its core is the powerful Shopen Order
                Management System (OMS). This system is the central nervous system for your
                operations, managing the entire order lifecycle from the moment a customer clicks
                &quot;buy&quot; to final delivery. It handles complex processes like intelligent
                order routing to the best fulfillment location, order splitting for multi-warehouse
                shipments, and seamless coordination with your logistics partners, providing a
                single source of truth for your entire fulfillment chain.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}
