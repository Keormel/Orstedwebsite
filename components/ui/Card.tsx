import { HTMLAttributes } from 'react'
import clsx from 'clsx'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx('rounded-mc border-2 border-mc-border bg-mc-card/95 p-5 shadow-pixel backdrop-blur-sm hover:-translate-y-1 hover:shadow-magic', className)}
      {...props}
    />
  )
}
