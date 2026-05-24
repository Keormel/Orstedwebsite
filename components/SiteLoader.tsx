"use client";

import { useEffect, useState } from "react";

const title = "Orsted Project";

export default function SiteLoader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setHidden(true), 2400);

    return () => window.clearTimeout(timer);
  }, []);

  if (hidden) {
    return null;
  }

  return (
    <div className="site-loader" aria-label="Загрузка сайта" role="status">
      <div className="site-loader__grid" aria-hidden />
      <div className="site-loader__content">
        <div className="site-loader__title" aria-label={title}>
          {title.split("").map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className={letter === " " ? "site-loader__space" : ""}
              style={{ animationDelay: `${index * 0.075}s` }}
              aria-hidden
            >
              {letter === " " ? "\u00a0" : letter}
            </span>
          ))}
        </div>
        <div className="site-loader__bar">
          <span />
        </div>
      </div>
    </div>
  );
}
