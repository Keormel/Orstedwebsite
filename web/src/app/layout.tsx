import type { Metadata } from "next";
import { Exo_2, Unbounded } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollTopButton } from "@/components/layout/scroll-top-button";
import { RouteTransition } from "@/components/layout/route-transition";

const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "700"],
});

const exo2 = Exo_2({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://mtminecraft.online",
  ),
  title: {
    default: "Orsted Project | Minecraft сервер",
    template: "%s | Orsted Project",
  },
  description:
    "Minecraft RPG сервер Orsted Project: классы, гильдии, войны сезонов, ивенты и честный донат без P2W.",
  openGraph: {
    title: "Orsted Project | Minecraft сервер",
    description:
      "Классы, гильдии и сезонный прогресс. Подключайся за пару минут.",
    type: "website",
    locale: "ru_RU",
  },
  keywords: [
    "minecraft сервер",
    "orsted project",
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
      <body className={`${unbounded.variable} ${exo2.variable} antialiased`}>
        <SiteHeader />
        <main>
          <RouteTransition>{children}</RouteTransition>
        </main>
        <ScrollTopButton />
        <SiteFooter />
      </body>
    </html>
  );
}
