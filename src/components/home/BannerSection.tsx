export default function BannerSection() {
  return (
    <section className="py-10 bg-[rgb(93,54,255)]">
      <div className="mx-auto max-w-[1720px] h-[420px] flex items-center">
        <div className="space-y-11">
          <div className="flex items-center">
            <h3 className="text-[55px] font-semibold text-white">shopen</h3>
            <div className="w-[61px] h-[61px] ml-4"></div>
          </div>
          <p className="text-[54px] text-white leading-tight">
            E-grocery has never been so easy.
            <br />
            Discover shopen now!
          </p>
        </div>
      </div>
    </section>
  )
}
