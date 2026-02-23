import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SERVER } from "@/lib/constants";

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
          Открой интерактивную карту Dynmap/BlueMap для городов, дорог, фронтов и
          ресурсов.
        </p>
        <div className="mt-4">
          <Button href={SERVER.dynmapUrl}>Открыть карту</Button>
        </div>
        <div className="mt-6 aspect-[4/3] overflow-hidden rounded-xl border border-[#304464] sm:aspect-[16/7]">
          <iframe
            src={SERVER.dynmapUrl}
            title="Map embed"
            className="h-full w-full"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
}
