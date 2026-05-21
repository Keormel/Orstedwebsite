"use client";

import { ChevronRight, Gauge, Shield } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { CharacterClass } from "@/data/classes";

export default function ClassCard({ item }: { item: CharacterClass }) {
  return (
    <Link href={`/classes/${item.slug}`} className="block h-full">
      <motion.article
        className="group flex h-full min-h-[430px] flex-col overflow-hidden rounded-[20px] border border-white/10 bg-panel"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        whileHover={{
          y: -3,
          boxShadow: `0 0 0 1px ${item.accent}88, 0 0 28px ${item.accent}33`
        }}
        transition={{ duration: 0.25 }}
      >
        <div className="relative h-56 overflow-hidden">
          <motion.div className="absolute inset-0" whileHover={{ scale: 1.08 }} transition={{ duration: 0.45 }}>
            <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/35 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/30 px-4 py-2 font-rune text-2xl text-white backdrop-blur">
            {item.archetype}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-5">
          <h3 className="font-pixel text-sm leading-7 text-white">{item.title}</h3>
          <p className="font-rune text-2xl leading-7 text-white/60">{item.description}</p>
          <div className="mt-auto flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 font-rune text-xl text-white/65">
              <Gauge className="h-4 w-4 text-gold" />
              {item.difficulty}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 font-rune text-xl text-white/65">
              <Shield className="h-4 w-4 text-gold" />
              {item.stats.support}% саппорт
            </span>
          </div>
          <span className="inline-flex items-center gap-2 font-pixel text-[10px] text-gold">
            Подробнее <ChevronRight className="h-4 w-4" />
          </span>
        </div>
      </motion.article>
    </Link>
  );
}
