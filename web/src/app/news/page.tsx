import Link from "next/link";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getNewsPosts } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Новости и патчноуты",
  description:
    "Лента новостей, патчноутов и сезонных анонсов с тегами: Баланс, Ивенты, Техработы, Сезон.",
};

const tags = ["Баланс", "Ивенты", "Техработы", "Сезон"];

export default async function NewsPage() {
  const posts = await getNewsPosts();

  return (
    <div className="container-page space-y-8 py-12">
      <header className="surface p-8">
        <h1 className="page-title">Новости и патчноуты</h1>
        <p className="mt-3 text-muted">
          Контент публикуется через Strapi. Поддерживаются SEO-friendly URL по slug.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} tone="muted">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <Card key={post.id} title={post.title} description={post.summary}>
            <div className="flex items-center justify-between text-xs text-muted">
              <Badge tone="accent">{post.tag}</Badge>
              <time>{new Date(post.publishedAt).toLocaleDateString("ru-RU")}</time>
            </div>
            <Link href={`/news/${post.slug}`} className="mt-4 inline-flex text-sm text-[var(--accent)]">
              Читать
            </Link>
          </Card>
        ))}
      </section>
    </div>
  );
}
