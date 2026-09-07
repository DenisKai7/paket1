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
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 ring-1 ring-white/5 sm:p-8">
        <h2 className="mb-6 text-2xl font-bold text-zinc-100">
          Hasil Kuis
        </h2>
        <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-800/50 p-8 text-center">
          <div className="text-5xl font-extrabold text-zinc-100">
            {score}/{total}
          </div>
          <div className="mt-2 text-zinc-400">
            {score === total
              ? "Sempurna! Luar biasa!"
              : score >= total * 0.7
                ? "Bagus! Terus belajar!"
                : "Tetap semangat, coba lagi!"}
          </div>
        </div>

        <h3 className="mb-4 text-xs uppercase tracking-wider text-zinc-500">Ringkasan Jawaban</h3>
        <div className="space-y-3 mb-8">
          {quizData.map((item: QuizQuestion, i: number) => {
            const userAns = answers[i];
            const correct = userAns === item.correctIndex;
            return (
              <div
                key={i}
                className={`rounded-lg border p-4 text-sm ${
                  correct
                    ? "border-emerald-500/40 bg-emerald-500/10"
                    : "border-red-500/40 bg-red-500/10"
                }`}
              >
                <div className="font-medium text-zinc-200">
                  {correct ? "✅" : "❌"} Soal {i + 1}: {item.question}
                </div>
                <div className="mt-1 text-zinc-400">
                  Jawabanmu: {userAns !== null ? item.options[userAns] : "-"} | Jawaban benar:{" "}
                  {item.options[item.correctIndex]}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleReset}
          className="rounded-lg bg-zinc-100 px-6 py-3 font-medium text-zinc-900 hover:bg-white transition-colors"
        >
          Ulangi Kuis
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 ring-1 ring-white/5 sm:p-8">
      {/* Progress */}
      <div className="mb-4 flex items-center justify-between text-sm text-zinc-500">
        <span>
          Soal {current + 1} dari {total}
        </span>
        <span>Skor: {score}</span>
      </div>
      <div className="mb-8 h-1.5 w-full rounded-full bg-zinc-800">
        <div
          className="h-1.5 rounded-full bg-emerald-500 transition-all"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h2 className="mb-8 text-lg font-semibold text-zinc-100 leading-relaxed">
        {q.question}
      </h2>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {q.options.map((opt, i) => {
          let style = "border-zinc-700 bg-zinc-800 hover:border-zinc-500 text-zinc-200";
          if (showResult) {
            if (i === q.correctIndex) {
              style = "border-emerald-500 bg-emerald-500/10 ring-1 ring-emerald-500 text-emerald-300";
            } else if (i === selected && i !== q.correctIndex) {
              style = "border-red-500 bg-red-500/10 ring-1 ring-red-500 text-red-300";
            } else {
              style = "border-zinc-800 bg-zinc-800/50 opacity-50 text-zinc-500";
            }
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showResult}
              className={`w-full rounded-lg border p-4 text-left text-sm font-medium transition-all ${style} ${
                !showResult ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded bg-zinc-700 text-xs font-bold text-zinc-300">
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
          className={`mb-8 rounded-lg border p-4 text-sm ${
            selected === q.correctIndex
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border-red-500/30 bg-red-500/10 text-red-300"
          }`}
        >
          <div className="font-semibold mb-1">
            {selected === q.correctIndex ? "✅ Benar!" : "❌ Salah!"}
          </div>
          <div className="text-zinc-300">{q.explanation}</div>
        </div>
      )}

      {/* Next */}
      {showResult && (
        <button
          onClick={handleNext}
          className="rounded-lg bg-zinc-100 px-6 py-3 font-medium text-zinc-900 hover:bg-white transition-colors"
        >
          {current + 1 >= total ? "Lihat Hasil" : "Soal Berikutnya →"}
        </button>
      )}
    </div>
  );
}
