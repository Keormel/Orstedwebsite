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
    <div className="surface p-4 sm:p-5">
      <div className="-mx-1 mb-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max gap-2 px-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`shrink-0 whitespace-nowrap rounded-lg border px-4 py-2 text-sm transition ${
                active === item.id
                  ? "border-[var(--accent)] bg-[#10283f] text-white"
                  : "border-[#304464] text-muted hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div>{items.find((item) => item.id === active)?.content}</div>
    </div>
  );
}
