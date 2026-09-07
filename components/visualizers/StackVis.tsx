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
    <div className="space-y-4">
      {/* Controls */}
      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 ring-1 ring-white/5">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="w-32">
            <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-2">Nilai</label>
            <input
              type="number"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && push()}
              placeholder="Angka"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 text-sm px-3 py-2 focus:border-zinc-500 focus:outline-none"
            />
          </div>
          <button onClick={push} className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors">
            Push
          </button>
          <button onClick={pop} className="bg-zinc-700 hover:bg-zinc-600 border border-zinc-600 text-zinc-200 rounded-lg px-4 py-2 text-sm transition-colors">
            Pop
          </button>
          <button onClick={() => { setStack([]); setMessage(""); }} className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 rounded-lg px-3 py-2 text-sm transition-colors">
            Reset
          </button>
        </div>
      </div>

      {/* Stack Visual */}
      <div className="flex justify-center">
        <div className="relative">
          {/* TOP label */}
          {stack.length > 0 && (
            <div className="flex items-center gap-1 mb-1 justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" className="text-emerald-400">
                <polygon points="6,0 12,12 0,12" fill="currentColor" />
              </svg>
              <span className="text-xs uppercase tracking-wider text-zinc-500 font-bold">TOP</span>
            </div>
          )}

          {/* Stack container */}
          <div className="border-2 border-zinc-700 rounded-xl bg-zinc-950 p-1 min-w-[120px] sm:min-w-[160px] min-h-[320px]">
            <div className="flex flex-col-reverse gap-1">
              {stack.length === 0 && (
                <div className="text-center text-zinc-500 py-8 text-sm italic">Tumpukan kosong</div>
              )}
              {stack.map((val, i) => (
                <div
                  key={`${i}-${val}`}
                  className={`px-4 py-3 text-center font-medium rounded-lg border-2 text-sm sm:text-base transition-all duration-300 ${
                    i === stack.length - 1
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                      : "bg-zinc-700 border-zinc-600 text-zinc-200"
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
          <div className="text-center mt-2">
            <span className="text-xs uppercase tracking-wider text-zinc-500">BOTTOM</span>
          </div>
        </div>
      </div>

      {/* Capacity indicator */}
      <div className="flex justify-center items-center">
        <div className="bg-zinc-800 rounded-full h-2 w-48">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${stack.length >= MAX_SIZE ? "bg-red-500" : "bg-emerald-500"}`}
            style={{ width: `${(stack.length / MAX_SIZE) * 100}%` }}
          />
        </div>
        <span className="text-xs ml-2 text-zinc-500 font-mono">{stack.length}/{MAX_SIZE}</span>
      </div>

      {/* Info */}
      {message && (
        <div className={`rounded-lg p-3 text-sm font-mono ${
          msgType === "error" ? "bg-red-500/10 border border-red-500/30 text-red-400" :
          msgType === "success" ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400" :
          "bg-zinc-900/50 border border-zinc-800 text-zinc-300"
        }`}>
          {message}
        </div>
      )}
    </div>
  );
}
