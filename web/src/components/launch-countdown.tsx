"use client";

import { useEffect, useState } from "react";

const targetDate = new Date("2026-05-23T21:00:00+02:00").getTime();

function getParts() {
  const distance = Math.max(targetDate - Date.now(), 0);
  const days = Math.floor(distance / 86_400_000);
  const hours = Math.floor((distance / 3_600_000) % 24);
  const minutes = Math.floor((distance / 60_000) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  return [
    { label: "дни", value: days },
    { label: "часы", value: hours },
    { label: "мин", value: minutes },
    { label: "сек", value: seconds },
  ];
}

export function LaunchCountdown() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => setTick((value) => value + 1), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="launch-countdown" aria-label="Таймер до старта">
      {getParts().map((part) => (
        <div className="launch-countdown-block" key={part.label}>
          <span key={part.value} className="launch-countdown-value">
            {String(part.value).padStart(2, "0")}
          </span>
          <span className="launch-countdown-label">{part.label}</span>
        </div>
      ))}
    </div>
  );
}
