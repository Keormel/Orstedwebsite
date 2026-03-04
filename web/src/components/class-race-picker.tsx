"use client";

import { useMemo, useState, type ComponentType } from "react";
import Link from "next/link";
import { DaggerIcon, ShieldIcon, SparkIcon, SwordIcon } from "@/components/ui/icons";
import type { ClassInfo, ClassSlug } from "@/types/content";

type RaceInfo = {
  id: "human" | "demon" | "beast" | "skyfolk";
  name: string;
  perk: string;
  style: string;
};

type ClassRacePickerProps = {
  classes: ClassInfo[];
};

const races: RaceInfo[] = [
  {
    id: "human",
    name: "Люди Роа",
    perk: "Быстрый старт и универсальные ветки развития.",
    style: "Сбалансированный стиль",
  },
  {
    id: "demon",
    name: "Демонический клан",
    perk: "Сильные пиковые способности и высокий риск.",
    style: "Агрессивный стиль",
  },
  {
    id: "beast",
    name: "Зверолюди Дольдия",
    perk: "Скорость, мобильность и контроль дистанции.",
    style: "Маневренный стиль",
  },
  {
    id: "skyfolk",
    name: "Небесный народ",
    perk: "Поддержка группы и усиленные магические руны.",
    style: "Тактический стиль",
  },
];

const classIcons: Record<ClassSlug, ComponentType<{ className?: string }>> = {
  guardian: ShieldIcon,
  warrior: SwordIcon,
  assassin: DaggerIcon,
  mage: SparkIcon,
};

export function ClassRacePicker({ classes }: ClassRacePickerProps) {
  const [activeClassSlug, setActiveClassSlug] = useState<ClassSlug>(classes[0]?.slug ?? "guardian");
  const [activeRaceId, setActiveRaceId] = useState<RaceInfo["id"]>("human");

  const activeClass = useMemo(
    () => classes.find((item) => item.slug === activeClassSlug) ?? classes[0],
    [activeClassSlug, classes],
  );
  const activeRace = useMemo(
    () => races.find((item) => item.id === activeRaceId) ?? races[0],
    [activeRaceId],
  );

  if (!activeClass) return null;

  const ActiveIcon = classIcons[activeClass.slug] ?? ShieldIcon;

  return (
    <section className="class-race-shell surface p-5 sm:p-7">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl sm:text-3xl">Выбор класса и расы</h2>
        <p className="text-xs text-muted">Нажми на карточки, чтобы собрать стартовый профиль</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.13em] text-muted">Классы</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {classes.map((item, index) => {
              const Icon = classIcons[item.slug] ?? ShieldIcon;
              const isActive = activeClassSlug === item.slug;
              return (
                <button
                  key={item.slug}
                  type="button"
                  className={`class-choice ${isActive ? "class-choice-active" : ""}`}
                  style={{ animationDelay: `${index * 70}ms` }}
                  onClick={() => setActiveClassSlug(item.slug)}
                >
                  <span className="class-choice-icon">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-semibold text-white">{item.name}</span>
                  <span className="mt-1 text-xs text-muted">{item.role}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.13em] text-muted">Расы</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {races.map((race, index) => {
              const isActive = activeRaceId === race.id;
              return (
                <button
                  key={race.id}
                  type="button"
                  className={`race-choice ${isActive ? "race-choice-active" : ""}`}
                  style={{ animationDelay: `${(index + 1) * 70}ms` }}
                  onClick={() => setActiveRaceId(race.id)}
                >
                  <span className="text-sm font-semibold text-white">{race.name}</span>
                  <span className="mt-1 text-xs text-muted">{race.style}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="selection-panel mt-6">
        <div className="selection-head">
          <span className="class-choice-icon">
            <ActiveIcon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm text-muted">Рекомендованный старт</p>
            <p className="text-lg font-semibold text-white">
              {activeClass.name} + {activeRace.name}
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted">
          {activeClass.tagline} {activeRace.perk}
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="selection-chip">Путь: {activeClass.path}</span>
          <span className="selection-chip">
            Сильная сторона: {activeClass.strengths[0] ?? "Гибкий стиль игры"}
          </span>
        </div>
        <Link href={`/classes/${activeClass.slug}`} className="selection-link mt-5 inline-flex">
          Открыть профиль класса
        </Link>
      </div>
    </section>
  );
}
