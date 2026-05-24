import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#071211",
        night: "#0b2522",
        panel: "#0a1918",
        panelSoft: "#102522",
        panelLift: "#14322e",
        gold: {
          DEFAULT: "#5eead4",
          hover: "#99f6e4",
          active: "#2dd4bf"
        }
      },
      fontFamily: {
        pixel: ["var(--font-press-start)", "monospace"],
        rune: ["var(--font-vt323)", "monospace"]
      },
      boxShadow: {
        pixel: "0 0 0 1px rgba(94,234,212,0.45), 0 0 28px rgba(94,234,212,0.2)",
        insetPixel: "inset 0 -4px 0 rgba(0,0,0,0.32), inset 0 4px 0 rgba(255,255,255,0.08)"
      },
      backgroundImage: {
        pixels: "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
