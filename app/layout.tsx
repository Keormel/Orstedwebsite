import type { Metadata } from 'next'
import { Press_Start_2P, Source_Sans_3, VT323 } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin', 'cyrillic'],
  variable: '--font-minecraft'
})

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-retro'
})

const sourceSans = Source_Sans_3({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-body'
})

export const metadata: Metadata = {
  title: 'OrstedProject - Minecraft RPG сервер',
  description: 'Светлый фэнтези-сайт Minecraft-сервера OrstedProject по мотивам Mushoku Tensei: Reincarnation.',
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${pressStart.variable} ${vt323.variable} ${sourceSans.variable}`}>
      <body>
        <Header />
        <main className="pt-[68px] lg:pt-[84px]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
