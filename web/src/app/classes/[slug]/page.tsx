import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getClasses } from "@/lib/strapi";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const classData = await getClasses();
  return classData.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const classData = await getClasses();
  const item = classData.find((entry) => entry.slug === slug);
  if (!item) return {};
  return {
    title: `Класс ${item.name}`,
    description: `${item.name}: роль, билды, навыки, сильные и слабые стороны.`,
  };
}

export default async function ClassDetailsPage({ params }: Props) {
  const { slug } = await params;
  const classData = await getClasses();
  const classInfo = classData.find((item) => item.slug === slug);
  if (!classInfo) notFound();

  return (
    <div className="container-page space-y-8 py-12">
      <header className="surface p-8">
        <Badge>{classInfo.path}</Badge>
        <h1 className="mt-4 text-5xl">{classInfo.name}</h1>
        <p className="mt-3 max-w-3xl text-muted">{classInfo.tagline}</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <Card title="Роль" description={classInfo.role} />
        <Card title="Путь развития" description={`Школа ${classInfo.path}`} />
        <Card title="Сильные стороны">
          <ul className="list-inside list-disc space-y-1 text-sm text-muted">
            {classInfo.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
        <Card title="Слабые стороны">
          <ul className="list-inside list-disc space-y-1 text-sm text-muted">
            {classInfo.weaknesses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="surface p-6">
        <h2 className="text-3xl">Примеры билдов</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {classInfo.builds.map((build) => (
            <div key={build} className="rounded-lg border border-[#2f4568] bg-[#0c182d] p-3 text-sm">
              {build}
            </div>
          ))}
        </div>
      </section>

      <section className="surface p-6">
        <h2 className="text-3xl">Ключевые навыки</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {classInfo.skills.map((skill) => (
            <article key={skill.name} className="rounded-lg border border-[#2f4568] bg-[#0c182d] p-4">
              <h3 className="text-lg">{skill.name}</h3>
              <p className="mt-2 text-sm text-muted">{skill.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
