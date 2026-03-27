import { getMinecraftStatus } from "@/lib/minecraft";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Не кешировать

export async function GET() {
  try {
    const status = await getMinecraftStatus("148.251.68.3:25565");
    return NextResponse.json(status);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch server status" },
      { status: 500 }
    );
  }
}
