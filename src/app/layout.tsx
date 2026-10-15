import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://robotech.md"),
  title: { default: "ROBOTECH Молдова | Команда FTC #25491", template: "%s | ROBOTECH Moldova" },
  description: "Команда робототехники из Молдовы. Участие в FIRST Tech Challenge и FIRST LEGO League, инженерные проекты и STEM с 2018 года.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "ROBOTECH Moldova", locale: "ru_MD", alternateLocale: ["ro_MD", "en_US"], url: "https://robotech.md" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#080808", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}><body>{children}</body></html>;
}
