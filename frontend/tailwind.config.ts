import type { Config } from 'tailwindcss'

/**
 * Семантические цвета берём из CSS-переменных,
 * которые зададим в globals.css (Light/Dark темы).
 */
const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Consolas"],
      },
      colors: {
        // Текст
        'fg-default': 'var(--fg-default)',
        'fg-muted': 'var(--fg-muted)',
        'fg-subtle': 'var(--fg-subtle)',
        'fg-on-inverse': 'var(--fg-on-inverse)',
        // Фон
        'bg-canvas': 'var(--bg-canvas)',
        'bg-surface': 'var(--bg-surface)',
        'bg-muted': 'var(--bg-muted)',
        // Границы
        'border-muted': 'var(--border-muted)',
        'border-strong': 'var(--border-strong)',
        // Бренд
        'brand': 'var(--brand)',
        'brand-hover': 'var(--brand-hover)',
        'brand-fg': 'var(--brand-fg)',
        // Статусы
        'status-error': 'var(--status-error)',
        'status-error-hover': 'var(--status-error-hover)',
        'status-error-fg': 'var(--status-error-fg)',
        'status-success': 'var(--status-success)',
        'status-success-fg': 'var(--status-success-fg)',
      },
      boxShadow: {
        focus: '0 0 0 4px var(--focus-ring)',
      },
      borderRadius: {
        '2xl': '1rem',
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px',
        },
      },
    },
  },
  plugins: [],
}
export default config

