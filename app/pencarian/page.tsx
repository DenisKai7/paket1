"use client";

import LinearSearchVis from "@/components/visualizers/LinearSearchVis";

export default function PencarianPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="mb-3 text-xs uppercase tracking-wider text-zinc-500">
        Algoritma Pencarian
      </p>
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
        Linear Search
      </h1>
      <p className="mb-8 max-w-2xl text-zinc-400 leading-relaxed">
        Algoritma pencarian berurutan (<em>Linear Search</em>) memeriksa setiap elemen satu per satu
        dari indeks 0 hingga n&minus;1 sampai menemukan target atau habis diperiksa.
      </p>

      <div className="mb-10 rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-sm text-zinc-300 ring-1 ring-white/5">
        <strong className="text-zinc-100">Cara kerja:</strong> Mulai dari elemen pertama, bandingkan setiap elemen
        dengan target <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-emerald-400 text-xs">k</code>.
        Jika sama, pencarian selesai. Jika sudah sampai akhir array tanpa menemukan, artinya target
        tidak ada di dalam array.
      </div>

      <LinearSearchVis />
    </div>
  );
}
