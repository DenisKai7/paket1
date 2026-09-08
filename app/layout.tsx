import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Berpikir Komputasional — Informatika SMA Kelas 10",
  description:
    "Platform edukasi interaktif untuk mempelajari konsep Berpikir Komputasional (Computational Thinking) — visualisasi algoritma pencarian, pengurutan, tumpukan, dan antrean.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-[#0a0a0a] text-zinc-100 min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-800">
          <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-zinc-500">
            &copy; 2026 Berpikir Komputasional — Jofanza Denis Aldida. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
