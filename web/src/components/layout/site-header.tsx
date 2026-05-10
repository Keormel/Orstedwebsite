"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaDiscord } from "react-icons/fa6";
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

  useEffect(() => {
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!navbarRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
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

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const copyIp = async () => {
    try {
      await navigator.clipboard.writeText(SERVER.ip);
      setIsCopied(true);
    } catch {
      setIsCopied(false);
    }
  };

  const navLinkClass = (href: string) => `navbar__link ${isActive(href) ? "navbar__link--active" : ""}`;
  const isCommunityActive = communityItems.some((item) => isActive(item.href));

  const renderLogo = () => (
    <Link href="/" className="navbar__logo" onClick={closeMenus} aria-label={`${SERVER.name} главная`}>
      <span className="navbar__logo-icon" aria-hidden="true" />
      <span className="navbar__logo-text">{SERVER.name}</span>
    </Link>
  );

  const renderIpField = () => (
    <button type="button" className={`navbar__ip ${isCopied ? "navbar__ip--copied" : ""}`} onClick={copyIp}>
      <span className="navbar__ip-value">{isCopied ? "✓ Скопировано!" : SERVER.ip}</span>
      <span className="navbar__ip-copy">Copy</span>
    </button>
  );

  const renderCommunityDropdown = () => (
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
        Сообщество <span className="navbar__dropdown-arrow">▾</span>
      </button>
      <div className="navbar__dropdown-menu">
        {communityItems.map((item) => (
          <Link key={item.href} href={item.href} className="navbar__dropdown-item" onClick={closeMenus}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <nav ref={navbarRef} className="navbar" aria-label="Основная навигация">
      <div className="navbar__left">
        <Link href="/" className={navLinkClass("/")}>Главная</Link>
        {renderCommunityDropdown()}
      </div>

      <div className="navbar__center">{renderLogo()}</div>

      <div className="navbar__right">
        {rightNavItems.map((item) => (
          <Link key={item.href} href={item.href} className={navLinkClass(item.href)}>
            {item.label}
          </Link>
        ))}
        <Link href={SERVER.discordInvite} className="navbar__discord" aria-label="Discord">
          <FaDiscord />
        </Link>
        {renderIpField()}
      </div>

      <button
        type="button"
        className="navbar__burger"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-site-nav"
        aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        onClick={() => setIsMenuOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <div id="mobile-site-nav" className={`navbar__mobile ${isMenuOpen ? "navbar__mobile--open" : ""}`}>
        <div className="navbar__mobile-logo">{renderLogo()}</div>
        <div className="navbar__mobile-links">
          <Link href="/" className={navLinkClass("/")} onClick={closeMenus}>Главная</Link>
          {renderCommunityDropdown()}
          {rightNavItems.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass(item.href)} onClick={closeMenus}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="navbar__mobile-actions">
          {renderIpField()}
          <Link href={SERVER.discordInvite} className="navbar__discord" aria-label="Discord">
            <FaDiscord />
          </Link>
        </div>
      </div>
    </nav>
  );
}
