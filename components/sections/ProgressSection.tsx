import { Card } from '@/components/ui/Card'
import { Reveal } from './Reveal'

const items = [
  ['Сезоны', 'Новые карты конфликтов, мягкий прогресс и награды за историю персонажа.'],
  ['Гильдии', 'Контракты, ранги, дипломатия и общие склады для экспедиций.'],
  ['Война и дипломатия', 'Осады, союзы, перемирия и торговые маршруты между землями.'],
  ['Ивенты', 'Турниры Академии, караваны, рейды и сюжетные сцены от администрации.']
]

export function ProgressSection() {
  return (
    <section className="section-shell py-16">
      <Reveal>
        <h2 className="pixel-title text-[clamp(0.9rem,2vw,1.4rem)] text-mc-text">Прогресс и система</h2>
      </Reveal>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {items.map(([title, text], index) => (
          <Reveal key={title} delay={index * 0.06}>
            <Card>
              <div className="font-retro text-3xl text-mc-blue">0{index + 1}</div>
              <h3 className="mt-2 font-minecraft text-[0.72rem] leading-6 text-mc-text">{title}</h3>
              <p className="mt-3 font-body text-lg leading-8 text-mc-muted">{text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
