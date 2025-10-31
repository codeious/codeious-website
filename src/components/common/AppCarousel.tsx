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
}

export function AppCarousel({
  children,
  className,
  showIndicators = true,
  showNavigation = true,
  autoPlay = false,
  autoPlayInterval = 5000,
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
              className={cn(
                'w-12 h-3 md:w-12 md:h-4 rounded-sm transition-colors',
                current === index + 1 ? 'bg-green-500' : 'bg-white hover:bg-gray-200',
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
