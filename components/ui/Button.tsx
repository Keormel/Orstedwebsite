import Link from 'next/link'
import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

type Variant = 'primary' | 'ghost' | 'gold' | 'text'

type ButtonProps = {
  children: ReactNode
  variant?: Variant
  href?: string
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>

export function Button({ children, variant = 'primary', href, className, ...props }: ButtonProps) {
  const classes = clsx(
    'mc-button',
    {
      'mc-button-primary': variant === 'primary',
      'mc-button-ghost': variant === 'ghost',
      'mc-button-gold': variant === 'gold',
      'mc-button-text': variant === 'text'
    },
    className
  )

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
