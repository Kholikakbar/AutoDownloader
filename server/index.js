const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const { getVideoInfo, downloadMedia } = require('./utils/downloader');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// Get Video Metadata
app.post('/api/info', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: 'URL is required' });

        const info = await getVideoInfo(url);
        res.json(info);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Trigger Download
app.post('/api/download', async (req, res) => {
    try {
        const { url, format, quality } = req.body;
        if (!url) return res.status(400).json({ error: 'URL is required' });

        console.log(`Requesting download: ${url} [${format}]`);

        // Start processing
        const filePath = await downloadMedia(url, format, quality);
        const fileName = path.basename(filePath);

        // Return the download URL (will use dedicated download endpoint)
        const downloadUrl = `${req.protocol}://${req.get('host')}/api/file/${fileName}`;

        // Log to Supabase (Async, don't block response)
        if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
            const { createClient } = require('@supabase/supabase-js');
            const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

            supabase.from('downloads').insert([{
                original_url: url,
                format: format,
                quality: quality || 'best',
                filename: fileName,
                ip_address: req.ip || req.connection.remoteAddress
            }]).then(({ error }) => {
                if (error) console.error('Supabase Log Error:', error);
                else console.log('Logged to Supabase');
            });
        }

        res.json({
            status: 'completed',
            downloadUrl,
            fileName,
            expiresIn: '1 hour'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Direct file download endpoint (forces download, not preview)
app.get('/api/file/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'downloads', filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
    }

    // Force download with proper headers
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.download(filePath);
});

// Cleanup Cron (Simple interval)
// Delete files older than 1 hour
setInterval(() => {
    const downloadDir = path.join(__dirname, 'downloads');
    if (fs.existsSync(downloadDir)) {
        fs.readdir(downloadDir, (err, files) => {
            if (err) return;
            const now = Date.now();
            files.forEach(file => {
                const filePath = path.join(downloadDir, file);
                fs.stat(filePath, (err, stats) => {
                    if (err) return;
                    if (now - stats.mtimeMs > 3600000) { // 1 hour
                        fs.unlink(filePath, () => console.log(`Deleted expired file: ${file}`));
                    }
                });
            });
        });
    }
}, 300000); // Check every 5 mins

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
