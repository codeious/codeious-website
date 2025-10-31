import Image from 'next/image'
import { AppCarousel } from '@/components/common/AppCarousel'
import { getPageContent, richTextToPlainText, getFallbackContent } from '@/lib/content'
import { type Locale } from '@/lib/locale'
import { SectionTitle } from '@/components/common/SectionTitle'

interface TeamSectionProps {
  locale?: Locale
}

export default async function TeamSection({ locale = 'en' }: TeamSectionProps) {
  // Fetch team content server-side
  const teamContent = await getPageContent('team', locale)

  // Get fallback content from seedData
  const fallbackContent = getFallbackContent('team', locale)

  // Transform CMS carousel data to component format
  const teamMembers =
    teamContent?.carouselItems?.map((item, index) => ({
      id: index + 1,
      name: item.title || '',
      role: item.role || '',
      image: (item.image as any)?.url || '/api/media/file/ceo.png',
      imageAlt: (item.image as any)?.alt || `${item.title} - ${item.role}`,
      bio: item.description ? richTextToPlainText(item.description) : '',
      additionalBio: item.additionalText ? richTextToPlainText(item.additionalText) : '',
    })) ||
    fallbackContent?.carouselItems?.map((item, index) => ({
      id: index + 1,
      name: item.title || '',
      role: item.role || '',
      image: '/api/media/file/ceo.png',
      imageAlt: `${item.title} - ${item.role}`,
      bio: item.description || '',
      additionalBio: item.additionalText || '',
    })) ||
    []

  const renderTeamMember = (member: (typeof teamMembers)[0]) => (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 lg:items-start">
      <div className="space-y-7 flex flex-col items-center md:items-center lg:items-start">
        <div className="w-[362px] h-[360px] rounded-lg overflow-hidden mt-2">
          <Image
            src={member.image}
            alt={member.imageAlt}
            width={362}
            height={360}
            className="object-cover"
          />
        </div>
        <div className="space-y-1 text-center md:text-center lg:text-left">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
            {member.name}
          </h3>
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-gray-800">{member.role}</p>
        </div>
      </div>

      <div className="flex-1">
        <p className="text-lg md:text-xl lg:text-2xl tracking-tight text-gray-800 leading-relaxed !mt-0">
          {member.bio}
        </p>
        <p className="text-lg md:text-xl lg:text-2xl tracking-tight text-gray-800 leading-relaxed mt-6">
          {member.additionalBio}
        </p>
      </div>
    </div>
  )
  return (
    <section id="team" className=" bg-gray-100">
      <div className="mx-auto max-w-[1722px] px-4 py-4 md:py-12 md:px-12">
        <div className="space-y-20">
          <div className="space-y-6 text-center md:text-left">
            <SectionTitle
              title={teamContent?.title || fallbackContent?.title || 'Meet the team'}
              markerColor="green"
              textColor="text-gray-800"
            />
          </div>

          <AppCarousel showNavigation={false}>
            {teamMembers.map((member) => renderTeamMember(member))}
          </AppCarousel>
        </div>
      </div>
    </section>
  )
}
