import type { Metadata } from "next";
import { Cinzel, Manrope } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { RouteTransition } from "@/components/layout/route-transition";

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "700"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://mushoku-reincarnation.ru",
  ),
  title: {
    default: "Mushoku Reincarnation | Minecraft сервер",
    template: "%s | Mushoku Reincarnation",
  },
  description:
    "Эпический Minecraft сервер во вселенной Mushoku Tensei: классы, гильдии, войны сезонов, ивенты и честный донат без P2W.",
  openGraph: {
    title: "Mushoku Reincarnation | Minecraft сервер",
    description:
      "Академия магии, гильдия приключенцев и сезонный прогресс. Подключайся за пару минут.",
    type: "website",
    locale: "ru_RU",
  },
  keywords: [
    "minecraft сервер",
    "mushoku tensei",
    "рпг сервер",
    "магия",
    "гильдии",
    "донат без p2w",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${cinzel.variable} ${manrope.variable} antialiased`}>
        <SiteHeader />
        <main>
          <RouteTransition>{children}</RouteTransition>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
