export type ServerPlayer = {
  name: string;
  rank?: string;
  playtimeHours?: number;
};

export type ServerStatus = {
  online: boolean;
  onlinePlayers: number;
  maxPlayers: number;
  version: string;
  players: ServerPlayer[];
  updatedAt: string;
  sourceConfigured: boolean;
  message?: string;
};

export const emptyServerStatus: ServerStatus = {
  online: false,
  onlinePlayers: 0,
  maxPlayers: 300,
  version: "1.20.1",
  players: [],
  updatedAt: "",
  sourceConfigured: false
};

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asRecord(value: unknown): JsonRecord {
  return isRecord(value) ? value : {};
}

function readString(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return undefined;
}

function readNumber(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string" && value.trim()) {
      const parsed = Number.parseInt(value, 10);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }

  return undefined;
}

function readBoolean(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "boolean") {
      return value;
    }

    if (typeof value === "string") {
      const normalized = value.trim().toLowerCase();
      if (["online", "true", "up", "ok", "running"].includes(normalized)) {
        return true;
      }
      if (["offline", "false", "down", "error", "stopped"].includes(normalized)) {
        return false;
      }
    }
  }

  return undefined;
}

function unwrapPayload(payload: unknown) {
  const root = asRecord(payload);
  const data = asRecord(root.data);
  const server = asRecord(root.server);
  const status = asRecord(root.status);

  if (Object.keys(data).length > 0) {
    return data;
  }

  if (Object.keys(server).length > 0) {
    return server;
  }

  if (Object.keys(status).length > 0) {
    return status;
  }

  return root;
}

function normalizePlayer(player: unknown): ServerPlayer | null {
  if (typeof player === "string" && player.trim()) {
    return { name: player.trim() };
  }

  const record = asRecord(player);
  const profile = asRecord(record.profile);
  const name = readString(
    record.name,
    record.username,
    record.nickname,
    record.player,
    record.displayName,
    record.name_raw,
    profile.name
  );

  if (!name) {
    return null;
  }

  return {
    name,
    rank: readString(record.rank, record.role, record.group),
    playtimeHours: readNumber(record.playtimeHours, record.hours, record.playtime, record.time)
  };
}

function normalizePlayers(root: JsonRecord) {
  const players = asRecord(root.players);
  const possibleLists = [
    Array.isArray(root.players) ? root.players : undefined,
    players.list,
    players.sample,
    players.onlineList,
    players.online,
    root.playerslist,
    root.playerList,
    root.playersList,
    root.onlinePlayersList
  ];

  const list = possibleLists.find(Array.isArray);

  if (!list) {
    return [];
  }

  return list.map(normalizePlayer).filter(Boolean) as ServerPlayer[];
}

function readPlayerCount(value: unknown) {
  if (typeof value !== "string") {
    return {
      maxPlayers: undefined,
      onlinePlayers: readNumber(value)
    };
  }

  const match = value.match(/(\d+)\s*\/\s*(\d+)/);

  if (match) {
    return {
      onlinePlayers: Number.parseInt(match[1], 10),
      maxPlayers: Number.parseInt(match[2], 10)
    };
  }

  return {
    maxPlayers: undefined,
    onlinePlayers: readNumber(value)
  };
}

export function normalizeServerStatus(payload: unknown, sourceConfigured: boolean): ServerStatus {
  const root = unwrapPayload(payload);
  const players = asRecord(root.players);
  const version = asRecord(root.version);
  const normalizedPlayers = normalizePlayers(root);
  const playerCount = readPlayerCount(root.playerscount);
  const onlinePlayers =
    readNumber(
      root.onlinePlayers,
      root.online_players,
      root.playerCount,
      root.playersOnline,
      root.currentPlayers,
      root.playerscount,
      players.online,
      players.now,
      players.count
    ) ??
    playerCount.onlinePlayers ??
    normalizedPlayers.length;
  const maxPlayers =
    readNumber(root.maxPlayers, root.max_players, root.playersMax, root.slots, root.capacity, players.max) ??
    playerCount.maxPlayers ??
    emptyServerStatus.maxPlayers;

  return {
    online:
      readBoolean(root.online, root.isOnline, root.available, root.status) ??
      onlinePlayers > 0,
    onlinePlayers,
    maxPlayers,
    version:
      readString(root.serverVersion, root.version, root.mcVersion, version.name, version.name_raw) ??
      emptyServerStatus.version,
    players: normalizedPlayers,
    updatedAt: new Date().toISOString(),
    sourceConfigured
  };
}
