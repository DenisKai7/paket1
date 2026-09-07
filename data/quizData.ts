export interface QuizQuestion {
  id: number;
  module: 'pilar' | 'pencarian' | 'pengurutan' | 'stack-queue';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // === MODUL: 4 PILAR BERPIKIR KOMPUTASIONAL ===
  {
    id: 1,
    module: 'pilar',
    question:
      'Saat membuat peta jalur bus kota, kita hanya menampilkan rute dan halte tanpa menggambar detail bangunan. Teknik berpikir komputasional apa yang digunakan?',
    options: ['Dekomposisi', 'Abstraksi', 'Algoritma', 'Pengenalan Pola'],
    correctIndex: 1,
    explanation:
      'Abstraksi adalah proses memilih informasi penting (rute dan halte) dan mengabaikan detail yang tidak relevan (bentuk bangunan) untuk menyederhanakan representasi.',
  },
  {
    id: 2,
    module: 'pilar',
    question:
      'Memecah proses "membuat website" menjadi tahap desain, coding, dan testing merupakan contoh dari …',
    options: ['Abstraksi', 'Pengenalan Pola', 'Dekomposisi', 'Algoritma'],
    correctIndex: 2,
    explanation:
      'Dekomposisi adalah teknik memecah masalah besar (membuat website) menjadi sub-masalah yang lebih kecil dan mudah ditangani (desain, coding, testing).',
  },
  {
    id: 3,
    module: 'pilar',
    question:
      'Langkah-langkah "1. Nyalakan kompor, 2. Rebus air, 3. Masukkan mie, 4. Tunggu 3 menit, 5. Angkat" merupakan contoh dari …',
    options: ['Pengenalan Pola', 'Dekomposisi', 'Abstraksi', 'Algoritma'],
    correctIndex: 3,
    explanation:
      'Algoritma adalah urutan langkah-langkah yang terstruktur dan logis untuk menyelesaikan suatu masalah atau mencapai tujuan.',
  },
  {
    id: 4,
    module: 'pilar',
    question:
      'Menyadari bahwa "mencari buku di perpustakaan" dan "mencari kontak di ponsel" menggunakan cara yang sama (kata kunci), merupakan contoh …',
    options: ['Pengenalan Pola', 'Abstraksi', 'Dekomposisi', 'Algoritma'],
    correctIndex: 0,
    explanation:
      'Pengenalan Pola adalah kemampuan menemukan kesamaan pada masalah-masalah berbeda sehingga solusi yang sama (pencarian berdasarkan kata kunci) dapat digunakan kembali.',
  },
  {
    id: 5,
    module: 'pilar',
    question: 'Manakah yang BUKAN termasuk 4 pilar utama Berpikir Komputasional?',
    options: ['Abstraksi', 'Dekomposisi', 'Debugging', 'Pengenalan Pola'],
    correctIndex: 2,
    explanation:
      '4 pilar utama Berpikir Komputasional adalah Abstraksi, Algoritma, Dekomposisi, dan Pengenalan Pola. Debugging bukan salah satu dari 4 pilar tersebut.',
  },

  // === MODUL: PENCARIAN (LINEAR SEARCH) ===
  {
    id: 6,
    module: 'pencarian',
    question:
      'Pada Linear Search, array [2, 4, 0, 1, 9] dicari angka 1. Berapa kali perbandingan dilakukan hingga angka 1 ditemukan?',
    options: ['3 kali', '4 kali', '5 kali', '1 kali'],
    correctIndex: 1,
    explanation:
      'Linear Search memeriksa dari indeks 0: [2]≠1, [4]≠1, [0]≠1, [1]=1. Angka 1 ditemukan pada perbandingan ke-4 (indeks ke-3).',
  },
  {
    id: 7,
    module: 'pencarian',
    question:
      'Jika Linear Search digunakan untuk mencari angka 7 pada array [3, 5, 7, 2, 8], di indeks berapakah angka 7 ditemukan?',
    options: ['Indeks 0', 'Indeks 1', 'Indeks 2', 'Indeks 3'],
    correctIndex: 2,
    explanation:
      'Linear Search memeriksa dari indeks 0: [3]≠7, [5]≠7, [7]=7. Ditemukan di indeks 2.',
  },
  {
    id: 8,
    module: 'pencarian',
    question:
      'Apa yang terjadi jika Linear Search mencari angka yang tidak ada di dalam array?',
    options: [
      'Program langsung berhenti di elemen pertama',
      'Program memeriksa seluruh elemen array dan menyatakan tidak ditemukan',
      'Program hanya memeriksa setengah dari array',
      'Program menampilkan error',
    ],
    correctIndex: 1,
    explanation:
      'Jika elemen tidak ditemukan, Linear Search akan memeriksa seluruh elemen array dari indeks 0 hingga n-1, lalu menyatakan bahwa elemen target tidak ada.',
  },
  {
    id: 9,
    module: 'pencarian',
    question: 'Berapa kompleksitas waktu (time complexity) dari Linear Search?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctIndex: 2,
    explanation:
      'Linear Search memiliki kompleksitas O(n) karena dalam kasus terburuk, semua elemen harus diperiksa satu per satu.',
  },

  // === MODUL: PENGURUTAN (SORTING) ===
  {
    id: 10,
    module: 'pengurutan',
    question:
      'Pada Bubble Sort untuk array [5, 3, 1], berapa kali pertukaran (swap) terjadi pada iterasi pertama (pass pertama)?',
    options: ['1 kali', '2 kali', '3 kali', '0 kali'],
    correctIndex: 1,
    explanation:
      'Pass pertama: bandingkan (5,3)→swap→[3,5,1], bandingkan (5,1)→swap→[3,1,5]. Terjadi 2 kali swap. Elemen terbesar (5) sudah di posisi akhir.',
  },
  {
    id: 11,
    module: 'pengurutan',
    question:
      'Pada Selection Sort, apa yang dilakukan di setiap iterasi?',
    options: [
      'Menukar dua elemen bersebelahan',
      'Mencari elemen terkecil dari sisa array lalu menukarnya dengan posisi awal',
      'Menyisipkan elemen ke posisi yang tepat di bagian terurut',
      'Membagi array menjadi dua bagian',
    ],
    correctIndex: 1,
    explanation:
      'Selection Sort bekerja dengan mencari elemen minimum dari bagian yang belum terurut, lalu menukarnya (swap) dengan elemen paling depan dari bagian yang belum terurut.',
  },
  {
    id: 12,
    module: 'pengurutan',
    question:
      'Insertion Sort paling mirip dengan cara kita melakukan apa dalam kehidupan sehari-hari?',
    options: [
      'Mengurutkan kartu remi di tangan',
      'Mengurutkan buku berdasarkan warna sampul',
      'Mencari barang di dalam tas',
      'Menumpuk piring di rak',
    ],
    correctIndex: 0,
    explanation:
      'Insertion Sort mirip cara mengurutkan kartu remi: kita mengambil satu kartu dan menyisipkannya ke posisi yang tepat di antara kartu-kartu yang sudah terurut di tangan kita.',
  },
  {
    id: 13,
    module: 'pengurutan',
    question:
      'Array [4, 2, 7, 1] diurutkan dengan Bubble Sort. Setelah pass pertama, hasilnya adalah …',
    options: ['[1, 2, 4, 7]', '[2, 4, 1, 7]', '[2, 4, 7, 1]', '[1, 4, 2, 7]'],
    correctIndex: 1,
    explanation:
      'Pass pertama: (4,2)→swap→[2,4,7,1], (4,7)→OK→[2,4,7,1], (7,1)→swap→[2,4,1,7]. Elemen terbesar (7) sudah di posisi akhir.',
  },
  {
    id: 14,
    module: 'pengurutan',
    question: 'Dari ketiga algoritma berikut, manakah yang memiliki jumlah swap paling sedikit?',
    options: ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Semuanya sama'],
    correctIndex: 1,
    explanation:
      'Selection Sort melakukan paling sedikit swap karena setiap iterasi hanya melakukan maksimal 1 kali swap (menukar minimum dengan posisi awal). Bubble Sort bisa melakukan banyak swap per iterasi.',
  },

  // === MODUL: STACK & QUEUE ===
  {
    id: 15,
    module: 'stack-queue',
    question:
      'Pada Stack, dilakukan operasi: Push(A), Push(B), Push(C), Pop(). Elemen apa yang dikeluarkan?',
    options: ['A', 'B', 'C', 'Tidak ada'],
    correctIndex: 2,
    explanation:
      'Stack menggunakan prinsip LIFO (Last In, First Out). Elemen terakhir yang dimasukkan adalah C, sehingga C yang dikeluarkan pertama saat Pop().',
  },
  {
    id: 16,
    module: 'stack-queue',
    question:
      'Pada Queue, dilakukan operasi: Enqueue(X), Enqueue(Y), Enqueue(Z), Dequeue(). Elemen apa yang dikeluarkan?',
    options: ['Z', 'Y', 'X', 'Tidak ada'],
    correctIndex: 2,
    explanation:
      'Queue menggunakan prinsip FIFO (First In, First Out). Elemen pertama yang dimasukkan adalah X, sehingga X yang dikeluarkan pertama saat Dequeue().',
  },
  {
    id: 17,
    module: 'stack-queue',
    question: 'Manakah contoh penerapan Stack di kehidupan nyata?',
    options: [
      'Antrean di loket bank',
      'Tombol Undo di aplikasi pengolah kata',
      'Antrean cetak di printer',
      'Sistem antrian rumah sakit',
    ],
    correctIndex: 1,
    explanation:
      'Tombol Undo menggunakan prinsip Stack (LIFO): aksi terakhir yang dilakukan adalah aksi pertama yang di-Undo. Opsi lainnya menggunakan prinsip Queue (FIFO).',
  },
  {
    id: 18,
    module: 'stack-queue',
    question:
      'Jika Stack sudah penuh dan kita mencoba Push() elemen baru, kondisi ini disebut …',
    options: ['Stack Underflow', 'Stack Overflow', 'Stack Empty', 'Stack Full Error'],
    correctIndex: 1,
    explanation:
      'Stack Overflow terjadi ketika kita mencoba menambahkan elemen ke stack yang sudah penuh. Sebaliknya, Stack Underflow terjadi saat mencoba Pop() dari stack yang kosong.',
  },
  {
    id: 19,
    module: 'stack-queue',
    question:
      'Pada Queue, label "FRONT" menunjuk ke posisi …',
    options: [
      'Elemen yang terakhir masuk',
      'Elemen yang pertama masuk (akan keluar duluan)',
      'Elemen di tengah antrean',
      'Posisi kosong berikutnya',
    ],
    correctIndex: 1,
    explanation:
      'FRONT (atau Head) pada Queue menunjuk ke elemen terdepan — yaitu elemen yang pertama kali masuk dan akan menjadi yang pertama keluar (FIFO).',
  },
  {
    id: 20,
    module: 'stack-queue',
    question:
      'Pada Stack, dilakukan: Push(1), Push(2), Pop(), Push(3), Pop(). Apa isi stack dari bawah ke atas?',
    options: ['[1]', '[1, 3]', '[1, 2]', '[3]'],
    correctIndex: 0,
    explanation:
      'Push(1)→[1], Push(2)→[1,2], Pop()→keluarkan 2→[1], Push(3)→[1,3], Pop()→keluarkan 3→[1]. Sisa stack hanya berisi [1].',
  },
];
