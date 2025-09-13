export default function SeoBlock({ lang }: { lang: 'en'|'ru' }) {
  const src = lang === 'ru'
    ? '/svg/seo/seoblockvin-lang-ru-theme-dark.svg'
    : '/svg/seo/seoblockvinlang-en-theme-dark.svg'
  return (
    <div className="mb-6">
      <img src={src} alt="" width={960} height={120} className="max-w-full h-auto" />
    </div>
  )
}
