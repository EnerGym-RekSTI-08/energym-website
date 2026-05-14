# EnerGym Admin Dashboard

Dashboard administrasi berbasis web untuk memantau ekosistem EnerGym. Platform ini dirancang khusus bagi pengelola pusat kebugaran (gym) untuk menganalisis data kesehatan pengguna, memantau performa teknis *gym station* AI, dan mengelola operasional melalui visualisasi data secara *real-time*.

---

## Arsitektur Sistem

```
┌─────────────────────────────────────────────────────┐
│                 EnerGym Admin Dashboard             │
│              (React + Vite + Tailwind CSS)          │
└───────────────┬─────────────────────┬───────────────┘
                │                     │
    ┌───────────▼──────────┐   ┌──────▼────────────────┐
    │   Supabase (Cloud)   │   │  Data Visualization   │
    │   - Auth (Admin)     │   │  (Recharts)           │
    │   - profiles         │   │  - Peak Hours         │
    │   - workouts         │   │  - Form Accuracy      │
    │   - workout_history  │   │  - Bandwidth/Latency  │
    │   - stations         │   │  - Error Rate         │
    └──────────────────────┘   └───────────────────────┘
```

---

## Fitur Utama

- **Autentikasi Admin** — Sign up & sign in khusus untuk pengelola gym, terenkripsi dengan Supabase Auth.
- **Dashboard Monitoring** — Ringkasan metrik utama secara instan (Total Pengguna, Station Aktif, Rata-rata Akurasi).
- **User Analytics** — Analisis data interaktif untuk distribusi level kemahiran member (Beginner/Advanced), jam sibuk kunjungan, dan jenis latihan terpopuler.
- **Station Management** — Pemantauan status teknis gym station (server AI) secara langsung, mencakup grafik bandwidth, latensi, dan error rate.
- **Detailed User Tracking** — Pencarian dan pemantauan profil member spesifik untuk melihat riwayat latihan, kemajuan fisik, dan detail akurasi postur per sesi.
- **Visualisasi Interaktif** — Grafik interaktif (Area, Bar, Line, Pie) menggunakan Recharts untuk memudahkan pengambilan keputusan operasional.

---

## Struktur Project

```
energym-website/
├── index.html                # Entry point aplikasi
├── package.json              # Dependensi dan scripts
├── public/
│   └── fonts/                # Satoshi font family
├── src/
│   ├── assets/               # Gambar, logo (energym-full.svg), icon
│   ├── components/
│   │   ├── auth/             # AuthLayout, AuthInput, AuthButton
│   │   ├── cards/            # StatCard, ProfileCard
│   │   ├── charts/           # BandwidthLatencyChart, UserPeakHoursChart, dll.
│   │   ├── layout/           # DashboardLayout, Sidebar, Topbar
│   │   ├── tables/           # UserDataTable, StationLogsTable
│   │   └── ui/               # Badge, Button, Card, Input, ErrorState, LoadingState
│   ├── data/                 # fallbackData.ts (Data statis/dummy)
│   ├── hooks/                # useDashboardData, useUserAnalyticsData, dll.
│   ├── pages/
│   │   ├── DashboardPage.tsx
│   │   ├── StationPage.tsx
│   │   ├── UserAnalyticsPage.tsx
│   │   ├── UserDetailPage.tsx
│   │   ├── SignInPage.tsx
│   │   └── SignUpPage.tsx
│   ├── router/
│   │   └── AppRouter.tsx     # Setup React Router (Routes & Navigate)
│   ├── services/             # Konfigurasi Supabase dan API data services
│   ├── styles/               # designTokens.ts dan konfigurasi CSS global
│   ├── types/                # Interface TypeScript (auth.ts, dashboard.ts, dll.)
│   └── utils/                # Helper functions (formatNumber, formatPercentage)
├── tailwind.config.ts        # Konfigurasi Tailwind CSS v4
├── tsconfig.json             # Konfigurasi TypeScript
└── vite.config.ts            # Konfigurasi Vite
```

---

## Instalasi & Setup

### Prasyarat

- Node.js 20+
- Akun Supabase (dengan database yang telah terisi skema EnerGym)

### Langkah Setup

**1. Masuk ke folder project dan install dependencies:**

```bash
cd energym-website
npm install
```

**2. Buat file `.env` di root folder dan isi dengan kredensial Supabase Anda:**

