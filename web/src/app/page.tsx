import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DiscordEmbed } from "@/components/discord-embed";
import { TrailerGallery } from "@/components/trailer-gallery";
import { CopyIpButton } from "@/components/copy-ip-button";
import { LaunchCountdown } from "@/components/launch-countdown";
import { Reveal } from "@/components/ui/reveal";
import {
  DaggerIcon,
  ShieldIcon,
  SparkIcon,
  SwordIcon,
} from "@/components/ui/icons";
import { SERVER } from "@/lib/constants";
import { getClasses, getFaqItems, getNewsPosts } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Главная",
  description:
    "Вступай на RPG Minecraft сервер Orsted Project. Быстрый старт за 3 шага.",
};

const projectPillars = [
  {
    title: "Ролевая глубина",
    description:
      "Классы, ветки развития и сценарии прохождения формируют уникальный стиль игры.",
    icon: SparkIcon,
  },
  {
    title: "Честный прогресс",
    description:
      "Результат зависит от активности в игре, а не от доната. PvP остаётся конкурентным.",
    icon: ShieldIcon,
  },
  {
    title: "Живое сообщество",
    description:
      "Объединения гильдий, совместные события и голосовые активности создают динамику каждый вечер.",
    icon: SwordIcon,
  },
];

const classIcons = {
  guardian: ShieldIcon,
  warrior: SwordIcon,
  assassin: DaggerIcon,
  mage: SparkIcon,
};

const classArt = {
  guardian: "/assets/external/oga-heroes/PNG/Knight/knight.png",
  warrior: "/assets/external/oga-heroes/PNG/Knight/Attack/attack1.png",
  assassin: "/assets/external/oga-heroes/PNG/Rogue/rogue.png",
  mage: "/assets/external/oga-heroes/PNG/Mage/mage.png",
};

