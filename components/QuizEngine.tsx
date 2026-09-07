"use client";

import { useState } from "react";
import { quizQuestions as quizData, type QuizQuestion } from "@/data/quizData";

export default function QuizEngine() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [finished, setFinished] = useState(false);

  const q: QuizQuestion = quizData[current];
  const total = quizData.length;

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    const correct = idx === q.correctIndex;
    if (correct) setScore((s) => s + 1);
    setAnswers((a) => [...a, idx]);
  };

  const handleNext = () => {
    if (current + 1 >= total) {
      setFinished(true);
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
    setShowResult(false);
  };

  const handleReset = () => {
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-50">
          Hasil Kuis
        </h2>
        <div className="mb-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center text-white">
          <div className="text-5xl font-extrabold">
            {score}/{total}
          </div>
          <div className="mt-1 text-blue-100">
            {score === total
              ? "Sempurna! Luar biasa!"
              : score >= total * 0.7
                ? "Bagus! Terus belajar!"
                : "Tetap semangat, coba lagi!"}
          </div>
        </div>

        <h3 className="mb-3 font-semibold text-gray-800 dark:text-gray-200">Ringkasan Jawaban</h3>
        <div className="space-y-3 mb-6">
          {quizData.map((item, i) => {
            const userAns = answers[i];
            const correct = userAns === item.correctIndex;
            return (
              <div
                key={i}
                className={`rounded-lg border p-4 text-sm ${
                  correct
                    ? "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950/30"
                    : "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/30"
                }`}
              >
                <div className="font-medium text-gray-800 dark:text-gray-200">
                  {correct ? "✅" : "❌"} Soal {i + 1}: {item.question}
                </div>
                <div className="mt-1 text-gray-600 dark:text-gray-400">
                  Jawabanmu: {userAns !== null ? item.options[userAns] : "-"} | Jawaban benar:{" "}
                  {item.options[item.correctIndex]}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleReset}
          className="rounded-full bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 transition-colors"
        >
          Ulangi Kuis
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      {/* Progress */}
      <div className="mb-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>
          Soal {current + 1} dari {total}
        </span>
        <span>Skor: {score}</span>
      </div>
      <div className="mb-6 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-gray-50">
        {q.question}
      </h2>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {q.options.map((opt, i) => {
          let style = "border-gray-200 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-750";
          if (showResult) {
            if (i === q.correctIndex) {
              style = "border-green-500 bg-green-50 ring-2 ring-green-500 dark:bg-green-950/30";
            } else if (i === selected && i !== q.correctIndex) {
              style = "border-red-500 bg-red-50 ring-2 ring-red-500 dark:bg-red-950/30";
            } else {
              style = "border-gray-200 bg-gray-50 opacity-50 dark:border-gray-700 dark:bg-gray-800";
            }
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showResult}
              className={`w-full rounded-xl border p-4 text-left text-sm font-medium transition-all ${style} ${
                !showResult ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-bold dark:bg-gray-700">
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showResult && (
        <div
          className={`mb-6 rounded-xl p-4 text-sm ${
            selected === q.correctIndex
              ? "bg-green-50 text-green-800 dark:bg-green-950/30 dark:text-green-300"
              : "bg-red-50 text-red-800 dark:bg-red-950/30 dark:text-red-300"
          }`}
        >
          <div className="font-semibold mb-1">
            {selected === q.correctIndex ? "✅ Benar!" : "❌ Salah!"}
          </div>
          <div>{q.explanation}</div>
        </div>
      )}

      {/* Next */}
      {showResult && (
        <button
          onClick={handleNext}
          className="rounded-full bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 transition-colors"
        >
          {current + 1 >= total ? "Lihat Hasil" : "Soal Berikutnya →"}
        </button>
      )}
    </div>
  );
}
