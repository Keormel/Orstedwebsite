import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/sections/Reveal'

const packs = [
  ['Рунный плащ', 'Косметический плащ, цветной ник в Discord и место в хрониках сезона.', '299 ₽'],
  ['Герб гильдии', 'Декоративный баннер, рамка профиля и набор визуальных эффектов без усиления.', '599 ₽'],
  ['Меценат Академии', 'Косметика, приватный канал идей и ранний доступ к тесту новых визуальных сцен.', '999 ₽']
]

export default function DonatePage() {
  return (
    <div className="section-shell pt-28">
      <Reveal>
        <h1 className="pixel-title text-[clamp(1rem,3vw,1.7rem)] text-mc-text">Донат</h1>
        <p className="mt-5 max-w-3xl font-body text-lg leading-8 text-mc-muted">
          Поддержка сервера без pay-to-win. Здесь нет покупки урона, брони, валюты или преимуществ в PvP.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {packs.map(([title, text, price], index) => (
          <Reveal key={title} delay={index * 0.06}>
            <Card className="flex h-full flex-col">
              <h2 className="font-minecraft text-[0.76rem] leading-6 text-mc-text">{title}</h2>
              <p className="mt-4 flex-1 font-body text-lg leading-8 text-mc-muted">{text}</p>
              <div className="mt-6 font-retro text-5xl text-mc-gold">{price}</div>
              <Button className="mt-5" variant={index === 1 ? 'gold' : 'ghost'}>Скоро</Button>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
