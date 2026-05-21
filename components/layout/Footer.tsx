import Link from 'next/link'
import { FaDiscord, FaVk } from 'react-icons/fa'
import { PixelDivider } from '@/components/ui/PixelDivider'

export function Footer() {
  return (
    <footer className="mt-16 border-t-2 border-mc-border bg-stone">
      <PixelDivider />
      <div className="section-shell grid gap-6 pb-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="pixel-title text-sm text-mc-blue">OrstedProject</div>
          <p className="mt-3 max-w-md font-body leading-7 text-mc-muted">
            Minecraft RPG-сервер по духу Mushoku Tensei: магические пути, гильдии, осады и честная сезонная прогрессия.
          </p>
        </div>
        <div>
          <div className="font-retro text-2xl text-mc-text">Навигация</div>
          <div className="mt-2 grid gap-1 font-body text-mc-muted">
            <Link href="/start">Начать играть</Link>
            <Link href="/classes">Классы</Link>
            <Link href="/events">Ивенты</Link>
          </div>
        </div>
        <div>
          <div className="font-retro text-2xl text-mc-text">Связь</div>
          <div className="mt-3 flex gap-3">
            <Link href="https://discord.gg/orsted" className="border-2 border-mc-border bg-mc-card p-2 shadow-pixel" aria-label="Discord">
              <FaDiscord size={22} />
            </Link>
            <Link href="https://vk.com/orstedproject" className="border-2 border-mc-border bg-mc-card p-2 shadow-pixel" aria-label="VK">
              <FaVk size={22} />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t-2 border-mc-border py-4 text-center font-retro text-xl text-mc-muted">
        © 2026 OrstedProject. Не связан с Mojang, Microsoft или правообладателями Mushoku Tensei.
      </div>
    </footer>
  )
}
