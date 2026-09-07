"use client";
import { useState, useEffect, useRef, useCallback } from "react";

type Status = "idle" | "checking" | "found" | "not-matched";

const BG: Record<Status, string> = {
  idle: "bg-zinc-700 border-zinc-600 text-zinc-200",
  checking: "bg-amber-500/20 border-amber-500 text-amber-300",
  found: "bg-emerald-500/20 border-emerald-500 text-emerald-300",
  "not-matched": "bg-zinc-800 border-zinc-700 text-zinc-500",
};

function randomArray(len = 8) {
  return Array.from({ length: len }, () => Math.floor(Math.random() * 50));
}

export default function LinearSearchVis() {
  const [arr, setArr] = useState<number[]>(() => randomArray());
  const [target, setTarget] = useState<number>(0);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [iterations, setIterations] = useState(0);
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  const [inputStr, setInputStr] = useState("");
  const [targetStr, setTargetStr] = useState("0");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = useCallback(() => {
    setStatuses(arr.map(() => "idle" as Status));
    setCurrentIndex(-1);
    setIsPlaying(false);
    setIterations(0);
    setMessage("");
    setDone(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, [arr]);

  useEffect(() => {
    reset();
  }, [arr, reset]);

  const stepForward = useCallback(() => {
    if (done) return;
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next >= arr.length) {
        setMessage(`Target ${target} tidak ditemukan dalam array.`);
        setDone(true);
        setIsPlaying(false);
        return prev;
      }
      setIterations((i) => i + 1);
      setStatuses((s) => {
        const copy = [...s];
        if (prev >= 0) copy[prev] = copy[prev] === "found" ? "found" : "not-matched";
        copy[next] = "checking";
        return copy;
      });
      if (arr[next] === target) {
        setStatuses((s) => {
          const copy = [...s];
          copy[next] = "found";
          return copy;
        });
        setMessage(`Target ${target} ditemukan di indeks ${next}!`);
        setDone(true);
        setIsPlaying(false);
      } else {
        setMessage(`${target} != array[${next}] (${arr[next]})`);
      }
      return next;
    });
  }, [arr, target, done]);

  useEffect(() => {
    if (!isPlaying || done) return;
    timerRef.current = setTimeout(stepForward, 800 / speed);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, done, currentIndex, speed, stepForward]);

  const handleRandomize = () => {
    const a = randomArray();
    setArr(a);
    setInputStr(a.join(", "));
  };

  const handleApplyInput = () => {
    const parsed = inputStr
      .split(",")
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n));
    if (parsed.length > 0) setArr(parsed);
  };

  const handleStart = () => {
    if (done) reset();
    setTarget(parseInt(targetStr) || 0);
    setTimeout(() => setIsPlaying(true), 50);
  };

  return (
    <div className="space-y-4">
      {/* Input controls */}
      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 ring-1 ring-white/5">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-2">Array (pisahkan koma)</label>
            <input
              type="text"
              value={inputStr || arr.join(", ")}
              onChange={(e) => setInputStr(e.target.value)}
              onBlur={handleApplyInput}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 text-sm px-3 py-2 focus:border-zinc-500 focus:outline-none"
            />
          </div>
          <div className="w-24">
            <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-2">Target</label>
            <input
              type="number"
              value={targetStr}
              onChange={(e) => setTargetStr(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 text-sm px-3 py-2 focus:border-zinc-500 focus:outline-none"
            />
          </div>
          <button onClick={handleRandomize} className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 rounded-lg px-3 py-2 text-sm transition-colors">
            Acak
          </button>
        </div>
      </div>

      {/* Control panel */}
      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 ring-1 ring-white/5">
        <div className="flex flex-wrap gap-2 items-center">
          {!isPlaying ? (
            <button onClick={handleStart} className="bg-zinc-100 text-zinc-900 hover:bg-white rounded-lg px-4 py-2 text-sm font-medium transition-colors">
              {done ? "Mulai Ulang" : "Mulai"}
            </button>
          ) : (
            <button onClick={() => setIsPlaying(false)} className="bg-amber-500/20 border border-amber-500 text-amber-300 rounded-lg px-4 py-2 text-sm transition-colors">
              Jeda
            </button>
          )}
          <button onClick={stepForward} disabled={done} className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 rounded-lg px-3 py-2 text-sm transition-colors disabled:opacity-40">
            Langkah Maju
          </button>
          <button onClick={reset} className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 rounded-lg px-3 py-2 text-sm transition-colors">
            Reset
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs uppercase tracking-wider text-zinc-500">Kecepatan:</span>
            <input type="range" min={0.5} max={2} step={0.5} value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} className="w-24 accent-emerald-500" />
            <span className="text-sm font-mono text-zinc-400 w-8">{speed}x</span>
          </div>
        </div>
      </div>

      {/* Visualization */}
      <div className="bg-zinc-950/50 rounded-xl p-6 border border-zinc-800 min-h-[200px] flex items-center justify-center">
        <div className="flex gap-1 sm:gap-2 justify-center items-end overflow-x-auto">
          {arr.map((val, i) => (
            <div key={i} className="flex flex-col items-center transition-all duration-300 ease-in-out">
              <div
                className={`min-w-[2.5rem] h-10 sm:min-w-[3rem] sm:h-12 flex items-center justify-center border-2 rounded-lg font-medium text-sm transition-all duration-300 ease-in-out ${
                  statuses[i] ? BG[statuses[i]] : BG.idle
                }`}
              >
                {val}
              </div>
              <span className="text-xs text-zinc-500 mt-1 font-mono">[{i}]</span>
              {/* Pointer arrow */}
              {currentIndex === i && (
                <div className="mt-1 transition-all duration-300">
                  <svg width="16" height="16" viewBox="0 0 16 16" className="text-emerald-400">
                    <polygon points="8,0 16,16 0,16" fill="currentColor" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Status panel */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
        <p className="text-sm font-mono text-zinc-300">
          <span className="text-zinc-500">Iterasi:</span> {iterations}
        </p>
        {message && (
          <p className={`text-sm font-mono mt-1 ${done && message.includes("ditemukan di") ? "text-emerald-400" : done ? "text-red-400" : "text-amber-300"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
