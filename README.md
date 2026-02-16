# Mushoku Reincarnation MVP

Production-ready MVP сайта для Minecraft-сервера во вселенной Mushoku Tensei.

## Stack

- Next.js 16 (App Router) + TypeScript + TailwindCSS
- Strapi (Headless CMS)
- PostgreSQL
- Discord embed/invite integration
- Minecraft Server Status API (`api.mcsrvstat.us`)
- Docker + Docker Compose
- SEO: metadata, OG, sitemap, robots

## Project Structure

- `web/` - фронтенд (Next.js)
- `cms/` - контейнер и bootstrap Strapi
- `docker-compose.yml` - запуск web + cms + postgres
- `.env.example` - переменные окружения

## Pages

- `/` - landing
- `/start` - начать играть
- `/lore` - лор/мир + карта
- `/classes` + `/classes/[slug]` - классы и гайды
- `/rules` - правила с поиском и якорями
- `/news` + `/news/[slug]` - новости/патчноуты
- `/events` - календарь и архив
- `/donate` - донат без P2W

## Local Development (without Docker)

```bash
cd web
cp .env.example .env.local
npm install
npm run dev
```

## Run with Docker (one command)

1. Create `.env` from `.env.example` in project root.
2. Start all services:

```bash
docker compose up --build
```

Services:

- Frontend: `http://localhost:3000`
- Strapi admin: `http://localhost:1337/admin`
- PostgreSQL: `localhost:5432`

## Strapi CMS Content Types

Создай в Strapi коллекции:

1. `news-posts`
2. `patchnotes`
3. `events`
4. `faq-items`
5. `classes`

Минимальные поля для `news-posts`:

- `title` (text)
- `slug` (uid)
- `excerpt` (text)
- `content` (rich text / long text)
- `tag` (enumeration: Баланс, Ивенты, Техработы, Сезон)
- `publishedAt` (datetime)

После этого создай API token с правами `read` и вставь в `STRAPI_API_TOKEN`.

## Security / NFR

- Validation on forms (`zod`)
- Anti-spam honeypot field
- Basic in-memory rate limit for `/api/start`
- Mobile-first layout
- Optimized images via `next/image`

## Notes for V2

Архитектура готова к расширению под личный кабинет:

- добавить auth provider (NextAuth / custom JWT)
- связать Minecraft UUID + Discord ID
- добавить private routes `/account/*`
