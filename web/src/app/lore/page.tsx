import { Metadata } from "next";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Лор / Мир",
  description:
    "Сеттинг мира Mushoku Reincarnation: фракции, города и карта мира для экспедиций.",
};

export default function LorePage() {
  return (
    <div className="container-page space-y-6 py-8 sm:space-y-8 sm:py-12">
      <header className="surface p-5 sm:p-8">
        <h1 className="page-title">Лор и мир</h1>
        <p className="mt-3 max-w-3xl text-muted">
          Континент разделен между магическими домами и гильдиями приключенцев.
          Академия Роа обучает магов, а северные земли питают военные кланы.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <Card
          title="Академия Роа"
          description="Центр исследований магии и ранговых экзаменов."
        />
        <Card
          title="Аэрфаэл"
          description="Столичный город с рынком артефактов и гильдейским залом."
        />
        <Card
          title="Северный Рубеж"
          description="Военные форты, рейды и охота на мировых боссов."
        />
      </section>

      <section className="surface p-5 sm:p-6">
        <h2 className="text-3xl">Карта мира</h2>
        <p className="mt-3 text-sm text-muted">
          Ниже отображается наша карта мира в PNG-формате. Можно заменить файл
          `web/public/assets/world-map.png` на актуальную версию без изменений в коде.
        </p>
        <div className="mt-6 overflow-hidden rounded-xl border border-[#2f6360]">
          <Image
            src="/assets/world-map.png"
            alt="Карта мира Mushoku Reincarnation"
            width={1920}
            height={1080}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      </section>
    </div>
  );
}
