import { ExternalLink, Shield } from "lucide-react";
import Link from "next/link";
import MotionReveal from "./MotionReveal";

const footerLinks = [
  { href: "/play", label: "Начать игру" },
  { href: "/rules", label: "Правила" },
  { href: "/classes", label: "Классы" },
  { href: "/lore", label: "Лор" },
  { href: "/news", label: "Новости" },
  { href: "/donate", label: "Донат" }
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#081816]">
      <div className="mx-auto grid max-w-[1200px] gap-7 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(220px,0.8fr)_1.4fr_auto] lg:items-center">
        <MotionReveal className="flex min-w-[220px] flex-col gap-3">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center border border-gold/50 bg-gold/10 text-gold shadow-pixel">
                <Shield className="h-6 w-6" />
              </span>
              <span className="font-pixel text-sm text-white">OrstedProject</span>
            </Link>
            <div className="font-rune text-xl leading-6 text-white/45">
              <p className="text-white/70">© OrstedProject 2026</p>
              <p>Ролевая реконструкция мира перерождения.</p>
            </div>
        </MotionReveal>

        <MotionReveal className="grid gap-3">
            <p className="font-pixel text-xs text-white">Навигация</p>
            <nav className="flex flex-wrap gap-x-5 gap-y-3">
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-1.5 font-rune text-xl text-white/50 transition-colors hover:text-white"
                >
                  {item.label} <ExternalLink className="h-3.5 w-3.5 text-gold" />
                </Link>
              ))}
            </nav>
        </MotionReveal>

        <MotionReveal className="flex flex-col gap-1 font-rune text-xl leading-6 text-white/45 lg:items-end lg:text-right">
          <p>by keormel</p>
        </MotionReveal>
      </div>
    </footer>
  );
}
