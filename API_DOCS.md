# API Documentation

Base URL: `http://localhost:5000`

## 1. Health Check
- **Endpoint**: `GET /health`
- **Response**:
```json
{
  "status": "ok",
  "timestamp": "2024-03-20T10:00:00.000Z"
}
```

## 2. Get Video Metadata
- **Endpoint**: `POST /api/info`
- **Body**:
```json
{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```
- **Response**:
```json
{
  "id": "dQw4w9WgXcQ",
  "title": "Rick Astley - Never Gonna Give You Up",
  "thumbnail": "https://i.ytimg.com/...",
  "duration": 212,
  "uploader": "Rick Astley",
  "platform": "youtube",
  "formats": [
    {
      "format_id": "137",
      "resolution": "1080p",
      "ext": "mp4",
      "filesize": 10485760,
      "note": "1080p video only"
    }
  ]
}
```

## 3. Download Media
- **Endpoint**: `POST /api/download`
- **Body**:
```json
{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "format": "mp4", // or 'mp3'
  "quality": "137" // format_id for video, null for best audio
}
```
- **Response**:
```json
{
  "status": "completed",
  "downloadUrl": "http://localhost:5000/downloads/170123456789.mp4",
  "expiresIn": "1 hour"
}
```
