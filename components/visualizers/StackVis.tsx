"use client";
import { useState } from "react";

const MAX_SIZE = 8;

export default function StackVis() {
  const [stack, setStack] = useState<number[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState<"info" | "success" | "error">("info");
  const [animating, setAnimating] = useState<number | null>(null);

  const push = () => {
    const val = parseInt(inputVal);
    if (isNaN(val)) { setMessage("Masukkan angka yang valid!"); setMsgType("error"); return; }
    if (stack.length >= MAX_SIZE) {
      setMessage("Stack Overflow! Tumpukan sudah penuh (maks 8 elemen).");
      setMsgType("error");
      return;
    }
    setAnimating(stack.length);
    setStack((s) => [...s, val]);
    setMessage(`Push: Menambahkan ${val} ke atas tumpukan`);
    setMsgType("success");
    setInputVal("");
    setTimeout(() => setAnimating(null), 400);
  };

  const pop = () => {
    if (stack.length === 0) {
      setMessage("Stack Underflow! Tumpukan kosong, tidak ada elemen untuk dikeluarkan.");
      setMsgType("error");
      return;
    }
    const val = stack[stack.length - 1];
    setAnimating(stack.length - 1);
    setTimeout(() => {
      setStack((s) => s.slice(0, -1));
      setMessage(`Pop: Mengeluarkan ${val} dari atas tumpukan`);
      setMsgType("info");
      setAnimating(null);
    }, 300);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-end">
        <div className="w-32">
          <label className="block text-sm font-medium mb-1">Nilai</label>
          <input
            type="number"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && push()}
            placeholder="Angka"
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 text-sm"
          />
        </div>
        <button onClick={push} className="px-4 py-2 bg-[#22c55e] text-white rounded-lg text-sm hover:opacity-90">
          Push
        </button>
        <button onClick={pop} className="px-4 py-2 bg-[#ef4444] text-white rounded-lg text-sm hover:opacity-90">
          Pop
        </button>
        <button onClick={() => { setStack([]); setMessage(""); }} className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm hover:opacity-90">
          Reset
        </button>
      </div>

      {/* Stack Visual */}
      <div className="flex justify-center">
        <div className="relative">
          {/* TOP label */}
          {stack.length > 0 && (
            <div className="flex items-center gap-1 mb-1 justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" className="text-[#ef4444]">
                <polygon points="6,0 12,12 0,12" fill="currentColor" />
              </svg>
              <span className="text-xs font-bold text-[#ef4444]">TOP</span>
            </div>
          )}

          {/* Stack container */}
          <div className="border-l-4 border-r-4 border-b-4 border-gray-400 dark:border-gray-500 rounded-b-lg p-1 min-w-[120px] sm:min-w-[160px]" style={{ minHeight: 280 }}>
            <div className="flex flex-col-reverse gap-1">
              {stack.length === 0 && (
                <div className="text-center text-gray-400 py-8 text-sm italic">Tumpukan kosong</div>
              )}
              {stack.map((val, i) => (
                <div
                  key={`${i}-${val}`}
                  className={`px-4 py-3 text-center font-bold rounded border-2 text-sm sm:text-base transition-all duration-300 ${
                    i === stack.length - 1
                      ? "bg-[#3b82f6] border-[#3b82f6] text-white"
                      : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-500"
                  } ${animating === i ? "scale-105" : ""}`}
                  style={{
                    transform: animating === i ? "translateY(-8px)" : "translateY(0)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {val}
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM label */}
          <div className="text-center mt-1">
            <span className="text-xs font-bold text-gray-500">BOTTOM</span>
          </div>
        </div>
      </div>

      {/* Capacity indicator */}
      <div className="flex justify-center">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-2 w-48">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${stack.length >= MAX_SIZE ? "bg-[#ef4444]" : "bg-[#3b82f6]"}`}
            style={{ width: `${(stack.length / MAX_SIZE) * 100}%` }}
          />
        </div>
        <span className="text-xs ml-2 text-gray-500">{stack.length}/{MAX_SIZE}</span>
      </div>

      {/* Info */}
      {message && (
        <div className={`rounded-lg p-4 text-sm font-medium ${
          msgType === "error" ? "bg-red-50 dark:bg-red-900/20 text-[#ef4444]" :
          msgType === "success" ? "bg-green-50 dark:bg-green-900/20 text-[#22c55e]" :
          "bg-blue-50 dark:bg-blue-900/20 text-[#3b82f6]"
        }`}>
          {message}
        </div>
      )}
    </div>
  );
}
