import { NextResponse } from "next/server";
import { emptyServerStatus, normalizeServerStatus } from "@/lib/serverStatus";

export const dynamic = "force-dynamic";

const statusApiEndpoint = "https://api.trackyserver.com/widget/index.php?id={SERVER_ID}";

function getEndpoint() {
  return statusApiEndpoint;
}

function buildRequest() {
  const serverId = process.env.SERVER_STATUS_SERVER_ID?.trim();
  const endpointTemplate = getEndpoint();

  if (!serverId) {
    throw new Error("SERVER_STATUS_SERVER_ID is not configured");
  }

  if (!/^\d+$/.test(serverId)) {
    throw new Error("TrackyServer status API needs numeric server ID, not vote/API token.");
  }

  const endpoint = endpointTemplate.replace("{SERVER_ID}", encodeURIComponent(serverId));
  const url = new URL(endpoint);
  const headers = new Headers({ Accept: "application/json" });

  return { headers, url };
}

async function readJsonResponse(response: Response) {
  const text = await response.text();

  if (!text.trim()) {
    throw new Error("Status API returned an empty response. Check SERVER_STATUS_SERVER_ID.");
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new Error("Status API returned a non-JSON response.");
  }
}

export async function GET() {
  try {
    const { headers, url } = buildRequest();
    const response = await fetch(url, {
      cache: "no-store",
      headers
    });

    if (!response.ok) {
      throw new Error(`Status API responded with ${response.status}`);
    }

    const payload = await readJsonResponse(response);

    return NextResponse.json(normalizeServerStatus(payload, true), {
      headers: { "Cache-Control": "no-store" }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown server status error";

    return NextResponse.json(
      {
        ...emptyServerStatus,
        updatedAt: new Date().toISOString(),
        message,
        sourceConfigured: Boolean(process.env.SERVER_STATUS_SERVER_ID?.trim())
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  }
}
