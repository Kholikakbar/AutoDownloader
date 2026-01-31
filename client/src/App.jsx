import React from 'react';
import Downloader from './components/Downloader';
import InfoSections from './components/InfoSections';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-dark-bg text-white overflow-x-hidden relative">

      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[30%] h-[40%] bg-blue-600/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Navbar */}
      <nav className="w-full border-b border-white/5 bg-dark-bg/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white">
                A
              </div>
              <span className="font-bold text-xl tracking-tight text-white">AutoDL</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#how-to-use" className="text-gray-300 hover:text-white transition-colors">How to Use</a>
              <a href="#supported-sites" className="text-gray-300 hover:text-white transition-colors">Supported Sites</a>
              <a href="#api" className="text-gray-300 hover:text-white transition-colors">API</a>
            </div>

            <div className="flex items-center gap-4">
              <button className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors border border-white/5 hidden sm:block">
                Premium
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                {isMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-dark-bg/95 backdrop-blur-xl">
            <div className="px-4 pt-2 pb-4 space-y-1">
              <a href="#how-to-use" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5">How to Use</a>
              <a href="#supported-sites" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5">Supported Sites</a>
              <a href="#api" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5">API</a>
              <div className="pt-2">
                <button className="w-full px-4 py-3 rounded-lg bg-indigo-600/20 text-indigo-400 font-medium hover:bg-indigo-600/30 transition-colors">
                  Get Premium
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="relative z-10 w-full overflow-hidden">
        <Downloader />
        <InfoSections />
      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-white/5 mt-20 bg-black/20 text-center text-gray-500 text-sm">
        <p>&copy; 2026 Auto Downloader inc. All rights reserved.</p>
        <p className="mt-2 text-xs">By using this service you agree to our Terms of Service.</p>
      </footer>
    </div>
  );
}

export default App;
