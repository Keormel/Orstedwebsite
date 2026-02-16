import { MetadataRoute } from "next";
import { classData } from "@/lib/constants";
import { getNewsPosts } from "@/lib/strapi";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mushoku-reincarnation.ru";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/start",
    "/lore",
    "/classes",
    "/rules",
    "/news",
    "/events",
    "/donate",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
    lastModified: new Date(),
  }));

  const classRoutes = classData.map((item) => ({
    url: `${baseUrl}/classes/${item.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    lastModified: new Date(),
  }));

  const news = await getNewsPosts();
  const newsRoutes = news.map((post) => ({
    url: `${baseUrl}/news/${post.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.65,
    lastModified: new Date(post.publishedAt),
  }));

  return [...staticRoutes, ...classRoutes, ...newsRoutes];
}
