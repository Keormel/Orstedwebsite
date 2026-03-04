"use client";

import { useEffect, useState } from "react";

export function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateVisibility = () => {
      setIsVisible(window.scrollY > 420);
      frame = 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Прокрутить наверх"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-5 right-4 z-50 inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-[var(--foreground)] shadow-xl backdrop-blur transition-all duration-300 sm:bottom-7 sm:right-7 ${
        isVisible
          ? "translate-y-0 border-[#4aa595] bg-[#123135cc] opacity-100"
          : "pointer-events-none translate-y-3 border-transparent bg-[#0f274000] opacity-0"
      }`}
    >
      <span aria-hidden="true" className="text-base leading-none">
        ↑
      </span>
      <span>Наверх</span>
    </button>
  );
}
