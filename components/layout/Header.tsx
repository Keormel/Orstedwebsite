'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconType } from 'react-icons'
import {
  FaBookOpen,
  FaCalendarAlt,
  FaDiscord,
  FaGem,
  FaHome,
  FaNewspaper,
  FaPlay,
  FaScroll,
  FaShieldAlt
} from 'react-icons/fa'
import { ServerStatus } from '@/components/ui/ServerStatus'

const NAV_ITEMS: { href: string; label: string; Icon: IconType }[] = [
  { href: '/', label: 'Главная', Icon: FaHome },
  { href: '/start', label: 'Играть', Icon: FaPlay },
  { href: '/classes', label: 'Классы', Icon: FaShieldAlt },
  { href: '/lore', label: 'Лор', Icon: FaBookOpen },
  { href: '/rules', label: 'Правила', Icon: FaScroll },
  { href: '/news', label: 'Новости', Icon: FaNewspaper },
  { href: '/events', label: 'Ивенты', Icon: FaCalendarAlt },
  { href: '/donate', label: 'Донат', Icon: FaGem }
]

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    handler()
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 shadow-[0_4px_0_rgba(0,0,0,0.08)] backdrop-blur-[10px]"
      animate={{ backgroundColor: scrolled ? 'rgba(237,232,220,0.97)' : 'rgba(245,240,232,0.92)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex h-[68px] items-center justify-between gap-3 px-3 sm:px-4 lg:h-[84px] lg:px-8">
        <motion.div animate={{ scale: scrolled ? 0.92 : 1 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
          <Link href="/" className="group flex items-center gap-3 transition duration-150 hover:drop-shadow-[0_0_6px_#7EC8E3]">
            <span className="inventory-slot grid h-12 w-12 place-items-center overflow-hidden p-1.5 lg:h-14 lg:w-14">
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
              <span className="font-minecraft text-[0.78rem] leading-none text-mc-blue [text-shadow:2px_2px_0_rgba(0,0,0,0.3)] sm:text-[0.94rem] lg:text-[1.08rem]">
                OrstedProject
              </span>
              <span className="h-[2px] w-full bg-mc-border" />
              <span className="font-minecraft text-[0.4rem] leading-none tracking-[0.15em] text-mc-muted sm:text-[0.48rem]">
                MUSHOKU TENSEI
              </span>
            </span>
          </Link>
        </motion.div>

        <nav className="hidden items-center gap-2 xl:flex" aria-label="Основная навигация">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className={`nav-slot ${isActive(pathname, item.href) ? 'active' : ''}`}>
              <span className="slot-icon" aria-hidden="true">
                <item.Icon />
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ServerStatus variant="header" />
          <Link href="https://discord.gg/orsted" className="mc-discord-button" aria-label="Discord OrstedProject">
            <FaDiscord className="text-sm" aria-hidden="true" />
            Discord
          </Link>
        </div>

        <button
          className="inventory-slot grid h-12 w-12 place-items-center lg:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={mobileOpen}
        >
          <span className="relative h-5 w-6">
            <span className={`absolute left-0 h-[3px] w-6 bg-mc-text transition ${mobileOpen ? 'top-2 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 top-2 h-[3px] w-6 bg-mc-text transition ${mobileOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute left-0 h-[3px] w-6 bg-mc-text transition ${mobileOpen ? 'top-2 -rotate-45' : 'top-4'}`} />
          </span>
        </button>
      </div>

      <motion.div
        className="h-[3px]"
        animate={{ filter: scrolled ? 'brightness(1.18)' : 'brightness(1)' }}
        style={{ background: 'linear-gradient(90deg, #C9A84C 0%, #7EC8E3 50%, #C9A84C 100%)' }}
      />

      <AnimatePresence>
        {mobileOpen ? (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-x-2 border-b-2 border-mc-border bg-parchment shadow-pixel-lg lg:hidden"
            aria-label="Мобильная навигация"
          >
            <div className="grid gap-2 px-4 py-4">
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} className={`mobile-nav-slot ${isActive(pathname, item.href) ? 'active' : ''}`}>
                  <span className="mobile-slot-icon" aria-hidden="true">
                    <item.Icon />
                  </span>
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="mt-2 grid gap-3 border-t-2 border-mc-border pt-3">
                <ServerStatus variant="header" />
                <Link href="https://discord.gg/orsted" className="mc-discord-button justify-center">
                  <FaDiscord className="text-sm" aria-hidden="true" />
                  Discord
                </Link>
              </div>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
