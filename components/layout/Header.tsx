'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Главная', path: '/', icon: '🏠' },
  { label: 'Начать', path: '/start', icon: '⚔️' },
  { label: 'Классы', path: '/classes', icon: '🛡️' },
  { label: 'Лор', path: '/lore', icon: '📖' },
  { label: 'Правила', path: '/rules', icon: '📜' },
  { label: 'Новости', path: '/news', icon: '📋' },
  { label: 'Ивенты', path: '/events', icon: '✨' },
  { label: 'Донат', path: '/donate', icon: '💎' }
]

function isActivePath(pathname: string, path: string) {
  if (path === '/') return pathname === '/'
  return pathname === path || pathname.startsWith(`${path}/`)
}

export function Header() {
  const pathname = usePathname()

  return (
    <header className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4">
      <motion.div
        className="header-glass pointer-events-auto flex w-full max-w-[980px] flex-col items-center gap-2 px-3 py-2 sm:px-4 sm:py-3"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <Link href="/" className="group flex select-none items-center gap-3">
          <span className="header-logo-slot">
            <Image
              src="/images/logo.png"
              alt="OrstedProject"
              width={48}
              height={48}
              priority
              className="h-full w-full object-contain transition-transform duration-150 group-hover:scale-105"
            />
          </span>
          <span className="grid gap-1">
            <span className="header-logo-text">OrstedProject</span>
            <span className="h-[2px] w-full bg-[linear-gradient(90deg,transparent,#7EC8E3,#C9A84C,transparent)]" />
            <span className="font-minecraft text-[0.42rem] leading-none tracking-[0.18em] text-mc-muted sm:text-[0.5rem]">
              MUSHOKU TENSEI
            </span>
          </span>
        </Link>

        <nav className="minecraft-hotbar hidden items-stretch sm:flex" aria-label="Основная навигация">
          {navLinks.map((link) => {
            const isActive = isActivePath(pathname, link.path)

            return (
              <Link key={link.path} href={link.path} className={`minecraft-slot ${isActive ? 'active' : ''}`}>
                {isActive ? (
                  <>
                    <span className="absolute left-[4px] top-[4px] h-[5px] w-[5px] bg-[#D8FFE4] opacity-80" />
                    <span className="absolute right-[4px] top-[4px] h-[5px] w-[5px] bg-[#D8FFE4] opacity-80" />
                  </>
                ) : null}
                <span className="minecraft-slot-icon">{link.icon}</span>
                <span className="minecraft-slot-label">{link.label}</span>
              </Link>
            )
          })}
        </nav>

        <nav className="minecraft-hotbar flex max-w-full items-center overflow-x-auto sm:hidden" aria-label="Мобильная навигация">
          {navLinks.map((link) => {
            const isActive = isActivePath(pathname, link.path)

            return (
              <Link key={link.path} href={link.path} aria-label={link.label} className={`minecraft-mobile-slot ${isActive ? 'active' : ''}`}>
                <span>{link.icon}</span>
              </Link>
            )
          })}
        </nav>
      </motion.div>
    </header>
  )
}
