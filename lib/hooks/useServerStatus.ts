'use client'

import { useEffect, useState } from 'react'

type ServerStatus = {
  online: boolean
  players: number | null
  maxPlayers: number | null
  version: string | null
  error: boolean
}

const fallback: ServerStatus = {
  online: false,
  players: null,
  maxPlayers: null,
  version: null,
  error: false
}

export function useServerStatus() {
  const [status, setStatus] = useState<ServerStatus>(fallback)

  useEffect(() => {
    let active = true

    async function load() {
      try {
        const response = await fetch('https://api.mcsrvstat.us/3/play.orsted.ru', { cache: 'no-store' })
        const data = await response.json()

        if (!active) return
        setStatus({
          online: Boolean(data.online),
          players: data.players?.online ?? null,
          maxPlayers: data.players?.max ?? null,
          version: data.version ?? data.protocol?.name ?? null,
          error: false
        })
      } catch {
        if (active) {
          setStatus({ ...fallback, error: true })
        }
      }
    }

    load()
    const timer = window.setInterval(load, 30000)
    return () => {
      active = false
      window.clearInterval(timer)
    }
  }, [])

  return status
}
