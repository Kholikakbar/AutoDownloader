const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const DOWNLOAD_DIR = path.join(__dirname, '../downloads');

// Ensure download directory exists
if (!fs.existsSync(DOWNLOAD_DIR)) {
    fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

/**
 * Get video metadata from URL
 * @param {string} url
 */
const getVideoInfo = (url) => {
    return new Promise((resolve, reject) => {
        const args = [
            '--dump-json',
            '--no-warnings',
            '--user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            url
        ];

        const ytDlpPath = path.join(__dirname, '../bin/yt-dlp.exe');
        // Check if local binary exists, otherwise fallback to global 'yt-dlp'
        const command = fs.existsSync(ytDlpPath) ? ytDlpPath : 'yt-dlp';

        const process = spawn(command, args);
        let stdout = '';
        let stderr = '';

        process.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        process.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        process.on('close', (code) => {
            if (code !== 0) {
                console.error('yt-dlp error:', stderr);
                return reject(new Error('Failed to fetch video info. Make sure the URL is valid and supported.'));
            }
            try {
                const data = JSON.parse(stdout);

                // Extract all video formats (yt-dlp will merge with audio automatically)
                const allFormats = data.formats || [];

                const formats = allFormats
                    .filter(f => f.vcodec !== 'none' && f.height)
                    .map(f => {
                        // Calculate estimated filesize if not provided
                        let estimatedSize = f.filesize || f.filesize_approx;

                        if (!estimatedSize && data.duration) {
                            // Try tbr first, then sum of vbr and abr
                            const bitrate = f.tbr || ((f.vbr || 0) + (f.abr || 0));
                            if (bitrate > 0) {
                                estimatedSize = Math.round((bitrate * 1000 * data.duration) / 8);
                            }
                        }

                        return {
                            format_id: f.format_id,
                            resolution: f.height ? `${f.height}p` : f.resolution,
                            ext: f.ext,
                            filesize: estimatedSize,
                            height: f.height,
                            tbr: f.tbr || 0,
                            fps: f.fps || 0,
                            vcodec: f.vcodec,
                            hasAudio: f.acodec !== 'none'
                        };
                    });

                // Deduplicate by resolution (keep best quality for each resolution)
                const uniqueFormats = [];
                const seen = new Map();

                // Sort by quality (prefer higher resolution, fps, and bitrate)
                formats.sort((a, b) => {
                    if (a.height !== b.height) return b.height - a.height;
                    if (a.fps !== b.fps) return b.fps - a.fps;
                    return b.tbr - a.tbr;
                });

                formats.forEach(f => {
                    const res = f.resolution;
                    if (!seen.has(res)) {
                        seen.set(res, true);
                        uniqueFormats.push(f);
                    }
                });

                // Sort final list by resolution (height) descending
                uniqueFormats.sort((a, b) => b.height - a.height);

                resolve({
                    id: data.id,
                    title: data.title,
                    thumbnail: data.thumbnail,
                    duration: data.duration,
                    uploader: data.uploader,
                    platform: data.extractor_key,
                    formats: uniqueFormats
                });
            } catch (e) {
                reject(new Error('Failed to parse video metadata.'));
            }
        });
    });
};

/**
 * Download media
 * @param {string} url 
 * @param {string} format 'mp3' or 'mp4'
 * @param {string} quality format_id for mp4, or quality level for mp3
 */
const downloadMedia = (url, format, quality) => {
    return new Promise((resolve, reject) => {
        const jobId = Date.now().toString();
        const outputTemplate = path.join(DOWNLOAD_DIR, `${jobId}.%(ext)s`);

        const args = [
            '--no-warnings',
            '--user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            '--output', outputTemplate
        ];

        const ytDlpPath = path.join(__dirname, '../bin/yt-dlp.exe');
        const ffmpegPath = path.join(__dirname, '../bin/ffmpeg.exe');
        const command = fs.existsSync(ytDlpPath) ? ytDlpPath : 'yt-dlp';

        // Add ffmpeg location if it exists locally
        if (fs.existsSync(ffmpegPath)) {
            // Point to the BIN FOLDER, not the executable
            args.push('--ffmpeg-location', path.dirname(ffmpegPath));
        }

        if (format === 'mp3') {
            args.push(
                '--extract-audio',
                '--audio-format', 'mp3',
                '--audio-quality', '0' // Best quality
            );
        } else {
            // Video
            if (quality) {
                // STRICT MODE: Request EXACT resolution. 
                // We purposefully removed the fallback to low quality/best.
                // If 1080p is selected, we MUST download 1080p.
                args.push(
                    '-f', `bestvideo[height=${quality}]+bestaudio/best`,
                    '--merge-output-format', 'mp4',
                    // FIX NO SOUND: Convert audio to AAC (compatible with MP4), copy video (fast)
                    '--postprocessor-args', 'ffmpeg:-c:v copy -c:a aac'
                );
            } else {
                args.push(
                    '-f', 'bestvideo+bestaudio/best',
                    '--merge-output-format', 'mp4',
                    '--postprocessor-args', 'ffmpeg:-c:v copy -c:a aac'
                );
            }
        }

        args.push(url);

        console.log(`Starting download: ${command} ${args.join(' ')}`);

        // Pass parent environment via process.env
        const childProcess = spawn(command, args, { env: process.env });

        childProcess.stdout.on('data', (data) => {
            // console.log(data.toString()); // Uncomment for debug
        });

        childProcess.stderr.on('data', (data) => {
            console.error(`dl stderr: ${data}`);
        });

        childProcess.on('close', (code) => {
            if (code !== 0) {
                return reject(new Error('Download failed.'));
            }

            // Find the file
            fs.readdir(DOWNLOAD_DIR, (err, files) => {
                if (err) return reject(err);
                const file = files.find(f => f.startsWith(jobId));
                if (file) {
                    resolve(path.join(DOWNLOAD_DIR, file));
                } else {
                    reject(new Error('File not found after download.'));
                }
            });
        });
    });
};

module.exports = { getVideoInfo, downloadMedia };
