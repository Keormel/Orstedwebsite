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
        obsidian: "#0d0d10",
        night: "#181a20",
        panel: "#0c0d11",
        panelSoft: "#11141b",
        panelLift: "#1b1d24",
        gold: {
          DEFAULT: "#e2b53a",
          hover: "#e9c86b",
          active: "#c09a31"
        }
      },
      fontFamily: {
        pixel: ["var(--font-press-start)", "monospace"],
        rune: ["var(--font-vt323)", "monospace"]
      },
      boxShadow: {
        pixel: "0 0 0 1px rgba(226,181,58,0.45), 0 0 28px rgba(226,181,58,0.2)",
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
