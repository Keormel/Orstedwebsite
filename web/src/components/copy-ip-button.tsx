"use client";

import { useEffect, useState } from "react";
import { SERVER } from "@/lib/constants";

type CopyIpButtonProps = {
  compact?: boolean;
};

export function CopyIpButton({ compact = false }: CopyIpButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const copyIp = async () => {
    try {
      await navigator.clipboard.writeText(SERVER.ip);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      className={`copy-ip-button ${compact ? "copy-ip-button-compact" : ""} ${copied ? "copy-ip-button-copied" : ""}`}
      onClick={copyIp}
      aria-label="Скопировать IP сервера"
    >
      <span className="copy-ip-value">{SERVER.ip}</span>
      <span className="copy-ip-action">{copied ? "Скопировано!" : "Copy"}</span>
    </button>
  );
}
