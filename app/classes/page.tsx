import ClassCard from "@/components/ClassCard";
import MotionReveal from "@/components/MotionReveal";
import Section from "@/components/Section";
import { classes } from "@/data/classes";

export default function ClassesPage() {
  return (
    <>
      <section className="mx-auto mt-16 w-full max-w-[1200px] px-4 sm:px-6">
        <MotionReveal className="rounded-[32px] border border-white/10 bg-panel p-8 sm:p-12">
          <p className="font-rune text-3xl uppercase text-gold">классы</p>
          <h1 className="mt-4 font-pixel text-2xl leading-[1.65] text-white sm:text-4xl">Пути персонажа</h1>
          <p className="mt-6 max-w-3xl font-rune text-3xl leading-9 text-white/60">
            Система классов соединяет школы меча, магию, поддержку и ремесло. Выбор можно развивать через квесты, наставников и события.
          </p>
        </MotionReveal>
      </section>

      <Section className="mt-24" title="Все классы">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {classes.map((item) => (
            <ClassCard key={item.slug} item={item} />
          ))}
        </div>
      </Section>
    </>
  );
}
