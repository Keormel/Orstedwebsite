import clsx from 'clsx'

const colors: Record<string, string> = {
  Баланс: '#27AE60',
  Ивенты: '#8E44AD',
  Техработы: '#7F8C8D',
  Сезон: '#C9A84C',
  Патч: '#2980B9',
  PvP: '#C0392B',
  PvE: '#2980B9'
}

export function Badge({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={clsx('inline-flex border-2 px-2 py-0.5 font-retro text-xl uppercase leading-none text-white shadow-[2px_2px_0_rgba(0,0,0,0.18)]', className)}
      style={{ backgroundColor: colors[children] ?? '#5B8DB8', borderColor: 'rgba(44,36,22,0.25)' }}
    >
      {children}
    </span>
  )
}
