import { Crown, Gem, HeartHandshake, Shield } from "lucide-react";
import MotionReveal from "@/components/MotionReveal";
import PixelButton from "@/components/PixelButton";
import Section from "@/components/Section";
import { internetPhoto } from "@/data/media";

const packs = [
  {
    title: "Паломник",
    price: "299 ₽",
    items: ["Косметический титул", "5 декоративных монет", "Цвет ника в чате"]
  },
  {
    title: "Авантюрист",
    price: "799 ₽",
    items: ["Набор эмоций", "Слот дома", "Питомец-компаньон"]
  },
  {
    title: "Покровитель",
    price: "1499 ₽",
    items: ["Уникальный плащ", "Приоритет входа", "Косметический след маны"]
  }
];

export default function DonatePage() {
  return (
    <>
      <section className="mx-auto mt-16 w-full max-w-[1200px] px-4 sm:px-6">
        <MotionReveal className="relative overflow-hidden rounded-[32px] border border-white/10 bg-panel p-8 sm:p-12">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${internetPhoto})` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-panel via-panel/90 to-panel/35" />
          <div className="relative z-10 max-w-3xl">
            <p className="font-rune text-3xl uppercase text-gold">донат</p>
            <h1 className="mt-4 font-pixel text-2xl leading-[1.65] text-white sm:text-4xl">Поддержать OrstedProject</h1>
            <p className="mt-6 font-rune text-3xl leading-9 text-white/60">
              Донат-страница повторяет структуру исходного сайта, но оставляет только косметические и серверные бонусы без pay-to-win.
            </p>
          </div>
        </MotionReveal>
      </section>

      <Section className="mt-24" title="Наборы поддержки">
        <div className="grid gap-6 md:grid-cols-3">
          {packs.map((pack, index) => (
            <MotionReveal
              key={pack.title}
              delay={index * 0.1}
              className="flex min-h-[360px] flex-col rounded-[20px] border border-white/10 bg-panel p-6"
              whileHover={{ y: -3, boxShadow: "0 0 0 1px rgba(94,234,212,0.5), 0 0 28px rgba(94,234,212,0.18)" }}
            >
              <Gem className="mb-8 h-9 w-9 text-gold" />
              <h2 className="font-pixel text-sm text-white">{pack.title}</h2>
              <p className="mt-4 font-rune text-5xl text-gold">{pack.price}</p>
              <ul className="mt-6 grid gap-3 font-rune text-2xl leading-7 text-white/60">
                {pack.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <PixelButton href="#" variant={index === 1 ? "primary" : "outline"}>
                  Выбрать
                </PixelButton>
              </div>
            </MotionReveal>
          ))}
        </div>
      </Section>

      <Section className="mt-24" title="Почему это важно" eyebrow="развитие проекта">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            ["Сервер", "Оплата инфраструктуры, бэкапов и тестовых стендов.", Shield],
            ["Контент", "Новые модели, квесты, сборки и визуальные ассеты.", Crown],
            ["Команда", "Поддержка разработчиков, билдеров и ведущих событий.", HeartHandshake]
          ].map(([title, text, Icon], index) => (
            <MotionReveal key={title as string} delay={index * 0.1} className="rounded-[20px] border border-white/10 bg-panel p-6">
              <Icon className="mb-8 h-9 w-9 text-gold" />
              <h2 className="font-pixel text-sm text-white">{title as string}</h2>
              <p className="mt-4 font-rune text-2xl leading-8 text-white/60">{text as string}</p>
            </MotionReveal>
          ))}
        </div>
      </Section>
    </>
  );
}
