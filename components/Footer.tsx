import { Download, ExternalLink, Shield } from "lucide-react";
import Link from "next/link";
import PixelButton from "./PixelButton";
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
    <footer className="mt-28 bg-[#0f1014]">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-start gap-12 border-b border-white/15 pb-12">
          <MotionReveal className="flex min-w-[240px] flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center border border-gold/50 bg-gold/10 text-gold shadow-pixel">
                <Shield className="h-7 w-7" />
              </span>
              <span className="font-pixel text-sm text-white">OrstedProject</span>
            </Link>
            <div className="font-rune text-2xl leading-7 text-white/45">
              <p className="text-white/70">© OrstedProject 2026</p>
              <p>Ролевая реконструкция мира перерождения.</p>
            </div>
          </MotionReveal>

          <MotionReveal className="ml-auto grid gap-5 sm:min-w-[420px]">
            <p className="font-pixel text-sm text-white">Навигация</p>
            <nav className="flex flex-wrap gap-x-8 gap-y-4">
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-2 font-rune text-2xl text-white/50 transition-colors hover:text-white"
                >
                  {item.label} <ExternalLink className="h-4 w-4 text-gold" />
                </Link>
              ))}
            </nav>
          </MotionReveal>
        </div>

        <div className="grid gap-8 pt-12 lg:grid-cols-[minmax(0,690px)_1fr]">
          <MotionReveal className="relative hidden h-[331px] overflow-hidden rounded-[20px] bg-panelLift bg-[url('/images/footer-launcher.webp')] bg-cover bg-left-top p-8 md:block">
            <div className="absolute inset-0 bg-gradient-to-r from-panelLift via-panelLift/78 to-transparent" />
            <div className="relative z-10 flex h-full max-w-xs flex-col justify-between">
              <h2 className="font-pixel text-xl leading-[1.6] text-white">
                Наш
                <br />
                лаунчер
                <br />
                для игры
              </h2>
              <PixelButton href="/play" icon={<Download className="h-4 w-4" />}>
                Загрузить
              </PixelButton>
            </div>
          </MotionReveal>

          <MotionReveal className="flex flex-col justify-end gap-5">
            <p className="font-rune text-2xl leading-8 text-white/50">
              Временные изображения находятся в <span className="text-white">public/images</span>. Замените их на
              финальные арты OrstedProject, сохранив имена файлов.
            </p>
            <p className="font-rune text-xl text-white/35">Vercel-ready build: Next.js 14 App Router.</p>
          </MotionReveal>
        </div>
      </div>
    </footer>
  );
}
