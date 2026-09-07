import Link from "next/link";

const modules = [
  {
    href: "/dasar-bk",
    label: "Modul 01",
    icon: "\u{1F9E0}",
    title: "4 Pilar Berpikir Komputasional",
    desc: "Abstraksi, Algoritma, Dekomposisi, dan Pengenalan Pola — fondasi berpikir komputasional.",
  },
  {
    href: "/pencarian",
    label: "Modul 02",
    icon: "\u{1F50D}",
    title: "Pencarian (Linear Search)",
    desc: "Visualisasi algoritma pencarian berurutan secara interaktif dan real-time.",
  },
  {
    href: "/pengurutan",
    label: "Modul 03",
    icon: "\u{1F4CA}",
    title: "Pengurutan (Sorting)",
    desc: "Bubble Sort, Selection Sort, dan Insertion Sort — lihat proses tukar dan sisip secara langsung.",
  },
  {
    href: "/stack-queue",
    label: "Modul 04",
    icon: "\u{1F4DA}",
    title: "Stack & Queue",
    desc: "Simulasi struktur data Tumpukan (LIFO) dan Antrean (FIFO) dengan animasi interaktif.",
  },
  {
    href: "/latihan-soal",
    label: "Modul 05",
    icon: "✏️",
    title: "Latihan Soal",
    desc: "Uji pemahamanmu dengan kuis pilihan ganda beserta pembahasan langsung.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-12 px-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-100 leading-[0.95]">
            Berpikir
            <br />
            Komputasional
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-zinc-400 leading-relaxed">
            Pelajari konsep Computational Thinking secara interaktif — visualisasi algoritma,
            simulasi struktur data, dan latihan soal untuk Informatika SMA Kelas 10.
          </p>
        </div>
      </section>

      {/* Divider + Module Grid */}
      <section className="mt-8 border-t border-zinc-800 pt-16 pb-20 px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-10">
            Modul Pembelajaran
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="group rounded-xl border border-zinc-800 bg-zinc-900 p-6 ring-1 ring-white/5 transition-all duration-200 hover:border-zinc-600 hover:scale-[1.02]"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-3">
                  {m.label}
                </p>
                <div className="text-3xl mb-3">{m.icon}</div>
                <h3 className="text-lg font-medium text-zinc-100 group-hover:text-emerald-400 transition-colors duration-200">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {m.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
