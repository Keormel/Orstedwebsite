import { notFound } from 'next/navigation'
import { classes } from '@/lib/data/classes'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/sections/Reveal'

export function generateStaticParams() {
  return classes.map((item) => ({ slug: item.slug }))
}

export default function ClassPage({ params }: { params: { slug: string } }) {
  const item = classes.find((classItem) => classItem.slug === params.slug)
  if (!item) notFound()

  return (
    <div className="section-shell pt-28">
      <Reveal>
        <Button href="/classes" variant="text">Назад к классам</Button>
        <h1 className="pixel-title mt-5 text-[clamp(1rem,3vw,1.7rem)] text-mc-text">{item.name}</h1>
        <p className="mt-3 font-minecraft text-[0.62rem] leading-6 text-mc-gold">{item.path}</p>
      </Reveal>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <Card>
            <Badge>Патч</Badge>
            <p className="mt-5 font-body text-xl leading-8 text-mc-muted">{item.description}</p>
            <div className="mt-6 font-retro text-3xl text-mc-blue">{item.role}</div>
            <div className="mt-6 flex flex-wrap gap-3">
              {item.skills.map((skill) => (
                <span key={skill} className="border-2 border-mc-border bg-stone px-3 py-1 font-retro text-2xl text-mc-text shadow-pixel">
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </Reveal>
        <Reveal delay={0.08}>
          <Card>
            <h2 className="font-minecraft text-[0.72rem] leading-6 text-mc-text">Сильные стороны</h2>
            <ul className="mt-4 space-y-2 font-body text-lg text-mc-muted">
              {item.strengths.map((value) => <li key={value}>+ {value}</li>)}
            </ul>
            <h2 className="mt-7 font-minecraft text-[0.72rem] leading-6 text-mc-text">Слабости</h2>
            <ul className="mt-4 space-y-2 font-body text-lg text-mc-muted">
              {item.weaknesses.map((value) => <li key={value}>- {value}</li>)}
            </ul>
          </Card>
        </Reveal>
      </div>
    </div>
  )
}
