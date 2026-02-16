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
    "bg-[var(--accent)] text-[#041220] hover:bg-[#6dd5ff] active:bg-[#33afea] border border-[#80dcff]",
  secondary:
    "bg-transparent text-[var(--foreground)] border border-[#8c7640] hover:bg-[#2f2818]",
  ghost:
    "bg-transparent text-[var(--muted)] border border-[#304464] hover:text-white hover:border-[var(--accent)]",
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const classes =
    `inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 rune-hover ${styles[variant]} ${className}`.trim();

  if (!href) {
    return <button className={classes}>{children}</button>;
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
