"use client";

import { useState } from "react";
import { pilarData as pillars } from "@/data/theoryData";

export default function DasarBKPage() {
  const [activeTab, setActiveTab] = useState(0);
  const active = pillars[activeTab];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-50">
        4 Pilar Berpikir Komputasional
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Empat fondasi utama dalam Computational Thinking yang digunakan untuk menyelesaikan masalah
        secara sistematis.
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {pillars.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActiveTab(i)}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              activeTab === i
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            <span className="mr-1.5">{p.icon}</span>
            {p.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-4 text-5xl">{active.icon}</div>
        <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-gray-50">
          {active.title}
        </h2>
        <p className="mb-6 text-gray-700 leading-relaxed dark:text-gray-300">
          {active.description}
        </p>

        <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
          Contoh dalam Kehidupan Sehari-hari
        </h3>
        <ul className="space-y-2">
          {active.examples.map((ex, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-lg bg-blue-50 p-3 text-sm text-gray-700 dark:bg-blue-950/30 dark:text-gray-300"
            >
              <span className="mt-0.5 text-blue-500">&#x2714;</span>
              {ex}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
