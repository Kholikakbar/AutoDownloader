# Deployment Guide

Aplikasi ini terdiri dari dua bagian: **Service Backend** (Node.js + yt-dlp) dan **Service Frontend** (React UI). Karena backend membutuhkan `ffmpeg` dan proses berat, backend harus dideploy terpisah dari Vercel (karena limitasi serverless function).

## 1. Setup Database (Supabase)
1. Buka [Supabase](https://supabase.com/) dan buat project baru.
2. Ke menu **SQL Editor**, buka file `database.sql` dari project ini, copy isinya, dan jalankan di SQL Editor Supabase.
3. Ke **Project Settings > API**, salin `URL` dan `service_role secret` (atau `anon public` key, tapi service role lebih baik untuk backend). Anda akan membutuhkannya sesaat lagi.

## 2. Deploy Backend (Render.com) - GRATIS
Render sangat direkomendasikan karena mendukung Docker container secara gratis.

1. Push kode project ini ke GitHub repo Anda.
2. Daftar di [Render.com](https://render.com/).
3. Klik **New +** dan pilih **Web Service**.
4. Sambungkan akun GitHub dan pilih repo Anda.
5. Pada konfigurasi:
   - **Name**: `auto-downloader-backend` (bebas)
   - **Root Directory**: `server` (PENTING! Masukkan `server` disini karena backend ada di dalam folder server).
   - **Runtime**: Pilih **Docker**.
   - **Instance Type**: Free
6. Scroll ke bawah ke bagian **Environment Variables**, tambahkan:
   - `SUPABASE_URL`: (URL Supabase dari langkah 1)
   - `SUPABASE_KEY`: (Key Supabase dari langkah 1)
   - `PORT`: `5000`
7. Klik **Create Web Service**.
8. Tunggu proses build selesai. Render akan memberikan URL backend Anda (contoh: `https://auto-downloader.onrender.com`). COPY URL INI.

## 3. Deploy Frontend (Vercel)
1. Buka [Vercel](https://vercel.com/) dan login.
2. Klik **Add New...** > **Project** dan import repo GitHub yang sama.
3. Pada konfigurasi:
   - **Framework Preset**: Vite
   - **Root Directory**: Klik **Edit** dan pilih folder `client`.
4. Buka bagian **Environment Variables**, tambahkan:
   - **Key**: `VITE_API_URL`
   - **Value**: Masukkan URL Backend dari Render tadi, ditambah `/api`. 
     - Contoh: `https://auto-downloader.onrender.com/api` (JANGAN LUPA `/api` di ujungnya).
5. Klik **Deploy**.

## Selesai! 🚀
Buka URL Frontend dari Vercel, dan aplikasi Anda siap digunakan secara global!
