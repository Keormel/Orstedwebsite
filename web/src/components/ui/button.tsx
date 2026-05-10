import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const styles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "btn-green",
  secondary: "btn-discord",
  ghost: "btn-gray",
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const classes =
    `btn-arcane rune-hover inline-flex items-center justify-center px-4 py-2 transition-[filter] duration-75 ${styles[variant]} ${className}`.trim();

  if (!href) {
    return <button className={classes}>{children}</button>;
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
