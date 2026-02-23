import { SERVER } from "@/lib/constants";
import { getMinecraftStatus } from "@/lib/minecraft";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export async function MinecraftStatusCard() {
  const status = await getMinecraftStatus(SERVER.ip);

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
          <code className="max-w-[65%] break-all text-right text-xs sm:text-sm">{SERVER.ip}</code>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-muted">Версия</span>
          <span>{status.version || SERVER.version}</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-muted">Игроки</span>
          <span>
            {status.playersOnline}/{status.playersMax}
          </span>
        </div>
      </div>
    </Card>
  );
}
