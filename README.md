# Universal Auto Downloader

A powerful full-stack web application to download videos and audio from popular platforms like YouTube, TikTok, Instagram, Facebook, and more.

## Features
- **Auto Platform Detection**: Supports YouTube, TikTok, IG, FB, Twitter/X, and more.
- **Multi-Resolution**: Download videos in 1080p, 720p, etc.
- **Audio Extraction**: Convert video to high-quality MP3.
- **Modern UI**: Built with React, Tailwind CSS, and Framer Motion.
- **Robust Backend**: Node.js + yt-dlp handling the heavy lifting.

## Prerequisites
1. **Node.js**: v16 or higher.
2. **yt-dlp**: Must be installed on your system and available in PATH.
   - [Installation Guide](https://github.com/yt-dlp/yt-dlp#installation)
   - Verify with: `yt-dlp --version`
3. **FFmpeg**: Required for audio conversion and merging video streams.
   - Verify with: `ffmpeg -version`

## Installation

### 1. Setup Backend
```bash
cd server
npm install
# Create a downloads folder if not exists (auto-created on start)
node index.js
```
The server will run on `http://localhost:5000`.

### 2. Setup Frontend
```bash
cd client
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`.

## Database (Supabase)
Run the SQL queries in `database.sql` in your Supabase SQL Editor to set up:
- `download_logs`
- `platform_stats`

## Architecture
- **Frontend**: React + Vite (UI), Axios (API Communication)
- **Backend**: Express (API), Child Process (Spawning yt-dlp)
- **Storage**: Local filesystem `./server/downloads` (Temporary)

## API Endpoints
See `API_DOCS.md` for details.
