interface SectionTitleProps {
  title: string
  markerColor?: 'green' | 'white'
  className?: string
  textColor?: string
}

export function SectionTitle({
  title,
  markerColor = 'green',
  className = '',
  textColor = 'text-gray-900',
}: SectionTitleProps) {
  const markerBgColor = markerColor === 'white' ? 'bg-white' : 'bg-[#60EF7A]'

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Marker above text */}
      <div className={`w-10 h-2 ${markerBgColor} mb-4`} />

      {/* Title text */}
      <h2 className={`text-4xl xl:text-6xl font-bold ${textColor} leading-tight`}>{title}</h2>
    </div>
  )
}
