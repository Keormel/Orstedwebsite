import Link from 'next/link'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { news } from '@/lib/data/news'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Reveal } from './Reveal'

export function NewsSection() {
  return (
    <section className="bg-stone py-16">
      <div className="section-shell">
        <Reveal>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="pixel-title text-[clamp(0.9rem,2vw,1.4rem)] text-mc-text">Последние новости</h2>
            <Button href="/news" variant="ghost">Все записи</Button>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {news.slice(0, 3).map((item, index) => (
            <Reveal key={item.id} delay={index * 0.07}>
              <Link href={`/news/${item.slug}`}>
                <Card className="h-full">
                  <div className="flex items-center justify-between gap-3">
                    <Badge>{item.tag}</Badge>
                    <time className="font-retro text-xl text-mc-muted">{format(new Date(item.date), 'd MMM yyyy', { locale: ru })}</time>
                  </div>
                  <h3 className="mt-5 font-retro text-3xl leading-8 text-mc-text">{item.title}</h3>
                  <p className="mt-3 font-body leading-7 text-mc-muted">{item.preview}</p>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
