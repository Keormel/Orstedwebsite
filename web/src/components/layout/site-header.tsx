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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [mobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={`site-header sticky top-0 z-40 border-b border-[#2a3c5a88] bg-[#050b19d9] backdrop-blur ${scrolled ? "site-header-scrolled" : ""}`}
    >
      <div className="site-header-progress" style={{ transform: `scaleX(${scrollProgress})` }} />
      <div className="container-page py-3">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-bold tracking-wide transition-[letter-spacing,text-shadow] duration-300 hover:tracking-[0.06em] hover:[text-shadow:0_0_18px_rgba(82,199,255,0.45)] sm:text-lg"
          >
            {SERVER.name}
          </Link>
          <nav className="hidden flex-wrap gap-2 text-sm md:flex">
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
          <Button href={SERVER.discordInvite} variant="secondary" className="hidden px-4 py-2 text-xs md:inline-flex">
            Discord
          </Button>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-site-nav"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#304464] bg-[#0b1528] text-[#dce7f8] transition-colors hover:border-[var(--accent)] hover:text-white md:hidden"
            onClick={() => setMobileMenuOpen((value) => !value)}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 top-0.5 h-0.5 w-5 rounded bg-current transition-transform duration-200 ${mobileMenuOpen ? "translate-y-1.5 rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-2 h-0.5 w-5 rounded bg-current transition-opacity duration-200 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute left-0 top-3.5 h-0.5 w-5 rounded bg-current transition-transform duration-200 ${mobileMenuOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
        <div
          id="mobile-site-nav"
          className={`overflow-hidden transition-[max-height,opacity,margin] duration-300 md:hidden ${mobileMenuOpen ? "mt-3 max-h-[480px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <nav className="grid gap-1 rounded-xl border border-[#304464] bg-[#0b1528] p-2 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-lg px-3 py-2 transition-colors ${isActive(item.href) ? "bg-[#12314b] text-white" : "text-[var(--muted)] hover:bg-[#101f37] hover:text-white"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button href={SERVER.discordInvite} variant="secondary" className="mt-2 w-full justify-center py-2 text-xs">
            Discord
          </Button>
        </div>
      </div>
    </header>
  );
}
