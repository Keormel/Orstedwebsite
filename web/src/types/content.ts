export type ClassSlug = "guardian" | "warrior" | "assassin" | "mage";

export type ClassInfo = {
  slug: ClassSlug;
  name: string;
  tagline: string;
  role: string;
  strengths: string[];
  weaknesses: string[];
  path: "Воды" | "Севера" | "Меча" | "Таинств";
  builds: string[];
  skills: { name: string; description: string }[];
};

export type NewsTag = "Баланс" | "Ивенты" | "Техработы" | "Сезон";

export type NewsPost = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  publishedAt: string;
  tag: NewsTag;
};

export type EventItem = {
  id: string;
  title: string;
  startsAt: string;
  endsAt: string;
  location: string;
  summary: string;
};

export type FaqItem = {
  q: string;
  a: string;
};
