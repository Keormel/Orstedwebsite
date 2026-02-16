"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SERVER } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/start", label: "Начать играть" },
  { href: "/lore", label: "Лор / Мир" },
  { href: "/classes", label: "Классы" },
  { href: "/rules", label: "Правила" },
  { href: "/news", label: "Новости" },
  { href: "/events", label: "Ивенты" },
  { href: "/donate", label: "Донат" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateScrollState = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 18);
      setScrollProgress(maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0);
      frame = 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={`site-header sticky top-0 z-40 border-b border-[#2a3c5a88] bg-[#050b19d9] backdrop-blur ${scrolled ? "site-header-scrolled" : ""}`}
    >
      <div className="site-header-progress" style={{ transform: `scaleX(${scrollProgress})` }} />
      <div className="container-page flex flex-wrap items-center justify-between gap-3 py-3">
        <Link href="/" className="text-lg font-bold tracking-wide transition-[letter-spacing,text-shadow] duration-300 hover:tracking-[0.06em] hover:[text-shadow:0_0_18px_rgba(82,199,255,0.45)]">
          {SERVER.name}
        </Link>
        <nav className="flex flex-wrap gap-2 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link rounded-md px-3 py-2 ${isActive(item.href) ? "nav-link-active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button href={SERVER.discordInvite} variant="secondary" className="px-4 py-2 text-xs">
          Discord
        </Button>
      </div>
    </header>
  );
}
