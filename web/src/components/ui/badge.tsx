import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "accent" | "gold" | "muted";
};

export function Badge({ children, tone = "accent" }: BadgeProps) {
  const colorMap = {
    accent: "text-[#dbfff7] border-[#3ab79a] bg-[#103734]",
    gold: "text-[#deefff] border-[#4c87ba] bg-[#12283a]",
    muted: "text-[#d2e7eb] border-[#3c6271] bg-[#13262d]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${colorMap[tone]}`}
    >
      {children}
    </span>
  );
}
