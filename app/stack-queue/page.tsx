"use client";

import { useState } from "react";
import StackVis from "@/components/visualizers/StackVis";
import QueueVis from "@/components/visualizers/QueueVis";

const tabs = [
  {
    id: "stack",
    label: "Tumpukan (Stack)",
    desc: "Struktur data LIFO (Last In First Out) — elemen terakhir yang masuk akan keluar pertama. Seperti tumpukan piring: piring teratas diambil lebih dulu.",
  },
  {
    id: "queue",
    label: "Antrean (Queue)",
    desc: "Struktur data FIFO (First In First Out) — elemen pertama yang masuk akan keluar pertama. Seperti antrean di kasir: yang datang duluan dilayani duluan.",
  },
];

export default function StackQueuePage() {
  const [active, setActive] = useState("stack");
  const info = tabs.find((t) => t.id === active)!;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-50">
        Stack & Queue
      </h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        Simulasi interaktif struktur data Tumpukan dan Antrean.
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              active === t.id
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Description */}
      <div className="mb-6 rounded-xl border border-indigo-200 bg-indigo-50 p-5 text-sm text-gray-700 dark:border-indigo-900 dark:bg-indigo-950/30 dark:text-gray-300">
        <strong>{info.label}:</strong> {info.desc}
      </div>

      {/* Visualizer */}
      {active === "stack" ? <StackVis /> : <QueueVis />}
    </div>
  );
}
