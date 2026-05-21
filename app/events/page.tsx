import { events } from '@/lib/data/events'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/sections/Reveal'

export default function EventsPage() {
  return (
    <div className="section-shell pt-28">
      <Reveal>
        <h1 className="pixel-title text-[clamp(1rem,3vw,1.7rem)] text-mc-text">Ивенты</h1>
        <p className="mt-5 max-w-3xl font-body text-lg leading-8 text-mc-muted">
          Регулярные события, где гильдии получают славу, ресурсы и новые поводы для переговоров.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {events.map((event, index) => (
          <Reveal key={event.title} delay={index * 0.06}>
            <Card className="h-full">
              <Badge>{event.tag}</Badge>
              <h2 className="mt-5 font-minecraft text-[0.76rem] leading-6 text-mc-text">{event.title}</h2>
              <p className="mt-3 font-retro text-3xl text-mc-blue">{event.date}</p>
              <p className="mt-4 font-body text-lg leading-8 text-mc-muted">{event.description}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
