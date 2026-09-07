export interface PilarItem {
  id: string;
  title: string;
  icon: string; // lucide icon name
  description: string;
  examples: string[];
}

export interface AlgorithmInfo {
  id: string;
  title: string;
  description: string;
  steps: string[];
  complexity: string;
}

export interface DataStructureInfo {
  id: string;
  title: string;
  principle: string;
  description: string;
  operations: { name: string; description: string }[];
  realLifeExample: string;
}

export const pilarData: PilarItem[] = [
  {
    id: 'abstraksi',
    title: 'Abstraksi',
    icon: '🔍',
    description:
      'Abstraksi adalah proses memilih informasi penting dan mengabaikan detail yang tidak relevan untuk menyederhanakan masalah.',
    examples: [
      'Saat menulis jadwal pelajaran, kita hanya mencatat mata pelajaran, jam, dan ruang kelas — tanpa mencatat warna seragam atau cuaca hari itu.',
      'Peta MRT hanya menunjukkan stasiun dan jalur, bukan bentuk gedung di sekitarnya.',
      'Saat memesan ojek online, kita hanya memasukkan titik jemput dan tujuan, tanpa perlu tahu rute detail yang dilewati.',
    ],
  },
  {
    id: 'algoritma',
    title: 'Algoritma',
    icon: '📋',
    description:
      'Algoritma adalah serangkaian langkah-langkah terstruktur dan logis untuk menyelesaikan suatu masalah atau mencapai tujuan tertentu.',
    examples: [
      'Resep membuat mie instan: (1) Rebus air, (2) Masukkan mie, (3) Tunggu 3 menit, (4) Tiriskan, (5) Campurkan bumbu, (6) Aduk rata.',
      'Langkah login akun media sosial: (1) Buka aplikasi, (2) Masukkan email, (3) Masukkan password, (4) Tekan tombol Login.',
      'Cara menyeberang jalan: (1) Berhenti di tepi jalan, (2) Lihat kiri, (3) Lihat kanan, (4) Jika aman, jalan; jika tidak, tunggu.',
    ],
  },
  {
    id: 'dekomposisi',
    title: 'Dekomposisi',
    icon: '🧩',
    description:
      'Dekomposisi adalah teknik memecah masalah besar dan kompleks menjadi bagian-bagian kecil yang lebih mudah diselesaikan satu per satu.',
    examples: [
      'Membuat program kasir toko dipecah menjadi: (1) Input barang, (2) Hitung total harga, (3) Hitung diskon, (4) Cetak struk.',
      'Merencanakan acara ulang tahun dipecah menjadi: (1) Tentukan tema, (2) Buat daftar tamu, (3) Pesan kue, (4) Dekorasi ruangan.',
      'Mengerjakan tugas kelompok dipecah menjadi: (1) Riset materi, (2) Buat presentasi, (3) Latihan presentasi, (4) Cetak laporan.',
    ],
  },
  {
    id: 'pola',
    title: 'Pengenalan Pola',
    icon: '🔗',
    description:
      'Pengenalan pola adalah kemampuan menemukan kesamaan atau keteraturan dalam data atau masalah, sehingga solusi yang sama dapat digunakan kembali.',
    examples: [
      'Mencari buku di perpustakaan dan mencari kontak di ponsel: keduanya menggunakan kata kunci (keyword) untuk menemukan item.',
      'Pola bilangan 2, 4, 6, 8, … — setiap suku bertambah 2. Kita bisa memprediksi suku berikutnya adalah 10.',
      'Setiap hari Senin selalu ada upacara bendera — ini adalah pola berulang yang bisa kita antisipasi.',
    ],
  },
];

export const searchAlgorithms: AlgorithmInfo[] = [
  {
    id: 'linear-search',
    title: 'Linear Search (Pencarian Berurutan)',
    description:
      'Linear Search adalah algoritma pencarian paling sederhana. Data diperiksa satu per satu dari awal (indeks 0) hingga akhir (indeks n-1) sampai elemen yang dicari ditemukan atau seluruh data sudah diperiksa.',
    steps: [
      'Mulai dari elemen pertama (indeks 0).',
      'Bandingkan elemen saat ini dengan nilai target (k).',
      'Jika cocok (array[i] == k), pencarian selesai — elemen ditemukan!',
      'Jika tidak cocok, pindah ke elemen berikutnya (i = i + 1).',
      'Ulangi langkah 2-4 sampai elemen ditemukan atau semua elemen sudah diperiksa.',
      'Jika sampai akhir array tidak ditemukan, berarti elemen target tidak ada di dalam array.',
    ],
    complexity: 'O(n) — Waktu pencarian sebanding dengan jumlah elemen.',
  },
];

