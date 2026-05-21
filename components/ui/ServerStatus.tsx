'use client'

import { useServerStatus } from '@/lib/hooks/useServerStatus'

export function ServerStatus({ compact = false, variant = 'inline' }: { compact?: boolean; variant?: 'inline' | 'header' }) {
  const status = useServerStatus()
  const label = status.error ? 'Статус недоступен' : status.online ? 'Онлайн' : 'Офлайн'
  const shortLabel = status.online ? 'Онлайн' : 'Офлайн'
  const players = status.players !== null ? `${status.players}/${status.maxPlayers ?? '?'}` : '--'

  if (variant === 'header') {
    return (
      <div className="inventory-slot min-w-[132px] px-3 py-2">
        <div className="flex items-center gap-2 font-minecraft text-[0.4rem] uppercase leading-none text-mc-text">
          <span className={`h-2.5 w-2.5 ${status.online ? 'animate-pulse bg-[#27AE60]' : 'bg-[#C0392B]'}`} />
          <span>{status.error ? 'Недоступен' : shortLabel}</span>
          <span className="text-mc-blue">{players}</span>
        </div>
        <div className="mt-1 font-retro text-[0.95rem] leading-none text-mc-muted">play.orsted.ru</div>
      </div>
    )
  }

  return (
    <span className="inline-flex items-center gap-2 font-retro text-2xl text-mc-text">
      <span className={`h-3 w-3 ${status.online ? 'bg-[#27AE60]' : 'bg-[#C0392B]'}`} />
      {compact ? label : `${label}: ${players}${status.version ? ` | ${status.version}` : ''}`}
    </span>
  )
}
