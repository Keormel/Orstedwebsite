import Link from "next/link";
import { Metadata } from "next";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DiscordEmbed } from "@/components/discord-embed";
import { MinecraftStatusCard } from "@/components/minecraft-status-card";
import { TrailerGallery } from "@/components/trailer-gallery";
import { Reveal } from "@/components/ui/reveal";
import {
  CategoryIcon,
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
    "Вступай на RPG Minecraft сервер по вселенной Mushoku Tensei. Быстрый старт за 3 шага.",
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

const siteInnovations = [
  {
    title: "Печатная типографика",
    description: "Новый более книжный шрифт с улучшенной читаемостью на длинных текстах.",
    icon: SparkIcon,
  },
  {
    title: "Кнопка быстрого возврата",
    description: "После прокрутки появляется удобная кнопка для мгновенного возврата наверх.",
    icon: ShieldIcon,
  },
  {
    title: "Блок нововведений",
    description: "Ключевые изменения интерфейса вынесены в отдельную заметную секцию.",
    icon: CategoryIcon,
  },
];

export default async function HomePage() {
  const classes = await getClasses();
  const news = await getNewsPosts();
  const faq = await getFaqItems();

  return (
    <div className="pb-20">
      <Reveal>
        <section className="container-page grid gap-6 py-8 sm:py-12 md:grid-cols-[1.4fr_1fr] md:py-16">
        <div className="surface relative overflow-hidden p-5 sm:p-8 md:p-10">
          <div className="parallax-layer absolute -right-12 -top-12 h-56 w-56 rounded-full bg-[#2aaee644] blur-3xl" />
          <Badge tone="gold">Minecraft RPG сервер</Badge>
          <h1 className="page-title mt-5 max-w-2xl">{SERVER.name}</h1>
          <p className="lead-print mt-4 max-w-2xl text-muted">
            {SERVER.slogan}
          </p>
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
        <MinecraftStatusCard />
        </section>
      </Reveal>

      <Reveal delayMs={40}>
        <section className="container-page py-4 sm:py-6">
          <div className="surface p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl sm:text-3xl">Нововведения</h2>
              <Badge tone="accent">UI Update</Badge>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {siteInnovations.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="innovation-tile p-4">
                    <div className="inline-flex rounded-lg border border-[#3a5d84] bg-[#0d2136] p-2 text-[var(--accent)]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="mt-3 text-base text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-muted">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal delayMs={60}>
        <section className="container-page py-6">
        <h2 className="text-2xl sm:text-3xl">Что это за сервер</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {[
            "Классовая RPG система с ветками развития и билдами.",
            "Сезонный прогресс: обнуляется гонка, но не лор мира.",
            "Гильдейские войны и ивенты с расписанием.",
            "Академия магии и фракционные города как социальный хаб.",
          ].map((point) => (
            <Card key={point} description={point} />
          ))}
        </div>
        </section>
      </Reveal>

      <Reveal delayMs={90}>
        <section className="container-page py-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl sm:text-3xl">Классы</h2>
          <Link href="/classes" className="text-sm text-[var(--accent)]">
            Открыть все классы
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {classes.map((item) => {
            const Icon = classIcons[item.slug];
            return (
              <Card key={item.slug} title={item.name} description={item.tagline}>
                <div className="mb-3 inline-flex rounded-lg border border-[#2f4568] bg-[#0d1a30] p-2 text-[var(--accent)]">
                  <Icon />
                </div>
                <p className="text-sm text-muted">{item.role}</p>
                <Link
                  href={`/classes/${item.slug}`}
                  className="mt-4 inline-flex text-sm text-[var(--accent)]"
                >
                  Гайды и билды
                </Link>
              </Card>
            );
          })}
        </div>
        </section>
      </Reveal>

      <Reveal delayMs={120}>
        <section className="container-page py-8">
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

      <Reveal delayMs={150}>
        <section className="container-page py-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl sm:text-3xl">Последние новости</h2>
          <Link href="/news" className="text-sm text-[var(--accent)]">
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

      <Reveal delayMs={180}>
        <section className="container-page py-8">
        <h2 className="text-2xl sm:text-3xl">Трейлер и галерея</h2>
        <div className="mt-4">
          <TrailerGallery />
        </div>
        </section>
      </Reveal>

      <Reveal delayMs={210}>
        <section className="container-page py-8">
        <div className="surface p-5 sm:p-7">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl sm:text-3xl">Что делает сервер особенным</h2>
            <Badge tone="gold">Обновлено</Badge>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {projectPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article key={pillar.title} className="fancy-border rounded-xl bg-[#0b1629] p-4">
                  <div className="inline-flex rounded-lg border border-[#2f4568] bg-[#0d2136] p-2 text-[var(--gold)]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="mt-3 text-base text-white">{pillar.title}</p>
                  <p className="mt-1 text-sm text-muted">{pillar.description}</p>
                </article>
              );
            })}
          </div>
        </div>
        </section>
      </Reveal>

      <Reveal delayMs={240}>
        <section className="container-page grid gap-4 py-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-3xl">FAQ</h2>
          <Accordion items={faq} />
        </div>
        <DiscordEmbed />
        </section>
      </Reveal>
    </div>
  );
}
