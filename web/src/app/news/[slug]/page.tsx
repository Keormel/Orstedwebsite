import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { getNewsBySlug, getNewsPosts } from "@/lib/strapi";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getNewsPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
    },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  if (!post) notFound();

  return (
    <article className="container-page py-12">
      <header className="surface p-8">
        <Badge tone="accent">{post.tag}</Badge>
        <h1 className="mt-4 text-5xl">{post.title}</h1>
        <p className="mt-3 text-sm text-muted">
          {new Date(post.publishedAt).toLocaleDateString("ru-RU")}
        </p>
        <p className="mt-4 text-base text-muted">{post.summary}</p>
      </header>
      <section className="surface mt-6 p-8">
        <p className="leading-8 text-[#dce7f8]">{post.content}</p>
      </section>
    </article>
  );
}
