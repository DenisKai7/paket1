"use client";
import { useState, useEffect, useRef, useCallback } from "react";

type Status = "idle" | "checking" | "found" | "not-matched";

const STYLE: Record<Status, string> = {
  idle: "bg-zinc-700 border-zinc-600 text-zinc-200",
  checking: "bg-amber-500/20 border-amber-500 text-amber-300 scale-110",
  found: "bg-emerald-500/20 border-emerald-500 text-emerald-300 scale-110",
  "not-matched": "bg-zinc-800 border-zinc-700 text-zinc-500",
};

function randomArray(len = 8) {
  return Array.from({ length: len }, () => Math.floor(Math.random() * 50));
}

interface Snapshot {
  statuses: Status[];
  index: number;
  message: string;
  iterations: number;
  done: boolean;
}

function computeSteps(arr: number[], target: number): Snapshot[] {
  const steps: Snapshot[] = [];
  const st: Status[] = arr.map(() => "idle");

  for (let i = 0; i < arr.length; i++) {
    if (i > 0 && st[i - 1] !== "found") st[i - 1] = "not-matched";

    if (arr[i] === target) {
      st[i] = "found";
      steps.push({
        statuses: [...st],
        index: i,
        message: `Target ${target} ditemukan di indeks ${i}!`,
        iterations: i + 1,
        done: true,
      });
      return steps;
    } else {
      st[i] = "checking";
      steps.push({
        statuses: [...st],
        index: i,
        message: `${target} ≠ array[${i}] (${arr[i]})`,
        iterations: i + 1,
        done: false,
      });
    }
  }

  // Not found — mark last step as done
  if (steps.length > 0) {
    const last = { ...steps[steps.length - 1] };
    const finalSt = [...last.statuses];
    finalSt[arr.length - 1] = "not-matched";
    steps[steps.length - 1] = {
      ...last,
      statuses: finalSt,
      message: `Target ${target} tidak ditemukan dalam array.`,
      done: true,
    };
  }
  return steps;
}

