'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface LogoData {
  url: string
  alt: string
}

interface NavigationProps {
  logoData?: LogoData | null
}

export function Navigation({ logoData }: NavigationProps) {
  const [logoLoaded, setLogoLoaded] = useState(false)
  const router = useRouter()

  // Use CMS logo if available, otherwise fallback to static logo
  const logoSrc = logoData?.url || '/api/media/file/codeious-logo.png'
  const logoAlt = logoData?.alt || 'Codeious logo'

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      // Update URL hash using Next.js router
      router.push(`#${sectionId}`, { scroll: false })
    }
  }

  return (
    <div className="relative z-10 mx-auto w-full max-w-[1720px] px-8 pt-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {/* Fixed container with proper aspect ratio to prevent layout shift */}
          <div className="w-[152px] h-[32px] relative flex items-center justify-start">
            <Image
              src={logoSrc}
              alt={logoAlt}
              fill
              className={`object-contain object-left transition-opacity duration-200 ${
                logoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              priority
              sizes="152px"
              onLoad={() => setLogoLoaded(true)}
            />
            {/* Loading placeholder */}
            {!logoLoaded && (
              <div className="absolute inset-0 bg-gray-200/20 rounded animate-pulse" />
            )}
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4">
          <nav className="flex items-center">
            <Button
              variant="link"
              className="text-white font-semibold text-lg hover:text-green-200 transition-colors"
              onClick={() => scrollToSection('about-us')}
            >
              About Us
            </Button>
            <Button
              variant="link"
              className="text-white font-semibold text-lg hover:text-green-200 transition-colors"
              onClick={() => scrollToSection('shopen')}
            >
              Shopen
            </Button>
            <Button
              variant="link"
              className="text-white font-semibold text-lg hover:text-green-200 transition-colors"
              onClick={() => scrollToSection('technology')}
            >
              Technology
            </Button>
            <Button
              variant="link"
              className="text-white font-semibold text-lg hover:text-green-200 transition-colors"
              onClick={() => scrollToSection('faq')}
            >
              FAQ
            </Button>
            <Button
              variant="link"
              className="text-white font-semibold text-lg hover:text-green-200 transition-colors"
              onClick={() => scrollToSection('team')}
            >
              Team
            </Button>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              className="rounded-full bg-white text-black font-bold text-lg px-8 py-3 hover:bg-green-50 transition-colors"
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col gap-4 mt-8">
                <Button
                  variant="ghost"
                  className="justify-start font-semibold text-lg text-black"
                  onClick={() => scrollToSection('about-us')}
                >
                  About Us
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start font-semibold text-lg text-black"
                  onClick={() => scrollToSection('shopen')}
                >
                  Shopen
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start font-semibold text-lg text-black"
                  onClick={() => scrollToSection('technology')}
                >
                  Technology
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start font-semibold text-lg text-black"
                  onClick={() => scrollToSection('faq')}
                >
                  FAQ
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start font-semibold text-lg text-black"
                  onClick={() => scrollToSection('team')}
                >
                  Team
                </Button>
                <Button className="m-4 rounded-full" onClick={() => scrollToSection('contact')}>
                  Contact
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}
