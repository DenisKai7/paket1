"use client";

import QuizEngine from "@/components/QuizEngine";

export default function LatihanSoalPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-50">
        Latihan Soal
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Uji pemahamanmu tentang Berpikir Komputasional. Pilih jawaban yang tepat dan dapatkan
        pembahasan langsung setiap soal.
      </p>

      <QuizEngine />
    </div>
  );
}
