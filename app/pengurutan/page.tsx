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
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-50">
        Pengurutan (Sorting)
      </h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        Visualisasi tiga algoritma pengurutan dasar secara interaktif.
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              active === t.id
                ? "bg-purple-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Description */}
      <div className="mb-6 rounded-xl border border-purple-200 bg-purple-50 p-5 text-sm text-gray-700 dark:border-purple-900 dark:bg-purple-950/30 dark:text-gray-300">
        <strong>{info.label}:</strong> {info.desc}
      </div>

      {/* Visualizer */}
      {active === "bubble" && <BubbleSortVis />}
      {active === "selection" && <SelectionSortVis />}
      {active === "insertion" && <InsertionSortVis />}
    </div>
  );
}
