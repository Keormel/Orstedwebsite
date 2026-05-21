import { Reveal } from './Reveal'

const labels = ['Академия Раноа', 'Гильдия Асуры', 'Белый Форт', 'Рынок караванов', 'Зал рун', 'Северный перевал']

export function GallerySection() {
  return (
    <section className="section-shell py-16">
      <Reveal>
        <h2 className="pixel-title text-[clamp(0.9rem,2vw,1.4rem)] text-mc-text">Галерея мира</h2>
      </Reveal>
      <div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {labels.map((label, index) => (
          <Reveal key={label} delay={index * 0.04}>
            <div className={`mb-5 break-inside-avoid border-2 border-mc-border bg-mc-card p-3 shadow-pixel ${index % 2 ? 'h-56' : 'h-72'}`}>
              <div className="flex h-full items-end bg-[linear-gradient(135deg,rgba(91,141,184,0.22),rgba(201,168,76,0.2)),linear-gradient(90deg,rgba(44,36,22,0.08)_1px,transparent_1px),linear-gradient(rgba(44,36,22,0.08)_1px,transparent_1px)] bg-[length:auto,18px_18px,18px_18px] p-4">
                <span className="border-2 border-mc-border bg-parchment px-3 py-1 font-retro text-2xl text-mc-text shadow-pixel">
                  {label}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
