import { getPayload } from 'payload'
import config from '@/payload.config'
import { type Locale, getServerLocale } from '@/lib/locale'
import { defaultContent } from './seedData'

export interface MediaData {
  id: string | number
  filename: string
  url: string
  alt?: string
  width?: number
  height?: number
}

export interface PageContentData {
  id: string | number
  sectionId: string
  title?: string
  subtitle?: string
  description?: any // Rich text content
  additionalContent?: any // Rich text content
  ctaText?: string
  media?: {
    backgroundImage?: MediaData
    sectionImage?: MediaData
    logo?: MediaData
  }
  metadata: {
    showSection: boolean
    order: number
  }
  carouselItems?: Array<{
    id: string | number
    title?: string
    description?: any
    additionalText?: any
    image?: MediaData
    role?: string
  }>
  createdAt: string
  updatedAt: string
}

/**
 * Get content for a specific section (Server-side optimized)
 */
export async function getPageContent(
  sectionId: string,
  locale: Locale = 'en',
): Promise<PageContentData | null> {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'page-content',
      where: {
        sectionId: {
          equals: sectionId,
        },
      },
      locale,
      limit: 1,
      depth: 2, // Include media references
    })

    return (result.docs[0] as PageContentData) || null
  } catch (error) {
    console.error('Error fetching page content:', error)
    return null
  }
}

/**
 * Get content via REST API (Client-side optimized)
 */
export async function getPageContentClient(
  sectionId: string,
  locale: Locale = 'en',
): Promise<PageContentData | null> {
  try {
    const response = await fetch(`/api/page-content?sectionId=${sectionId}&locale=${locale}`, {
      cache: 'no-store', // Disable caching for dynamic content
    })

    if (!response.ok) {
      throw new Error('Failed to fetch content')
    }

    const data = (await response.json()) as { content?: PageContentData }
    return data.content || null
  } catch (error) {
    console.error('Error fetching page content (client):', error)
    return null
  }
}

/**
 * Get all page content ordered by display order
 */
export async function getAllPageContent(locale: Locale = 'en'): Promise<PageContentData[]> {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'page-content',
      where: {
        'metadata.showSection': {
          equals: true,
        },
      },
      sort: 'metadata.order',
      locale,
      limit: 100,
    })

    return result.docs as PageContentData[]
  } catch (error) {
    console.error('Error fetching all page content:', error)
    return []
  }
}

/**
 * Get content for multiple sections
 */
export async function getMultiplePageContent(
  sectionIds: string[],
  locale: Locale = 'en',
): Promise<Record<string, PageContentData>> {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'page-content',
      where: {
        sectionId: {
          in: sectionIds,
        },
      },
      locale,
      limit: sectionIds.length,
    })

    const contentMap: Record<string, PageContentData> = {}
    result.docs.forEach((doc) => {
      const content = doc as PageContentData
      contentMap[content.sectionId] = content
    })

    return contentMap
  } catch (error) {
    console.error('Error fetching multiple page content:', error)
    return {}
  }
}

/**
 * Utility to convert rich text to plain text (for meta descriptions, etc.)
 */
export function richTextToPlainText(richText: any): string {
  if (!richText || !richText.root || !richText.root.children) {
    return ''
  }

  const extractText = (node: any): string => {
    if (node.type === 'text') {
      return node.text || ''
    }

    if (node.children) {
      return node.children.map(extractText).join('')
    }

    return ''
  }

  return richText.root.children.map(extractText).join(' ').trim()
}

/**
 * Get fallback content from seedData for a specific section
 */
export function getFallbackContent(sectionId: string, locale: Locale = 'en') {
  const content = defaultContent.find((item) => item.sectionId === sectionId)
  if (!content) return null

  return {
    title: content.title?.[locale] || content.title?.en,
    subtitle: content.subtitle?.[locale] || content.subtitle?.en,
    description: content.description?.[locale] || content.description?.en,
    additionalContent: content.additionalContent?.[locale] || content.additionalContent?.en,
    ctaText: content.ctaText?.[locale] || content.ctaText?.en,
    media: content.media,
    carouselItems:
      content.carouselItems?.map((item) => ({
        title: item.title?.[locale] || item.title?.en,
        description: item.description?.[locale] || item.description?.en,
        additionalText: (item as any).additionalText?.[locale] || (item as any).additionalText?.en,
        role: (item as any).role?.[locale] || (item as any).role?.en,
      })) || [],
    metadata: content.metadata,
  }
}
