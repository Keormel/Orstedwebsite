"use client";

import { CalendarDays, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { NewsItem } from "@/data/news";

export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <motion.article
      className="group flex h-full flex-col gap-5 rounded-[20px] border border-white/10 bg-panel p-3"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{
        y: -3,
        boxShadow: "0 0 0 1px rgba(226,181,58,0.5), 0 0 28px rgba(226,181,58,0.18)"
      }}
      transition={{ duration: 0.25 }}
    >
      <div className="relative aspect-square overflow-hidden rounded-[16px]">
        <motion.div className="absolute inset-0" whileHover={{ scale: 1.08 }} transition={{ duration: 0.45 }}>
          <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-gold/15 px-4 py-1 font-rune text-2xl text-gold">
          {item.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 px-2 pb-2">
        <h3 className="font-pixel text-sm leading-7 text-white">{item.title}</h3>
        <p className="line-clamp-5 font-rune text-2xl leading-7 text-white/55">{item.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 font-rune text-xl text-white/45">
            <CalendarDays className="h-4 w-4 text-gold" />
            {item.date}
          </span>
          <span className="inline-flex items-center gap-1 font-pixel text-[10px] text-gold">
            Читать <ChevronRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
