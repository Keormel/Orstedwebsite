import { Metadata } from "next";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Донат",
  description: "Косметический магазин без P2W: титулы, эффекты и визуальные наборы.",
};

const donateFaq = [
  {
    q: "Можно купить преимущества в бою?",
    a: "Нет. Любой контент с влиянием на PvP/PvE баланс запрещен политикой проекта.",
  },
  {
    q: "Что входит в донат?",
    a: "Только косметика: титулы, ауры, анимации входа, уникальные эмодзи и рамки профиля.",
  },
  {
    q: "Можно ли вернуть покупку?",
    a: "Да, если товар не был активирован и с момента оплаты прошло не более 14 дней.",
  },
];

export default function DonatePage() {
  return (
    <div className="container-page space-y-8 py-12">
      <header className="surface p-8">
        <Badge tone="gold">No Pay-to-Win</Badge>
        <h1 className="page-title mt-4">Донат без P2W</h1>
        <p className="mt-3 max-w-3xl text-muted">
          Поддержка проекта строится на визуальном контенте и статусных элементах,
          не влияющих на боевую эффективность.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <Card title="Косметика" description="Скины питомцев, маунтов и визуальные сеты." />
        <Card title="Титулы" description="Редкие подписи, рамки ника и карточки профиля." />
        <Card title="Эффекты" description="Ауры, следы частиц, анимации телепорта и входа." />
      </section>

      <section>
        <h2 className="mb-4 text-3xl">FAQ</h2>
        <Accordion items={donateFaq} />
      </section>
    </div>
  );
}
