import Link from "next/link";

const modules = [
  {
    href: "/dasar-bk",
    icon: "\u{1F9E0}",
    title: "4 Pilar Berpikir Komputasional",
    desc: "Abstraksi, Algoritma, Dekomposisi, dan Pengenalan Pola — fondasi berpikir komputasional.",
  },
  {
    href: "/pencarian",
    icon: "\u{1F50D}",
    title: "Pencarian (Linear Search)",
    desc: "Visualisasi algoritma pencarian berurutan secara interaktif dan real-time.",
  },
  {
    href: "/pengurutan",
    icon: "\u{1F4CA}",
    title: "Pengurutan (Sorting)",
    desc: "Bubble Sort, Selection Sort, dan Insertion Sort — lihat proses tukar dan sisip secara langsung.",
  },
  {
    href: "/stack-queue",
    icon: "\u{1F4DA}",
    title: "Stack & Queue",
    desc: "Simulasi struktur data Tumpukan (LIFO) dan Antrean (FIFO) dengan animasi interaktif.",
  },
  {
    href: "/latihan-soal",
    icon: "✏️",
    title: "Latihan Soal",
    desc: "Uji pemahamanmu dengan kuis pilihan ganda beserta pembahasan langsung.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-purple-700 to-indigo-800 text-white">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:py-28">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Berpikir Komputasional
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100 sm:text-xl">
            Pelajari konsep Computational Thinking secara interaktif — visualisasi algoritma,
            simulasi struktur data, dan latihan soal untuk Informatika SMA Kelas 10.
          </p>
        </div>
      </section>

      {/* Module Grid */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-800 dark:text-gray-100">
          Pilih Modul Pembelajaran
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="mb-3 text-4xl">{m.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-50 dark:group-hover:text-blue-400">
                {m.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{m.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
