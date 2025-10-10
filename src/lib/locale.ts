export type Locale = 'en' | 'pl'

/**
 * Get browser locale from navigator (client-side only)
 */
export function getBrowserLocale(): Locale {
  if (typeof window !== 'undefined') {
    const browserLang = navigator.language.split('-')[0]
    return browserLang === 'pl' ? 'pl' : 'en'
  }
  return 'en' // Default fallback
}

/**
 * Get server locale from request headers
 */
export function getServerLocale(request?: Request): Locale {
  if (request) {
    const acceptLanguage = request.headers.get('accept-language')
    if (acceptLanguage && acceptLanguage.includes('pl')) {
      return 'pl'
    }
  }
  return 'en' // Default fallback
}
