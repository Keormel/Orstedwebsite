import { Card } from '@/components/ui/Card'
import { PixelDivider } from '@/components/ui/PixelDivider'
import { Reveal } from '@/components/sections/Reveal'

const chapters = [
  ['Академия', 'В стенах Академии Раноа новички учатся держать ману, читать руны и не превращать аудиторию в кратер после первого заклинания.'],
  ['Гильдия Приключенцев', 'Здесь выдают контракты, собирают отряды и решают, кто пойдет охранять караван, а кто будет чистить подземелье от проклятых кристаллов.'],
  ['Асура', 'Королевство богато землей, торговлей и конфликтами. Каждая гильдия хочет свой маршрут, свой форт и свой голос на совете.'],
  ['Перерождение', 'Игрок не просто появляется на спавне. Он получает новую роль в мире, где память прошлых сезонов становится легендой.']
]

export default function LorePage() {
  return (
    <div className="pt-28">
      <section className="section-shell">
        <Reveal>
          <h1 className="pixel-title text-[clamp(1rem,3vw,1.7rem)] text-mc-text">Лор мира</h1>
          <p className="mt-5 max-w-3xl font-body text-lg leading-8 text-mc-muted">
            OrstedProject вдохновлен чувством большого фэнтези-путешествия: Академия, дороги Асуры, гильдейские клятвы, магия и выбор, который остается в хрониках.
          </p>
        </Reveal>
      </section>
      <PixelDivider />
      <section className="section-shell grid gap-5 md:grid-cols-2">
        {chapters.map(([title, text], index) => (
          <Reveal key={title} delay={index * 0.06}>
            <Card>
              <h2 className="font-minecraft text-[0.74rem] leading-6 text-mc-text">{title}</h2>
              <p className="mt-4 font-body text-lg leading-8 text-mc-muted">{text}</p>
            </Card>
          </Reveal>
        ))}
      </section>
    </div>
  )
}
