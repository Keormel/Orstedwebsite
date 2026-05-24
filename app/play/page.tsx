import { CheckCircle2, Download, MonitorDown, PackageOpen, Play, Server } from "lucide-react";
import MotionReveal from "@/components/MotionReveal";
import PixelButton from "@/components/PixelButton";
import Section from "@/components/Section";
import ServerInfoBar from "@/components/ServerInfoBar";
import FAQ from "@/components/FAQ";
import { faq } from "@/data/faq";
import { internetPhoto } from "@/data/media";

const steps = [
  {
    title: "Скачай лаунчер",
    text: "Используй официальный установщик OrstedProject или добавь сборку в свой менеджер модов.",
    icon: MonitorDown
  },
  {
    title: "Установи MT RPG Pack",
    text: "Модпак включает клиентские моды, интерфейс, ресурспак, квесты и конфигурации баланса.",
    icon: PackageOpen
  },
  {
    title: "Выбери происхождение",
    text: "При первом входе определи стартовую историю, талант и слабость персонажа.",
    icon: CheckCircle2
  }
];

const downloads = [
  { os: "Windows", note: "Установщик лаунчера", size: "placeholder .msi" },
  { os: "MacOS", note: "Универсальная сборка", size: "placeholder .tar.gz" },
  { os: "Linux", note: "AppImage", size: "placeholder .AppImage" }
];

export default function PlayPage() {
  return (
    <>
      <section className="mx-auto mt-16 w-full max-w-[1200px] px-4 sm:px-6">
        <MotionReveal className="relative overflow-hidden rounded-[32px] border border-white/10 bg-panel p-8 sm:p-12">
          <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${internetPhoto})` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-panel via-panel/85 to-panel/45" />
          <div className="relative z-10 max-w-3xl">
            <p className="font-rune text-3xl uppercase text-gold">старт игры</p>
            <h1 className="mt-4 font-pixel text-2xl leading-[1.65] text-white sm:text-4xl">
              Как начать игру?
            </h1>
            <p className="mt-6 font-rune text-3xl leading-9 text-white/60">
              OrstedProject запускается на Minecraft 1.20.1 через MT RPG Pack. Ниже оставлены готовые блоки под реальные ссылки лаунчера.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <PixelButton href="#downloads" icon={<Download className="h-4 w-4" />}>
                Скачать
              </PixelButton>
              <PixelButton href="/rules" variant="outline" icon={<Play className="h-4 w-4" />}>
                Прочитать правила
              </PixelButton>
            </div>
          </div>
        </MotionReveal>
      </section>

      <ServerInfoBar />

      <Section className="mt-24" title="Мини гайд" eyebrow="три шага">
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <MotionReveal
              key={step.title}
              delay={index * 0.1}
              className="rounded-[20px] border border-white/10 bg-panel p-6"
              whileHover={{ y: -3, boxShadow: "0 0 0 1px rgba(94,234,212,0.45), 0 0 24px rgba(94,234,212,0.14)" }}
            >
              <step.icon className="mb-8 h-9 w-9 text-gold" />
              <h2 className="font-pixel text-sm leading-7 text-white">{step.title}</h2>
              <p className="mt-4 font-rune text-2xl leading-8 text-white/60">{step.text}</p>
            </MotionReveal>
          ))}
        </div>
      </Section>

      <Section id="downloads" className="mt-24" title="Загрузка лаунчера" eyebrow="placeholder links">
        <div className="grid gap-6 lg:grid-cols-3">
          {downloads.map((item, index) => (
            <MotionReveal
              key={item.os}
              delay={index * 0.1}
              className="flex min-h-[220px] flex-col justify-between rounded-[20px] border border-white/10 bg-panelLift p-6"
              whileHover={{ y: -3, boxShadow: "0 0 0 1px rgba(94,234,212,0.5), 0 0 28px rgba(94,234,212,0.18)" }}
            >
              <div>
                <Server className="mb-7 h-8 w-8 text-gold" />
                <h2 className="font-pixel text-sm text-white">{item.os}</h2>
                <p className="mt-4 font-rune text-2xl text-white/55">{item.note}</p>
                <p className="font-rune text-xl text-white/35">{item.size}</p>
              </div>
              <PixelButton href="#" variant="outline" icon={<Download className="h-4 w-4" />}>
                Скачать
              </PixelButton>
            </MotionReveal>
          ))}
        </div>
        <p className="font-rune text-2xl leading-8 text-white/45">
          Реальные файлы лаунчера положите в `public/downloads` или замените `href` в блоке загрузок на CDN/Vercel Blob.
        </p>
      </Section>

      <Section className="mt-24" title="FAQ запуска">
        <FAQ items={faq.slice(0, 3)} />
      </Section>
    </>
  );
}
