import React from 'react';
import { ScanSearch, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-darkest border-t border-navy-800 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-navy-800/80">
          
          {/* Brand & Problem Statement Attribution */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-navy-900 border border-cyan-500/30 text-cyan-400">
                <ScanSearch className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                Gap<span className="text-cyanAccent">Lens</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              AI-Assisted Information Gap Detection Platform designed for the <strong>"Digital Dark Spot"</strong> challenge. Surfacing unasked questions, conflicting claims, outdated metrics, and evidence lineages.
            </p>

            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-navy-900 border border-navy-800 text-[11px] font-mono text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>Theme: Digital Dark Spot Intelligence</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-white">
              Detection Dimensions
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#detection-vectors" className="hover:text-cyan-300 transition-colors">Missing Information Detection</a></li>
              <li><a href="#detection-vectors" className="hover:text-cyan-300 transition-colors">Conflict & Contradiction Resolution</a></li>
              <li><a href="#detection-vectors" className="hover:text-cyan-300 transition-colors">Outdated Information Half-Life</a></li>
              <li><a href="#detection-vectors" className="hover:text-cyan-300 transition-colors">Evidence Lineage & Provenance</a></li>
            </ul>
          </div>

          {/* Platform Specifications */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-white">
              Engineering Specs
            </h4>
            <div className="text-xs text-slate-400 space-y-2">
              <p>Stack: React 18 / TypeScript / Vite / Tailwind CSS</p>
              <p>Design System: Navy Blue (#070f1d), Crisp White (#f8fafc), Subtle Cyan (#00d8f6)</p>
              <p>Epistemic Standard: Zero Synthetic Hallucinations</p>
              <div className="pt-2 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-navy-900 border border-navy-700 text-[10px] font-mono text-slate-300">
                  Ready for FastAPI / LangChain
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} GapLens. Built for the Digital Dark Spot Hackathon Challenge.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
