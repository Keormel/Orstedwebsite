export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
};

export const news: NewsItem[] = [
  {
    slug: "mt-rpg-pack",
    title: "MT RPG Pack готовится к закрытому тесту",
    excerpt:
      "В тестовую сборку вошли боевые стойки, ранние квесты академии Раноа, базовые классы и первая версия экономики гильдий.",
    date: "21.05.2026",
    category: "Разработка",
    image: "/images/server-ranoa.jpg"
  },
  {
    slug: "reincarnation-start",
    title: "Система перерождения получила новые ветки",
    excerpt:
      "Игрок сможет выбрать происхождение, стартовый талант и слабость. Эти решения будут влиять на диалоги, обучение и боевые бонусы.",
    date: "18.05.2026",
    category: "Геймплей",
    image: "/images/gallery-02.webp"
  },
  {
    slug: "ranoa-academy",
    title: "Открыт набор в академию магии",
    excerpt:
      "Первые сюжетные события пройдут вокруг экзаменов, дуэлей и поиска редких реагентов для преподавателей академии.",
    date: "14.05.2026",
    category: "События",
    image: "/images/server-fittoa.jpg"
  },
  {
    slug: "guild-orders",
    title: "Гильдейские заказы станут основой прогрессии",
    excerpt:
      "Контракты будут связывать ремесленников, боевые отряды и исследователей, чтобы экономика сервера работала через игроков.",
    date: "09.05.2026",
    category: "Экономика",
    image: "/images/gallery-04.webp"
  }
];
