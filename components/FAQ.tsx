"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { FAQItem } from "@/data/faq";

export default function FAQ({ items }: { items: FAQItem[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-3">
      {items.map((item, index) => {
        const open = active === index;

        return (
          <motion.div
            key={item.question}
            className="overflow-hidden rounded-[16px] border border-white/10 bg-panel"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -3, boxShadow: "0 0 0 1px rgba(226,181,58,0.45), 0 0 22px rgba(226,181,58,0.14)" }}
            transition={{ duration: 0.22 }}
          >
            <button
              type="button"
              onClick={() => setActive(open ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
            >
              <span className="font-pixel text-xs leading-6 text-white sm:text-sm">{item.question}</span>
              <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="h-5 w-5 text-gold" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <p className="border-t border-white/10 px-5 py-5 font-rune text-2xl leading-8 text-white/60">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
