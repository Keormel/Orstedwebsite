import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { events } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Ивенты",
  description: "Календарь и архив событий сервера Mushoku Reincarnation.",
};

const NOW_TS = Date.now();

export default function EventsPage() {
  const upcoming = events.filter((event) => new Date(event.endsAt).getTime() >= NOW_TS);
  const archived = events.filter((event) => new Date(event.endsAt).getTime() < NOW_TS);

  return (
    <div className="container-page space-y-8 py-12">
      <header className="surface p-8">
        <h1 className="page-title">Ивенты</h1>
        <p className="mt-3 max-w-3xl text-muted">
          Регулярные осады, PvE-сценарии и PvP-турниры. Актуальные события сверху,
          завершенные в архиве.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-3xl">Календарь</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {upcoming.map((event) => (
            <Card key={event.id} title={event.title} description={event.summary}>
              <div className="space-y-1 text-sm text-muted">
                <p>Локация: {event.location}</p>
                <p>
                  Время: {new Date(event.startsAt).toLocaleString("ru-RU")} -{" "}
                  {new Date(event.endsAt).toLocaleTimeString("ru-RU")}
                </p>
              </div>
              <div className="mt-3">
                <Badge tone="accent">Скоро</Badge>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-3xl">Архив</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {archived.map((event) => (
            <Card key={event.id} title={event.title} description={event.summary}>
              <p className="text-sm text-muted">{new Date(event.startsAt).toLocaleDateString("ru-RU")}</p>
              <div className="mt-3">
                <Badge tone="muted">Завершено</Badge>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
