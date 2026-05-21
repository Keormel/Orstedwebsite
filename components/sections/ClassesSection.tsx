'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaHatWizard, FaKhanda, FaShieldAlt, FaSkull } from 'react-icons/fa'
import { classes } from '@/lib/data/classes'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Reveal } from './Reveal'

const icons = {
  guardian: FaShieldAlt,
  warrior: FaKhanda,
  assassin: FaSkull,
  mage: FaHatWizard
}

export function ClassesSection() {
  return (
    <section className="bg-stone py-16">
      <div className="section-shell">
        <Reveal>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h2 className="pixel-title text-[clamp(0.9rem,2vw,1.4rem)] text-mc-text">Классы перерождения</h2>
              <p className="mt-4 max-w-2xl font-body text-lg leading-8 text-mc-muted">
                Каждый путь меняет стиль боя, место в гильдии и то, как тебя запомнят после первой большой осады.
              </p>
            </div>
            <Button href="/classes" variant="ghost">Все классы</Button>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {classes.map((item, index) => {
            const Icon = icons[item.slug as keyof typeof icons]
            return (
              <Reveal key={item.slug} delay={index * 0.07}>
                <motion.div whileHover={{ y: -3, boxShadow: `0 0 22px ${item.color}66` }}>
                  <Link href={`/classes/${item.slug}`}>
                    <Card className="min-h-[260px]">
                      <Icon className="text-6xl" style={{ color: item.color }} aria-hidden />
                      <h3 className="mt-5 font-minecraft text-[0.72rem] leading-6 text-mc-text">{item.name}</h3>
                      <p className="mt-2 font-retro text-2xl text-mc-muted">{item.path}</p>
                      <p className="mt-4 font-body leading-7 text-mc-muted">{item.description}</p>
                    </Card>
                  </Link>
                </motion.div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
