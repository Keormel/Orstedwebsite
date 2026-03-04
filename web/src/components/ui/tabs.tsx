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
  const activeTab = items.find((item) => item.id === active);

  return (
    <div className="surface p-4 sm:p-5">
      <div className="-mx-1 mb-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max gap-2 px-1" role="tablist" aria-label="Классы">
          {items.map((item) => (
            <button
              key={item.id}
              id={`tab-${item.id}`}
              role="tab"
              aria-selected={active === item.id}
              aria-controls={`panel-${item.id}`}
              onClick={() => setActive(item.id)}
              className={`shrink-0 whitespace-nowrap rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                active === item.id
                  ? "border-[var(--accent)] bg-[#15393a] text-white"
                  : "border-[#36595f] text-muted hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div
        id={`panel-${activeTab?.id ?? "default"}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab?.id ?? "default"}`}
      >
        {activeTab?.content}
      </div>
    </div>
  );
}
