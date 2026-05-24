import { AlertTriangle, ShieldCheck } from "lucide-react";
import MotionReveal from "@/components/MotionReveal";
import Section from "@/components/Section";

const groups = [
  {
    title: "Ролевая игра",
    rules: [
      "Не ломайте атмосферу чужих сцен без IC-причины.",
      "Метагейм, пауэргейм и выход из роли в активной сцене запрещены.",
      "Серьёзные конфликты фиксируются через администрацию или систему жалоб."
    ]
  },
  {
    title: "Боевые ситуации",
    rules: [
      "PvP начинается после понятного IC-конфликта или события.",
      "Запрещены эксплойты модов, дюпы и намеренное использование багов.",
      "Результаты рейдов и дуэлей признаются обеими сторонами или разбираются модератором."
    ]
  },
  {
    title: "Экономика",
    rules: [
      "Торговые контракты считаются игровым обязательством.",
      "Запрещена продажа игровых преимуществ за реальные деньги между игроками.",
      "Крафт редких предметов логируется через гильдейскую систему."
    ]
  }
];

export default function RulesPage() {
  return (
    <>
      <section className="mx-auto mt-16 w-full max-w-[1200px] px-4 sm:px-6">
        <MotionReveal className="rounded-[32px] border border-white/10 bg-panel p-8 sm:p-12">
          <p className="font-rune text-3xl uppercase text-gold">правила</p>
          <h1 className="mt-4 font-pixel text-2xl leading-[1.65] text-white sm:text-4xl">Кодекс OrstedProject</h1>
          <p className="mt-6 max-w-3xl font-rune text-3xl leading-9 text-white/60">
            Правила написаны для ролевого сервера: они защищают атмосферу, честную прогрессию и уважение к сценам других игроков.
          </p>
        </MotionReveal>
      </section>

      <Section className="mt-24" title="Основные разделы">
        <div className="grid gap-6">
          {groups.map((group, index) => (
            <MotionReveal
              key={group.title}
              delay={index * 0.1}
              className="rounded-[20px] border border-white/10 bg-panel p-6 sm:p-8"
              whileHover={{ y: -3, boxShadow: "0 0 0 1px rgba(94,234,212,0.45), 0 0 24px rgba(94,234,212,0.14)" }}
            >
              <div className="mb-6 flex items-center gap-4">
                <ShieldCheck className="h-8 w-8 text-gold" />
                <h2 className="font-pixel text-sm leading-7 text-white sm:text-lg">{group.title}</h2>
              </div>
              <ul className="grid gap-3 font-rune text-2xl leading-8 text-white/60">
                {group.rules.map((rule) => (
                  <li key={rule} className="flex gap-3">
                    <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-gold" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </MotionReveal>
          ))}
        </div>
      </Section>
    </>
  );
}
