"use client";

import { Clock, RefreshCw, UserRound } from "lucide-react";
import MotionReveal from "./MotionReveal";
import PixelButton from "./PixelButton";
import { useServerStatus } from "@/hooks/useServerStatus";

function LoadingPlayers() {
  return (
    <>
      {[1, 2, 3].map((item) => (
        <MotionReveal
          key={item}
          className="h-[92px] animate-pulse rounded-[16px] border border-white/10 bg-panel"
        >
          <span className="sr-only">Загрузка игроков</span>
        </MotionReveal>
      ))}
    </>
  );
}

export default function TopOnlinePlayers() {
  const { error, loading, refresh, status } = useServerStatus();
  const players = status.players.slice(0, 6);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        <LoadingPlayers />
      </div>
    );
  }

  if (players.length === 0) {
    return (
      <MotionReveal className="rounded-[18px] border border-white/10 bg-panel p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[12px] border border-gold/40 bg-gold/10 text-gold">
              <UserRound className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-pixel text-sm leading-7 text-white">Игроки пока не получены</h3>
              <p className="mt-2 font-rune text-2xl leading-7 text-white/55">
                Проверь API ключ или убедись, что API возвращает список игроков в поле players.
              </p>
              {error ? <p className="mt-2 font-rune text-xl text-red-200/80">{error}</p> : null}
            </div>
          </div>
          <PixelButton type="button" variant="outline" onClick={refresh} icon={<RefreshCw className="h-4 w-4" />}>
            Обновить
          </PixelButton>
        </div>
      </MotionReveal>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {players.map((player, index) => (
        <MotionReveal
          key={`${player.name}-${index}`}
          delay={index * 0.08}
          className="flex items-center gap-4 rounded-[16px] border border-white/10 bg-panel px-5 py-4"
          whileHover={{ y: -3, boxShadow: "0 0 0 1px rgba(94,234,212,0.45), 0 0 24px rgba(94,234,212,0.14)" }}
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[10px] border border-white/10 bg-white/5 font-pixel text-xs text-gold">
            {index + 1}
          </span>
          <span className="min-w-0">
            <span className="block truncate font-pixel text-xs leading-6 text-white">{player.name}</span>
            <span className="flex flex-wrap items-center gap-x-2 font-rune text-2xl leading-6 text-white/45">
              {player.rank ? <span>{player.rank}</span> : <span>на сервере</span>}
              {typeof player.playtimeHours === "number" ? (
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-4 w-4 text-gold" />
                  {player.playtimeHours} ч.
                </span>
              ) : null}
            </span>
          </span>
        </MotionReveal>
      ))}
    </div>
  );
}
