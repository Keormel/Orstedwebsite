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
        const contentId = `accordion-content-${idx}`;
        const triggerId = `accordion-trigger-${idx}`;
        return (
          <div key={item.q} className="surface p-4 sm:p-5">
            <button
              id={triggerId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={contentId}
              className="flex min-h-11 w-full items-center justify-between gap-4 text-left text-sm font-semibold sm:text-base"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
            >
              <span>{item.q}</span>
              <span className="text-[var(--accent)]" aria-hidden="true">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen ? (
              <p id={contentId} role="region" aria-labelledby={triggerId} className="mt-3 text-sm leading-relaxed text-muted">
                {item.a}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
