import { Metadata } from "next";
import { StartForm } from "@/components/forms/start-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SERVER } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Начать играть",
  description:
    "Пошаговый старт на Mushoku Reincarnation: установка сборки, подключение к серверу и Discord.",
};

const troubleshooting = [
  "Не запускается сборка: обновите Java до 17+ и выделите 4-6 GB RAM.",
  "Лаунчер зависает на проверке файлов: очистите кэш и перекачайте модпак.",
  "Высокий пинг: включите ближайший регион VPN-ноды или проверьте DNS.",
  "Не пускает на сервер: проверьте версию клиента и whitelist в Discord.",
];

export default function StartPage() {
  return (
    <div className="container-page space-y-8 py-12">
      <header className="surface p-8">
        <h1 className="page-title">Начать играть за 5 минут</h1>
        <p className="mt-3 max-w-3xl text-muted">
          Шаги ниже покрывают установку, первый вход и базовые ограничения.
          Если застрянешь, используй форму помощи или пиши в Discord.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <Card title="1. Установка сборки">
          <p className="text-sm text-muted">
            Скачай официальный модпак и установи через Prism Launcher или
            CurseForge.
          </p>
          <Button href={SERVER.launcherUrl} className="mt-4">
            Скачать сборку
          </Button>
        </Card>
        <Card title="2. Добавление IP">
          <p className="text-sm text-muted">Открой Multiplayer и добавь сервер:</p>
          <code className="mt-3 inline-flex rounded bg-[#081224] px-2 py-1 text-sm">
            {SERVER.ip}
          </code>
        </Card>
        <Card title="3. Вход в Discord">
          <p className="text-sm text-muted">
            Пройди верификацию и выбери стартовый класс для доступа к гайдам.
          </p>
          <Button href={SERVER.discordInvite} variant="secondary" className="mt-4">
            Вступить в Discord
          </Button>
        </Card>
        <Card title="4. Базовые правила">
          <p className="text-sm text-muted">
            До первого выхода в мир прочитай правила PvP, рейдов и донат-политику.
          </p>
          <Button href="/rules" variant="ghost" className="mt-4">
            Читать правила
          </Button>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Card title="Troubleshooting">
          <ul className="list-inside list-disc space-y-2 text-sm text-muted">
            {troubleshooting.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
        <StartForm />
      </section>
    </div>
  );
}
