import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
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
  title: "Berpikir Komputasional — Informatika SMA Kelas 10",
  description:
    "Platform edukasi interaktif untuk mempelajari konsep Berpikir Komputasional (Computational Thinking) — visualisasi algoritma pencarian, pengurutan, tumpukan, dan antrean.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
          <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; 2024 Berpikir Komputasional — Platform Pembelajaran Interaktif
          </div>
        </footer>
      </body>
    </html>
  );
}
