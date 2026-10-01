<div align="center">

# 🛡️ Tentram

**Platform Navigasi Rute Aman, Pelaporan Fasilitas Publik & Berbagi Lokasi Real-time**

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel Ready](https://img.shields.io/badge/Deploy-Vercel_Ready-000000?logo=vercel&logoColor=white)](https://vercel.com/)

*Perjalanan aman, bersama Tentram.*

</div>

---

## 📌 Tentang Proyek

**Tentram** adalah aplikasi web modern yang dirancang untuk meningkatkan rasa aman masyarakat saat bepergian, khususnya di malam hari atau melewati rute yang belum dikenal. Aplikasi ini memadukan navigasi cerdas berbasis keamanan jalan, pelaporan fasilitas umum (seperti lampu jalan mati atau jalan berlubang), pelacakan lokasi bersama rekan terpercaya (*live location sharing*), dan forum aktivitas komunitas kota.

Antarmuka web dibangun dengan presisi desain tinggi (**1:1 UI/UX**), mendukung interaksi desktop maupun kenyamanan sentuhan ponsel pintar (*mobile-first*).

---

## ✨ Fitur Utama

### 1. 🗺️ Navigasi Rute Aman (Safe Routing)
- **Alur Pemilihan Rute 2 Langkah**:
  - Pengguna dapat mengetik lokasi atau langsung mengklik titik awal dan tujuan di peta.
  - Rekomendasi cepat lokasi favorit (*Rumah, Kampus, Kantor, Masjid*).
- **Perbandingan Rute Cerdas**:
  - **Rute Aman (Safe Route)**: Memprioritaskan jalan utama dengan penerangan jalan umum (PJU) yang baik, minim laporan kriminalitas/bahaya, dan risiko rendah.
  - **Rute Berisiko (Risky Route)**: Jarak tempuh lebih pendek namun melewati titik minim penerangan atau terdapat perbaikan jalan.
- **Rincian Waypoint & Kondisi Jalan**:
  - Estimasi waktu tempuh (ETA) dan jarak kilometer.
  - Status kondisi jalan per segmen (*Penerangan Baik*, *Dalam Perbaikan*, *Titik Perhatian*).
  - Ringkasan statistik kepuasan pengguna (*87% Penerangan Baik*, *Risiko Sedang*, *Kepadatan Lalu Lintas*).
- **Mode Navigasi Aktif**:
  - Tombol interaktif untuk *Mulai Perjalanan* dan *Akhiri Perjalanan*.
- **Tombol Darurat SOS**:
  - Akses cepat panggilan darurat nasional (**Call Center 112**) dan pengiriman sinyal darurat dalam satu sentuhan.

---

### 2. 📍 Peta Interaktif Vektor (Custom Draggable Map)
- **Google Maps-Style Pan & Drag**:
  - Dapat digeser bebas menggunakan tarikan mouse (*mouse drag*) maupun geseran jari (*touch swipe*) pada layar sentuh.
- **Smooth Zoom & Reset**:
  - Mendukung zoom in/out dengan scroll wheel mouse atau tombol `+` / `-`.
  - Tombol *crosshair* untuk memusatkan kembali peta (*recenter*) ke posisi pengguna.
- **Visualisasi Kaya**:
  - Landmark kota (stasiun, kampus, mall, rumah sakit, tempat ibadah).
  - Garis rute dinamis (garis hijau untuk rute aman, garis oranye/kuning untuk rute berisiko).
  - Radar jangkauan teman saat berbagi lokasi.

---

### 3. 📢 Pelaporan Fasilitas Jalan (Buat Laporan)
- **Deteksi Lokasi GPS Otomatis**: Mendeteksi lokasi terkini pengguna dengan opsi penyesuaian manual.
- **Kategori Masalah Spesifik**:
  - Penerangan Jalan Umum (PJU) Rusak/Mati
  - Kondisi Jalan Rusak / Berlubang
  - Trotoar Rusak / Terhalang
  - Rambu Lalu Lintas
  - Kategori Lainnya (dengan input kustom)
- **Unggah Bukti Foto**: Pratinjau foto langsung dari kamera atau galeri perangkat.
- **Catatan Tambahan**: Ruang untuk memberikan deskripsi situasi secara mendalam.
- **Status Laporan Terverifikasi**: Notifikasi layar penuh setelah laporan berhasil terkirim.

---

### 4. 👥 Berbagi Lokasi Real-time (Shareloc)
- **Pilih Teman Terpercaya**: Pilih teman atau keluarga yang berhak memantau perjalanan Anda (misal: *Aulia, Tasya, Rahman, Adit, Zahra*).
- **Pengaturan Durasi Fleksibel**:
  - 15 Menit, 30 Menit, 45 Menit, 1 Jam, atau Selalu Bagikan.
- **Pemantauan Langsung**:
  - Status indikator aktif berwarna hijau (*live*).
  - Hitung mundur sisa durasi.
  - Tombol cepat untuk *Akhiri* atau *Perpanjang Durasi*.

---

### 5. 💬 Aktivitas & Komunitas (Feeds)
- **Feed Laporan Warga**: Informasi terkini dari sesama pengguna jalan terkait kendala penerangan atau fasilitas jalan.
- **Interaksi Komunitas**:
  - Tombol *Upvote* apresiasi laporan.
  - Thread komentar bersarang (*threaded replies*) dan balasan resmi dari pihak terkait (contoh: tanggapan petugas PLN).
- **Pencarian & Kategori**:
  - Tab kategori (*Untuk Anda, Komunitas, Terdekat, Terbaru, Jalan*).
  - **Mouse Drag-to-Scroll**: Bar filter tab dapat digeser horizontal dengan menahan tombol kiri mouse atau sentuhan jempol.
- **Tambah Postingan Baru**: Formulir posting langsung ke feed publik.

---

### 6. 📱 Pengalaman Pengguna (Mobile-First & Clean UI)
- **Bebas Scrollbar di Mobile**: Seluruh tampilan di perangkat seluler disetel tanpa bilah scrollbar visual (*hidden scrollbar*), sehingga geseran menggunakan jempol terasa alami dan tidak terhalang elemen antarmuka.
- **Navigasi Adaptif**:
  - **Desktop**: Sidebar kiri yang ramping dan kartu pop-up transparan.
  - **Mobile**: Header minimalis bergaya aplikasi native, *Bottom Sheet Drawer* yang dapat digeser, dan *Bottom Navigation Bar*.

---

## 🛠️ Teknologi yang Digunakan

| Komponen | Teknologi |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 8](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Ikon** | [Lucide React](https://lucide.dev/) |
| **Animasi** | [Motion](https://motion.dev/) |
| **Deployment** | [Vercel](https://vercel.com/) (Dikonfigurasi dengan `vercel.json`) |

---

## 📂 Struktur Direktori Proyek

```plaintext
tentram/
├── .npmrc                      # Konfigurasi dependensi npm (legacy-peer-deps)
├── index.html                  # Entry point HTML & Google Fonts
├── metadata.json               # Metadata aplikasi
├── package.json                # Dependensi & skrip aplikasi
├── tsconfig.json               # Konfigurasi TypeScript
├── vercel.json                 # Konfigurasi deployment Vercel (SPA routing)
├── vite.config.ts              # Konfigurasi build Vite & Tailwind v4
└── src/
    ├── App.tsx                 # Root layout & tab routing
    ├── main.tsx                # React DOM render entry
    ├── index.css               # Import Tailwind CSS & utilitas scrollbar mobile
    ├── types.ts                # TypeScript data interfaces & types
    ├── components/
    │   ├── Avatars.tsx         # Komponen avatar karakter
    │   ├── DetailRuteMobileModal.tsx # Bottom sheet detail rute mobile
    │   ├── HeaderNav.tsx       # Header pencarian & navigasi atas
    │   ├── MapCanvas.tsx       # Kanvas peta vektor interaktif (drag/pan/zoom)
    │   ├── MobileBottomNav.tsx # Navigasi bawah untuk perangkat mobile
    │   ├── Sidebar.tsx         # Sidebar navigasi desktop
    │   └── TentramLogo.tsx     # Komponen logo SVG Tentram
    ├── hooks/
    │   └── useDragScroll.ts    # Hook interaksi drag-to-scroll dengan mouse
    └── views/
        ├── BerandaView.tsx     # Halaman Beranda (Home & Rute)
        ├── LaporanView.tsx     # Halaman Buat Laporan Fasilitas
        ├── LokasiView.tsx      # Halaman Berbagi Lokasi
        └── AktivitasView.tsx   # Halaman Feed Aktivitas Komunitas
```

---


