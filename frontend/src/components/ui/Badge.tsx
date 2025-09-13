export default function Badge({
  children, tone='neutral', className=''
}: { children: React.ReactNode; tone?: 'neutral'|'success'|'warning'|'error'|'brand'; className?: string }) {
  const map: Record<string,string> = {
    neutral: 'bg-bg-muted text-fg-muted',
    success: 'bg-[color:var(--green-50,#E8F5E9)] text-[color:var(--green-700,#2E7D32)]',
    warning: 'bg-[color:var(--amber-50,#FFF8E1)] text-[color:var(--amber-800,#8D6E63)]',
    error:   'bg-[color:var(--red-50,#FDECEA)] text-[color:var(--red-700,#C62828)]',
    brand:   'bg-brand/10 text-brand',
  }
  return <span className={`inline-flex items-center h-7 px-3 rounded-full text-xs font-medium ${map[tone]} ${className}`}>{children}</span>
}
