"use client";

import { useState } from "react";
import BubbleSortVis from "@/components/visualizers/BubbleSortVis";
import SelectionSortVis from "@/components/visualizers/SelectionSortVis";
import InsertionSortVis from "@/components/visualizers/InsertionSortVis";

const tabs = [
  {
    id: "bubble",
    label: "Bubble Sort",
    desc: 'Membandingkan pasangan elemen bersebelahan dan menukar jika tidak terurut. Elemen terbesar "menggelembung" ke akhir setiap iterasi.',
  },
  {
    id: "selection",
    label: "Selection Sort",
    desc: "Mencari nilai minimum dari bagian yang belum terurut, lalu menukarnya dengan elemen paling depan dari bagian tersebut.",
  },
  {
    id: "insertion",
    label: "Insertion Sort",
    desc: "Menyisipkan elemen saat ini ke posisi yang tepat di sub-array yang sudah terurut di sebelah kirinya.",
  },
];

export default function PengurutanPage() {
  const [active, setActive] = useState("bubble");
  const info = tabs.find((t) => t.id === active)!;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="mb-3 text-xs uppercase tracking-wider text-zinc-500">
        Algoritma Pengurutan
      </p>
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
        Pengurutan (Sorting)
      </h1>
      <p className="mb-8 max-w-2xl text-zinc-400 leading-relaxed">
        Visualisasi tiga algoritma pengurutan dasar secara interaktif.
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              active === t.id
                ? "bg-emerald-600 text-white border border-emerald-600"
                : "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-500 hover:text-zinc-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Description */}
      <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-sm text-zinc-300 ring-1 ring-white/5">
        <strong className="text-zinc-100">{info.label}:</strong> {info.desc}
      </div>

      {/* Visualizer */}
      {active === "bubble" && <BubbleSortVis />}
      {active === "selection" && <SelectionSortVis />}
      {active === "insertion" && <InsertionSortVis />}
    </div>
  );
}
