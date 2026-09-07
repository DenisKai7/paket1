"use client";

import QuizEngine from "@/components/QuizEngine";

export default function LatihanSoalPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="mb-3 text-xs uppercase tracking-wider text-zinc-500">
        Evaluasi
      </p>
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
        Latihan Soal
      </h1>
      <p className="mb-10 max-w-2xl text-zinc-400 leading-relaxed">
        Uji pemahamanmu tentang Berpikir Komputasional. Pilih jawaban yang tepat dan dapatkan
        pembahasan langsung setiap soal.
      </p>

      <QuizEngine />
    </div>
  );
}
