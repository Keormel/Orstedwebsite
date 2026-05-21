import { Accordion } from '@/components/ui/Accordion'
import { Reveal } from './Reveal'

const items = [
  { question: 'Нужно ли знать Mushoku Tensei?', answer: 'Нет. Знание мира добавит удовольствия, но все правила, классы и сюжетные вводные объясняются внутри сервера и Discord.' },
  { question: 'Есть ли вайпы?', answer: 'Сезоны обновляют экономику и карту конфликтов, но косметика, титулы и часть достижений сохраняются как память персонажа.' },
  { question: 'Можно играть соло?', answer: 'Да. Соло-игроки проходят квесты, ремесло и экспедиции, но гильдии открывают больше дипломатии и крупных событий.' },
  { question: 'Донат влияет на силу?', answer: 'Нет. Донат дает косметику, удобства аккаунта и визуальные эффекты без преимущества в PvP или прогрессии.' },
  { question: 'Какая версия Minecraft?', answer: 'Основная версия сервера: 1.20.1. Рекомендуем использовать готовую сборку MT RPG Pack.' },
  { question: 'Как попасть на ивенты?', answer: 'Регистрация проходит в Discord. Часть событий открыта всем, а сюжетные сцены требуют анкеты персонажа.' }
]

export function FaqSection() {
  return (
    <section className="section-shell py-16">
      <Reveal>
        <h2 className="pixel-title text-[clamp(0.9rem,2vw,1.4rem)] text-mc-text">FAQ</h2>
      </Reveal>
      <div className="mt-8">
        <Accordion items={items} />
      </div>
    </section>
  )
}
