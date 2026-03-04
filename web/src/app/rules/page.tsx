import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { RulesSearch, RuleSection } from "@/components/rules-search";
import { SERVER } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Правила",
  description:
    "Общие правила, PvP/PvE, войны и рейды, донат-политика без P2W.",
};

const sections: RuleSection[] = [
  {
    id: "general",
    title: "Общие",
    items: [
      "Уважай игроков и модераторов, токсичность и оскорбления запрещены.",
      "Запрещены читы, x-ray, auto-clicker, дюпы и exploit-плагины.",
      "Ники и скины без провокационного контента.",
    ],
  },
  {
    id: "pvp-pve",
    title: "PvP / PvE",
    items: [
      "Spawn-kill и затяжной кемп новичков запрещены.",
      "В PvE-зонах не использовать урон по союзникам через механики.",
      "Боссы и рейдовые сундуки распределяются по правилам гильдии.",
    ],
  },
  {
    id: "wars-raids",
    title: "Войны / рейды",
    items: [
      "Осады доступны только в установленные тайм-слоты.",
      "Рейды на базы вне окна войны считаются grief и наказываются.",
      "Дипломатические договоры публикуются в Discord-канале гильдий.",
    ],
  },
  {
    id: "donate",
    title: "Донат-политика",
    items: [
      "Без P2W: нет предметов, дающих боевое преимущество.",
      "Доступны только косметика, титулы, эмоции и визуальные эффекты.",
      "Возврат платежей по условиям оферты в течение 14 дней.",
    ],
  },
];

export default function RulesPage() {
  return (
    <div className="container-page space-y-6 py-8 sm:space-y-8 sm:py-12">
      <header className="surface p-5 sm:p-8">
        <h1 className="page-title">Правила сервера</h1>
        <p className="mt-3 max-w-3xl text-muted">
          Используй поиск и якоря для быстрого доступа к нужному разделу.
        </p>
        <nav className="mt-4 flex flex-wrap gap-2 text-sm">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-md border border-[#2a5151] px-3 py-1 text-muted hover:text-white"
            >
              {section.title}
            </a>
          ))}
        </nav>
        <div className="mt-5 rounded-xl border border-[#2e6861] bg-[#0b2b2a] p-4">
          <p className="text-sm text-muted">
            Нужен полный юридический и технический свод? Открой расширенную версию правил.
          </p>
          <Button href={SERVER.fullRulesUrl} className="mt-3" variant="secondary">
            Полный свод правил
          </Button>
        </div>
      </header>
      <RulesSearch sections={sections} />
    </div>
  );
}
