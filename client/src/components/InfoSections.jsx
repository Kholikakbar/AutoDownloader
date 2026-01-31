import React from 'react';
import { Download, Search, CheckCircle, Code, Globe, PlayCircle, Instagram, Facebook, Twitter, Twitch } from 'lucide-react';

const InfoSections = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-32 pb-12 md:pb-20">

            {/* How It Works Section */}
            <section id="how-to-use" className="relative pt-10 md:pt-20">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 mb-3 md:mb-4">
                        How to Use
                    </h2>
                    <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto px-4">
                        Download your favorite videos in 3 simple steps. No easy way than this.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {/* Step 1 */}
                    <div className="relative group">
                        <div className="hidden md:block absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
                        <div className="relative p-6 md:p-8 bg-dark-card rounded-2xl border border-white/10 h-full flex flex-col items-center text-center">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-pink-500/10 flex items-center justify-center mb-4 md:mb-6 text-pink-400">
                                <Search className="w-6 h-6 md:w-7 md:h-7" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">1. Paste URL</h3>
                            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                                Copy the video URL from YouTube, TikTok, or Instagram and paste it into the search box above.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative group">
                        <div className="hidden md:block absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
                        <div className="relative p-6 md:p-8 bg-dark-card rounded-2xl border border-white/10 h-full flex flex-col items-center text-center">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 md:mb-6 text-purple-400">
                                <CheckCircle className="w-6 h-6 md:w-7 md:h-7" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">2. Select Quality</h3>
                            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                                Our system automatically fetches available formats. Choose your preferred resolution (up to 4K) or audio only.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative group">
                        <div className="hidden md:block absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
                        <div className="relative p-6 md:p-8 bg-dark-card rounded-2xl border border-white/10 h-full flex flex-col items-center text-center">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4 md:mb-6 text-indigo-400">
                                <Download className="w-6 h-6 md:w-7 md:h-7" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">3. Download</h3>
                            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                                Click the download button. The file will be processed and saved directly to your device instantly.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Supported Sites Section */}
            <section id="supported-sites" className="relative">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-3 md:mb-4">
                        Supported Platforms
                    </h2>
                    <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto px-4">
                        We support downloading from over 100+ websites. Here are the most popular ones.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                    {[
                        { name: 'YouTube', icon: <PlayCircle className="w-5 h-5 md:w-6 md:h-6" />, color: 'hover:text-red-500 hover:border-red-500/30' },
                        { name: 'Instagram', icon: <Instagram className="w-5 h-5 md:w-6 md:h-6" />, color: 'hover:text-pink-500 hover:border-pink-500/30' },
                        { name: 'Facebook', icon: <Facebook className="w-5 h-5 md:w-6 md:h-6" />, color: 'hover:text-blue-500 hover:border-blue-500/30' },
                        { name: 'Twitter / X', icon: <Twitter className="w-5 h-5 md:w-6 md:h-6" />, color: 'hover:text-sky-500 hover:border-sky-500/30' },
                        { name: 'TikTok', icon: <div className="font-bold text-base md:text-lg">Tk</div>, color: 'hover:text-teal-400 hover:border-teal-400/30' },
                        { name: 'Twitch', icon: <Twitch className="w-5 h-5 md:w-6 md:h-6" />, color: 'hover:text-purple-500 hover:border-purple-500/30' },
                    ].map((site, idx) => (
                        <div key={idx} className={`flex flex-col items-center justify-center p-4 md:p-6 bg-white/5 border border-white/5 rounded-xl transition-all duration-300 ${site.color} hover:bg-white/10 cursor-default group`}>
                            <div className="mb-2 md:mb-3 opacity-70 group-hover:opacity-100 transition-opacity">
                                {site.icon}
                            </div>
                            <span className="font-medium text-xs md:text-sm">{site.name}</span>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-6 md:mt-8">
                    <span className="text-[10px] md:text-xs px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/5">
                        And 1000+ other sites supported by yt-dlp
                    </span>
                </div>
            </section>

            {/* API Section */}
            <section id="api" className="relative">
                <div className="static md:absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent rounded-3xl -z-10"></div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start md:items-center p-6 md:p-12 border border-white/10 rounded-3xl bg-dark-card/50 backdrop-blur-sm">
                    <div className="order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] md:text-xs font-medium mb-4 md:mb-6 border border-emerald-500/20">
                            <Code className="w-3 h-3" />
                            Developers Friendly
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
                            Powerful API for Developers
                        </h2>
                        <p className="text-sm md:text-base text-gray-400 mb-6 md:mb-8 leading-relaxed">
                            Want to integrate our downloader into your own application? We provide a simple, robust JSON API that you can use to fetch video metadata and trigger downloads programmatically.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 w-6 h-6 rounded bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 text-xs font-bold">1</div>
                                <div>
                                    <h4 className="text-white font-medium text-sm md:text-base">Get Metadata</h4>
                                    <p className="text-xs md:text-sm text-gray-500 mt-1 break-all">POST /api/info with `{'{ "url": "..." }'}`</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="mt-1 w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 text-xs font-bold">2</div>
                                <div>
                                    <h4 className="text-white font-medium text-sm md:text-base">Download File</h4>
                                    <p className="text-xs md:text-sm text-gray-500 mt-1">POST /api/download to get file stream</p>
                                </div>
                            </div>
                        </div>

                        <button className="mt-6 md:mt-8 w-full md:w-auto px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-colors text-sm md:text-base">
                            Read Documentation
                        </button>
                    </div>

                    <div className="relative order-1 lg:order-2 w-full">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl blur opacity-20"></div>
                        <div className="relative bg-[#0F1117] rounded-xl border border-white/10 p-4 md:p-6 overflow-x-auto font-mono text-xs md:text-sm shadow-2xl">
                            <div className="flex items-center gap-1.5 mb-4 border-b border-white/5 pb-4 min-w-[300px]">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                                <span className="ml-2 text-[10px] md:text-xs text-gray-600">example-request.js</span>
                            </div>
                            <div className="text-gray-300 min-w-[300px]">
                                <p><span className="text-purple-400">const</span> response <span className="text-purple-400">=</span> <span className="text-indigo-400">await</span> fetch(<span className="text-green-400">'/api/info'</span>, {'{'}</p>
                                <p className="pl-4"><span className="text-indigo-400">method</span>: <span className="text-green-400">'POST'</span>,</p>
                                <p className="pl-4"><span className="text-indigo-400">headers</span>: {'{'}</p>
                                <p className="pl-8"><span className="text-green-400">'Content-Type'</span>: <span className="text-green-400">'application/json'</span></p>
                                <p className="pl-4">{'}'},</p>
                                <p className="pl-4"><span className="text-indigo-400">body</span>: JSON.stringify({'{'}</p>
                                <p className="pl-8">url: <span className="text-green-400">'https://youtu.be/...'</span></p>
                                <p className="pl-4">{'}'})</p>
                                <p>{'}'});</p>
                                <p className="mt-2"><span className="text-purple-400">const</span> data <span className="text-purple-400">=</span> <span className="text-indigo-400">await</span> response.json();</p>
                                <p className="text-gray-500 mt-2">// Returns title, thumbnail, formats, etc.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default InfoSections;
