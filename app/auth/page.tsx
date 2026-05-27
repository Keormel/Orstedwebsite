import type { Metadata } from "next";
import { Bot, Mail, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import AuthPanel from "@/components/AuthPanel";
import MotionReveal from "@/components/MotionReveal";
import Section from "@/components/Section";
import { internetPhoto } from "@/data/media";

export const metadata: Metadata = {
  title: "Авторизация | OrstedProject",
  description: "Вход и регистрация игрока OrstedProject через Discord-бота или почту."
};

const accessOptions = [
  {
    title: "Discord бот",
    text: "Подтверждение по одноразовому коду из Discord.",
    icon: Bot
  },
  {
    title: "Почта",
    text: "Регистрация и вход через email и пароль.",
    icon: Mail
  },
  {
    title: "Профиль игрока",
    text: "Ник, роли и будущая привязка к персонажу.",
    icon: UserRound
  }
];

export default function AuthPage() {
  return (
    <>
      <section className="mx-auto mt-14 grid w-full max-w-[1200px] gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-start">
        <MotionReveal className="relative min-h-[620px] overflow-hidden rounded-[28px] border border-white/10 bg-panel p-7 sm:p-10">
          <div className="absolute inset-0 bg-cover bg-center opacity-28" style={{ backgroundImage: `url(${internetPhoto})` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-panel via-panel/82 to-panel/38" />
          <div className="absolute inset-0 bg-pixels bg-[length:22px_22px] opacity-20" />
          <div className="relative z-10 flex min-h-[540px] flex-col justify-between">
            <div className="max-w-2xl">
              <p className="font-rune text-3xl uppercase text-gold">личный кабинет</p>
              <h1 className="mt-5 font-pixel text-2xl leading-[1.7] text-white sm:text-4xl">
                Авторизация OrstedProject
              </h1>
              <p className="mt-6 max-w-xl font-rune text-3xl leading-9 text-white/62">
                Войди через Discord-бота, создай новый аккаунт или зарегистрируйся по почте для доступа к профилю игрока.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {accessOptions.map((item, index) => (
                <MotionReveal
                  key={item.title}
                  delay={index * 0.08}
                  className="rounded-[18px] border border-white/10 bg-black/25 p-4 backdrop-blur"
                >
                  <item.icon className="mb-5 h-7 w-7 text-gold" />
                  <h2 className="font-pixel text-[10px] leading-5 text-white">{item.title}</h2>
                  <p className="mt-3 font-rune text-xl leading-6 text-white/55">{item.text}</p>
                </MotionReveal>
              ))}
            </div>
          </div>
        </MotionReveal>

        <AuthPanel />
      </section>

      <Section className="mt-24" title="Безопасность аккаунта" eyebrow="доступ">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Одноразовый код", "Код от Discord-бота не хранится на клиенте и подходит для короткой проверки.", Sparkles],
            ["Привязка Discord", "После подключения API можно связать Discord ID с профилем игрока.", Bot],
            ["Почта и пароль", "Email-форма готова под подключение базы данных и серверной сессии.", ShieldCheck]
          ].map(([title, text, Icon], index) => (
            <MotionReveal
              key={title as string}
              delay={index * 0.1}
              className="rounded-[20px] border border-white/10 bg-panel p-6"
              whileHover={{ y: -3, boxShadow: "0 0 0 1px rgba(94,234,212,0.45), 0 0 24px rgba(94,234,212,0.14)" }}
            >
              <Icon className="mb-8 h-9 w-9 text-gold" />
              <h2 className="font-pixel text-sm leading-7 text-white">{title as string}</h2>
              <p className="mt-4 font-rune text-2xl leading-8 text-white/60">{text as string}</p>
            </MotionReveal>
          ))}
        </div>
      </Section>
    </>
  );
}
