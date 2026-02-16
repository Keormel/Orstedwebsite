export type MinecraftStatus = {
  online: boolean;
  playersOnline: number;
  playersMax: number;
  version: string;
  motd: string;
  latency: string;
};

const DEFAULT_STATUS: MinecraftStatus = {
  online: false,
  playersOnline: 0,
  playersMax: 0,
  version: "1.20.4",
  motd: "Сервер временно недоступен",
  latency: "n/a",
};

export async function getMinecraftStatus(ip: string): Promise<MinecraftStatus> {
  try {
    const response = await fetch(`https://api.mcsrvstat.us/3/${ip}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return DEFAULT_STATUS;

    const data = (await response.json()) as {
      online?: boolean;
      players?: { online?: number; max?: number };
      version?: string;
      motd?: { clean?: string[] };
      debug?: { ping?: boolean };
    };

    return {
      online: Boolean(data.online),
      playersOnline: data.players?.online ?? 0,
      playersMax: data.players?.max ?? 0,
      version: data.version ?? DEFAULT_STATUS.version,
      motd: data.motd?.clean?.[0] ?? "Готов к подключению",
      latency: data.debug?.ping ? "ok" : "n/a",
    };
  } catch {
    return DEFAULT_STATUS;
  }
}
