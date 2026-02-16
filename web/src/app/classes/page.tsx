import Link from "next/link";
import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { getClasses } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Классы",
  description: "Гайды по 4 классам: Страж, Воин, Ассасин, Маг.",
};

export default async function ClassesPage() {
  const classData = await getClasses();
  return (
    <div className="container-page space-y-8 py-12">
      <header className="surface p-8">
        <h1 className="page-title">Классы и роли</h1>
        <p className="mt-3 max-w-3xl text-muted">
          Выбор класса определяет темп прокачки, роль в рейдах и возможности в PvP.
        </p>
      </header>

      <Tabs
        items={classData.map((item) => ({
          id: item.slug,
          label: item.name,
          content: (
            <div className="grid gap-4 md:grid-cols-[1fr_auto]">
              <div>
                <p className="text-sm text-muted">{item.tagline}</p>
                <p className="mt-2 text-sm text-muted">Роль: {item.role}</p>
                <p className="mt-2 text-sm text-muted">Путь: {item.path}</p>
              </div>
              <Link href={`/classes/${item.slug}`} className="text-sm text-[var(--accent)]">
                Открыть полный гайд
              </Link>
            </div>
          ),
        }))}
      />

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {classData.map((item) => (
          <Card key={item.slug} title={item.name} description={item.tagline}>
            <ul className="list-inside list-disc text-sm text-muted">
              {item.strengths.slice(0, 2).map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
            <Link href={`/classes/${item.slug}`} className="mt-4 inline-flex text-sm text-[var(--accent)]">
              Профиль класса
            </Link>
          </Card>
        ))}
      </section>
    </div>
  );
}
