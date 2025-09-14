'use client'
import Row from './_Row'
import CopyButton from '@/components/common/CopyButton'
import StatusBadge from '@/components/common/StatusBadge'

export default function LotInfo({ lot = {}, lang='ru' }: { lot?: any; lang?: 'ru'|'en' }) {
  const t = (ru:string,en:string)=> lang==='ru'?ru:en
  const Icon = ({d}:{d:string}) => (
    <svg aria-hidden viewBox="0 0 24 24" className="size-4 mr-2 opacity-70"><path fill="currentColor" d={d}/></svg>
  )

  // небольшая библиотека простых иконок (моно, чтобы совпасть со стилем «Характеристики»)
  const ic = {
    hash: 'M7 3v3M17 3v3M7 18v3M17 18v3M3 7h18M3 17h18',               // #
    gavel: 'M2 21h7v-2H4l5.5-5.5l-2-2L2 17v4Zm9.2-9.7l2 2L22 4.7l-2-2L11.2 11.3ZM7.9 8.1l2 2l1.4-1.4l-2-2L7.9 8.1Z',
    bld: 'M4 20h16V4H4v16Zm2-2V6h12v12H6Zm2-8h8v2H8v-2Zm0 4h8v2H8v-2Z', // seller
    cal: 'M7 2v2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7Zm12 6H5v10h14V8Z',
    odo: 'M12 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7V3Zm1 9V7h-2v5l3 3 1.4-1.4L13 12Z',
    dot: 'M12 8a4 4 0 1 1 0 8a4 4 0 0 1 0-8Z',                          // status
    usd: 'M11 21v-2.1c-2.3-.3-4-1.7-4-3.7h2c0 1 .9 1.8 2 2v-4c-2.2-.5-4-1.5-4-3.7c0-2 1.7-3.4 4-3.7V3h2v2.1c2.3.3 4 1.7 4 3.7h-2c0-1-.9-1.8-2-2v4c2.2.5 4 1.5 4 3.7c0 2-1.7 3.4-4 3.7V21h-2Z'
  }

  return (
    <div className="card p-4">
      <h3 className="card-title mb-3">{t('Информация о лоте', 'Lot info')}</h3>
      <div className="space-y-2 text-sm">
        <Row k={<><Icon d={ic.hash}/>{t('Номер лота','Lot number')}</>} v={
          lot?.lotNumber
            ? <span className="inline-flex items-center gap-2">
                {String(lot.lotNumber)}
                <CopyButton text={String(lot.lotNumber)} title={t('Скопировать','Copy')}/>
              </span>
            : '—'
        }/>
        <Row k={<><Icon d={ic.gavel}/>{t('Аукцион','Auction')}</>} v={lot?.auction ?? '—'} />
        <Row k={<><Icon d={ic.bld}/>{t('Продавец','Seller')}</>}   v={lot?.seller ?? '—'} />
        <Row k={<><Icon d={ic.cal}/>{t('Дата','Date')}</>}        v={lot?.date ?? '—'} />
        <Row k={<><Icon d={ic.odo}/>{t('Пробег','Odometer')}</>}  v={lot?.odometer ?? '—'} />
        <Row k={<><Icon d={ic.dot}/>{t('Статус','Status')}</>}    v={<StatusBadge value={lot?.status} lang={lang}/>} />
        <Row k={<><Icon d={ic.usd}/>{t('Итоговая ставка','Final bid')}</>} v={lot?.finalBid ?? '—'} />
      </div>
    </div>
  )
}
