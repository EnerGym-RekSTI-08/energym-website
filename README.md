# EnerGym Website — Admin Dashboard

README ini menjelaskan repository `energym-website` (frontend admin dashboard). Dokumen ini singkat, langsung ke poin, dan disesuaikan dengan struktur kode saat ini.

---

## Ringkasan

- Frontend: React + TypeScript, bundler: Vite
- Styling: Tailwind CSS
- Charts: Recharts
- Backend: Supabase (Postgres + Auth + Storage)

Proyek ini dipakai untuk monitoring station, melihat analytics pengguna, dan meninjau riwayat workout dari sisi admin.

---

## Struktur utama repo

```
index.html
package.json
public/
src/
  ├── assets/
  ├── components/    # ui, layout, charts, tables
  ├── data/          # fallback/sample data for dev
  ├── hooks/         # data hooks
  ├── pages/         # Dashboard, SignIn, Station, User pages
  ├── router/        # AppRouter
  ├── services/      # supabaseClient, authService, supabaseData, others
  ├── styles/
  ├── types/
  └── utils/
scripts/             # helper scripts (seed, mapping)
```

---

## Cara jalankan (development)

1. Install dependencies

```bash
npm install
```

2. Tambahkan environment variables di file `.env.local` (atau cara lain yang Anda pilih):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

3. Jalankan dev server

```bash
npm run dev
```

4. Build produksi

```bash
npm run build
```

---

## Hal penting di kode

- `src/services/supabaseClient.ts` — inisialisasi Supabase client
- `src/services/authService.ts` — fungsi signIn/signUp/logout (saat ini ada pembatasan admin)
- `src/services/supabaseData.ts` — semua query dashboard (mis. `loadRecentExerciseLogs`, `loadDashboardOverview`)
- `src/components/tables/RecentExerciseLogsTable.tsx` — tabel recent logs (menampilkan `username`, `station` label, `exercise`)
- `src/pages/SignInPage.tsx` — UI sign-in (link sign-up dihapus)
- `scripts/get_user_station_mapping.mjs` — util ESM untuk mengekstrak mapping user↔station

---

## Kebijakan admin & autentikasi

- Untuk sementara, aplikasi memblokir sign-in selain admin. Implementasi saat ini memeriksa `admin@gmail.com` di `src/services/authService.ts`.
- Jika Anda ingin solusi yang lebih aman/fleksibel, saya bisa ubah agar: (a) memeriksa tabel `admins` setelah autentikasi, atau (b) gunakan env var `VITE_ADMIN_EMAIL`.

---

## Recent Exercise Logs & Station labels

- `loadRecentExerciseLogs` sekarang:
  - menggabungkan nama exercise (semua exercise per session)
  - memetakan `user_id` → `username` (mengambil dari `profiles`)
  - memetakan `workout_id` → `station` dan menampilkan label `STATION_01`, `STATION_02`, ...
- Jika Anda ingin mapping station yang deterministik, saya sarankan menambahkan kolom `label` pada tabel `stations` di Supabase. Saya bisa bantu buat migration + update UI.

---

## Scripts berguna

- `node scripts/seed_supabase.js` — (opsional) seeder data dev
- `node scripts/get_user_station_mapping.mjs` — buat mapping user↔station untuk debugging

---

## Troubleshooting singkat

- Jika chart Recharts memberi peringatan ukuran (width/height <= 0), pastikan container memiliki ukuran atau gunakan `aspect` pada wrapper chart.
- Jika tidak bisa akses Supabase saat dev, periksa `VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY`.

---

## Kontribusi singkat

1. Buat branch baru: `git checkout -b feat/your-change`
2. Jalankan build dan cek: `npm run build`
3. Buat PR ke `main` dengan deskripsi singkat

---

Jika Anda mau, saya bisa langsung: (A) ganti check admin hard-coded menjadi cek tabel `admins`, atau (B) tambahkan kolom `label` di `stations` dan update UI untuk pakai kolom itu. Pilih A atau B.


- If charts show warnings about width/height, ensure the container has a non-zero size (some pages render charts within hidden or collapsed containers during tests).
- If build fails with module errors, run `npm install` and ensure Node version is compatible with the project's `package.json`.

---

If you want, I can:

- Add a script that exports a CSV of recent user→station activity.
- Replace the hard-coded admin email with a check against the `admins` table and/or a configurable env var.
- Document environment setup and RLS policy steps as runnable SQL commands in the repo.

Tell me which of those you want next.
