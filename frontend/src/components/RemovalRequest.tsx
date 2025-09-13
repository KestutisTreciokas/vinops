export default function RemovalRequest({ t }: { t: (en:string,ru:string)=>string }) {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'request@vinops.online'
  const tg    = process.env.NEXT_PUBLIC_TELEGRAM || '@keustis'
  const tgUrl = `https://t.me/${tg.replace('@','')}`

  return (
    <div className="card p-5 mt-6">
      <h2 className="font-semibold mb-2">{t('Removal request','Запрос на удаление')}</h2>
      <p className="text-sm text-fg-muted mb-3">
        {t(
          'If you want this page to be removed from vinops, contact us:',
          'Если вы хотите удалить эту карточку с vinops — свяжитесь с нами:'
        )}
      </p>
      <div className="flex flex-wrap gap-3">
        <a className="btn btn-secondary btn-lg" href={`mailto:${email}`}>{email}</a>
        <a className="btn btn-secondary btn-lg" href={tgUrl} target="_blank" rel="noreferrer">{tg}</a>
      </div>
    </div>
  )
}
