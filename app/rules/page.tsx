import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/sections/Reveal'

const rules = [
  ['Уважай игроков', 'Запрещены оскорбления, травля, токсичное поведение и провокации вне игровой роли.'],
  ['Не используй читы', 'Клиенты, макросы, дюпы, X-Ray и любые преимущества вне сборки ведут к блокировке.'],
  ['Роль важнее хаоса', 'Грабеж, осады и конфликты должны иметь игровую причину и не превращаться в бессмысленный спавн-килл.'],
  ['Экономика честная', 'Запрещены схемы обхода торговли, мультиаккаунты для фарма и скрытые обмены за реальные деньги.'],
  ['Береги карту', 'Не оставляй мусорные постройки рядом с городами, дорогами и сюжетными зонами.'],
  ['Администрация решает споры', 'Сохраняй доказательства, обращайся в Discord и не устраивай самосуд в общем чате.']
]

export default function RulesPage() {
  return (
    <div className="section-shell pt-28">
      <Reveal>
        <h1 className="pixel-title text-[clamp(1rem,3vw,1.7rem)] text-mc-text">Правила</h1>
        <p className="mt-5 max-w-3xl font-body text-lg leading-8 text-mc-muted">
          Правила нужны, чтобы войны были драматичными, торговля честной, а возвращаться на сервер хотелось и новичкам, и старым гильдиям.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-4">
        {rules.map(([title, text], index) => (
          <Reveal key={title} delay={index * 0.04}>
            <Card className="grid gap-4 md:grid-cols-[80px_1fr]">
              <div className="font-minecraft text-2xl text-mc-gold">{index + 1}</div>
              <div>
                <h2 className="font-retro text-3xl text-mc-text">{title}</h2>
                <p className="mt-2 font-body text-lg leading-8 text-mc-muted">{text}</p>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
