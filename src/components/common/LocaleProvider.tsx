'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { type Locale, getBrowserLocale } from '@/lib/locale'

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  isLoading: boolean
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode
  initialLocale?: Locale
}) {
  const router = useRouter()
  const [locale, setLocaleState] = useState<Locale>('en')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get locale from localStorage, URL, or browser preference
    const storedLocale = localStorage.getItem('locale') as Locale
    const urlParams = new URLSearchParams(window.location.search)
    const urlLocale = urlParams.get('lang') as Locale

    const detectedLocale = urlLocale || storedLocale || initialLocale || getBrowserLocale()

    // Validate that detected locale is valid
    const validLocale = ['en', 'pl'].includes(detectedLocale) ? detectedLocale : 'en'

    setLocaleState(validLocale)
    setIsLoading(false)

    // Store the detected locale
    localStorage.setItem('locale', validLocale)
  }, [initialLocale])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)

    // Navigate to the same page with new locale parameter
    const url = new URL(window.location.href)
    url.searchParams.set('lang', newLocale)
    router.push(url.pathname + url.search)
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, isLoading }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}

// Language switcher component
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale()

  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        onClick={() => setLocale('en')}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          locale === 'en'
            ? 'bg-green-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLocale('pl')}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          locale === 'pl'
            ? 'bg-green-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        PL
      </button>
    </div>
  )
}
