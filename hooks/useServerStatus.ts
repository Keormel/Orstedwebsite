"use client";

import { useCallback, useEffect, useState } from "react";
import { emptyServerStatus, type ServerStatus } from "@/lib/serverStatus";

const refreshInterval = 30000;

export function useServerStatus() {
  const [status, setStatus] = useState<ServerStatus>(emptyServerStatus);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/server-status", { cache: "no-store" });

      if (!response.ok) {
        throw new Error(`Status request failed with ${response.status}`);
      }

      const text = await response.text();

      if (!text.trim()) {
        throw new Error("Пустой ответ от /api/server-status");
      }

      const data = JSON.parse(text) as ServerStatus;
      setStatus(data);
      setError(data.message || "");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Не удалось получить онлайн");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStatus();
    const timer = window.setInterval(loadStatus, refreshInterval);

    return () => window.clearInterval(timer);
  }, [loadStatus]);

  return { error, loading, refresh: loadStatus, status };
}