export default async function HomePage() {
  const classes = await getClasses();
  const news = await getNewsPosts();
  const faq = await getFaqItems();

  return (
    <div className="minecraft-home pb-20">
      <Reveal>
        <section className="hero-section hero-section-centered grid gap-6 px-4 py-8 sm:py-12 md:py-16">
        <div className="hero-cloud hero-cloud-one" />
        <div className="hero-cloud hero-cloud-two" />
        <div className="hero-character hero-character-left" aria-hidden="true" />
        <div className="hero-character hero-character-right" aria-hidden="true" />
        <div className="hero-panel surface relative overflow-hidden p-5 sm:p-8 md:p-10">
          <div className="hero-logo-mark" aria-hidden="true" />
          <Badge tone="gold">Minecraft RPG сервер</Badge>
          <h1 className="page-title mt-5 max-w-2xl">{SERVER.name}</h1>
          <p className="lead-print mt-4 max-w-2xl text-muted">
            {SERVER.slogan}
          </p>
          <div className="hero-online-line" aria-label="Сервер онлайн">
            <span className="status-lamp status-lamp-online" aria-hidden="true" />
            <span>Сервер онлайн</span>
          </div>
          <LaunchCountdown />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/start">Играть сейчас</Button>
            <Button href={SERVER.discordInvite} variant="secondary">
              Discord
            </Button>
            <Button href={SERVER.launcherUrl} variant="ghost">
              Скачать сборку
            </Button>
            <Button href={SERVER.rulesAnchor} variant="ghost">
              Правила
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-xs">
            <Badge tone="muted">IP: {SERVER.ip}</Badge>
            <Badge tone="muted">Версия: {SERVER.version}</Badge>
            <Badge tone="accent">Онлайн обновляется каждые 60 сек.</Badge>
          </div>
        </div>
        </section>
        <div className="divider-grass" />
      </Reveal>

      <Reveal delayMs={60}>
        <section className="section-band sky-light-band container-page py-6">
          <h2 className="text-2xl sm:text-3xl">Что это за сервер</h2>
          <div className="surface mt-4 p-5 sm:p-7">
            <p className="lead-plain">
              Orsted Project это атмосферный RPG-сервер в Minecraft,
              где развитие персонажа строится через классовую систему, сюжетные линии
              и коллективную игру в гильдиях.
            </p>
            <p className="lead-plain mt-4">
              В мире постоянно идет борьба за влияние: осады, локальные конфликты,
              сезонные события и ивенты. Прогресс обновляется по сезонам, но история
              мира и его политический контекст продолжают развиваться без обнуления лора.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal delayMs={90}>
        <section className="section-band stone-pattern classes-section py-10">
        <div className="container-page">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl sm:text-3xl">Классы</h2>
          <Link href="/classes" className="text-sm text-[var(--color-link)]">
            Открыть все классы
          </Link>
        </div>
        <div className="class-card-grid grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {classes.map((item) => {
            const Icon = classIcons[item.slug];
            return (
              <Card key={item.slug} title={item.name} description={item.tagline} className="class-card">
                <div className="class-card-avatar" aria-hidden="true">
                  <Image
                    src={classArt[item.slug]}
                    alt=""
                    width={96}
                    height={132}
                    unoptimized
                  />
                </div>
                <div className="mb-3 inline-flex border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-2 text-[var(--color-accent)]">
                  <Icon />
                </div>
                <p className="text-sm text-muted">{item.role}</p>
                <Link
                  href={`/classes/${item.slug}`}
                  className="mt-4 inline-flex text-sm text-[var(--color-link)]"
                >
                  Подробнее о классе
                </Link>
              </Card>
            );
          })}
        </div>
        </div>
        </section>
      </Reveal>

      <Reveal delayMs={120}>
        <section className="section-band wood-pattern join-section py-10">
        <div className="container-page">
        <div className="surface join-panel p-5 sm:p-7">
          <h2 className="text-2xl sm:text-3xl">Как присоединиться</h2>
          <div className="join-steps mt-5 grid gap-4 md:grid-cols-3">
            <Card title="Открой Minecraft" description={`Версия сервера: ${SERVER.version}.`} />
            <Card title="Добавь сервер" description="Вставь IP в список мультиплеера.">
              <CopyIpButton />
            </Card>
            <Card title="Заходи в Discord" description="Новости, пати, поддержка и набор в гильдии." />
          </div>
        </div>
        </div>
        </section>
      </Reveal>

      <Reveal delayMs={150}>
        <section className="section-band container-page py-8">
        <h2 className="text-2xl sm:text-3xl">Прогресс и система</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Card
            title="Сезоны"
            description="Каждые 3-4 месяца новый цикл прогресса и рейтинга."
          />
          <Card
            title="Гильдии"
            description="Экономика, дипломатия, PvP-политика и роли офицеров."
          />
          <Card
            title="Войны и ивенты"
            description="Еженедельные осады, мировые боссы и турнирные уикенды."
          />
        </div>
        </section>
      </Reveal>

      <Reveal delayMs={180}>
        <section className="section-band news-section container-page py-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl sm:text-3xl">Последние новости</h2>
          <Link href="/news" className="text-sm text-[var(--color-link)]">
            Все публикации
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {news.slice(0, 3).map((post) => (
            <Card key={post.id} title={post.title} description={post.summary}>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
                <Badge tone="muted">{post.tag}</Badge>
                <time>{new Date(post.publishedAt).toLocaleDateString("ru-RU")}</time>
              </div>
            </Card>
          ))}
        </div>
        </section>
      </Reveal>

      <Reveal delayMs={210}>
        <section className="section-band container-page py-8">
        <h2 className="text-2xl sm:text-3xl">Трейлер и галерея</h2>
        <div className="mt-4">
          <TrailerGallery />
        </div>
        </section>
      </Reveal>

      <Reveal delayMs={240}>
        <section className="section-band container-page py-8">
        <div className="surface p-5 sm:p-7">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl sm:text-3xl">Что делает сервер особенным</h2>
            <Badge tone="gold">Обновлено</Badge>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {projectPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article key={pillar.title} className="fancy-border rounded-xl bg-[var(--color-bg-elevated)] p-4">
                  <div className="inline-flex rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-2 text-[var(--color-accent)]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="mt-3 text-base text-[var(--color-text-primary)]">{pillar.title}</p>
                  <p className="mt-1 text-sm text-muted">{pillar.description}</p>
                </article>
              );
            })}
          </div>
        </div>
        </section>
      </Reveal>

      <Reveal delayMs={270}>
        <section className="discord-section grid gap-4 py-10 md:grid-cols-2">
        <div className="container-page contents">
        <div>
          <h2 className="mb-4 text-3xl">FAQ</h2>
          <Accordion items={faq} />
        </div>
        <DiscordEmbed />
        </div>
        </section>
      </Reveal>
    </div>
  );
}
