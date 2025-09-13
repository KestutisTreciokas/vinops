export default function StatRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-b-0 border-border-muted">
      <div className="text-sm text-fg-muted">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  )
}
