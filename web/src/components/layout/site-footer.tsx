import Link from "next/link";
import { SERVER } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[#2a3c5a88]">
      <div className="container-page grid gap-8 py-10 md:grid-cols-3">
        <div>
          <p className="text-xl font-semibold">{SERVER.name}</p>
          <p className="mt-2 text-sm text-muted">
            RPG сервер во вселенной Mushoku Tensei. Сезоны, классы, академия магии и честный донат.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Навигация</p>
          <div className="mt-2 flex flex-col gap-1 text-sm text-muted">
            <Link href="/start">Как начать</Link>
            <Link href="/rules">Правила</Link>
            <Link href="/news">Новости</Link>
            <Link href="/donate">Донат</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Подключение</p>
          <p className="mt-2 text-sm text-muted">IP: {SERVER.ip}</p>
          <p className="text-sm text-muted">Версия: {SERVER.version}</p>
        </div>
      </div>
    </footer>
  );
}
