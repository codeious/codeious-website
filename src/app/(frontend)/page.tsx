// import { headers as getHeaders } from 'next/headers.js'
// import { getPayload } from 'payload'
import React from 'react'
// import { fileURLToPath } from 'url'

// import config from '@/payload.config'
import './styles.css'
import { type Locale } from '@/lib/locale'
import {
  AboutUsSection,
  // BannerSection,
  ContactSection,
  FaqSection,
  FooterSection,
  HeroSection,
  ShopenFeaturesSection,
  ShopenSection,
  TeamSection, TechnologySection,
  // TechnologySection,
} from '@/components/home'

interface HomePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  // const headers = await getHeaders()
  // const payloadConfig = await config
  // const payload = await getPayload({ config: payloadConfig })
  // const { user } = await payload.auth({ headers })

  // Extract locale from search params - URL is source of truth
  const resolvedSearchParams = await searchParams
  const langParam = resolvedSearchParams.lang as string
  const locale: Locale = langParam === 'pl' ? 'pl' : 'en'

  // const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="bg-white">
      {/* All sections including hero and footer constrained to 1720px with white background on overflow */}
      <div className="mx-auto max-w-[1720px] bg-white">
        <HeroSection locale={locale} />
        <AboutUsSection locale={locale} />
        <ShopenSection locale={locale} />
        <ShopenFeaturesSection locale={locale} />
        <TechnologySection locale={locale} />
        <TeamSection locale={locale} />
        <FaqSection locale={locale} />
        <ContactSection locale={locale} />
        <FooterSection locale={locale} />
      </div>
    </div>
  )
}