export const sortAlgorithms: AlgorithmInfo[] = [
  {
    id: 'bubble-sort',
    title: 'Bubble Sort (Pengurutan Gelembung)',
    description:
      'Bubble Sort bekerja dengan membandingkan dua elemen bersebelahan secara berulang. Jika elemen kiri lebih besar dari elemen kanan, keduanya ditukar (swap). Proses ini diulang hingga tidak ada lagi pertukaran — artinya data sudah terurut. Disebut "gelembung" karena elemen terbesar secara bertahap "menggelembung" ke posisi akhir.',
    steps: [
      'Bandingkan elemen array[i] dengan array[i+1].',
      'Jika array[i] > array[i+1], tukar posisi keduanya (swap).',
      'Lanjutkan perbandingan untuk pasangan berikutnya sampai akhir array.',
      'Ulangi dari awal. Setiap iterasi, elemen terbesar "terkunci" di posisi akhir.',
      'Berhenti ketika satu iterasi penuh tidak terjadi swap.',
    ],
    complexity: 'O(n²) — Kurang efisien untuk data besar.',
  },
  {
    id: 'selection-sort',
    title: 'Selection Sort (Pengurutan Seleksi)',
    description:
      'Selection Sort bekerja dengan mencari elemen terkecil (minimum) dari bagian array yang belum terurut, kemudian menukarnya dengan elemen paling depan dari bagian yang belum terurut tersebut. Proses diulang untuk sisa array hingga semuanya terurut.',
    steps: [
      'Tandai elemen pertama dari bagian yang belum terurut sebagai posisi awal.',
      'Cari elemen terkecil di seluruh bagian yang belum terurut.',
      'Tukar elemen terkecil tersebut dengan elemen di posisi awal.',
      'Geser batas "sudah terurut" satu langkah ke kanan.',
      'Ulangi sampai semua elemen terurut.',
    ],
    complexity: 'O(n²) — Jumlah perbandingan tetap, tapi jumlah swap lebih sedikit dari Bubble Sort.',
  },
  {
    id: 'insertion-sort',
    title: 'Insertion Sort (Pengurutan Sisipan)',
    description:
      'Insertion Sort bekerja dengan mengambil satu elemen dari bagian yang belum terurut, lalu menyisipkannya ke posisi yang tepat di bagian yang sudah terurut di sebelah kirinya. Mirip seperti cara mengurutkan kartu remi di tangan.',
    steps: [
      'Ambil elemen kedua sebagai "kunci" (key).',
      'Bandingkan key dengan elemen-elemen di sebelah kirinya.',
      'Geser elemen yang lebih besar dari key satu posisi ke kanan.',
      'Sisipkan key ke posisi yang tepat.',
      'Ulangi untuk elemen berikutnya sampai seluruh array terurut.',
    ],
    complexity: 'O(n²) — Efisien untuk data yang hampir terurut.',
  },
];

export const dataStructures: DataStructureInfo[] = [
  {
    id: 'stack',
    title: 'Tumpukan (Stack)',
    principle: 'LIFO — Last In, First Out (juga disebut FILO — First In, Last Out)',
    description:
      'Stack adalah struktur data linear di mana elemen terakhir yang dimasukkan akan menjadi elemen pertama yang dikeluarkan. Bayangkan tumpukan piring: piring terakhir yang diletakkan di atas adalah piring pertama yang diambil.',
    operations: [
      { name: 'Push', description: 'Menambahkan elemen baru ke puncak (top) tumpukan.' },
      { name: 'Pop', description: 'Mengeluarkan dan menghapus elemen dari puncak (top) tumpukan.' },
      { name: 'Peek / Top', description: 'Melihat elemen teratas tanpa menghapusnya.' },
      { name: 'isEmpty', description: 'Mengecek apakah tumpukan kosong.' },
    ],
    realLifeExample:
      'Tumpukan piring di kantin, tombol Undo/Redo di aplikasi, riwayat halaman web (tombol Back di browser).',
  },
  {
    id: 'queue',
    title: 'Antrean (Queue)',
    principle: 'FIFO — First In, First Out',
    description:
      'Queue adalah struktur data linear di mana elemen pertama yang dimasukkan akan menjadi elemen pertama yang dikeluarkan. Bayangkan antrean di loket: orang pertama yang datang adalah orang pertama yang dilayani.',
    operations: [
      { name: 'Enqueue', description: 'Menambahkan elemen baru ke belakang (rear/tail) antrean.' },
      {
        name: 'Dequeue',
        description: 'Mengeluarkan dan menghapus elemen dari depan (front/head) antrean.',
      },
      { name: 'Front / Peek', description: 'Melihat elemen terdepan tanpa menghapusnya.' },
      { name: 'isEmpty', description: 'Mengecek apakah antrean kosong.' },
    ],
    realLifeExample:
      'Antrean beli tiket bioskop, antrean cetak dokumen di printer, antrean kendaraan di SPBU.',
  },
];
