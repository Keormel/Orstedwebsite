"use client";

import { Activity, Box, Copy, Server, Users } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { label: "IP", value: "play.orstedproject.ru", icon: Copy },
  { label: "Версия", value: "1.20.1", icon: Server },
  { label: "Модпак", value: "MT RPG Pack", icon: Box },
  { label: "Онлайн", value: "128 / 300", icon: Users }
];

export default function ServerInfoBar() {
  return (
    <motion.div
      className="mx-auto mt-6 grid w-full max-w-[1200px] gap-3 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-5"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } }
      }}
    >
      {items.map((item) => (
        <motion.div
          key={item.label}
          className="flex items-center gap-4 rounded-[14px] border border-white/10 bg-panel px-5 py-4 shadow-insetPixel"
          variants={{
            hidden: { opacity: 0, y: 22 },
            show: { opacity: 1, y: 0 }
          }}
          whileHover={{ y: -3, boxShadow: "0 0 0 1px rgba(226,181,58,0.55), 0 0 28px rgba(226,181,58,0.18)" }}
          transition={{ duration: 0.25 }}
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[10px] border border-gold/40 bg-gold/10 text-gold">
            <item.icon className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block font-rune text-xl uppercase text-white/40">
              {item.label}
            </span>
            <span className="block break-all font-pixel text-[10px] leading-5 text-white sm:text-xs">
              {item.value}
            </span>
          </span>
        </motion.div>
      ))}
      <motion.div
        className="hidden items-center justify-center gap-2 rounded-[14px] border border-emerald-400/20 bg-emerald-400/10 px-5 py-4 font-rune text-2xl text-emerald-200 md:flex"
        variants={{
          hidden: { opacity: 0, y: 22 },
          show: { opacity: 1, y: 0 }
        }}
      >
        <Activity className="h-5 w-5" />
        сервер доступен
      </motion.div>
    </motion.div>
  );
}
