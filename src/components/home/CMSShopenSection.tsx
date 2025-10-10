'use client'

import Image from 'next/image'
import { AppCarousel } from '@/components/common/AppCarousel'
import { useState, useEffect } from 'react'
import {
  getPageContent,
  type PageContentData,
  richTextToPlainText,
  getFallbackContent,
} from '@/lib/content'
import { type Locale } from '@/lib/locale'

interface CMSShopenSectionProps {
  locale?: Locale
}

export default function CMSShopenSection({ locale = 'en' }: CMSShopenSectionProps) {
  const [content, setContent] = useState<PageContentData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const sectionContent = await getPageContent('shopen', locale)
        setContent(sectionContent)
      } catch (error) {
        console.error('Error fetching Shopen content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [locale])

  // Get fallback content from seedData (this will be used client-side if CMS fails)
  const fallbackContent = getFallbackContent('shopen', locale)

  if (loading) {
    return (
      <section id="shopen" className="relative py-20 bg-primary overflow-hidden">
        <div className="mx-auto max-w-[1720px] px-4 md:px-8 flex items-center justify-center">
          <div className="text-white text-xl">Loading content...</div>
        </div>
      </section>
    )
  }

  if (!content || !content.metadata.showSection) {
    return null
  }

  const renderCarouselItem = (item: any) => (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-8 md:space-y-16">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-white whitespace-pre-line">
              {item.title || content.title}
            </h2>
          </div>
        </div>
        <div className="space-y-4 md:space-y-6">
          {item.description && (
            <div
              className="text-lg md:text-xl lg:text-2xl text-white tracking-tight font-bold"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          )}
          {item.additionalText && (
            <div className="mt-4">
              <div
                className="text-lg md:text-xl lg:text-2xl text-white tracking-tight"
                dangerouslySetInnerHTML={{ __html: item.additionalText }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // Fallback content if no carousel items from CMS
  const defaultContent = {
    title: content.title || fallbackContent?.title,
    description: content.description || fallbackContent?.description,
    additionalText: content.additionalContent || fallbackContent?.additionalContent,
  }

  const carouselItems =
    content.carouselItems && content.carouselItems.length > 0
      ? content.carouselItems
      : [defaultContent]

  // Get section image from CMS or fallback to default
  const sectionImageSrc =
    content.media?.sectionImage?.url || '/api/media/file/shopen-section-image.png'
  const sectionImageAlt = content.media?.sectionImage?.alt || 'Shopen platform interface on laptop'

  return (
    <section id="shopen" className="relative py-20 bg-primary overflow-hidden">
      <div className="mx-auto max-w-[1720px] px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-16 lg:gap-32">
        <div className="lg:w-1/2 z-10 lg:pr-16">
          <AppCarousel showNavigation={false} className="h-full">
            {carouselItems.map((item, index) => (
              <div key={(item as any).id || index}>{renderCarouselItem(item)}</div>
            ))}
          </AppCarousel>
        </div>

        <div className="lg:w-1/2 lg:absolute lg:right-8 lg:top-8 lg:bottom-0 flex justify-center lg:justify-end">
          <div className="relative w-full lg:w-[55vw] h-full min-h-[400px] lg:min-h-full">
            <Image
              src={sectionImageSrc}
              alt={sectionImageAlt}
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
