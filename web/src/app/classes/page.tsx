import Link from "next/link";
import { Metadata } from "next";
import { ClassRacePicker } from "@/components/class-race-picker";
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
    <div className="container-page space-y-6 py-8 sm:space-y-8 sm:py-12">
      <header className="surface relative overflow-hidden p-5 sm:p-8">
        <div className="parallax-layer absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[#2cd6a344] blur-3xl" />
        <h1 className="page-title">Классы и роли</h1>
        <p className="mt-3 max-w-3xl text-muted">
          Выбор класса определяет темп прокачки, роль в рейдах и возможности в PvP.
        </p>
      </header>

      <ClassRacePicker classes={classData} />

      <Tabs
        items={classData.map((item) => ({
          id: item.slug,
          label: item.name,
          content: (
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-sm text-muted">{item.tagline}</p>
                <p className="mt-2 text-sm text-muted">Роль: {item.role}</p>
                <p className="mt-2 text-sm text-muted">Путь: {item.path}</p>
              </div>
              <Link href={`/classes/${item.slug}`} className="selection-link inline-flex text-sm">
                Открыть полный гайд
              </Link>
            </div>
          ),
        }))}
      />

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {classData.map((item) => (
          <Card key={item.slug} title={item.name} description={item.tagline} className="class-profile-card">
            <ul className="list-inside list-disc text-sm text-muted">
              {item.strengths.slice(0, 2).map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
            <Link href={`/classes/${item.slug}`} className="selection-link mt-4 inline-flex text-sm">
              Профиль класса
            </Link>
          </Card>
        ))}
      </section>
    </div>
  );
}
