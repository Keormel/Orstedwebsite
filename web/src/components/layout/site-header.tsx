"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SERVER } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { CopyIpButton } from "@/components/copy-ip-button";

const leftNavItems = [
  { href: "/", label: "Главная" },
  { href: "/start", label: "Начать играть" },
  { href: "/lore", label: "Лор / Мир" },
  { href: "/classes", label: "Классы" },
];

const rightNavItems = [
  { href: "/rules", label: "Правила" },
  { href: "/news", label: "Новости" },
  { href: "/events", label: "Ивенты" },
  { href: "/donate", label: "Донат" },
];

const mobileNavItems = [...leftNavItems, ...rightNavItems.filter((item) => item.href !== "/classes")];

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
    <header className={`site-header sticky top-0 z-40 backdrop-blur ${scrolled ? "site-header-scrolled" : ""}`}>
      <div className="site-header-progress" style={{ transform: `scaleX(${scrollProgress})` }} />
      <div className="site-header-inner container-page py-3">
        <div className="site-header-row">
          <nav className="site-nav site-nav-left hidden flex-wrap gap-1.5 text-sm xl:flex" aria-label="Левая навигация">
            {leftNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link px-3 py-2 ${isActive(item.href) ? "nav-link-active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="site-logo inline-flex min-h-11 items-center text-base font-bold sm:text-lg"
          >
            <span className="site-logo-block" aria-hidden="true" />
            <span className="site-logo-text">{SERVER.name}</span>
          </Link>

          <div className="site-nav-right hidden items-center justify-end gap-2 xl:flex">
            <nav className="site-nav flex flex-wrap justify-end gap-1.5 text-sm" aria-label="Правая навигация">
              {rightNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link px-3 py-2 ${isActive(item.href) ? "nav-link-active" : ""}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="site-header-actions flex items-center gap-2">
              <CopyIpButton compact />
              <Button href="/donate" variant="ghost" className="px-3 text-sm">
                Магазин
              </Button>
              <Button href={SERVER.discordInvite} variant="secondary" className="px-4 text-sm">
                Discord
              </Button>
            </div>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-site-nav"
            className="mobile-menu-button inline-flex h-11 w-11 items-center justify-center xl:hidden"
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
          className={`overflow-hidden transition-[max-height,opacity,margin] duration-300 xl:hidden ${mobileMenuOpen ? "mt-3 max-h-[620px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <nav className="mobile-nav-panel grid gap-1 p-2 text-sm">
            {mobileNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`mobile-nav-link px-3 py-2.5 ${isActive(item.href) ? "mobile-nav-link-active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-2 grid gap-2">
            <CopyIpButton />
            <Button href={SERVER.discordInvite} variant="secondary" className="w-full justify-center text-sm">
              Discord-сообщество
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
