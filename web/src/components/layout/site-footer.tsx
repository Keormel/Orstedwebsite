import Link from "next/link";
import { SERVER } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-bg-base)_70%,transparent)]">
      <div className="container-page grid gap-8 py-10 md:grid-cols-3">
        <div className="space-y-3">
          <p className="text-xl font-semibold">{SERVER.name}</p>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Атмосферный RPG-сервер Orsted Project: сюжет, классы, гильдейские войны и честная экономика.
          </p>
          <Link href="/start" className="selection-link inline-flex text-sm">
            Начать играть
          </Link>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold text-[var(--color-text-primary)]">Навигация</p>
          <div className="flex flex-col gap-2 text-sm text-muted">
            <Link href="/start">Как начать</Link>
            <Link href="/rules">Правила</Link>
            <Link href="/news">Новости</Link>
            <Link href="/classes">Классы</Link>
            <Link href="/donate">Донат</Link>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold text-[var(--color-text-primary)]">Подключение</p>
          <p className="text-sm text-muted">IP: {SERVER.ip}</p>
          <p className="text-sm text-muted">Версия: {SERVER.version}</p>
          <Link href={SERVER.discordInvite} className="selection-link inline-flex text-sm">
            Discord поддержки
          </Link>
        </div>
      </div>
    </footer>
  );
}
