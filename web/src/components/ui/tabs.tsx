"use client";

import { ReactNode, useState } from "react";

type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabsProps = {
  items: TabItem[];
};

export function Tabs({ items }: TabsProps) {
  const [active, setActive] = useState(items[0]?.id);

  return (
    <div className="surface p-4">
      <div className="mb-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`rounded-lg border px-4 py-2 text-sm transition ${
              active === item.id
                ? "border-[var(--accent)] bg-[#10283f] text-white"
                : "border-[#304464] text-muted hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div>{items.find((item) => item.id === active)?.content}</div>
    </div>
  );
}
