"use client";

import Link from "next/link";
import { useMemo, useState, type ComponentType } from "react";
import { DaggerIcon, ShieldIcon, SparkIcon, SwordIcon } from "@/components/ui/icons";
import type { ClassInfo, ClassSlug } from "@/types/content";

type RaceId = "human" | "demon" | "beast" | "sky";

type RaceMeta = {
  id: RaceId;
  name: string;
  bonus: string;
};

type ClassesHubProps = {
  classes: ClassInfo[];
};

const races: RaceMeta[] = [
  { id: "human", name: "Люди", bonus: "универсальный старт и стабильный темп" },
  { id: "demon", name: "Демоны", bonus: "высокий burst и рискованный плейстайл" },
  { id: "beast", name: "Зверолюди", bonus: "мобильность и контроль темпа боя" },
  { id: "sky", name: "Небесные", bonus: "саппорт-руны и командные усиления" },
];

const classIcons: Record<ClassSlug, ComponentType<{ className?: string }>> = {
  guardian: ShieldIcon,
  warrior: SwordIcon,
  assassin: DaggerIcon,
  mage: SparkIcon,
};

export function ClassesHub({ classes }: ClassesHubProps) {
  const [activeClassSlug, setActiveClassSlug] = useState<ClassSlug>(classes[0]?.slug ?? "guardian");
  const [activeRaceId, setActiveRaceId] = useState<RaceId>("human");

  const activeClass = useMemo(
    () => classes.find((item) => item.slug === activeClassSlug) ?? classes[0],
    [activeClassSlug, classes],
  );
  const activeRace = useMemo(
    () => races.find((item) => item.id === activeRaceId) ?? races[0],
    [activeRaceId],
  );

  if (!activeClass || !activeRace) return null;

  const ActiveIcon = classIcons[activeClass.slug] ?? ShieldIcon;

  return (
    <section className="class-hub">
      <div className="class-hub-grid">
        <aside className="class-lane">
          <p className="class-kicker">Классы</p>
          <div className="class-lane-list">
            {classes.map((item) => {
              const Icon = classIcons[item.slug] ?? ShieldIcon;
              const active = item.slug === activeClass.slug;
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setActiveClassSlug(item.slug)}
                  className={`class-pick ${active ? "class-pick-active" : ""}`}
                  aria-pressed={active}
                >
                  <span className="class-pick-icon">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="class-pick-label">{item.name}</span>
                  <span className="class-pick-role">{item.role}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="class-stage">
          <div className="class-stage-glow" />
          <p className="class-kicker">Текущий профиль</p>
          <div className="class-stage-head">
            <span className="class-pick-icon">
              <ActiveIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="class-stage-title">{activeClass.name}</p>
              <p className="class-stage-sub">{activeClass.tagline}</p>
            </div>
          </div>

          <div className="class-race-row">
            {races.map((race) => {
              const active = race.id === activeRace.id;
              return (
                <button
                  key={race.id}
                  type="button"
                  onClick={() => setActiveRaceId(race.id)}
                  className={`race-token ${active ? "race-token-active" : ""}`}
                  aria-pressed={active}
                >
                  {race.name}
                </button>
              );
            })}
          </div>

          <p className="class-stage-sub mt-3">
            Путь: {activeClass.path}. Раса {activeRace.name.toLowerCase()}: {activeRace.bonus}.
          </p>

          <div className="class-traits">
            <div>
              <p className="class-traits-label">Сильные стороны</p>
              <ul className="class-traits-list">
                {activeClass.strengths.slice(0, 3).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="class-traits-label">Слабые стороны</p>
              <ul className="class-traits-list">
                {activeClass.weaknesses.slice(0, 3).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="class-stage-cta">
            <Link href={`/classes/${activeClass.slug}`} className="selection-link inline-flex text-sm">
              Перейти к полному профилю
            </Link>
            <Link href="/start" className="selection-link inline-flex text-sm">
              Начать играть этим классом
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
