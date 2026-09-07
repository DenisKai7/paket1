"use client";
import { useState } from "react";

const MAX_SIZE = 8;

export default function QueueVis() {
  const [queue, setQueue] = useState<number[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState<"info" | "success" | "error">("info");
  const [animIdx, setAnimIdx] = useState<number | null>(null);

  const enqueue = () => {
    const val = parseInt(inputVal);
    if (isNaN(val)) { setMessage("Masukkan angka yang valid!"); setMsgType("error"); return; }
    if (queue.length >= MAX_SIZE) {
      setMessage("Overflow! Antrean sudah penuh (maks 8 elemen).");
      setMsgType("error");
      return;
    }
    const newLen = queue.length;
    setAnimIdx(newLen);
    setQueue((q) => [...q, val]);
    setMessage("Enqueue: Menambahkan " + val + " ke belakang antrean");
    setMsgType("success");
    setInputVal("");
    setTimeout(() => setAnimIdx(null), 400);
  };

  const dequeue = () => {
    if (queue.length === 0) {
      setMessage("Underflow! Antrean kosong, tidak ada elemen untuk dikeluarkan.");
      setMsgType("error");
      return;
    }
    const val = queue[0];
    setAnimIdx(0);
    setTimeout(() => {
      setQueue((q) => q.slice(1));
      setMessage("Dequeue: Mengeluarkan " + val + " dari depan antrean");
      setMsgType("info");
      setAnimIdx(null);
    }, 300);
  };

  return (
    <div className="space-y-4">
      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 ring-1 ring-white/5">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="w-32">
            <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-2">Nilai</label>
            <input
              type="number"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") enqueue(); }}
              placeholder="Angka"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 text-sm px-3 py-2 focus:border-zinc-500 focus:outline-none"
            />
          </div>
          <button onClick={enqueue} className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors">
            Enqueue
          </button>
          <button onClick={dequeue} className="bg-zinc-700 hover:bg-zinc-600 border border-zinc-600 text-zinc-200 rounded-lg px-4 py-2 text-sm transition-colors">
            Dequeue
          </button>
          <button onClick={() => { setQueue([]); setMessage(""); }} className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 rounded-lg px-3 py-2 text-sm transition-colors">
            Reset
          </button>
        </div>
      </div>

      <div className="bg-zinc-950/50 rounded-xl p-6 border border-zinc-800 overflow-x-auto">
        <div className="flex items-center justify-center gap-0 min-w-fit">
          {queue.length > 0 && (
            <div className="flex flex-col items-center mr-3">
              <span className="text-xs uppercase tracking-wider text-zinc-500 font-bold">FRONT</span>
              <svg width="12" height="12" viewBox="0 0 12 12" className="text-emerald-400 rotate-90 mt-1">
                <polygon points="6,0 12,12 0,12" fill="currentColor" />
              </svg>
            </div>
          )}

          <div className="flex border-2 border-zinc-700 rounded-xl overflow-hidden" style={{ minHeight: 60, minWidth: 200 }}>
            {queue.length === 0 && (
              <div className="flex items-center justify-center w-full text-zinc-500 text-sm italic px-8">
                Antrean kosong
              </div>
            )}
            {queue.map((val, i) => {
              let bg = "bg-zinc-700 text-zinc-200";
              let extra = "";
              if (i === 0) { bg = "bg-emerald-500/20 text-emerald-300"; extra = "border-l-2 border-l-emerald-500"; }
              if (i === queue.length - 1) { bg = "bg-blue-500/20 text-blue-300"; extra = "border-r-2 border-r-blue-500"; }
              if (queue.length === 1) { bg = "bg-emerald-500/20 text-emerald-300"; extra = "border-l-2 border-l-emerald-500 border-r-2 border-r-blue-500"; }
              const anim = animIdx === i ? (i === queue.length - 1 ? "scale-110" : "opacity-50 -translate-x-4") : "";
              return (
                <div
                  key={i + "-" + val}
                  className={"w-14 sm:w-16 flex items-center justify-center font-medium text-sm sm:text-base border-r border-zinc-600 transition-all duration-300 " + bg + " " + extra + " " + anim}
                  style={{ minHeight: 56 }}
                >
                  {val}
                </div>
              );
            })}
          </div>

          {queue.length > 0 && (
            <div className="flex flex-col items-center ml-3">
              <span className="text-xs uppercase tracking-wider text-zinc-500 font-bold">REAR</span>
              <svg width="12" height="12" viewBox="0 0 12 12" className="text-blue-400 -rotate-90 mt-1">
                <polygon points="6,0 12,12 0,12" fill="currentColor" />
              </svg>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="bg-zinc-800 rounded-full h-2 w-48">
          <div
            className={"h-2 rounded-full transition-all duration-300 " + (queue.length >= MAX_SIZE ? "bg-red-500" : "bg-emerald-500")}
            style={{ width: (queue.length / MAX_SIZE) * 100 + "%" }}
          />
        </div>
        <span className="text-xs ml-2 text-zinc-500 font-mono">{queue.length}/{MAX_SIZE}</span>
      </div>

      {message && (
        <div className={"rounded-lg p-3 text-sm font-mono " + (
          msgType === "error" ? "bg-red-500/10 border border-red-500/30 text-red-400" :
          msgType === "success" ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400" :
          "bg-zinc-900/50 border border-zinc-800 text-zinc-300"
        )}>
          {message}
        </div>
      )}
    </div>
  );
}
