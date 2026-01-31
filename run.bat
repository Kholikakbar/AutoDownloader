@echo off
echo Starting Auto Downloader...
start cmd /k "cd server && npm start"
start cmd /k "cd client && npm run dev"
echo Backend running on http://localhost:7860
echo Frontend running on http://localhost:5173
