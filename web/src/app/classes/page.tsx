import Link from "next/link";
import { Metadata } from "next";
import { ClassesHub } from "@/components/classes/classes-hub";
import { getClasses } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Классы",
  description: "Тактический центр классов: роли, синергии и рекомендации под стиль игры.",
};

const onboardingFlow = [
  {
    step: "01",
    title: "Выбери стиль боя",
    text: "Определи, хочешь ли ты танковать, наносить burst-урон, играть от контроля или быть саппорт-ядром группы.",
  },
  {
    step: "02",
    title: "Собери расовую синергию",
    text: "Подбери расу под класс, чтобы усилить сильные стороны и сгладить уязвимости в ранней игре.",
  },
  {
    step: "03",
    title: "Открой полный профиль",
    text: "Изучи навыки и ротации класса, затем переходи к старту через пошаговый гайд.",
  },
];

export default async function ClassesPage() {
  const classData = await getClasses();

  return (
    <div className="class-page">
      <div className="container-page py-8 sm:py-12">
        <header className="class-hero">
          <div className="class-hero-badge">Академия ролей</div>
          <h1 className="class-hero-title">Классовый терминал сервера</h1>
          <p className="class-hero-text">
            Эта страница создана как тактический хаб: выбирай класс, проверяй синергию с расой
            и сразу переходи к боевой роли, которая подходит именно твоему стилю игры.
          </p>
          <div className="class-hero-actions">
            <Link href="/start" className="class-hero-link class-hero-link-solid">
              Перейти к старту
            </Link>
            <Link href="/rules" className="class-hero-link">
              Правила классового PvP
            </Link>
          </div>
        </header>

        <ClassesHub classes={classData} />

        <section className="class-matrix">
          <div className="class-matrix-head">
            <h2>Матрица ролей</h2>
            <p>
              Быстрый обзор: что дает каждый класс команде, в чем его пик и где требуется
              поддержка союзников.
            </p>
          </div>
          <div className="class-matrix-grid">
            {classData.map((item) => (
              <article key={item.slug} className="class-matrix-card">
                <p className="class-matrix-title">{item.name}</p>
                <p className="class-matrix-sub">{item.role}</p>
                <p className="class-matrix-kicker">Командная ценность</p>
                <p className="class-matrix-copy">{item.strengths[0] ?? item.tagline}</p>
                <p className="class-matrix-kicker">Что компенсировать</p>
                <p className="class-matrix-copy">{item.weaknesses[0] ?? "Требует аккуратной игры."}</p>
                <Link href={`/classes/${item.slug}`} className="selection-link mt-4 inline-flex text-sm">
                  Детальный разбор
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="class-flow">
          <h2>Как выбрать класс за 3 шага</h2>
          <div className="class-flow-grid">
            {onboardingFlow.map((item) => (
              <article key={item.step} className="class-flow-card">
                <p className="class-flow-step">{item.step}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
