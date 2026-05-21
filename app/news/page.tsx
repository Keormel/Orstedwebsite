import MotionReveal from "@/components/MotionReveal";
import NewsCard from "@/components/NewsCard";
import Section from "@/components/Section";
import { news } from "@/data/news";

export default function NewsPage() {
  return (
    <>
      <section className="mx-auto mt-16 w-full max-w-[1200px] px-4 sm:px-6">
        <MotionReveal className="rounded-[32px] border border-white/10 bg-panel p-8 sm:p-12">
          <p className="font-rune text-3xl uppercase text-gold">новости</p>
          <h1 className="mt-4 font-pixel text-2xl leading-[1.65] text-white sm:text-4xl">Новости проекта</h1>
          <p className="mt-6 max-w-3xl font-rune text-3xl leading-9 text-white/60">
            Разработка модпака, события, изменения баланса и важные объявления для игроков OrstedProject.
          </p>
        </MotionReveal>
      </section>

      <Section className="mt-24" title="Все публикации">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {news.map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>
      </Section>
    </>
  );
}
