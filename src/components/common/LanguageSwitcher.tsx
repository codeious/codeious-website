'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Language {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  // Easy to add more languages in the future
  // { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  // { code: 'fr', name: 'Français', flag: '🇫🇷' },
]

export function LanguageSwitcher({ className }: { className?: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get current locale from URL, default to 'en'
  const currentLocale = searchParams.get('lang') || 'en'

  const switchLanguage = (locale: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('lang', locale)
    router.push(`/?${params.toString()}`)
  }

  const currentLanguage = languages.find((lang) => lang.code === currentLocale) || languages[0]

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Select value={currentLocale} onValueChange={switchLanguage}>
        <SelectTrigger className="w-fit min-w-[120px] bg-white border-gray-300 text-gray-700 hover:border-gray-400 focus:ring-green-500 focus:border-green-500">
          <SelectValue>
            <span className="flex items-center gap-2">
              {currentLanguage.flag} {currentLanguage.name}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languages.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              <span className="flex items-center gap-2">
                {language.flag} {language.name}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
