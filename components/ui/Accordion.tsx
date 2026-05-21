'use client'

import { useState } from 'react'

export function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState(0)

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item.question} className="border-2 border-mc-border bg-mc-card shadow-pixel">
          <button
            className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left font-retro text-2xl text-mc-text"
            onClick={() => setOpen(open === index ? -1 : index)}
          >
            <span>{item.question}</span>
            <span className="font-minecraft text-xs">{open === index ? '-' : '+'}</span>
          </button>
          {open === index ? (
            <p className="border-t-2 border-mc-border px-4 py-3 font-body text-base leading-7 text-mc-muted">
              {item.answer}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  )
}
