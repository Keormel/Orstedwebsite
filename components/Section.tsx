import type { ReactNode } from "react";
import MotionReveal from "./MotionReveal";

type SectionProps = {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
  id?: string;
};

export default function Section({
  title,
  eyebrow,
  children,
  action,
  className = "",
  id
}: SectionProps) {
  return (
    <section id={id} className={`mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-4 sm:px-6 ${className}`}>
      <MotionReveal className="flex flex-wrap items-end justify-between gap-5">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="mb-3 font-rune text-2xl uppercase text-gold">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="font-pixel text-2xl leading-[1.55] text-white sm:text-3xl">
            {title}
          </h2>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </MotionReveal>
      {children}
    </section>
  );
}
