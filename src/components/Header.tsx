import React, { useState } from 'react';
import { ScanSearch, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onScrollToSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onScrollToSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-navy-800/80 bg-navy-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3.5 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-navy-800 to-navy-900 border border-cyan-500/30 shadow-glow-cyan group-hover:border-cyan-400 transition-colors">
            <ScanSearch className="w-6 h-6 text-cyanAccent group-hover:scale-105 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping opacity-75"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                Gap<span className="text-cyanAccent">Lens</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold rounded bg-cyan-950/90 text-cyan-300 border border-cyan-500/30">
                Hackathon v1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-wide hidden sm:block">
              AI-Assisted Information Gap Detection
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#detection-vectors" className="hover:text-cyanAccent transition-colors">
            Gap Vectors
          </a>
          <a href="#how-it-works" className="hover:text-cyanAccent transition-colors">
            How It Works
          </a>
          <a href="#dark-spot-paradigm" className="hover:text-cyanAccent transition-colors">
            Digital Dark Spot
          </a>
          <a href="#architecture" className="hover:text-cyanAccent transition-colors">
            Architecture
          </a>
        </nav>

        {/* Status indicator & Action Button */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-900/90 border border-navy-700/70 text-xs text-slate-300">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-slate-400">Pipeline:</span>
            <span className="text-white font-medium">Ready</span>
          </div>

          <button
            onClick={onScrollToSearch}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-navy-800 to-navy-700 hover:from-cyan-950 hover:to-navy-800 text-white hover:text-cyanAccent text-xs font-semibold uppercase tracking-wider border border-navy-600 hover:border-cyan-500/50 transition-all duration-200 shadow-sm"
          >
            <span>Scan A Topic</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-cyanAccent" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-950/95 border-b border-navy-800 px-6 py-5 space-y-4 animate-in fade-in slide-in-from-top-3">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-300">
            <a
              href="#detection-vectors"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-cyanAccent py-1"
            >
              Gap Vectors
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-cyanAccent py-1"
            >
              How It Works
            </a>
            <a
              href="#dark-spot-paradigm"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-cyanAccent py-1"
            >
              Digital Dark Spot Paradigm
            </a>
            <a
              href="#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-cyanAccent py-1"
            >
              System Architecture
            </a>
          </nav>
          <div className="pt-3 border-t border-navy-800 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Status: Ready for Ingestion</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToSearch();
              }}
              className="w-full py-2.5 rounded-lg bg-cyanAccent text-navy-950 font-semibold text-center text-sm shadow-glow-cyan"
            >
              Launch Research Input
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
