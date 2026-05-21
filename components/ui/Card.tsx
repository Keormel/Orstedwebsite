import { HTMLAttributes } from 'react'
import clsx from 'clsx'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx('rounded-mc border-2 border-mc-border bg-mc-card p-5 shadow-pixel', className)}
      {...props}
    />
  )
}
