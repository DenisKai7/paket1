"use client";
import { useState, useEffect, useRef, useCallback } from "react";

type Status = "idle" | "checking" | "found" | "not-matched";

const BG: Record<Status, string> = {
  idle: "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600",
  checking: "bg-[#fbbf24] border-[#fbbf24] text-black",
  found: "bg-[#22c55e] border-[#22c55e] text-white",
  "not-matched": "bg-[#9ca3af] border-[#9ca3af] text-white",
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
    <div className="space-y-6">
      {/* Input controls */}
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium mb-1">Array (pisahkan koma)</label>
          <input
            type="text"
            value={inputStr || arr.join(", ")}
            onChange={(e) => setInputStr(e.target.value)}
            onBlur={handleApplyInput}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 text-sm"
          />
        </div>
        <div className="w-24">
          <label className="block text-sm font-medium mb-1">Target</label>
          <input
            type="number"
            value={targetStr}
            onChange={(e) => setTargetStr(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 text-sm"
          />
        </div>
        <button onClick={handleRandomize} className="px-4 py-2 bg-[#3b82f6] text-white rounded-lg text-sm hover:opacity-90">
          Acak
        </button>
      </div>

      {/* Control panel */}
      <div className="flex flex-wrap gap-2 items-center">
        {!isPlaying ? (
          <button onClick={handleStart} className="px-4 py-2 bg-[#22c55e] text-white rounded-lg text-sm hover:opacity-90">
            {done ? "Mulai Ulang" : "Mulai"}
          </button>
        ) : (
          <button onClick={() => setIsPlaying(false)} className="px-4 py-2 bg-[#fbbf24] text-black rounded-lg text-sm hover:opacity-90">
            Jeda
          </button>
        )}
        <button onClick={stepForward} disabled={done} className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm hover:opacity-90 disabled:opacity-50">
          Langkah Maju
        </button>
        <button onClick={reset} className="px-4 py-2 bg-[#ef4444] text-white rounded-lg text-sm hover:opacity-90">
          Reset
        </button>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm">Kecepatan:</span>
          <input type="range" min={0.5} max={2} step={0.5} value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} className="w-24" />
          <span className="text-sm font-mono w-8">{speed}x</span>
        </div>
      </div>

      {/* Visualization */}
      <div className="flex gap-1 sm:gap-2 justify-center items-end py-6 overflow-x-auto">
        {arr.map((val, i) => (
          <div key={i} className="flex flex-col items-center transition-all duration-300">
            <div
              className={`w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center border-2 rounded-lg font-bold text-sm sm:text-lg transition-all duration-300 ${
                statuses[i] ? BG[statuses[i]] : BG.idle
              }`}
            >
              {val}
            </div>
            <span className="text-xs text-gray-500 mt-1">[{i}]</span>
            {/* Pointer arrow */}
            {currentIndex === i && (
              <div className="mt-1 transition-all duration-300">
                <svg width="16" height="16" viewBox="0 0 16 16" className="text-[#3b82f6]">
                  <polygon points="8,0 16,16 0,16" fill="currentColor" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Status panel */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-1">
        <p className="text-sm">
          <span className="font-semibold">Iterasi:</span> {iterations}
        </p>
        {message && (
          <p className={`text-sm font-medium ${done && message.includes("ditemukan di") ? "text-[#22c55e]" : done ? "text-[#ef4444]" : "text-[#fbbf24] dark:text-[#fbbf24]"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
