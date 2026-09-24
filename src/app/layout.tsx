// src/app/layout.tsx
import type { Metadata } from "next";
import { Cairo, Geist, Geist_Mono, Poppins } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  dirFor,
  isValidLocale,
} from "@/i18n/config";
import { LocaleProvider } from "@/i18n/LocaleProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  weight: ["400", "500", "600", "700"],
  subsets: ["arabic", "latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GDG UofK",
    template: "%s | GDG UofK",
  },
  description:
    "Google Developer Group at the University of Khartoum. Learn, build, and connect.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dir = dirFor(locale);

  return (
    <html lang={locale} dir={dir}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${cairo.variable} bg-white antialiased`}
      >
        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
