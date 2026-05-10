import Link from "next/link";
import { FaDiscord, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { SERVER } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__stone" aria-hidden="true" />
      <div className="container-page site-footer__brand-row">
        <div className="site-footer__logo" aria-hidden="true" />
        <div>
          <h2>{SERVER.name} © 2026</h2>
          <p>Mushoku Reincarnation, made for adventurers.</p>
        </div>
        <div className="site-footer__socials" aria-label="Социальные сети">
          <Link href={SERVER.discordInvite} aria-label="Discord"><FaDiscord /></Link>
          <Link href="/" aria-label="Instagram"><FaInstagram /></Link>
          <Link href="/" aria-label="YouTube"><FaYoutube /></Link>
          <Link href="/" aria-label="TikTok"><FaTiktok /></Link>
        </div>
      </div>
      <div className="container-page site-footer__grid">
        <div>
          <h3>ССЫЛКИ</h3>
          <Link href="/donate">Магазин</Link>
          <Link href="/news">Блог</Link>
          <Link href="/lore">Вики</Link>
          <Link href="/start">Голосовать</Link>
        </div>
        <div>
          <h3>СООБЩЕСТВО</h3>
          <Link href={SERVER.discordInvite}>Discord</Link>
          <Link href="/events">Предложения</Link>
          <Link href="/classes">Стафф</Link>
        </div>
        <div>
          <h3>ПРАВОВОЕ</h3>
          <Link href="/rules">Правила</Link>
          <Link href="/rules">Условия использования</Link>
          <p>IP: {SERVER.ip}</p>
        </div>
      </div>
      <p className="container-page site-footer__disclaimer">
        We are not affiliated with Mojang AB or Microsoft. This is a fan inspired Minecraft RPG project.
      </p>
    </footer>
  );
}
