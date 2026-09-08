"use client";

import { useState } from "react";
import { pilarData as pillars } from "@/data/theoryData";

/* ── Mini Interactive: Algoritma ── */
function AlgoritmaInteractive() {
  const steps = [
    "1. Siapkan panci dan isi air",
    "2. Nyalakan kompor, rebus air hingga mendidih",
    "3. Masukkan mie ke dalam air mendidih",
    "4. Tunggu 3 menit sambil diaduk",
    "5. Tiriskan mie",
    "6. Campurkan bumbu, aduk rata",
    "7. Mie instan siap disajikan! 🍜",
  ];
  const [currentStep, setCurrentStep] = useState(-1);
  const isFinished = currentStep >= steps.length - 1;

  return (
    <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950/50 p-5">
      <h4 className="mb-1 text-xs uppercase tracking-wider text-zinc-500">
        Simulasi Algoritma
      </h4>
      <p className="mb-4 text-sm text-zinc-400">
        Tekan tombol untuk menjalankan langkah-langkah membuat mie instan secara berurutan.
      </p>
      <div className="space-y-2 mb-4">
        {steps.map((s, i) => (
          <div
            key={i}
            className={`rounded-lg border px-4 py-2.5 text-sm transition-all duration-300 ${
              i < currentStep
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                : i === currentStep
                ? "border-amber-500 bg-amber-500/20 text-amber-200 scale-[1.02]"
                : "border-zinc-800 bg-zinc-900 text-zinc-600"
            }`}
          >
            {s}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setCurrentStep((p) => Math.min(p + 1, steps.length - 1))}
          disabled={isFinished}
          className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-white disabled:opacity-40"
        >
          {currentStep < 0 ? "Mulai" : "Langkah Berikutnya →"}
        </button>
        <button
          onClick={() => setCurrentStep(-1)}
          className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-700"
        >
          Reset
        </button>
      </div>
      {isFinished && (
        <p className="mt-3 text-sm font-medium text-emerald-400">
          ✅ Algoritma selesai! Semua langkah telah dijalankan secara berurutan.
        </p>
      )}
    </div>
  );
}

/* ── Mini Interactive: Dekomposisi ── */
function DekomposisiInteractive() {
  const bigProblem = "Membuat Aplikasi Toko Online";
  const subProblems = [
    { label: "Desain UI/UX", detail: "Merancang tampilan dan alur pengguna" },
    { label: "Sistem Registrasi", detail: "Fitur daftar dan login pengguna" },
    { label: "Katalog Produk", detail: "Menampilkan daftar barang dan pencarian" },
    { label: "Keranjang Belanja", detail: "Menambah, menghapus, dan mengubah jumlah barang" },
    { label: "Pembayaran", detail: "Proses checkout dan integrasi payment gateway" },
    { label: "Pengiriman", detail: "Pilih kurir, input alamat, lacak paket" },
  ];
  const [revealed, setRevealed] = useState<boolean[]>(subProblems.map(() => false));
  const allRevealed = revealed.every(Boolean);

  const revealNext = () => {
    const idx = revealed.indexOf(false);
    if (idx !== -1) {
      const copy = [...revealed];
      copy[idx] = true;
      setRevealed(copy);
    }
  };

  return (
    <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950/50 p-5">
      <h4 className="mb-1 text-xs uppercase tracking-wider text-zinc-500">
        Simulasi Dekomposisi
      </h4>
      <p className="mb-4 text-sm text-zinc-400">
        Pecahkan masalah besar menjadi bagian-bagian kecil. Tekan tombol untuk melihat setiap sub-masalah.
      </p>

      {/* Big problem */}
      <div className="mb-4 rounded-xl border-2 border-zinc-600 bg-zinc-900 px-5 py-4 text-center">
        <p className="text-xs uppercase tracking-wider text-zinc-500 mb-1">Masalah Besar</p>
        <p className="text-lg font-bold text-zinc-100">{bigProblem}</p>
      </div>

      {/* Arrow */}
      <div className="flex justify-center mb-4">
        <svg width="24" height="32" viewBox="0 0 24 32" className="text-zinc-600">
          <path d="M12 0 L12 24 M4 18 L12 28 L20 18" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Sub problems grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        {subProblems.map((sp, i) => (
          <div
            key={i}
            className={`rounded-lg border px-3 py-3 text-center transition-all duration-300 ${
              revealed[i]
                ? "border-emerald-500/30 bg-emerald-500/10"
                : "border-zinc-800 bg-zinc-900"
            }`}
          >
            {revealed[i] ? (
              <>
                <p className="text-sm font-medium text-emerald-300">{sp.label}</p>
                <p className="mt-1 text-xs text-zinc-400">{sp.detail}</p>
              </>
            ) : (
              <p className="text-sm text-zinc-600">?</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={revealNext}
          disabled={allRevealed}
          className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-white disabled:opacity-40"
        >
          Pecahkan! ({revealed.filter(Boolean).length}/{subProblems.length})
        </button>
        <button
          onClick={() => setRevealed(subProblems.map(() => false))}
          className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-700"
        >
          Reset
        </button>
      </div>
      {allRevealed && (
        <p className="mt-3 text-sm font-medium text-emerald-400">
          ✅ Semua sub-masalah terungkap! Sekarang tiap bagian bisa dikerjakan satu per satu.
        </p>
      )}
    </div>
  );
}

/* ── Mini Interactive: Pengenalan Pola ── */
function PolaInteractive() {
  const sequences = [
    { seq: [2, 4, 6, 8, "?"], answer: 10, rule: "Setiap suku bertambah 2" },
    { seq: [1, 1, 2, 3, 5, "?"], answer: 8, rule: "Deret Fibonacci — jumlah dua suku sebelumnya" },
    { seq: [3, 9, 27, 81, "?"], answer: 243, rule: "Setiap suku dikali 3" },
  ];
  const [current, setCurrent] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");

  const q = sequences[current];

  const checkAnswer = () => {
    const num = parseInt(userInput);
    if (num === q.answer) {
      setStatus("correct");
    } else {
      setStatus("wrong");
    }
  };

  const nextQ = () => {
    setCurrent((p) => (p + 1) % sequences.length);
    setUserInput("");
    setStatus("idle");
  };

  return (
    <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950/50 p-5">
      <h4 className="mb-1 text-xs uppercase tracking-wider text-zinc-500">
        Simulasi Pengenalan Pola
      </h4>
      <p className="mb-4 text-sm text-zinc-400">
        Temukan pola pada deret angka berikut, lalu tebak angka selanjutnya.
      </p>

      <p className="mb-1 text-xs text-zinc-500">Soal {current + 1} dari {sequences.length}</p>

      {/* Sequence display */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {q.seq.map((val, i) => (
          <div
            key={i}
            className={`flex h-12 w-12 items-center justify-center rounded-lg border-2 text-sm font-bold transition-all ${
              val === "?"
                ? "border-amber-500 bg-amber-500/20 text-amber-300"
                : "border-zinc-600 bg-zinc-700 text-zinc-200"
            }`}
          >
            {val}
          </div>
        ))}
      </div>

      {status === "idle" && (
        <div className="flex items-end gap-2">
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wider text-zinc-500">Jawaban</label>
            <input
              type="number"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && userInput && checkAnswer()}
              placeholder="?"
              className="w-24 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:border-zinc-500 focus:outline-none"
            />
          </div>
          <button
            onClick={checkAnswer}
            disabled={!userInput}
            className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-white disabled:opacity-40"
          >
            Cek
          </button>
        </div>
      )}

      {status === "correct" && (
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3">
          <p className="text-sm font-medium text-emerald-300">✅ Benar! Jawabannya {q.answer}.</p>
          <p className="mt-1 text-xs text-zinc-400">Pola: {q.rule}</p>
          <button
            onClick={nextQ}
            className="mt-3 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-white"
          >
            Soal Berikutnya →
          </button>
        </div>
      )}

      {status === "wrong" && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3">
          <p className="text-sm font-medium text-red-300">❌ Salah! Coba perhatikan pola antar angka.</p>
          <button
            onClick={() => { setStatus("idle"); setUserInput(""); }}
            className="mt-3 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-700"
          >
            Coba Lagi
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Main Page ── */
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
      <p className="mb-10 max-w-2xl leading-relaxed text-zinc-400">
        Empat fondasi utama dalam Computational Thinking yang digunakan untuk
        menyelesaikan masalah secara sistematis.
      </p>

      {/* Tabs */}
      <div className="mb-10 flex flex-wrap gap-2">
        {pillars.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActiveTab(i)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              activeTab === i
                ? "border border-emerald-600 bg-emerald-600 text-white"
                : "border border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
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
        <h2 className="mb-3 text-2xl font-bold text-zinc-100">{active.title}</h2>
        <p className="mb-8 leading-relaxed text-zinc-400">{active.description}</p>

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

        {/* Interactive section per pilar */}
        {active.id === "algoritma" && <AlgoritmaInteractive />}
        {active.id === "dekomposisi" && <DekomposisiInteractive />}
        {active.id === "pola" && <PolaInteractive />}
      </div>
    </div>
  );
}