```env
VITE_SUPABASE_URL=https://[PROJECT_ID].supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

**3. Jalankan development server:**

```bash
npm run dev
```

Buka [http://localhost:5173](http://localhost:5173) di browser Anda.

> **Penting — Hak Akses Database:**
> Pastikan akun Supabase memiliki kebijakan Row Level Security (RLS) yang mengizinkan role Admin untuk membaca tabel data. Jika RLS menolak akses, dashboard akan menampilkan status koneksi error atau *Loading* terus-menerus.

---

## Alur Pengguna (Admin)

### 1. Autentikasi
```
SignInPage ↔ SignUpPage (Pendaftaran pengelola baru) → Redirect ke Dashboard
```

### 2. Monitoring Harian
```
Sidebar → DashboardPage (Cek total user aktif & log latihan)
  → StationPage (Monitoring teknis jika ada station berlatensi tinggi)
```

### 3. Analisis & Tracking
```
Sidebar → UserAnalyticsPage (Analisis Peak Hours & Top Exercises)
  → UserDataTable (Pencarian member)
  → UserDetailPage (Evaluasi akurasi form latihan member)
```

---

## Screens

### Auth Pages

| Screen | Deskripsi |
|---|---|
| `SignInPage` | Tampilan login bagi admin menggunakan email & password. |
| `SignUpPage` | Pendaftaran kredensial bagi pengelola gym baru. |

### Main Dashboard

| Screen | Deskripsi |
|---|---|
| `DashboardPage` | Overview metrik operasional dan tabel log aktivitas member yang sedang berjalan. |
| `UserAnalyticsPage` | Analisis tren data (Level Distribution, Peak Hours, Popular Exercises). |
| `StationPage` | Monitoring konektivitas PC/laptop AI. Menampilkan grafik Bandwidth vs Latency dan Error Rate. |
| `UserDetailPage` | Profil spesifik member, riwayat progres fisik, dan metrik akurasi postur per sesi. |

---

## Database Schema (Supabase)

### Tabel yang Diakses oleh Dashboard Admin

| Tabel | Operasi | Keterangan |
|---|---|---|
| `auth.users` | AUTH | Supabase built-in auth untuk autentikasi admin. |
| `profiles` | SELECT | Mengambil data demografi member (nama, level, riwayat fisik). |
| `workout_history` | SELECT | Agregasi total kalori dan waktu mulai latihan. |
| `workout_history_exercises` | SELECT | Detail metrik (akurasi AI per gerakan, bad reps, postur salah). |
| `stations` | SELECT, UPDATE | Membaca status koneksi dan IP address station gym. |

---

## Visualisasi Data & Analytics

Dashboard memproses data dari Supabase menggunakan custom hooks (seperti `useDashboardData`) dan mentransformasikannya untuk di-render oleh Recharts.

### Contoh Struktur Data — Jam Sibuk (Peak Hours)

```json
[
  { "hour": "06:00", "users": 15 },
  { "hour": "09:00", "users": 42 },
  { "hour": "18:00", "users": 95 },
  { "hour": "20:00", "users": 60 }
]
```

### Contoh Struktur Data — Metrik Jaringan Station

```json
[
  { "time": "10:00", "bandwidth": 120, "latency": 45 },
  { "time": "10:05", "bandwidth": 135, "latency": 48 },
  { "time": "10:10", "bandwidth": 90,  "latency": 150 }
]
```

> Nilai `latency: 150` pada pukul 10:10 merupakan indikasi anomali/spike yang dapat dideteksi secara visual pada grafik.

---

## Dependency Utama

| Package | Versi | Kegunaan |
|---|---|---|
| `vite` | ^8.0.10 | Framework build & dev tooling UI modern |
| `react` | ^19.2.5 | Library UI inti berbasis komponen |
| `@supabase/supabase-js` | ^2.105.1 | Client untuk database & auth |
| `react-router-dom` | ^7.14.2 | Manajemen navigasi Single Page Application |
| `recharts` | ^3.8.1 | Rendering grafik dashboard yang responsif |
| `tailwindcss` | ^4.2.4 | Framework styling utility-first v4 |
| `lucide-react` | ^1.14.0 | Koleksi aset ikon vektor |
| `axios` | ^1.15.2 | Integrasi permintaan HTTP tambahan |

---

## Troubleshooting

**Aplikasi terhenti pada "Loading State"**

Cek tab Network di Developer Tools (`F12`). Pastikan `VITE_SUPABASE_URL` valid dan URL tidak mengandung spasi di file `.env`.

**Grafik dan Tabel kosong (Data 0)**

Pastikan ada seed data pada Supabase. Jika tabel kosong, dashboard akan mencoba merender nol. Gunakan file `fallbackData.ts` pada mode development jika backend belum siap.

**Tampilan Font Satoshi Rusak/Bawaan Browser**

Jalankan perintah clear cache atau hapus folder `node_modules/.vite`. Pastikan file berekstensi `.otf` di `public/fonts/` tidak corrupt dan termuat di file CSS.
