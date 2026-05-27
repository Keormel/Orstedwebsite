"use client";

import { Activity, Box, Server, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useServerStatus } from "@/hooks/useServerStatus";

export default function ServerInfoBar() {
  const { error, loading, status } = useServerStatus();
  const onlineValue = loading ? "..." : `${status.onlinePlayers} / ${status.maxPlayers}`;
  const availabilityText = loading
    ? "проверка сервера"
    : status.online
      ? "сервер доступен"
      : "сервер недоступен";
  const availabilityClass = status.online
    ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
    : "border-red-400/20 bg-red-400/10 text-red-200";

  const items = [
    { label: "Версия", value: status.version, icon: Server },
    { label: "Модпак", value: "MT RPG Pack", icon: Box },
    { label: "Онлайн", value: onlineValue, icon: Users }
  ];

  return (
    <motion.div
      className="mx-auto mt-6 grid w-full max-w-[1200px] gap-3 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4"
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
          whileHover={{ y: -3, boxShadow: "0 0 0 1px rgba(94,234,212,0.55), 0 0 28px rgba(94,234,212,0.18)" }}
          transition={{ duration: 0.25 }}
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[10px] border border-gold/40 bg-gold/10 text-gold">
            <item.icon className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block font-rune text-xl uppercase text-white/40">{item.label}</span>
            <span className="block break-all font-pixel text-[10px] leading-5 text-white sm:text-xs">
              {item.value}
            </span>
          </span>
        </motion.div>
      ))}
      <motion.div
        className={`hidden items-center justify-center gap-2 rounded-[14px] border px-5 py-4 font-rune text-2xl md:flex ${availabilityClass}`}
        title={error || undefined}
        variants={{
          hidden: { opacity: 0, y: 22 },
          show: { opacity: 1, y: 0 }
        }}
      >
        <Activity className="h-5 w-5" />
        {availabilityText}
      </motion.div>
    </motion.div>
  );
}
