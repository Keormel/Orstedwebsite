import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "accent" | "gold" | "muted";
};

export function Badge({ children, tone = "accent" }: BadgeProps) {
  const colorMap = {
    accent:
      "text-[var(--color-btn-primary-text)] border-[var(--color-btn-primary-bg)] bg-[var(--color-bg-surface)]",
    gold:
      "text-[var(--color-text-primary)] border-[var(--color-accent)] bg-[var(--color-bg-elevated)]",
    muted:
      "text-[var(--color-text-secondary)] border-[var(--color-border)] bg-[var(--color-bg-surface)]",
  };

  return (
    <span
      className={`badge-mc inline-flex items-center border px-3 py-1 text-xs font-medium ${colorMap[tone]}`}
    >
      {children}
    </span>
  );
}
