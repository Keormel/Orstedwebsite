import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  nickname: z.string().min(3).max(24),
  discord: z.string().min(2).max(64),
  notes: z.string().max(400).optional().default(""),
  website: z.string().max(0).optional().default(""),
});

const requestStore = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;

function getIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "local"
  );
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const hits = requestStore.get(ip) ?? [];
  const fresh = hits.filter((ts) => now - ts < WINDOW_MS);
  fresh.push(now);
  requestStore.set(ip, fresh);
  return fresh.length > LIMIT;
}

export async function POST(request: NextRequest) {
  const ip = getIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: "Слишком много запросов. Повторите позже." },
      { status: 429 },
    );
  }

  const raw = await request.json();
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ message: "Некорректные данные." }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ message: "ok" }, { status: 200 });
  }

  return NextResponse.json({
    message: "Заявка принята. Ментор свяжется с вами в Discord.",
  });
}
