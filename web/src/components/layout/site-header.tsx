import Link from "next/link";
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
  return (
    <header className="sticky top-0 z-40 border-b border-[#2a3c5a88] bg-[#050b19d9] backdrop-blur">
      <div className="container-page flex flex-wrap items-center justify-between gap-3 py-3">
        <Link href="/" className="text-lg font-bold tracking-wide">
          {SERVER.name}
        </Link>
        <nav className="flex flex-wrap gap-2 text-sm">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-muted hover:text-white">
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
