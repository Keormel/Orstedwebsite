import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { news } from '@/lib/data/news'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/sections/Reveal'

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }))
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const item = news.find((newsItem) => newsItem.slug === params.slug)
  if (!item) notFound()

  return (
    <article className="section-shell pt-28">
      <Reveal>
        <Button href="/news" variant="text">Назад к новостям</Button>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Badge>{item.tag}</Badge>
          <time className="font-retro text-2xl text-mc-muted">{format(new Date(item.date), 'd MMMM yyyy', { locale: ru })}</time>
        </div>
        <h1 className="pixel-title mt-5 max-w-4xl text-[clamp(1rem,3vw,1.7rem)] text-mc-text">{item.title}</h1>
      </Reveal>
      <Reveal delay={0.08}>
        <Card className="mt-8">
          {item.body.map((paragraph) => (
            <p key={paragraph} className="mb-5 font-body text-xl leading-9 text-mc-muted last:mb-0">
              {paragraph}
            </p>
          ))}
        </Card>
      </Reveal>
    </article>
  )
}
