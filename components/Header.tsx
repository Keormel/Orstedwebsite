"use client";

import {
  BookOpen,
  CalendarDays,
  Coins,
  Download,
  Map,
  Menu,
  MessageSquare,
  Newspaper,
  Play,
  ScrollText,
  Shield,
  Sparkles,
  Sword,
  User,
  X,
  type LucideIcon
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import PixelButton from "./PixelButton";

const primaryLinks = [
  { href: "/play", label: "Как начать игру?", icon: Play },
  { href: "/rules", label: "Правила", icon: ScrollText },
  { href: "/classes", label: "Классы", icon: Sword },
  { href: "/lore", label: "Лор", icon: BookOpen },
  { href: "/events", label: "Ивенты", icon: CalendarDays },
  { href: "/news", label: "Новости", icon: Newspaper }
];

function NavLink({
  href,
  label,
  icon: Icon,
  muted = false,
  onClick
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  muted?: boolean;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative inline-flex items-center gap-2 whitespace-nowrap font-pixel text-[10px] leading-5 transition-colors sm:text-xs ${
        active ? "text-white" : muted ? "text-white/50 hover:text-white" : "text-white/90 hover:text-white"
      }`}
    >
      <Icon className={active ? "h-4 w-4 text-gold" : "h-4 w-4 text-gold"} />
      {label}
      <motion.span
        className="absolute -bottom-2 left-0 h-0.5 w-full origin-left bg-gold"
        initial={false}
        animate={{ scaleX: active ? 1 : 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 w-full bg-obsidian">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="flex items-center gap-6 py-7 lg:gap-12">
          <Link href="/" className="group flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center border border-gold/50 bg-gold/10 text-gold shadow-pixel">
              <Shield className="h-6 w-6" />
            </span>
            <span className="flex flex-col">
              <span className="font-pixel text-[11px] leading-5 text-gold sm:text-sm">OrstedProject</span>
              <span className="font-rune text-lg leading-none text-white/55">MT reincarnation</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-2 font-pixel text-xs text-white transition-colors hover:text-gold"
            >
              <MessageSquare className="h-4 w-4 text-gold" />
              Форум
            </a>
            <Link
              href="/donate"
              className="group relative inline-flex items-center gap-2 font-pixel text-xs text-white transition-colors hover:text-gold"
            >
              <Coins className="h-4 w-4 text-gold" />
              Донат
            </Link>
          </nav>

          <div className="ml-auto hidden items-center gap-4 lg:flex">
            <PixelButton href="/play" variant="outline" icon={<Download className="h-4 w-4" />}>
              Скачать лаунчер
            </PixelButton>
            <PixelButton href="/play" icon={<User className="h-4 w-4" />}>
              Авторизация
            </PixelButton>
          </div>

          <motion.button
            type="button"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="absolute right-4 top-7 grid h-11 w-11 place-items-center rounded-[14px] border border-white/20 bg-panel text-white shadow-insetPixel lg:hidden"
            whileTap={{ scale: 0.94 }}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </div>

        <div className="hidden border-t border-white/15 py-6 lg:block">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {primaryLinks.map((link, index) => (
              <NavLink key={link.href} {...link} muted={index > 3} />
            ))}
            <span className="h-6 w-px bg-white/15" />
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-pixel text-xs text-white/50 transition-colors hover:text-white"
            >
              <Map className="h-4 w-4 text-gold" />
              Карта
            </a>
            <span className="ml-auto inline-flex items-center gap-2 font-rune text-2xl text-white/50">
              <Sparkles className="h-4 w-4 text-gold" />
              версия 1.20.1
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute right-0 top-full w-full max-w-sm border-l border-t border-white/10 bg-obsidian p-6 shadow-2xl lg:hidden"
          >
            <div className="mb-6 grid gap-3">
              <PixelButton href="/play" variant="outline" icon={<Download className="h-4 w-4" />}>
                Скачать лаунчер
              </PixelButton>
              <PixelButton href="/play" icon={<User className="h-4 w-4" />}>
                Авторизация
              </PixelButton>
            </div>
            <nav className="flex flex-col items-end gap-7">
              {primaryLinks.map((link) => (
                <NavLink key={link.href} {...link} onClick={() => setOpen(false)} />
              ))}
              <NavLink href="/donate" label="Донат" icon={Coins} onClick={() => setOpen(false)} />
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
