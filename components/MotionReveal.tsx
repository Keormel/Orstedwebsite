"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type MotionRevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  stagger?: boolean;
};

export default function MotionReveal({
  children,
  delay = 0,
  stagger = false,
  className,
  ...props
}: MotionRevealProps) {
  return (
    <motion.div
      className={className}
      initial={stagger ? "hidden" : { opacity: 0, y: 26 }}
      whileInView={stagger ? "show" : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      variants={
        stagger
          ? {
              hidden: { opacity: 1 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: delay
                }
              }
            }
          : undefined
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}
