import { ArrowRight, Crown, Server, ShieldCheck, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import ClassCard from "@/components/ClassCard";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import MotionReveal from "@/components/MotionReveal";
import NewsCard from "@/components/NewsCard";
import PixelButton from "@/components/PixelButton";
import Section from "@/components/Section";
import ServerInfoBar from "@/components/ServerInfoBar";
import ServerOnlineText from "@/components/ServerOnlineText";
import TopOnlinePlayers from "@/components/TopOnlinePlayers";
import { classes } from "@/data/classes";
import { faq } from "@/data/faq";
import { internetPhoto } from "@/data/media";
import { news } from "@/data/news";

const worlds = [
  {
    title: "Раноа",
    description: "Магическая академия, сюжетные квесты и первые ветки перерождения.",
    image: internetPhoto,
    status: "128 играют"
  },
  {
    title: "Фиттоа",
    description: "Новая ролевая зона с гильдиями, охотой и дорогой начинающего авантюриста.",
    image: internetPhoto,
    status: "скоро"
  }
];

const gallery = [
  { src: internetPhoto, className: "md:col-span-3 min-h-[360px] sm:min-h-[520px]" },
  { src: internetPhoto, className: "md:col-span-2 min-h-[320px] sm:min-h-[430px]" },
  { src: internetPhoto, className: "md:col-span-1 min-h-[320px] sm:min-h-[430px]" },
  { src: internetPhoto, className: "md:col-span-3 min-h-[360px] sm:min-h-[480px]" }
];

const supporters = [
  { name: "Dragon_God", amount: "120 тыс. кристаллов", rank: "I" },
  { name: "Ranoa_Master", amount: "84 тыс. кристаллов", rank: "II" },
  { name: "Fittoa_Wanderer", amount: "72 тыс. кристаллов", rank: "III" },
  { name: "Millis_Saint", amount: "45 тыс. кристаллов", rank: "IV" },
  { name: "North_King", amount: "39 тыс. кристаллов", rank: "V" }
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServerInfoBar />

      <section className="mx-auto mt-24 grid w-full max-w-[1600px] gap-6 px-3 md:grid-cols-2">
        {worlds.map((world, index) => (
          <MotionReveal
            key={world.title}
            delay={index * 0.1}
            className="group relative flex min-h-[520px] overflow-hidden rounded-[20px] border border-white/10 bg-panel"
            whileHover={{ y: -3, boxShadow: "0 0 0 1px rgba(94,234,212,0.5), 0 0 34px rgba(94,234,212,0.18)" }}
            transition={{ duration: 0.25 }}
          >
            <Image src={world.image} alt={world.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="relative z-10 mt-auto flex w-full flex-col items-center gap-5 p-6 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-rune text-2xl text-white backdrop-blur">
                <Users className="h-5 w-5 text-white" />
                {index === 0 ? <ServerOnlineText fallback={world.status} /> : world.status}
              </span>
              <h2 className="font-rune text-7xl font-bold leading-none text-white sm:text-8xl">{world.title}</h2>
              <p className="max-w-2xl font-rune text-3xl leading-8 text-white/75">{world.description}</p>
              <PixelButton href="/lore" variant="outline" icon={<ArrowRight className="h-4 w-4" />}>
                Подробнее
              </PixelButton>
            </div>
          </MotionReveal>
        ))}
      </section>

      <section className="mx-auto mt-24 grid w-full max-w-[1200px] gap-6 px-4 sm:px-6 md:grid-cols-3">
        {gallery.map((item, index) => (
          <MotionReveal
            key={item.src}
            delay={index * 0.1}
            className={`group relative overflow-hidden rounded-[20px] border border-white/10 bg-panel ${item.className}`}
            whileHover={{ y: -3, boxShadow: "0 0 0 1px rgba(94,234,212,0.5), 0 0 28px rgba(94,234,212,0.16)" }}
            transition={{ duration: 0.25 }}
          >
            <Image src={item.src} alt="Скриншот OrstedProject" fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 1200px" />
            <div className="absolute inset-0 bg-black/20" />
          </MotionReveal>
        ))}
        <div className="md:col-span-3 flex justify-center">
          <PixelButton href="/play" variant="outline" icon={<ArrowRight className="h-4 w-4" />}>
            Перейти к серверу
          </PixelButton>
        </div>
      </section>

      <Section
        id="classes"
        className="mt-28"
        eyebrow="пути персонажа"
        title="Выбери класс и стиль перерождения"
        action={
          <PixelButton href="/classes" variant="outline" icon={<ArrowRight className="h-4 w-4" />}>
            Все классы
          </PixelButton>
        }
      >
        <div className="grid gap-6 md:grid-cols-3">
          {classes.slice(0, 3).map((item) => (
            <ClassCard key={item.slug} item={item} />
          ))}
        </div>
      </Section>

      <Section
        id="news"
        className="mt-28"
        title="Новости проекта"
        action={
          <div className="flex gap-3">
            <PixelButton href="/news">Раноа</PixelButton>
            <PixelButton href="/news" variant="outline">
              Фиттоа
            </PixelButton>
          </div>
        }
      >
        <div className="grid gap-6 md:grid-cols-3">
          {news.slice(0, 3).map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>
      </Section>

      <Section className="mt-28" title="Топ донатеров" eyebrow="поддержка сервера">
        <div className="grid gap-6 md:grid-cols-3">
          {supporters.slice(0, 3).map((item, index) => (
            <MotionReveal
              key={item.name}
              delay={index * 0.1}
              className="rounded-[20px] border border-white/10 bg-panelLift p-5"
              whileHover={{ y: -3, boxShadow: "0 0 0 1px rgba(94,234,212,0.5), 0 0 28px rgba(94,234,212,0.18)" }}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-[12px] border border-gold/45 bg-gold/10 font-pixel text-sm text-gold">
                  {item.rank}
                </span>
                <Crown className="h-7 w-7 text-gold" />
              </div>
              <h3 className="font-pixel text-sm leading-7 text-white">{item.name}</h3>
              <p className="mt-3 font-rune text-3xl text-gold">{item.amount}</p>
            </MotionReveal>
          ))}
          {supporters.slice(3).map((item) => (
            <MotionReveal key={item.name} className="flex items-center justify-between rounded-[16px] border border-white/10 bg-panel p-5 md:col-span-3">
              <span className="font-pixel text-xs text-white">{item.name}</span>
              <span className="font-rune text-2xl text-gold">{item.amount}</span>
            </MotionReveal>
          ))}
        </div>
      </Section>

      <Section className="mt-28" title="Топ по онлайну" eyebrow="активные игроки">
        <TopOnlinePlayers />
      </Section>

      <Section className="mt-28" title="Частые вопросы">
        <FAQ items={faq} />
      </Section>

      <section className="mx-auto mt-28 w-full max-w-[1200px] px-4 sm:px-6">
        <MotionReveal className="relative overflow-hidden rounded-[20px] border border-gold/30 bg-panel p-8 sm:p-10">
          <div className="absolute inset-0 bg-pixels bg-[length:20px_20px] opacity-25" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-3 font-rune text-3xl text-gold">MT RPG Pack</p>
              <h2 className="font-pixel text-xl leading-[1.6] text-white sm:text-2xl">
                Готов начать новую жизнь?
              </h2>
              <p className="mt-4 max-w-2xl font-rune text-3xl leading-9 text-white/60">
                Установи модпак, выбери происхождение и войди в сюжетный сезон OrstedProject.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <PixelButton href="/play" icon={<Sparkles className="h-4 w-4" />}>
                Играть
              </PixelButton>
              <PixelButton href="/rules" variant="outline" icon={<ShieldCheck className="h-4 w-4" />}>
                Правила
              </PixelButton>
            </div>
          </div>
        </MotionReveal>
      </section>
    </>
  );
}
