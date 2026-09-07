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
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="mb-3 text-xs uppercase tracking-wider text-zinc-500">
        Struktur Data
      </p>
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
        Stack & Queue
      </h1>
      <p className="mb-8 max-w-2xl text-zinc-400 leading-relaxed">
        Simulasi interaktif struktur data Tumpukan dan Antrean.
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
      {active === "stack" ? <StackVis /> : <QueueVis />}
    </div>
  );
}
