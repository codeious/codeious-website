'use client'

import React, { useState, useEffect } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

interface AppCarouselProps {
  children: React.ReactNode[]
  className?: string
  showIndicators?: boolean
  showNavigation?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
  indicatorMode?: 'light' | 'dark'
}

export function AppCarousel({
  children,
  className,
  showIndicators = true,
  showNavigation = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  indicatorMode = 'light',
}: AppCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  useEffect(() => {
    if (!autoPlay || !api) {
      return
    }

    const interval = setInterval(() => {
      if (current === count) {
        api.scrollTo(0)
      } else {
        api.scrollNext()
      }
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [api, autoPlay, autoPlayInterval, current, count])

  const goToSlide = (index: number) => {
    if (api) {
      api.scrollTo(index)
    }
  }

  // Define colors based on mode
  const getIndicatorClasses = (isActive: boolean) => {
    const baseClasses = 'h-3 md:h-4 rounded-xl transition-all duration-200'
    const widthClasses = isActive ? 'w-16 md:w-20' : 'w-12 md:w-12'

    if (indicatorMode === 'dark') {
      if (isActive) {
        return `${baseClasses} ${widthClasses} bg-[#60EF7A]`
      }
      return `${baseClasses} ${widthClasses} bg-[#14532D] hover:bg-[#138E44]`
    } else {
      // light mode
      if (isActive) {
        return `${baseClasses} ${widthClasses} bg-[#60EF7A]`
      }
      return `${baseClasses} ${widthClasses} bg-[#C5C5C5] hover:bg-[#858585]`
    }
  }

  return (
    <div className={cn('w-full', className)}>
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {children.map((child, index) => (
            <CarouselItem key={index}>{child}</CarouselItem>
          ))}
        </CarouselContent>
        {showNavigation && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>

      {showIndicators && count > 1 && (
        <div className="flex gap-4 md:gap-6 mt-8 justify-center">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={getIndicatorClasses(current === index + 1)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
