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
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-end">
        <div className="w-32">
          <label className="block text-sm font-medium mb-1">Nilai</label>
          <input
            type="number"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") enqueue(); }}
            placeholder="Angka"
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 text-sm"
          />
        </div>
        <button onClick={enqueue} className="px-4 py-2 bg-[#22c55e] text-white rounded-lg text-sm hover:opacity-90">
          Enqueue
        </button>
        <button onClick={dequeue} className="px-4 py-2 bg-[#ef4444] text-white rounded-lg text-sm hover:opacity-90">
          Dequeue
        </button>
        <button onClick={() => { setQueue([]); setMessage(""); }} className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm hover:opacity-90">
          Reset
        </button>
      </div>

      <div className="overflow-x-auto py-4">
        <div className="flex items-center justify-center gap-0 min-w-fit">
          {queue.length > 0 && (
            <div className="flex flex-col items-center mr-2">
              <span className="text-xs font-bold text-[#22c55e]">FRONT</span>
              <svg width="12" height="12" viewBox="0 0 12 12" className="text-[#22c55e] rotate-90">
                <polygon points="6,0 12,12 0,12" fill="currentColor" />
              </svg>
            </div>
          )}

          <div className="flex border-t-4 border-b-4 border-gray-400 dark:border-gray-500 rounded-lg overflow-hidden" style={{ minHeight: 60, minWidth: 200 }}>
            {queue.length === 0 && (
              <div className="flex items-center justify-center w-full text-gray-400 text-sm italic px-8">
                Antrean kosong
              </div>
            )}
            {queue.map((val, i) => {
              let bg = "bg-white dark:bg-gray-700";
              let extra = "";
              if (i === 0) { bg = "bg-[#22c55e]/20"; extra = "border-l-4 border-l-[#22c55e]"; }
              if (i === queue.length - 1) { bg = "bg-[#3b82f6]/20"; extra = "border-r-4 border-r-[#3b82f6]"; }
              const anim = animIdx === i ? (i === queue.length - 1 ? "scale-110" : "opacity-50 -translate-x-4") : "";
              return (
                <div
                  key={i + "-" + val}
                  className={"w-14 sm:w-16 flex items-center justify-center font-bold text-sm sm:text-base border-r border-gray-300 dark:border-gray-500 transition-all duration-300 " + bg + " " + extra + " " + anim}
                  style={{ minHeight: 56 }}
                >
                  {val}
                </div>
              );
            })}
          </div>

          {queue.length > 0 && (
            <div className="flex flex-col items-center ml-2">
              <span className="text-xs font-bold text-[#3b82f6]">REAR</span>
              <svg width="12" height="12" viewBox="0 0 12 12" className="text-[#3b82f6] -rotate-90">
                <polygon points="6,0 12,12 0,12" fill="currentColor" />
              </svg>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-2 w-48">
          <div
            className={"h-2 rounded-full transition-all duration-300 " + (queue.length >= MAX_SIZE ? "bg-[#ef4444]" : "bg-[#3b82f6]")}
            style={{ width: (queue.length / MAX_SIZE) * 100 + "%" }}
          />
        </div>
        <span className="text-xs ml-2 text-gray-500">{queue.length}/{MAX_SIZE}</span>
      </div>

      {message && (
        <div className={"rounded-lg p-4 text-sm font-medium " + (
          msgType === "error" ? "bg-red-50 dark:bg-red-900/20 text-[#ef4444]" :
          msgType === "success" ? "bg-green-50 dark:bg-green-900/20 text-[#22c55e]" :
          "bg-blue-50 dark:bg-blue-900/20 text-[#3b82f6]"
        )}>
          {message}
        </div>
      )}
    </div>
  );
}
