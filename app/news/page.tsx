import Link from 'next/link'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { news } from '@/lib/data/news'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/sections/Reveal'

export default function NewsPage() {
  return (
    <div className="section-shell pt-28">
      <Reveal>
        <h1 className="pixel-title text-[clamp(1rem,3vw,1.7rem)] text-mc-text">Новости</h1>
        <p className="mt-5 max-w-3xl font-body text-lg leading-8 text-mc-muted">
          Патчноуты, сезоны, ивенты и важные объявления Гильдии Приключенцев.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-5">
        {news.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.04}>
            <Link href={`/news/${item.slug}`}>
              <Card>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge>{item.tag}</Badge>
                  <time className="font-retro text-2xl text-mc-muted">{format(new Date(item.date), 'd MMMM yyyy', { locale: ru })}</time>
                </div>
                <h2 className="mt-4 font-retro text-4xl leading-9 text-mc-text">{item.title}</h2>
                <p className="mt-3 font-body text-lg leading-8 text-mc-muted">{item.preview}</p>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
