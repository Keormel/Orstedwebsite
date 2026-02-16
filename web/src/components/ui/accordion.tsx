"use client";

import { useState } from "react";

type FaqItem = {
  q: string;
  a: string;
};

type AccordionProps = {
  items: FaqItem[];
};

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.q} className="surface p-4">
            <button
              className="flex w-full items-center justify-between gap-4 text-left text-base font-semibold"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
            >
              <span>{item.q}</span>
              <span className="text-[var(--accent)]">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen ? <p className="mt-3 text-sm text-muted">{item.a}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
