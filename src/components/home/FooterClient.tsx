'use client'

export default function FooterClient() {
  return (
    <div className="flex gap-6 md:gap-9">
      <a
        href="#contact"
        className="text-lg md:text-lg font-bold hover:opacity-80 transition-opacity"
      >
        Contact
      </a>
      <a
        href="#"
        className="text-lg md:text-lg font-bold hover:opacity-80 transition-opacity"
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      >
        To Top
      </a>
    </div>
  )
}
