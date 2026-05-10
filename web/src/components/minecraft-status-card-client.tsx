import { useEffect, useState } from "react";
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
      <Card title="Статус сервера" className="server-status-card h-full">
        <div className="server-status-loading animate-pulse space-y-3">
          <div className="h-4 w-24 bg-[var(--color-border)]"></div>
          <div className="h-4 w-32 bg-[var(--color-border)]"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Статус сервера" className="server-status-card h-full">
      <div className="server-status-panel">
        <div className="server-status-head">
          <span className={status.online ? "status-lamp status-lamp-online" : "status-lamp status-lamp-offline"} />
          <span className={status.online ? "server-status-online" : "server-status-offline"}>
            {status.online ? "Онлайн" : "Оффлайн"}
          </span>
        </div>
        <div className="server-status-row">
          <span>Версия</span>
          <strong>{status.version}</strong>
        </div>
        {error && (
          <div className="server-status-error">
            Ошибка обновления
          </div>
        )}
      </div>
    </Card>
  );
}
