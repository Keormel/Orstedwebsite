import { classData, fallbackFaq, fallbackNews } from "@/lib/constants";
import { ClassInfo, FaqItem, NewsPost } from "@/types/content";

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

type StrapiArticle = {
  id: number;
  documentId?: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  publishedAt?: string;
  tag?: NewsPost["tag"];
};

type StrapiFaq = {
  id: number;
  question?: string;
  answer?: string;
};

type StrapiClass = {
  id: number;
  slug?: ClassInfo["slug"];
  name?: string;
  tagline?: string;
  role?: string;
  path?: ClassInfo["path"];
  strengths?: string[];
  weaknesses?: string[];
  builds?: string[];
  skills?: { name: string; description: string }[];
};

async function fetchFromStrapi<T>(path: string): Promise<T | null> {
  if (!STRAPI_URL) return null;

  const headers: HeadersInit = {};
  if (STRAPI_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_TOKEN}`;
  }

  try {
    const response = await fetch(`${STRAPI_URL}${path}`, {
      headers,
      next: { revalidate: 60 },
    });

    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getNewsPosts(): Promise<NewsPost[]> {
  const data = await fetchFromStrapi<{ data: StrapiArticle[] }>(
    "/api/news-posts?sort=publishedAt:desc&pagination[limit]=12",
  );

  if (!data?.data?.length) {
    return fallbackNews;
  }

  return data.data.map((post) => ({
    id: post.documentId ?? String(post.id),
    slug: post.slug ?? `post-${post.id}`,
    title: post.title ?? "Без названия",
    summary: post.excerpt ?? "Описание скоро появится.",
    content: post.content ?? "",
    publishedAt: post.publishedAt ?? new Date().toISOString(),
    tag: post.tag ?? "Ивенты",
  }));
}

export async function getNewsBySlug(slug: string): Promise<NewsPost | null> {
  const posts = await getNewsPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getFaqItems(): Promise<FaqItem[]> {
  const data = await fetchFromStrapi<{ data: StrapiFaq[] }>(
    "/api/faq-items?sort=createdAt:asc&pagination[limit]=20",
  );

  if (!data?.data?.length) return fallbackFaq;

  return data.data
    .map((item) => ({
      q: item.question ?? "",
      a: item.answer ?? "",
    }))
    .filter((item) => item.q && item.a);
}

export async function getClasses(): Promise<ClassInfo[]> {
  const data = await fetchFromStrapi<{ data: StrapiClass[] }>(
    "/api/classes?pagination[limit]=20",
  );

  if (!data?.data?.length) return classData;

  return data.data.map((item, idx) => {
    const fallback = classData[idx % classData.length];
    return {
      slug: item.slug ?? fallback.slug,
      name: item.name ?? fallback.name,
      tagline: item.tagline ?? fallback.tagline,
      role: item.role ?? fallback.role,
      path: item.path ?? fallback.path,
      strengths: item.strengths ?? fallback.strengths,
      weaknesses: item.weaknesses ?? fallback.weaknesses,
      builds: item.builds ?? fallback.builds,
      skills: item.skills ?? fallback.skills,
    };
  });
}
