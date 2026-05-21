'use client'

import { motion } from 'framer-motion'

const particles = [
  { left: '8%', top: '20%', size: 8, delay: 0 },
  { left: '18%', top: '66%', size: 6, delay: 0.3 },
  { left: '31%', top: '30%', size: 10, delay: 0.7 },
  { left: '67%', top: '22%', size: 7, delay: 0.15 },
  { left: '78%', top: '64%', size: 9, delay: 0.45 },
  { left: '90%', top: '38%', size: 6, delay: 0.9 }
]

export function MagicEffects() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 border-2 border-mc-magic/20"
        animate={{ rotate: [0, 360], scale: [1, 1.04, 1] }}
        transition={{ rotate: { duration: 36, repeat: Infinity, ease: 'linear' }, scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 border-2 border-mc-gold/20"
        animate={{ rotate: [360, 0], scale: [1, 0.96, 1] }}
        transition={{ rotate: { duration: 28, repeat: Infinity, ease: 'linear' }, scale: { duration: 7, repeat: Infinity, ease: 'easeInOut' } }}
      />
      {particles.map((particle) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          className="absolute block bg-mc-magic shadow-magic"
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
          animate={{ y: [0, -18, 0], opacity: [0.25, 0.9, 0.25], rotate: [0, 90, 180] }}
          transition={{ duration: 3.8, delay: particle.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <div className="hero-rune-strip left-6 top-28" />
      <div className="hero-rune-strip bottom-20 right-6 rotate-180" />
    </div>
  )
}
