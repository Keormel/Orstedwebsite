"use client";

import { useMemo, useState } from "react";

export type RuleSection = {
  id: string;
  title: string;
  items: string[];
};

type RulesSearchProps = {
  sections: RuleSection[];
};

export function RulesSearch({ sections }: RulesSearchProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return sections;
    const q = query.toLowerCase();
    return sections
      .map((section) => ({
        ...section,
        items: section.items.filter((rule) => rule.toLowerCase().includes(q)),
      }))
      .filter((section) => section.items.length > 0);
  }, [query, sections]);

  return (
    <div className="space-y-4">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск по правилам..."
        className="w-full rounded-lg border border-[#2f4465] bg-[#081224] px-3 py-2 text-sm outline-none focus:border-[var(--ring)]"
      />
      <div className="space-y-5">
        {filtered.map((section) => (
          <section key={section.id} id={section.id} className="surface p-5">
            <h2 className="text-2xl">{section.title}</h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-muted">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
