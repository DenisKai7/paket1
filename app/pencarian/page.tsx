"use client";

import LinearSearchVis from "@/components/visualizers/LinearSearchVis";

export default function PencarianPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-50">
        Pencarian — Linear Search
      </h1>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        Algoritma pencarian berurutan (<em>Linear Search</em>) memeriksa setiap elemen satu per satu
        dari indeks 0 hingga n&minus;1 sampai menemukan target atau habis diperiksa.
      </p>

      <div className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-5 text-sm text-gray-700 dark:border-blue-900 dark:bg-blue-950/30 dark:text-gray-300">
        <strong>Cara kerja:</strong> Mulai dari elemen pertama, bandingkan setiap elemen
        dengan target <code className="rounded bg-white/70 px-1 dark:bg-gray-800">k</code>.
        Jika sama, pencarian selesai. Jika sudah sampai akhir array tanpa menemukan, artinya target
        tidak ada di dalam array.
      </div>

      <LinearSearchVis />
    </div>
  );
}
