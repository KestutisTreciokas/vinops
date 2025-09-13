export default function SeoTitle({ lang }: { lang: 'en'|'ru' }) {
  const src = lang === 'ru'
    ? '/svg/seo/seo-title-catalog-lang-ru-theme-light.svg'
    : '/svg/seo/seo-title-catalog-lang-en-theme-light.svg'
  return (
    <div className="mb-6">
      <img src={src} alt="" width={960} height={160} className="max-w-full h-auto" />
    </div>
  )
}
