import { Accordion } from '@/components/ui/Accordion'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { DiscordWidget } from '@/components/ui/DiscordWidget'
import { PixelDivider } from '@/components/ui/PixelDivider'
import { Reveal } from '@/components/sections/Reveal'

const steps = [
  ['Скачай сборку', 'Получи MT RPG Pack с модами, ресурсами и уже настроенным сервером.'],
  ['Установи и запусти', 'Открой лаунчер, выбери профиль OrstedProject и дождись проверки файлов.'],
  ['Добавь сервер', 'Используй IP play.orsted.ru и версию 1.20.1.'],
  ['Зайди в Discord', 'Там анкеты персонажей, гильдии, новости и расписание ивентов.'],
  ['Создай персонажа', 'Выбери путь, получи стартовый набор и отправляйся в Академию.']
]

export default function StartPage() {
  return (
    <div className="pt-28">
      <section className="section-shell">
        <Reveal>
          <h1 className="pixel-title text-[clamp(1rem,3vw,1.7rem)] text-mc-text">Начать играть</h1>
          <p className="mt-5 max-w-3xl font-body text-lg leading-8 text-mc-muted">
            Пять шагов до первого перерождения на OrstedProject. Подготовь сборку, зайди в Discord и выбери класс без спешки.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5">
          {steps.map(([title, text], index) => (
            <Reveal key={title} delay={index * 0.05}>
              <Card className="grid gap-5 md:grid-cols-[120px_1fr_auto] md:items-center">
                <div className="font-minecraft text-[clamp(1.7rem,6vw,3.8rem)] leading-none text-mc-gold [text-shadow:4px_4px_0_rgba(44,36,22,0.12)]">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <h2 className="font-minecraft text-[0.78rem] leading-6 text-mc-text">{title}</h2>
                  <p className="mt-2 font-body text-lg leading-7 text-mc-muted">{text}</p>
                  {index === 2 ? (
                    <div className="mt-4 inline-block border-2 border-mc-text bg-stone px-4 py-2 font-minecraft text-[0.62rem] text-mc-blue shadow-pixel">
                      play.orsted.ru
                    </div>
                  ) : null}
                </div>
                {index === 0 ? <Button variant="gold">Скачать</Button> : null}
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
      <PixelDivider />
      <section className="section-shell grid gap-6 lg:grid-cols-[1fr_360px]">
        <Reveal>
          <h2 className="pixel-title text-[clamp(0.9rem,2vw,1.4rem)] text-mc-text">Не запускается?</h2>
          <div className="mt-6">
            <Accordion
              items={[
                { question: 'Краш при запуске', answer: 'Проверь Java 17, выдели 6-8 ГБ RAM и отключи старые версии модов в профиле.' },
                { question: 'Не видит сервер', answer: 'Убедись, что выбран Minecraft 1.20.1 и IP введен без пробелов: play.orsted.ru.' },
                { question: 'Текстуры не загрузились', answer: 'Перезапусти профиль сборки и включи серверный ресурс-пак в настройках мультиплеера.' }
              ]}
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <DiscordWidget />
        </Reveal>
      </section>
    </div>
  )
}
