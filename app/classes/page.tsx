import Link from 'next/link'
import { FaHatWizard, FaKhanda, FaShieldAlt, FaSkull } from 'react-icons/fa'
import { classes } from '@/lib/data/classes'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/sections/Reveal'

const icons = { guardian: FaShieldAlt, warrior: FaKhanda, assassin: FaSkull, mage: FaHatWizard }

export default function ClassesPage() {
  return (
    <div className="section-shell pt-28">
      <Reveal>
        <h1 className="pixel-title text-[clamp(1rem,3vw,1.7rem)] text-mc-text">Все классы</h1>
        <p className="mt-5 max-w-3xl font-body text-lg leading-8 text-mc-muted">
          Путь определяет не только навыки, но и роль в истории: кто держит стену, кто ломает строй, кто исчезает в тени, а кто управляет маной.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {classes.map((item, index) => {
          const Icon = icons[item.slug as keyof typeof icons]
          return (
            <Reveal key={item.slug} delay={index * 0.06}>
              <Link href={`/classes/${item.slug}`}>
                <Card className="h-full">
                  <Icon className="text-6xl" style={{ color: item.color }} />
                  <h2 className="mt-5 font-minecraft text-[0.78rem] leading-6 text-mc-text">{item.name}</h2>
                  <p className="mt-2 font-minecraft text-[0.58rem] leading-5 text-mc-gold">{item.path}</p>
                  <p className="mt-4 font-retro text-2xl text-mc-blue">{item.role}</p>
                  <p className="mt-3 font-body leading-7 text-mc-muted">{item.description}</p>
                </Card>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
