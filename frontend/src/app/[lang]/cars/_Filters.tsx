import Pill from '../../../components/ui/Pill'

export default function Filters({ lang }: { lang: 'en'|'ru' }) {
  const t = (en:string, ru:string)=> lang==='ru'?ru:en
  return (
    <div className="card p-4 md:p-5">
      <div className="flex flex-wrap gap-3">
        <Pill>{t('All', 'Все')}</Pill>
        <Pill>{t('Active', 'Активные')}</Pill>
        <Pill>{t('Sold', 'Проданные')}</Pill>
        <Pill>{t('Damaged', 'Повреждения')}</Pill>
        <Pill>{t('Clean', 'Целые')}</Pill>
      </div>
      <div className="mt-4 grid sm:grid-cols-3 gap-3">
        <input className="input h-10 px-3 rounded-lg" placeholder={t('Make/Model','Марка/Модель')} />
        <input className="input h-10 px-3 rounded-lg" placeholder={t('Year from','Год от')} />
        <input className="input h-10 px-3 rounded-lg" placeholder={t('Year to','Год до')} />
      </div>
    </div>
  )
}