export default function LinearSearchVis() {
  const [arr, setArr] = useState<number[]>(() => randomArray());
  const [inputStr, setInputStr] = useState("");
  const [targetStr, setTargetStr] = useState("0");

  const [history, setHistory] = useState<Snapshot[]>([]);
  const [step, setStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const snap: Snapshot | null = step >= 0 && step < history.length ? history[step] : null;
  const statuses = snap?.statuses ?? arr.map(() => "idle" as Status);
  const currentIndex = snap?.index ?? -1;
  const message = snap?.message ?? "";
  const iterations = snap?.iterations ?? 0;
  const isDone = snap?.done ?? false;
  const hasStarted = history.length > 0;
  const canNext = hasStarted && step < history.length - 1;
  const canPrev = step > 0;

  const clearTimer = () => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  };

  const reset = useCallback(() => {
    setHistory([]);
    setStep(-1);
    setIsPlaying(false);
    clearTimer();
  }, []);

  const handleRandomize = () => {
    const a = randomArray();
    setArr(a);
    setInputStr(a.join(", "));
    reset();
  };

  const applyInput = () => {
    const parsed = inputStr.split(",").map((s) => parseInt(s.trim())).filter((n) => !isNaN(n));
    if (parsed.length > 0) { setArr(parsed); reset(); }
  };

  const handleStart = () => {
    const t = parseInt(targetStr) || 0;
    const steps = computeSteps(arr, t);
    setHistory(steps);
    setStep(-1);
    setIsPlaying(true);
  };

  const goNext = useCallback(() => {
    setStep((prev) => {
      const next = prev + 1;
      if (next >= history.length) { setIsPlaying(false); return prev; }
      if (history[next]?.done) setIsPlaying(false);
      return next;
    });
  }, [history]);

  const goPrev = () => { setStep((prev) => Math.max(0, prev - 1)); setIsPlaying(false); };

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;
    if (step >= 0 && history[step]?.done) { setIsPlaying(false); return; }
    timerRef.current = setTimeout(goNext, 800 / speed);
    return clearTimer;
  }, [isPlaying, step, speed, goNext, history]);

  return (
    <div className="space-y-4">
      {/* Input */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 ring-1 ring-white/5">
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-[200px] flex-1">
            <label className="mb-2 block text-xs uppercase tracking-wider text-zinc-500">Array (pisahkan koma)</label>
            <input
              type="text"
              value={inputStr || arr.join(", ")}
              onChange={(e) => setInputStr(e.target.value)}
              onBlur={applyInput}
              onKeyDown={(e) => e.key === "Enter" && applyInput()}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:border-zinc-500 focus:outline-none"
            />
          </div>
          <div className="w-24">
            <label className="mb-2 block text-xs uppercase tracking-wider text-zinc-500">Target</label>
            <input
              type="number"
              value={targetStr}
              onChange={(e) => setTargetStr(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:border-zinc-500 focus:outline-none"
            />
          </div>
          <button onClick={handleRandomize} className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-200 transition-colors hover:bg-zinc-700">Acak</button>
        </div>
      </div>

      {/* Controls */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 ring-1 ring-white/5">
        <div className="flex flex-wrap items-center gap-2">
          {!isPlaying ? (
            <button onClick={handleStart} className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-white">
              {isDone || hasStarted ? "Mulai Ulang" : "Mulai"}
            </button>
          ) : (
            <button onClick={() => setIsPlaying(false)} className="rounded-lg border border-amber-500 bg-amber-500/20 px-4 py-2 text-sm text-amber-300 transition-colors">Jeda</button>
          )}
          <button onClick={goPrev} disabled={!canPrev} className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-200 transition-colors hover:bg-zinc-700 disabled:opacity-40">
            ← Mundur
          </button>
          <button onClick={goNext} disabled={!canNext} className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-200 transition-colors hover:bg-zinc-700 disabled:opacity-40">
            Maju →
          </button>
          <button onClick={reset} className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-200 transition-colors hover:bg-zinc-700">Reset</button>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-zinc-500">Kecepatan:</span>
            <input type="range" min={0.5} max={3} step={0.5} value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} className="w-24 accent-emerald-500" />
            <span className="w-8 font-mono text-sm text-zinc-400">{speed}x</span>
          </div>
        </div>
      </div>

      {/* Visualization */}
      <div className="flex min-h-[180px] items-center justify-center overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/50 p-6">
        <div className="flex items-end justify-center gap-1 sm:gap-2">
          {arr.map((val, i) => (
            <div key={`${i}-${val}`} className="flex flex-col items-center transition-all duration-300 ease-in-out">
              <div className={`flex h-10 min-w-[2.5rem] items-center justify-center rounded-lg border-2 text-sm font-medium transition-all duration-300 ease-in-out sm:h-12 sm:min-w-[3rem] ${STYLE[statuses[i]] ?? STYLE.idle}`}>
                {val}
              </div>
              <span className="mt-1 font-mono text-xs text-zinc-500">[{i}]</span>
              {currentIndex === i && (
                <div className="mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" className="text-emerald-400">
                    <polygon points="8,0 16,16 0,16" fill="currentColor" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-sm text-zinc-300">
            <span className="text-zinc-500">Iterasi:</span> {iterations} / {arr.length}
          </p>
          {hasStarted && (
            <p className="font-mono text-sm text-zinc-500">
              Langkah: {Math.max(0, step + 1)} / {history.length}
            </p>
          )}
        </div>
        {message && (
          <p className={`mt-2 font-mono text-sm ${isDone && message.includes("ditemukan di") ? "text-emerald-400" : isDone ? "text-red-400" : "text-amber-300"}`}>
            {message}
          </p>
        )}
        <div className="mt-3 flex flex-wrap gap-3 border-t border-zinc-800 pt-3">
          {([
            ["Belum diperiksa", STYLE.idle],
            ["Sedang diperiksa", STYLE.checking],
            ["Ditemukan", STYLE.found],
            ["Tidak cocok", STYLE["not-matched"]],
          ] as const).map(([label, cls]) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`h-3 w-3 rounded border ${cls.split(" ").slice(0, 2).join(" ")}`} />
              <span className="text-xs text-zinc-500">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
