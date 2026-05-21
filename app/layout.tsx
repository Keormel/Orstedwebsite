import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

const pressStart = Press_Start_2P({
  weight: "400",
  variable: "--font-press-start",
  preload: false
});

const vt323 = VT323({
  weight: "400",
  variable: "--font-vt323",
  preload: false
});

export const metadata: Metadata = {
  title: "OrstedProject | Mushoku Tensei: Reincarnation",
  description:
    "OrstedProject - Minecraft RolePlay сервер по мотивам Mushoku Tensei: Reincarnation. Версия 1.20.1, модпак MT RPG Pack.",
  openGraph: {
    title: "OrstedProject",
    description: "Переродись. Выбери путь. Создай легенду.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${pressStart.variable} ${vt323.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
