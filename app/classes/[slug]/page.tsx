import { notFound } from "next/navigation";
import { ArrowLeft, Sparkles, Sword } from "lucide-react";
import Image from "next/image";
import MotionReveal from "@/components/MotionReveal";
import PixelButton from "@/components/PixelButton";
import Section from "@/components/Section";
import { classes, getClassBySlug } from "@/data/classes";

export function generateStaticParams() {
  return classes.map((item) => ({ slug: item.slug }));
}

export default function ClassDetailPage({ params }: { params: { slug: string } }) {
  const item = getClassBySlug(params.slug);

  if (!item) {
    notFound();
  }

  const stats = [
    ["Сила", item.stats.power],
    ["Магия", item.stats.magic],
    ["Мобильность", item.stats.mobility],
    ["Поддержка", item.stats.support]
  ];

  return (
    <>
      <section className="mx-auto mt-16 w-full max-w-[1200px] px-4 sm:px-6">
        <MotionReveal className="relative overflow-hidden rounded-[32px] border border-white/10 bg-panel">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[360px]">
              <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-panel to-transparent lg:bg-gradient-to-r" />
            </div>
            <div className="p-8 sm:p-12">
              <p className="font-rune text-3xl uppercase text-gold">{item.archetype}</p>
              <h1 className="mt-4 font-pixel text-2xl leading-[1.65] text-white sm:text-4xl">{item.title}</h1>
              <p className="mt-6 font-rune text-3xl leading-9 text-white/60">{item.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <PixelButton href="/classes" variant="outline" icon={<ArrowLeft className="h-4 w-4" />}>
                  Все классы
                </PixelButton>
                <PixelButton href="/play" icon={<Sparkles className="h-4 w-4" />}>
                  Выбрать путь
                </PixelButton>
              </div>
            </div>
          </div>
        </MotionReveal>
      </section>

      <Section className="mt-24" title="Характеристики">
        <div className="grid gap-4 md:grid-cols-2">
          {stats.map(([label, value], index) => (
            <MotionReveal key={label} delay={index * 0.1} className="rounded-[16px] border border-white/10 bg-panel p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-pixel text-xs text-white">{label}</span>
                <span className="font-rune text-2xl text-gold">{value}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gold" style={{ width: `${value}%` }} />
              </div>
            </MotionReveal>
          ))}
        </div>
      </Section>

      <Section className="mt-24" title="Умения и прогрессия">
        <div className="grid gap-6 lg:grid-cols-3">
          <MotionReveal className="rounded-[20px] border border-white/10 bg-panel p-6">
            <Sword className="mb-6 h-9 w-9 text-gold" />
            <h2 className="font-pixel text-sm text-white">Умения</h2>
            <ul className="mt-5 grid gap-3 font-rune text-2xl leading-7 text-white/60">
              {item.abilities.map((ability) => (
                <li key={ability}>{ability}</li>
              ))}
            </ul>
          </MotionReveal>
          <MotionReveal delay={0.1} className="rounded-[20px] border border-white/10 bg-panel p-6">
            <h2 className="font-pixel text-sm text-white">Путь развития</h2>
            <ul className="mt-5 grid gap-3 font-rune text-2xl leading-7 text-white/60">
              {item.path.map((path) => (
                <li key={path}>{path}</li>
              ))}
            </ul>
          </MotionReveal>
          <MotionReveal delay={0.2} className="rounded-[20px] border border-white/10 bg-panel p-6">
            <h2 className="font-pixel text-sm text-white">Снаряжение</h2>
            <ul className="mt-5 grid gap-3 font-rune text-2xl leading-7 text-white/60">
              {item.gear.map((gear) => (
                <li key={gear}>{gear}</li>
              ))}
            </ul>
          </MotionReveal>
        </div>
      </Section>
    </>
  );
}
