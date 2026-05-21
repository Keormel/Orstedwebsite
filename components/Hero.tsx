"use client";

import { Download, Play, ScrollText } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import PixelButton from "./PixelButton";

export default function Hero() {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 700], [0, 42]);
  const ornamentY = useTransform(scrollY, [0, 700], [0, -28]);

  return (
    <section className="mx-auto mt-16 w-full max-w-[1200px] px-4 sm:mt-20 sm:px-6">
      <motion.div
        className="relative min-h-[560px] overflow-hidden rounded-[32px] bg-night sm:rounded-[51px]"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0 bg-[url('/images/hero-orsted.webp')] bg-cover bg-[65%_center]"
          style={{ y: imageY }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#181a20_0%,rgba(24,26,32,0.92)_28%,rgba(24,26,32,0.42)_58%,rgba(24,26,32,0.16)_100%)]" />
        <div className="absolute inset-0 bg-pixels bg-[length:24px_24px] opacity-30" />
        <motion.div
          className="absolute left-[42%] top-16 hidden h-16 w-44 -rotate-3 bg-gold sm:block"
          style={{ y: ornamentY }}
          aria-hidden
        />
        <motion.div
          className="absolute right-16 top-16 hidden h-40 w-40 rounded-full border border-gold/25 lg:block"
          style={{ y: ornamentY }}
          aria-hidden
        />

        <div className="relative z-10 flex min-h-[560px] w-full min-w-0 max-w-2xl flex-col justify-center overflow-hidden px-6 py-14 sm:px-12">
          <motion.p
            className="mb-5 max-w-full font-rune text-xl uppercase leading-7 text-gold sm:text-3xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            MUSHOKU TENSEI: REINCARNATION
          </motion.p>
          <motion.h1
            className="max-w-full font-pixel text-[1.15rem] leading-[1.55] text-white min-[440px]:text-[1.65rem] sm:text-[3rem]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            OrstedProject
          </motion.h1>
          <motion.p
            className="mt-7 max-w-[19rem] font-rune text-3xl leading-9 text-white min-[430px]:max-w-sm sm:max-w-xl sm:text-4xl sm:leading-[2.55rem]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            Переродись. Выбери путь. Создай легенду.
          </motion.p>
          <motion.p
            className="mt-4 max-w-[19rem] font-rune text-2xl leading-8 text-white/55 min-[430px]:max-w-sm sm:max-w-xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            RolePlay Minecraft сервер по мотивам мира шести стихий, школ меча, гильдий и личных историй игроков.
          </motion.p>
          <motion.div
            className="mt-10 grid w-full max-w-[19rem] grid-cols-1 gap-4 min-[430px]:flex min-[430px]:max-w-none min-[430px]:flex-wrap"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            <PixelButton href="/play" className="w-full min-[430px]:w-auto" icon={<Play className="h-4 w-4" />}>
              Начать игру
            </PixelButton>
            <PixelButton href="/rules" className="w-full min-[430px]:w-auto" variant="outline" icon={<ScrollText className="h-4 w-4" />}>
              Мини гайд
            </PixelButton>
            <PixelButton href="/play" className="w-full min-[430px]:w-auto" variant="ghost" icon={<Download className="h-4 w-4" />}>
              MT RPG Pack
            </PixelButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
