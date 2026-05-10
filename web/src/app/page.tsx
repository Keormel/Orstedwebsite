/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Metadata } from "next";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CopyIpButton } from "@/components/copy-ip-button";
import { LaunchCountdown } from "@/components/launch-countdown";
import { Reveal } from "@/components/ui/reveal";
import { SERVER } from "@/lib/constants";
import { getClasses, getFaqItems, getNewsPosts } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Главная",
  description: "Minecraft RPG сервер Mushoku Reincarnation: классы, мир, гильдии, события и честный прогресс.",
};

const classImageQueries = ["warrior", "mage", "archer", "character"];
const blogImages = [
  "https://source.unsplash.com/800x400/?minecraft,adventure",
  "https://source.unsplash.com/800x400/?minecraft,fantasy,castle",
  "https://source.unsplash.com/800x400/?minecraft,dungeon",
];

export default async function HomePage() {
  const classes = await getClasses();
  const news = await getNewsPosts();
  const faq = await getFaqItems();

  return (
    <div className="mushoku-page">
      <Reveal>
        <section className="msh-hero">
          <div className="msh-cloud msh-cloud-one" aria-hidden="true" />
          <div className="msh-cloud msh-cloud-two" aria-hidden="true" />
          <div className="container-page msh-hero-layout">
            <figure className="msh-hero-character">
              <img src="https://source.unsplash.com/300x500/?minecraft,warrior" alt="" />
            </figure>
            <div className="msh-hero-content">
              <p className="msh-kicker">Minecraft RPG Server</p>
              <h1>{SERVER.name}</h1>
              <p>{SERVER.slogan}</p>
              <LaunchCountdown />
              <div className="msh-hero-actions">
                <Button href="/start">Играть сейчас</Button>
                <Button href={SERVER.discordInvite} variant="secondary">
                  Discord
                </Button>
              </div>
            </div>
            <figure className="msh-hero-character">
              <img src="https://source.unsplash.com/300x500/?minecraft,mage" alt="" />
            </figure>
          </div>
        </section>
        <div className="divider-grass" />
      </Reveal>

      <Reveal delayMs={80}>
        <section className="msh-section msh-classes">
          <div className="container-page">
            <h2 className="msh-section-title">Классы</h2>
            <div className="msh-class-grid">
              {classes.slice(0, 4).map((item, index) => (
                <Link key={item.slug} href={`/classes/${item.slug}`} className="msh-class-card">
                  <span className="msh-class-card__media">
                    <img
                      src={`https://source.unsplash.com/250x400/?minecraft,${classImageQueries[index] ?? item.slug},character`}
                      alt=""
                    />
                  </span>
                  <span className="msh-class-card__body">
                    <h3>{item.name}</h3>
                    <p>{item.tagline}</p>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal delayMs={120}>
        <section className="msh-section msh-join">
          <div className="container-page">
            <div className="msh-join-panel">
              <div className="msh-join-copy">
                <h2 className="msh-section-title">Как присоединиться</h2>
                <p className="msh-lead">{SERVER.slogan}</p>
                <div className="msh-join-ip">
                  <CopyIpButton />
                </div>
              </div>
              <div className="msh-steps">
                <article>
                  <span>1</span>
                  <p>Установи Minecraft {SERVER.version}</p>
                </article>
                <article>
                  <span>2</span>
                  <p>Добавь сервер по IP</p>
                </article>
                <article>
                  <span>3</span>
                  <p>Прими текстурпак и заходи</p>
                </article>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal delayMs={160}>
        <section className="msh-section msh-blog">
          <div className="container-page">
            <div className="msh-section-head">
              <h2 className="msh-section-title">Блог / Новости</h2>
              <Link href="/news" className="msh-text-link">
                Все публикации
              </Link>
            </div>
            <div className="msh-blog-grid">
              {news.slice(0, 3).map((post, index) => (
                <article key={post.id} className="msh-blog-card">
                  <img src={blogImages[index] ?? blogImages[0]} alt="" />
                  <div>
                    <time>{new Date(post.publishedAt).toLocaleDateString("ru-RU")}</time>
                    <h3>{post.title}</h3>
                    <p>{post.summary}</p>
                    <Link href={`/news/${post.slug}`} className="msh-read-link">
                      Читать
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal delayMs={200}>
        <section className="msh-section msh-faq">
          <div className="container-page">
            <h2 className="msh-section-title">FAQ</h2>
            <Accordion items={faq} />
          </div>
        </section>
      </Reveal>

      <Reveal delayMs={240}>
        <section className="msh-discord">
          <div className="container-page msh-discord-grid">
            <div className="msh-online">
              <span />
              <strong>0</strong>
              <p>Online members</p>
            </div>
            <div className="msh-discord-copy">
              <h2 className="msh-section-title">Присоединись к нашему Discord</h2>
              <p className="msh-lead">
                Новости, пати, поддержка, набор в гильдии и обсуждение будущих событий сервера.
              </p>
              <Button href={SERVER.discordInvite} variant="secondary">
                Join our Discord
              </Button>
            </div>
            <div className="msh-discord-logo" aria-hidden="true" />
          </div>
        </section>
      </Reveal>
    </div>
  );
}
