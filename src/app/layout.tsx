import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://robotech.md"),
  title: { default: "ROBOTECH Moldova | FIRST Tech Challenge Team #25491", template: "%s | ROBOTECH Moldova" },
  description: "Moldovan robotics team competing in FIRST Tech Challenge and FIRST LEGO League. Engineering, innovation and STEM since 2018.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "ROBOTECH Moldova", locale: "ro_MD", alternateLocale: ["en_US"], url: "https://robotech.md" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#080808", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ro" className={`${GeistSans.variable} ${GeistMono.variable}`}><body>{children}</body></html>;
}
