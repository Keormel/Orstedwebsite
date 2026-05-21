'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaDiscord, FaDownload, FaScroll } from 'react-icons/fa'
import { Button } from '@/components/ui/Button'
import { ServerStatus } from '@/components/ui/ServerStatus'
import { MagicEffects } from './MagicEffects'

export function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 54])

  return (
    <section className="pixel-pattern relative flex min-h-screen items-center overflow-hidden pt-20">
      <MagicEffects />
      <motion.div style={{ y }} className="absolute inset-x-0 top-24 mx-auto h-40 w-40 border-[18px] border-mc-magic/25 shadow-magic" />
      <div className="section-shell relative z-10 grid gap-8 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <motion.div
            className="mx-auto mb-6 grid h-28 w-28 place-items-center border-2 border-mc-border bg-mc-card p-3 shadow-pixel-lg sm:h-36 sm:w-36"
            animate={{
              y: [0, -6, 0],
              filter: [
                'drop-shadow(0 0 0 rgba(126,200,227,0))',
                'drop-shadow(0 0 12px rgba(126,200,227,0.55))',
                'drop-shadow(0 0 0 rgba(126,200,227,0))'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src="/images/logo.png"
              alt="OrstedProject"
              width={128}
              height={128}
              priority
              className="h-full w-full object-contain"
            />
          </motion.div>
          <p className="pixel-title text-[clamp(1.15rem,3vw,2rem)] text-mc-blue">OrstedProject</p>
          <p className="mt-4 font-minecraft text-[clamp(0.56rem,1.5vw,0.85rem)] leading-6 text-mc-gold">
            MUSHOKU TENSEI: REINCARNATION
          </p>
          <h1 className="mx-auto mt-7 max-w-4xl font-retro text-[clamp(2.1rem,7vw,5rem)] leading-none text-mc-text">
            «Переродись. Выбери путь. Создай легенду.»
          </h1>
        </motion.div>
        <motion.div
          className="mx-auto flex max-w-3xl flex-col justify-center gap-3 sm:flex-row sm:flex-wrap"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {[
            <Button key="play" href="/start">Играть сейчас</Button>,
            <Button key="discord" href="https://discord.gg/orsted" variant="ghost"><FaDiscord />Discord</Button>,
            <Button key="download" href="/start" variant="ghost"><FaDownload />Скачать сборку</Button>,
            <Button key="rules" href="/rules" variant="text"><FaScroll />Правила</Button>
          ].map((button, index) => (
            <motion.div key={index} variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
              {button}
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="mx-auto max-w-4xl border-2 border-mc-text bg-mc-card px-4 py-3 font-retro text-2xl text-mc-text shadow-pixel-lg"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          IP: <span className="font-minecraft text-[0.62rem] text-mc-blue">play.orsted.ru</span>
          <span className="mx-2 text-mc-border">|</span> Версия: 1.20.1
          <span className="mx-2 text-mc-border">|</span> <ServerStatus compact />
          <span className="mx-2 text-mc-border">|</span> Модпак: MT RPG Pack
        </motion.div>
      </div>
    </section>
  )
}
