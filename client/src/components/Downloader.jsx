import React, { useState } from 'react';
import axios from 'axios';
import { Search, Loader2, Download, Music, Video, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Downloader = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [downloading, setDownloading] = useState(false);
    const [selectedVideoFormat, setSelectedVideoFormat] = useState('');
    const [selectedAudioFormat, setSelectedAudioFormat] = useState('mp3');

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setUrl(text);
        } catch (err) {
            console.error('Failed to read clipboard', err);
        }
    };

    const fetchInfo = async (e) => {
        e.preventDefault();
        if (!url) return;

        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await axios.post(`${API_URL}/info`, { url });
            setData(response.data);
            // Auto-select first video format
            if (response.data.formats && response.data.formats.length > 0) {
                setSelectedVideoFormat(response.data.formats[0].height);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to fetch video info. Please checks the URL.');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (format) => {
        setDownloading(true);
        try {
            const quality = format === 'mp3' ? null : selectedVideoFormat;
            const response = await axios.post(`${API_URL}/download`, {
                url,
                format,
                quality
            });

            // In a real app, we might poll. Here we get the link directly (or wait for it)
            if (response.data.downloadUrl) {
                // Auto trigger download
                const link = document.createElement('a');
                link.href = response.data.downloadUrl;
                link.setAttribute('download', '');
                document.body.appendChild(link);
                link.click();
                link.remove();
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Download failed.');
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12">

            {/* Input Section */}
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 mb-4 md:mb-6 pb-2">
                    Universal Auto Downloader
                </h1>
                <p className="text-gray-400 text-base md:text-lg mb-8 px-4">
                    Download videos and audio from YouTube, TikTok, Instagram, and more in highest quality.
                </p>

                <form onSubmit={fetchInfo} className="relative w-full max-w-2xl mx-auto">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative flex items-center bg-dark-card rounded-xl border border-white/10 p-2 shadow-2xl">
                            <Search className="text-gray-400 ml-3 w-5 h-5 md:w-6 md:h-6 shrink-0" />
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="Paste video URL here..."
                                className="flex-1 bg-transparent border-none outline-none text-white px-3 md:px-4 py-2 placeholder-gray-500 text-sm md:text-base w-full min-w-0"
                            />
                            <button
                                type="button"
                                onClick={handlePaste}
                                className="hidden sm:block px-3 py-1 text-xs font-medium text-gray-400 hover:text-white bg-white/5 rounded-md mr-2 transition-colors shrink-0"
                            >
                                PASTE
                            </button>
                            <button
                                type="button"
                                onClick={() => setUrl('')}
                                className={`mr-2 text-gray-400 hover:text-white transition-opacity shrink-0 ${url ? 'opacity-100' : 'opacity-0'}`}
                            >
                                ✕
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center shrink-0 text-sm md:text-base"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Start'}
                            </button>
                        </div>
                    </div>
                </form>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 flex items-center justify-center gap-2 max-w-2xl mx-auto text-sm md:text-base"
                    >
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        {error}
                    </motion.div>
                )}
            </div>

            {/* Results Section */}
            <AnimatePresence>
                {data && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="glass-panel rounded-2xl p-4 md:p-8"
                    >
                        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                            {/* Thumbnail */}
                            <div className="w-full md:w-1/3">
                                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/5 bg-black/50 relative group">
                                    <img src={data.thumbnail} alt={data.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="bg-white/20 backdrop-blur rounded-full p-3 text-white">
                                            <Download className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                                        {Math.floor(data.duration / 60)}:{String(Math.floor(data.duration % 60)).padStart(2, '0')}
                                    </span>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                                    <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-300 border border-white/5 uppercase tracking-wider">
                                        {data.platform}
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-300 border border-white/5">
                                        {data.uploader}
                                    </span>
                                </div>
                            </div>

                            {/* Details & Options */}
                            <div className="flex-1 min-w-0">
                                <h2 className="text-xl md:text-2xl font-bold text-white mb-4 line-clamp-2">{data.title}</h2>

                                <div className="space-y-6">
                                    {/* Video Options */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3 text-indigo-400 font-medium">
                                            <Video className="w-5 h-5" />
                                            <span>Video Download</span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <select
                                                value={selectedVideoFormat}
                                                onChange={(e) => setSelectedVideoFormat(e.target.value)}
                                                className="w-full sm:flex-1 bg-dark-input text-white px-4 py-3 rounded-lg border border-white/10 focus:border-indigo-500 focus:outline-none transition-colors text-sm md:text-base appearance-none"
                                            >
                                                {data.formats.map((fmt, idx) => (
                                                    <option key={idx} value={fmt.height}>
                                                        {fmt.resolution}{fmt.fps > 30 ? ` ${fmt.fps}fps` : ''}{fmt.filesize ? ` - ${(fmt.filesize / 1024 / 1024).toFixed(1)} MB` : ''}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                onClick={() => handleDownload('mp4')}
                                                disabled={downloading || !selectedVideoFormat}
                                                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                {downloading ? (
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                ) : (
                                                    <Download className="w-5 h-5" />
                                                )}
                                                Download
                                            </button>
                                        </div>
                                    </div>

                                    {/* Audio Options */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3 text-pink-400 font-medium">
                                            <Music className="w-5 h-5" />
                                            <span>Audio Only</span>
                                        </div>
                                        <button
                                            onClick={() => handleDownload('mp3')}
                                            disabled={downloading}
                                            className="w-full flex items-center justify-between gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-pink-500/50 transition-all group disabled:opacity-50"
                                        >
                                            <div className="flex flex-col items-start">
                                                <div className="text-white font-medium text-sm md:text-base">Best Quality Audio</div>
                                                <div className="text-xs text-gray-400">MP3 • High 320kbps</div>
                                            </div>
                                            <div className="bg-pink-600/20 text-pink-400 p-2 rounded-lg group-hover:bg-pink-600 group-hover:text-white transition-colors">
                                                <Download className="w-4 h-4" />
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                {downloading && (
                                    <div className="mt-6 flex items-center gap-3 text-indigo-400 bg-indigo-500/10 p-3 rounded-lg border border-indigo-500/20 text-sm">
                                        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                                        <span>Processing file...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Social Icons - Hidden on small mobile to save space or scrollable */}
            <div className="mt-12 md:mt-20 flex flex-wrap justify-center gap-6 md:gap-8 text-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {['YouTube', 'TikTok', 'Instagram', 'Twitter', 'Facebook'].map(p => (
                    <div key={p} className="text-lg md:text-xl font-bold text-gray-500 hover:text-white">{p}</div>
                ))}
            </div>

        </div>
    );
};

export default Downloader;
