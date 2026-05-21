import { FaCrown, FaHandshake, FaShieldAlt, FaMapSigns, FaBalanceScale } from 'react-icons/fa'
import { Card } from '@/components/ui/Card'
import { Reveal } from './Reveal'

const items = [
  ['RPG-классы и навыки', FaShieldAlt],
  ['Гильдии и дипломатия', FaHandshake],
  ['Войны и осады', FaCrown],
  ['Сезонная прогрессия', FaMapSigns],
  ['No pay-to-win', FaBalanceScale]
]

export function AboutSection() {
  return (
    <section className="section-shell py-14">
      <Reveal>
        <h2 className="pixel-title max-w-3xl text-[clamp(0.9rem,2vw,1.4rem)] text-mc-text">
          Не просто выживание —<br />перерождение
        </h2>
        <p className="mt-5 max-w-3xl font-body text-lg leading-8 text-mc-muted">
          OrstedProject соединяет Minecraft, RPG-прогрессию и атмосферу Академии магии. Ты начинаешь заново, выбираешь путь, вступаешь в гильдию и влияешь на карту мира Асуры.
        </p>
      </Reveal>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {items.map(([label, Icon], index) => (
          <Reveal key={label as string} delay={index * 0.06}>
            <Card className="h-full text-center">
              <Icon className="mx-auto text-3xl text-mc-blue" aria-hidden />
              <div className="mt-4 font-retro text-2xl leading-6 text-mc-text">{label as string}</div>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
