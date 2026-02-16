import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "accent" | "gold" | "muted";
};

export function Badge({ children, tone = "accent" }: BadgeProps) {
  const colorMap = {
    accent: "text-[#c8f0ff] border-[#4ebee9] bg-[#0f2a3d]",
    gold: "text-[#f4e7c6] border-[#b5954e] bg-[#2a2415]",
    muted: "text-[#cad4e8] border-[#415270] bg-[#111c30]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${colorMap[tone]}`}
    >
      {children}
    </span>
  );
}
