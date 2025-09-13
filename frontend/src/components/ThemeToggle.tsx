'use client'
import { useEffect, useState } from 'react'

type T = 'light' | 'dark'
const getSystem = (): T =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<T>('light')

  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme') as T | null
      const t = stored || getSystem()
      document.documentElement.setAttribute('data-theme', t)
      setTheme(t)
    } catch {}
  }, [])

  const toggle = () => {
    const next: T = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    try { localStorage.setItem('theme', next) } catch {}
    setTheme(next)
  }

  return (
    <button type="button" className="btn btn-secondary h-8 px-3 text-xs" onClick={toggle}>
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  )
}
