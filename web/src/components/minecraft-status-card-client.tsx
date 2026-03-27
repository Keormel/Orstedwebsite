import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { MinecraftStatus } from "@/lib/minecraft";

export function MinecraftStatusCardClient() {
  const [status, setStatus] = useState<MinecraftStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      const response = await fetch("/api/minecraft-status");
      if (!response.ok) throw new Error("Failed to fetch status");
      const data = await response.json();
      setStatus(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Обновляем каждые 30 сек
    return () => clearInterval(interval);
  }, []);

  if (loading || !status) {
    return (
      <Card title="Статус сервера" className="h-full">
        <div className="animate-pulse space-y-3 text-sm">
          <div className="h-4 bg-[#2e6861] rounded w-24"></div>
          <div className="h-4 bg-[#2e6861] rounded w-32"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Статус сервера" className="h-full">
      <div className="space-y-3 text-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-muted">Состояние</span>
          <Badge tone={status.online ? "accent" : "muted"}>
            {status.online ? "Онлайн" : "Оффлайн"}
          </Badge>
        </div>
        <div className="flex items-start justify-between gap-3">
          <span className="text-muted">IP</span>
          <code className="max-w-[65%] break-all text-right text-xs sm:text-sm">
            {status.online ? "148.251.68.3:25565" : "недоступен"}
          </code>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-muted">Версия</span>
          <span className="text-xs">{status.version}</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-muted">Игроки</span>
          <span>
            {status.playersOnline}/{status.playersMax}
          </span>
        </div>
        {status.playersList.length > 0 && (
          <div className="mt-3 border-t border-[#2e6861] pt-3">
            <p className="text-xs text-muted mb-2">Онлайн сейчас:</p>
            <ul className="space-y-1 text-sm">
              {status.playersList.map((playerName) => (
                <li key={playerName} className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]"></span>
                  {playerName}
                </li>
              ))}
            </ul>
          </div>
        )}
        {error && (
          <div className="text-xs text-red-400 mt-2">
            Ошибка обновления
          </div>
        )}
      </div>
    </Card>
  );
}
