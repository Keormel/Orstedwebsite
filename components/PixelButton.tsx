"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

const MotionLink = motion.create(Link);

type PixelButtonProps = {
  children: ReactNode;
  href?: string;
  icon?: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  external?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
};

const variants = {
  primary:
    "border-gold bg-gold text-white shadow-insetPixel hover:bg-gold-active hover:border-gold-hover",
  outline:
    "border-white/18 bg-transparent text-white hover:border-white hover:bg-white hover:text-obsidian",
  ghost:
    "border-transparent bg-transparent text-white/60 hover:border-gold/50 hover:text-white"
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[14px] border px-5 py-3 font-pixel text-[10px] leading-relaxed transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-gold/30 sm:text-xs";

export default function PixelButton({
  children,
  href,
  icon,
  variant = "primary",
  className = "",
  external = false,
  type = "button",
  ...buttonProps
}: PixelButtonProps) {
  const content = (
    <>
      <span className="break-words text-center">{children}</span>
      {icon ? <span className="shrink-0">{icon}</span> : null}
    </>
  );

  const motionProps = {
    whileHover: { y: -2 },
    whileTap: { y: 2, scale: 0.98 },
    transition: { duration: 0.14 }
  };

  if (href) {
    return (
      <MotionLink
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className={`${base} ${variants[variant]} ${className}`}
        {...motionProps}
      >
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      {...motionProps}
      {...buttonProps}
    >
      {content}
    </motion.button>
  );
}
