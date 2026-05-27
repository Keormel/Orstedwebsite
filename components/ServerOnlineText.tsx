"use client";

import { useServerStatus } from "@/hooks/useServerStatus";

type ServerOnlineTextProps = {
  fallback: string;
};

export default function ServerOnlineText({ fallback }: ServerOnlineTextProps) {
  const { loading, status } = useServerStatus();

  if (loading) {
    return <>{fallback}</>;
  }

  if (!status.online) {
    return <>сервер offline</>;
  }

  return <>{status.onlinePlayers} играют</>;
}
