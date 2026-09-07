"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/dasar-bk", label: "4 Pilar" },
  { href: "/pencarian", label: "Pencarian" },
  { href: "/pengurutan", label: "Pengurutan" },
  { href: "/stack-queue", label: "Stack & Queue" },
  { href: "/latihan-soal", label: "Latihan Soal" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-zinc-800">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold text-zinc-100 tracking-tight">
              BK
            </span>
            <span className="hidden sm:inline text-sm text-zinc-500 font-medium">
              Berpikir Komputasional
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-zinc-100 font-medium"
                    : "text-zinc-500 hover:text-zinc-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 top-16 z-40 bg-black/95 backdrop-blur-sm md:hidden">
          <div className="px-6 py-8 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 text-base transition-colors duration-200 border-b border-zinc-800 ${
                  pathname === link.href
                    ? "text-zinc-100 font-medium"
                    : "text-zinc-500 hover:text-zinc-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
