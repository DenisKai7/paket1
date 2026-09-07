"use client";
import { useState, useEffect, useRef, useCallback } from "react";

interface Step {
  array: number[];
  comparing: [number, number];
  swapped: boolean;
  sorted: number[];
  message: string;
}

function randomArray(len = 8) {
  return Array.from({ length: len }, () => Math.floor(Math.random() * 50) + 1);
}

function generateSteps(input: number[]): Step[] {
  const steps: Step[] = [];
  const a = [...input];
  const n = a.length;
  const sorted: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      const swapped = a[j] > a[j + 1];
      steps.push({
        array: [...a],
        comparing: [j, j + 1],
        swapped: false,
        sorted: [...sorted],
        message: `Membandingkan array[${j}]=${a[j]} dan array[${j + 1}]=${a[j + 1]}`,
      });
      if (swapped) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({
          array: [...a],
          comparing: [j, j + 1],
          swapped: true,
          sorted: [...sorted],
          message: `Swap! ${a[j + 1]} > ${a[j]} → tukar posisi`,
        });
      }
    }
    sorted.push(n - 1 - i);
  }
  sorted.push(0);
  steps.push({
    array: [...a],
    comparing: [-1, -1],
    swapped: false,
    sorted: [...sorted],
    message: "Pengurutan selesai!",
  });
  return steps;
}

export default function BubbleSortVis() {
  const [arr, setArr] = useState<number[]>(() => randomArray());
  const [steps, setSteps] = useState<Step[]>([]);
  const [stepIdx, setStepIdx] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [inputStr, setInputStr] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const current = stepIdx >= 0 && stepIdx < steps.length ? steps[stepIdx] : null;
  const done = stepIdx >= steps.length - 1 && steps.length > 0;

  useEffect(() => {
    setSteps(generateSteps(arr));
    setStepIdx(-1);
    setIsPlaying(false);
  }, [arr]);

  const stepForward = useCallback(() => {
    if (done) return;
    setStepIdx((i) => {
      const next = i + 1;
      if (next >= steps.length) {
        setIsPlaying(false);
        return i;
      }
      return next;
    });
  }, [done, steps.length]);

  useEffect(() => {
    if (!isPlaying || done) return;
    timerRef.current = setTimeout(stepForward, 600 / speed);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isPlaying, done, stepIdx, speed, stepForward]);

  const reset = () => {
    setStepIdx(-1);
    setIsPlaying(false);
  };

  const handleRandomize = () => {
    const a = randomArray();
    setArr(a);
    setInputStr(a.join(", "));
  };

  const handleApplyInput = () => {
    const parsed = inputStr.split(",").map((s) => parseInt(s.trim())).filter((n) => !isNaN(n) && n > 0);
    if (parsed.length > 1) setArr(parsed);
  };

  const displayArr = current ? current.array : arr;
  const maxVal = Math.max(...displayArr, 1);

  const getBoxClass = (i: number) => {
    if (!current) return "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600";
    if (current.sorted.includes(i)) return "bg-[#22c55e] border-[#22c55e] text-white";
    if (current.comparing[0] === i || current.comparing[1] === i) {
      return current.swapped
        ? "bg-[#ef4444] border-[#ef4444] text-white"
        : "bg-[#fbbf24] border-[#fbbf24] text-black";
    }
    return "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600";
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium mb-1">Array (pisahkan koma)</label>
          <input type="text" value={inputStr || arr.join(", ")} onChange={(e) => setInputStr(e.target.value)} onBlur={handleApplyInput}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 text-sm" />
        </div>
        <button onClick={handleRandomize} className="px-4 py-2 bg-[#3b82f6] text-white rounded-lg text-sm hover:opacity-90">Acak</button>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 items-center">
        {!isPlaying ? (
          <button onClick={() => { if (done) reset(); setTimeout(() => setIsPlaying(true), 50); }}
            className="px-4 py-2 bg-[#22c55e] text-white rounded-lg text-sm hover:opacity-90">
            {done ? "Mulai Ulang" : "Mulai"}
          </button>
        ) : (
          <button onClick={() => setIsPlaying(false)} className="px-4 py-2 bg-[#fbbf24] text-black rounded-lg text-sm hover:opacity-90">Jeda</button>
        )}
        <button onClick={stepForward} disabled={done} className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm disabled:opacity-50">Langkah Maju</button>
        <button onClick={reset} className="px-4 py-2 bg-[#ef4444] text-white rounded-lg text-sm hover:opacity-90">Reset</button>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm">Kecepatan:</span>
          <input type="range" min={0.5} max={2} step={0.5} value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} className="w-24" />
          <span className="text-sm font-mono w-8">{speed}x</span>
        </div>
      </div>

      {/* Bars */}
      <div className="flex gap-1 sm:gap-2 justify-center items-end py-4 overflow-x-auto" style={{ minHeight: 200 }}>
        {displayArr.map((val, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className={`w-8 sm:w-12 flex items-end justify-center border-2 rounded-t-lg font-bold text-xs sm:text-sm transition-all duration-300 ${getBoxClass(i)}`}
              style={{ height: `${Math.max((val / maxVal) * 150, 24)}px` }}
            >
              <span className="pb-1">{val}</span>
            </div>
            <span className="text-xs text-gray-500">[{i}]</span>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-1">
        <p className="text-sm"><span className="font-semibold">Langkah:</span> {Math.max(stepIdx + 1, 0)} / {steps.length}</p>
        {current && <p className={`text-sm font-medium ${done ? "text-[#22c55e]" : ""}`}>{current.message}</p>}
      </div>
    </div>
  );
}
