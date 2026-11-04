import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CookieConsentBanner from "./components/CookieConsentBanner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nanoquímica | Soluções químicas para a indústria",
  description:
    "Tecnologia, qualidade e suporte para diferentes etapas da indústria.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f5f2eb]">
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
