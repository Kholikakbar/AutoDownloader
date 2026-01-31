# System Flowchart

```mermaid
graph TD
    A[User Pastes URL] --> B{Frontend Validation}
    B -->|Invalid| A
    B -->|Valid| C[POST /api/info]
    
    C --> D[Backend: yt-dlp --dump-json]
    D -->|Error| E[Return Error]
    E --> F[Display Error on UI]
    
    D -->|Success| G[Return Metadata]
    G --> H[Display Thumbnail & Options]
    
    H --> I[User Selects Format]
    I --> J[POST /api/download]
    
    J --> K[Backend: yt-dlp Download]
    K -->|Processing| L[Download to /server/downloads]
    L -->|Conversion| M[FFmpeg Convert to MP3/MP4]
    
    M --> N[Return Download URL]
    N --> O[Browser Auto Download]
    
    subgraph Database [Supabase Async]
        J -.-> |Log| DB[(download_logs)]
    end
```

## Explanation
1. **Input**: User provides a URL from supported platforms.
2. **Analysis**: Server queries `yt-dlp` for metadata without downloading.
3. **Selection**: User chooses resolution or format.
4. **Processing**: Server downloads and processes the file using `yt-dlp` (which uses FFmpeg).
5. **Delivery**: File is served via a temporary static link.
