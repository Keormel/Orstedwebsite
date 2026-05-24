import { BookOpen, Flame, Scroll, Stars } from "lucide-react";
import MotionReveal from "@/components/MotionReveal";
import PixelButton from "@/components/PixelButton";
import Section from "@/components/Section";
import { internetPhoto } from "@/data/media";

const chapters = [
  {
    title: "Перерождение",
    text: "Каждый игрок начинает не с пустой строки, а с воспоминаний, таланта и слабости. Эти выборы влияют на квесты и отношения с NPC.",
    icon: Stars
  },
  {
    title: "Шесть стихий",
    text: "Мир держится на балансе маны. Маги, мечники и ремесленники используют разные способы управлять этим потоком.",
    icon: Flame
  },
  {
    title: "След Орстеда",
    text: "Главная сюжетная линия строится вокруг тайного вмешательства Драконьего Бога и попыток изменить цикл судьбы.",
    icon: Scroll
  }
];

export default function LorePage() {
  return (
    <>
      <section className="mx-auto mt-16 w-full max-w-[1200px] px-4 sm:px-6">
        <MotionReveal className="relative overflow-hidden rounded-[32px] border border-white/10 bg-panel p-8 sm:p-12">
          <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${internetPhoto})` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-panel via-panel/90 to-transparent" />
          <div className="relative z-10 max-w-3xl">
            <p className="font-rune text-3xl uppercase text-gold">история мира</p>
            <h1 className="mt-4 font-pixel text-2xl leading-[1.65] text-white sm:text-4xl">Лор OrstedProject</h1>
            <p className="mt-6 font-rune text-3xl leading-9 text-white/60">
              Контент адаптирован под Mushoku Tensei: Reincarnation, но подаётся как игровой сезон с собственными персонажами, гильдиями и конфликтами.
            </p>
          </div>
        </MotionReveal>
      </section>

      <Section className="mt-24" title="Главные сюжетные оси">
        <div className="grid gap-6 md:grid-cols-3">
          {chapters.map((chapter, index) => (
            <MotionReveal
              key={chapter.title}
              delay={index * 0.1}
              className="rounded-[20px] border border-white/10 bg-panel p-6"
              whileHover={{ y: -3, boxShadow: "0 0 0 1px rgba(94,234,212,0.45), 0 0 24px rgba(94,234,212,0.14)" }}
            >
              <chapter.icon className="mb-8 h-9 w-9 text-gold" />
              <h2 className="font-pixel text-sm leading-7 text-white">{chapter.title}</h2>
              <p className="mt-4 font-rune text-2xl leading-8 text-white/60">{chapter.text}</p>
            </MotionReveal>
          ))}
        </div>
      </Section>

      <Section className="mt-24" title="Ролевая структура" eyebrow="серверный канон">
        <MotionReveal className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[20px] border border-white/10 bg-panel p-6 sm:p-8">
            <BookOpen className="mb-8 h-10 w-10 text-gold" />
            <h2 className="font-pixel text-lg leading-8 text-white">Игрок пишет легенду через действия</h2>
            <p className="mt-5 font-rune text-3xl leading-9 text-white/60">
              Классы, квесты и события дают рамку, но репутация персонажа создаётся поступками: спасённым караваном,
              победой на дуэли, контрактом гильдии или предательством в сюжетной ветке.
            </p>
          </div>
          <div className="rounded-[20px] border border-gold/25 bg-gold/10 p-6 sm:p-8">
            <h3 className="font-pixel text-sm leading-7 text-white">Сезон 1</h3>
            <p className="mt-5 font-rune text-3xl leading-9 text-white/65">
              Академия Раноа, дорога Фиттоа и первые следы проклятия Орстеда.
            </p>
            <div className="mt-8">
              <PixelButton href="/events">События сезона</PixelButton>
            </div>
          </div>
        </MotionReveal>
      </Section>
    </>
  );
}
