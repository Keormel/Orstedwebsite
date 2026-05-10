"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SERVER } from "@/lib/constants";

const communityItems = [
  { href: "/news", label: "Блог" },
  { href: "/events", label: "Предложения" },
  { href: "/classes", label: "Стафф" },
];

const rightNavItems = [
  { href: "/lore", label: "Вики" },
  { href: "/start", label: "Голосовать" },
  { href: "/donate", label: "Магазин" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const navbarRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!navbarRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isCopied) return;

    const timeout = window.setTimeout(() => setIsCopied(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [isCopied]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const copyIp = async () => {
    try {
      await navigator.clipboard.writeText(SERVER.ip);
      setIsCopied(true);
    } catch {
      setIsCopied(false);
    }
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const isCommunityActive = communityItems.some((item) => isActive(item.href));

  const navLinkClass = (href: string) => `navbar__link ${isActive(href) ? "navbar__link--active" : ""}`;

  const renderIpCopyField = () => (
    <button
      type="button"
      className={`navbar__ip ${isCopied ? "navbar__ip--copied" : ""}`}
      onClick={copyIp}
      aria-label="Скопировать IP сервера"
    >
      <span className="navbar__ip-value">{isCopied ? "✓ Скопировано!" : SERVER.ip}</span>
      <span className="navbar__ip-copy" aria-hidden="true">
        {isCopied ? "✓" : "📋"}
      </span>
    </button>
  );

  const renderLogo = () => (
    <Link href="/" className="navbar__logo" onClick={closeMenus} aria-label={`${SERVER.name} - главная`}>
      <span className="navbar__logo-icon" aria-hidden="true" />
      <span className="navbar__logo-text">{SERVER.name}</span>
    </Link>
  );

  return (
    <nav ref={navbarRef} className={`navbar ${scrolled ? "navbar--scrolled" : ""}`} aria-label="Основная навигация">
      <div className="navbar__left">
        <Link href="/" className={navLinkClass("/")}>
          Главная
        </Link>

        <div
          className={`navbar__dropdown ${isDropdownOpen ? "navbar__dropdown--open" : ""}`}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button
            type="button"
            className={`navbar__link navbar__dropdown-toggle ${isCommunityActive ? "navbar__link--active" : ""} ${isDropdownOpen ? "navbar__dropdown-toggle--open" : ""}`}
            onClick={() => setIsDropdownOpen((value) => !value)}
            aria-expanded={isDropdownOpen}
          >
            Сообщество
            <span className="navbar__dropdown-arrow" aria-hidden="true">
              ▾
            </span>
          </button>
          <div className="navbar__dropdown-menu">
            {communityItems.map((item) => (
              <Link key={item.href} href={item.href} className="navbar__dropdown-item" onClick={closeMenus}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="navbar__center">{renderLogo()}</div>

      <div className="navbar__right">
        {rightNavItems.map((item) => (
          <Link key={item.href} href={item.href} className={navLinkClass(item.href)}>
            {item.label}
          </Link>
        ))}
        <Link href={SERVER.discordInvite} className="navbar__discord" aria-label="Discord сервер">
          <DiscordIcon />
        </Link>
        {renderIpCopyField()}
      </div>

      <button
        type="button"
        className="navbar__burger"
        onClick={() => setIsMenuOpen((value) => !value)}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-site-nav"
        aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
      >
        <span />
        <span />
        <span />
      </button>

      <div id="mobile-site-nav" className={`navbar__mobile ${isMenuOpen ? "navbar__mobile--open" : ""}`}>
        <div className="navbar__mobile-logo">{renderLogo()}</div>
        <div className="navbar__mobile-links">
          <Link href="/" className={navLinkClass("/")} onClick={closeMenus}>
            Главная
          </Link>
          <button
            type="button"
            className={`navbar__link navbar__dropdown-toggle ${isCommunityActive ? "navbar__link--active" : ""} ${isDropdownOpen ? "navbar__dropdown-toggle--open" : ""}`}
            onClick={() => setIsDropdownOpen((value) => !value)}
            aria-expanded={isDropdownOpen}
          >
            Сообщество
            <span className="navbar__dropdown-arrow" aria-hidden="true">
              ▾
            </span>
          </button>
          <div className={`navbar__mobile-dropdown ${isDropdownOpen ? "navbar__mobile-dropdown--open" : ""}`}>
            {communityItems.map((item) => (
              <Link key={item.href} href={item.href} className="navbar__dropdown-item" onClick={closeMenus}>
                {item.label}
              </Link>
            ))}
          </div>
          {rightNavItems.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass(item.href)} onClick={closeMenus}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="navbar__mobile-actions">
          {renderIpCopyField()}
          <Link href={SERVER.discordInvite} className="navbar__discord navbar__discord--mobile" aria-label="Discord сервер">
            <DiscordIcon />
          </Link>
        </div>
      </div>
    </nav>
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M19.5 5.2A16.4 16.4 0 0 0 15.5 4l-.2.4a14.2 14.2 0 0 1 3.4 1.7 11.4 11.4 0 0 0-10.4 0 14.2 14.2 0 0 1 3.4-1.7L11.5 4a16.4 16.4 0 0 0-4 1.2C5 8.8 4.3 12.2 4.6 15.6A16.3 16.3 0 0 0 9.5 18l.6-.9a10.6 10.6 0 0 1-1.5-.7l.4-.3a11.6 11.6 0 0 0 10 0l.4.3a10.6 10.6 0 0 1-1.5.7l.6.9a16.3 16.3 0 0 0 4.9-2.4c.4-3.9-.6-7.2-2.9-10.4ZM10 13.6c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z" />
    </svg>
  );
}
