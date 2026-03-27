export type MinecraftStatus = {
  online: boolean;
  playersOnline: number;
  playersMax: number;
  version: string;
  motd: string;
  latency: string;
  playersList: string[];
};

const MC_STATUS_TOKEN =
  process.env.MC_STATUS_TOKEN ?? "tk_uGkgYcn7wwYuK7FzfT5tVWMpqWc4An06TNtuQNFW";
const MC_STATUS_ID = process.env.MC_STATUS_ID ?? "2";

const DEFAULT_STATUS: MinecraftStatus = {
  online: false,
  playersOnline: 0,
  playersMax: 0,
  version: "1.20.4",
  motd: "Сервер временно недоступен",
  latency: "n/a",
  playersList: [],
};

export async function getMinecraftStatus(ip: string): Promise<MinecraftStatus> {
  try {
    const apiUrl = new URL(`https://api.mcsrvstat.us/3/${ip}`);
    if (MC_STATUS_ID) apiUrl.searchParams.set("id", MC_STATUS_ID);
    if (MC_STATUS_TOKEN) apiUrl.searchParams.set("token", MC_STATUS_TOKEN);

    const response = await fetch(apiUrl.toString(), {
      next: { revalidate: 60 },
      headers: {
        // mcsrvstat.us requires a non-empty descriptive User-Agent.
        "User-Agent": "Orstedwebsite/1.0 (+minecraft-status)",
      },
    });
    if (!response.ok) return DEFAULT_STATUS;

    const data = (await response.json()) as {
      online?: boolean;
      players?: { online?: number; max?: number; list?: Array<{ name: string }> };
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
      playersList: data.players?.list?.map((p) => p.name) ?? [],
    };
  } catch {
    return DEFAULT_STATUS;
  }
}
