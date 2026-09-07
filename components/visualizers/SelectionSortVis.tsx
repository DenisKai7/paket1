"use client";
import { useState, useEffect, useRef, useCallback } from "react";

interface Step {
  array: number[];
  scanIndex: number;
  minIndex: number;
  swapIndices: [number, number] | null;
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
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...a],
        scanIndex: j,
        minIndex: minIdx,
        swapIndices: null,
        sorted: [...sorted],
        message: `Mencari minimum: membandingkan array[${j}]=${a[j]} dengan minimum sementara array[${minIdx}]=${a[minIdx]}`,
      });
      if (a[j] < a[minIdx]) {
        minIdx = j;
        steps.push({
          array: [...a],
          scanIndex: j,
          minIndex: minIdx,
          swapIndices: null,
          sorted: [...sorted],
          message: `Minimum baru ditemukan: array[${minIdx}]=${a[minIdx]}`,
        });
      }
    }
    if (minIdx !== i) {
      steps.push({
        array: [...a],
        scanIndex: -1,
        minIndex: minIdx,
        swapIndices: [i, minIdx],
        sorted: [...sorted],
        message: `Swap array[${i}]=${a[i]} dengan array[${minIdx}]=${a[minIdx]}`,
      });
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
    }
    sorted.push(i);
  }
  sorted.push(n - 1);
  steps.push({
    array: [...a],
    scanIndex: -1,
    minIndex: -1,
    swapIndices: null,
    sorted: [...sorted],
    message: "Pengurutan selesai!",
  });
  return steps;
}

export default function SelectionSortVis() {
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
      if (next >= steps.length) { setIsPlaying(false); return i; }
      return next;
    });
  }, [done, steps.length]);

  useEffect(() => {
    if (!isPlaying || done) return;
    timerRef.current = setTimeout(stepForward, 600 / speed);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isPlaying, done, stepIdx, speed, stepForward]);

  const reset = () => { setStepIdx(-1); setIsPlaying(false); };

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

  const getBoxClass = (i: number) => {
    if (!current) return "bg-zinc-700 border-zinc-600 text-zinc-200";
    if (current.sorted.includes(i)) return "bg-emerald-500/20 border-emerald-500 text-emerald-300";
    if (current.minIndex === i) return "bg-red-500/20 border-red-500 text-red-300";
    if (current.scanIndex === i) return "bg-amber-500/20 border-amber-500 text-amber-300";
    if (current.swapIndices && (current.swapIndices[0] === i || current.swapIndices[1] === i))
      return "bg-amber-500/30 border-amber-400 text-amber-300";
    return "bg-zinc-700 border-zinc-600 text-zinc-200";
  };

  return (
    <div className="space-y-4">
      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 ring-1 ring-white/5">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-2">Array (pisahkan koma)</label>
            <input type="text" value={inputStr || arr.join(", ")} onChange={(e) => setInputStr(e.target.value)} onBlur={handleApplyInput}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 text-sm px-3 py-2 focus:border-zinc-500 focus:outline-none" />
          </div>
          <button onClick={handleRandomize} className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 rounded-lg px-3 py-2 text-sm transition-colors">Acak</button>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 ring-1 ring-white/5">
        <div className="flex flex-wrap gap-2 items-center">
          {!isPlaying ? (
            <button onClick={() => { if (done) reset(); setTimeout(() => setIsPlaying(true), 50); }}
              className="bg-zinc-100 text-zinc-900 hover:bg-white rounded-lg px-4 py-2 text-sm font-medium transition-colors">
              {done ? "Mulai Ulang" : "Mulai"}
            </button>
          ) : (
            <button onClick={() => setIsPlaying(false)} className="bg-amber-500/20 border border-amber-500 text-amber-300 rounded-lg px-4 py-2 text-sm transition-colors">Jeda</button>
          )}
          <button onClick={stepForward} disabled={done} className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 rounded-lg px-3 py-2 text-sm transition-colors disabled:opacity-40">Langkah Maju</button>
          <button onClick={reset} className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 rounded-lg px-3 py-2 text-sm transition-colors">Reset</button>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs uppercase tracking-wider text-zinc-500">Kecepatan:</span>
            <input type="range" min={0.5} max={2} step={0.5} value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} className="w-24 accent-emerald-500" />
            <span className="text-sm font-mono text-zinc-400 w-8">{speed}x</span>
          </div>
        </div>
      </div>

      <div className="bg-zinc-950/50 rounded-xl p-6 border border-zinc-800 min-h-[200px] flex items-end justify-center">
        <div className="flex gap-1 sm:gap-2 items-end overflow-x-auto">
          {displayArr.map((val, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`min-w-[2.5rem] sm:min-w-[3rem] h-12 flex items-center justify-center border-2 rounded-lg font-medium text-sm transition-all duration-300 ease-in-out ${getBoxClass(i)}`}
              >
                {val}
              </div>
              <span className="text-xs text-zinc-500 mt-1 font-mono">[{i}]</span>
              {current && current.minIndex === i && (
                <span className="text-xs text-red-400 font-bold mt-1 uppercase tracking-wider">MIN</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
        <p className="text-sm font-mono text-zinc-300"><span className="text-zinc-500">Langkah:</span> {Math.max(stepIdx + 1, 0)} / {steps.length}</p>
        {current && <p className={`text-sm font-mono mt-1 ${done ? "text-emerald-400" : "text-amber-300"}`}>{current.message}</p>}
      </div>
    </div>
  );
}
