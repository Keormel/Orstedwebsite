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
    <div className="accordion">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const contentId = `accordion-content-${idx}`;
        const triggerId = `accordion-trigger-${idx}`;

        return (
          <div key={item.q} className={`accordion__item ${isOpen ? "accordion__item--open" : ""}`}>
            <button
              id={triggerId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={contentId}
              className="accordion__trigger"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
            >
              <span>{item.q}</span>
              <span className="accordion__icon" aria-hidden="true">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div id={contentId} role="region" aria-labelledby={triggerId} className="accordion__content">
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
