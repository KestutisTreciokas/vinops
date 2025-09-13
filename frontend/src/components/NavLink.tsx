'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

export default function NavLink({
  href,
  children,
  exact = false,
  className = '',
}: {
  href: string
  children: React.ReactNode
  exact?: boolean
  className?: string
}) {
  const pathname = usePathname() || '/'
  const isActive = exact ? pathname === href : pathname.startsWith(href)
  return (
    <Link href={href} className={clsx('nav-link', isActive && 'nav-link-active', className)}>
      {children}
    </Link>
  )
}
