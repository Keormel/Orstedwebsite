import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const styles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "border border-[#8be8d5] bg-[var(--accent)] text-[#032019] shadow-[0_8px_24px_rgba(24,99,87,0.28)] hover:bg-[#41d7b4] active:bg-[#24ad8b]",
  secondary:
    "border border-[#3f8f83] bg-[#102c2d] text-[var(--foreground)] hover:bg-[#173739]",
  ghost:
    "border border-[#36595f] bg-transparent text-[var(--muted)] hover:border-[var(--accent)] hover:text-white",
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const classes =
    `btn-arcane rune-hover inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 ${styles[variant]} ${className}`.trim();

  if (!href) {
    return <button className={classes}>{children}</button>;
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
