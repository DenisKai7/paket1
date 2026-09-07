"use client";

import { useState } from "react";
import { pilarData as pillars } from "@/data/theoryData";

export default function DasarBKPage() {
  const [activeTab, setActiveTab] = useState(0);
  const active = pillars[activeTab];

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="mb-3 text-xs uppercase tracking-wider text-zinc-500">
        Modul 1
      </p>
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
        4 Pilar Berpikir Komputasional
      </h1>
      <p className="mb-10 max-w-2xl text-zinc-400 leading-relaxed">
        Empat fondasi utama dalam Computational Thinking yang digunakan untuk menyelesaikan masalah
        secara sistematis.
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {pillars.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActiveTab(i)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              activeTab === i
                ? "bg-emerald-600 text-white border border-emerald-600"
                : "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-500 hover:text-zinc-200"
            }`}
          >
            <span className="mr-1.5">{p.icon}</span>
            {p.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 ring-1 ring-white/5 sm:p-8">
        <div className="mb-4 text-4xl">{active.icon}</div>
        <h2 className="mb-3 text-2xl font-bold text-zinc-100">
          {active.title}
        </h2>
        <p className="mb-8 text-zinc-400 leading-relaxed">
          {active.description}
        </p>

        <h3 className="mb-4 text-xs uppercase tracking-wider text-zinc-500">
          Contoh dalam Kehidupan Sehari-hari
        </h3>
        <ul className="space-y-2">
          {active.examples.map((ex, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-800/50 p-3 text-sm text-zinc-300"
            >
              <span className="mt-0.5 text-emerald-500">&#x2714;</span>
              {ex}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
