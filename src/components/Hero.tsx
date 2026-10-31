import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  AlertCircle, 
  SlidersHorizontal, 
  Layers, 
  Clock, 
  FileCheck2, 
  ArrowRight,
  Compass
} from 'lucide-react';
import { GapVector } from '../types';

interface HeroProps {
  onRevealGaps: (query: string, vectors: GapVector[]) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  isLoading?: boolean;
}

const SAMPLE_TOPICS = [
  "AICTE Pragati Scholarship for Girls eligibility deadline",
  "National Scholarship Portal (NSP) post matric scheme guidelines",
  "Solid-State Battery Commercialization Timelines",
  "EU AI Act Compliance Deadlines for Foundation Models"
];

export const Hero: React.FC<HeroProps> = ({ onRevealGaps, inputRef, isLoading = false }) => {
  const [query, setQuery] = useState('');
  const [selectedVectors, setSelectedVectors] = useState<GapVector[]>([
    'missing', 
    'conflict', 
    'outdated', 
    'evidence'
  ]);
  const [queryError, setQueryError] = useState('');

  const toggleVector = (vector: GapVector) => {
    if (selectedVectors.includes(vector)) {
      if (selectedVectors.length === 1) return; // Keep at least one
      setSelectedVectors(selectedVectors.filter(v => v !== vector));
    } else {
      setSelectedVectors([...selectedVectors, vector]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setQueryError('Please enter a topic or research question to analyze.');
      inputRef.current?.focus();
      return;
    }
    setQueryError('');
    onRevealGaps(query.trim(), selectedVectors);
  };

  const handleSelectSample = (topic: string) => {
    setQuery(topic);
    setQueryError('');
    inputRef.current?.focus();
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background radial gradient and subtle grid overlay */}
      <div className="absolute inset-0 radial-dark-glow pointer-events-none" />
      <div className="absolute inset-0 grid-bg-overlay pointer-events-none opacity-40" />

      {/* Subtle Cyan Ambient Accent Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide uppercase shadow-glow-cyan mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span>Digital Dark Spot Intelligence</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">Epistemic Gap Detection</span>
        </div>

        {/* Strong Hero Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
          Don't Just Find Answers.{' '}
          <span className="block mt-2 cyan-gradient-text">
            Find What's Missing.
          </span>
        </h1>

        {/* Supporting text explaining information gaps, conflicting claims and outdated information */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed mb-10">
          Traditional search surfaces only what is already written, while generative AI masks uncertainty with plausible illusions. 
          <span className="text-white font-medium"> GapLens</span> systematically diagnoses the <span className="text-cyan-300 font-medium">digital dark spots</span> in your knowledge base: identifying <span className="text-white font-semibold underline decoration-cyan-500/40 decoration-2 underline-offset-4">critical information gaps</span>, unmasking <span className="text-white font-semibold underline decoration-cyan-500/40 decoration-2 underline-offset-4">conflicting claims</span> across sources, and flagging <span className="text-white font-semibold underline decoration-cyan-500/40 decoration-2 underline-offset-4">outdated information</span> before you act.
        </p>

        {/* Prominent Research Input Component */}
        <div className="relative max-w-4xl mx-auto">
          {/* Glowing outline container */}
          <div className="p-1 sm:p-1.5 rounded-2xl bg-gradient-to-b from-cyan-500/30 via-navy-800 to-navy-900 shadow-2xl shadow-cyan-950/40">
            <div className="p-4 sm:p-6 rounded-xl bg-navy-950/95 border border-navy-800/90 backdrop-blur-2xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Main Input Box */}
                <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-navy-900/90 border border-navy-700/80 rounded-xl p-2 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all duration-200">
                  <div className="flex items-center pl-3 text-cyan-400 flex-shrink-0">
                    <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      if (queryError) setQueryError('');
                    }}
                    placeholder="Enter a research topic, thesis, or claim to scan for blind spots..."
                    className="w-full bg-transparent px-2 py-2 text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none"
                  />

                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      className="px-2 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      Clear
                    </button>
                  )}

                  {/* Primary CTA Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-navy-950 font-bold text-sm tracking-wide shadow-glow-cyan hover:shadow-cyan-400/40 active:scale-[0.98] transition-all duration-200 flex-shrink-0 cursor-pointer disabled:opacity-75 disabled:cursor-wait"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-navy-950 border-t-transparent rounded-full animate-spin"></div>
                        <span>Scanning Real Sources...</span>
                      </>
                    ) : (
                      <>
                        <span>Reveal Information Gaps</span>
                        <Sparkles className="w-4 h-4 fill-navy-950 text-navy-950" />
                      </>
                    )}
                  </button>
                </div>

                {queryError && (
                  <div className="flex items-center gap-2 text-rose-400 text-xs px-2 text-left animate-in fade-in">
                    <AlertCircle className="w-4 h-4" />
                    <span>{queryError}</span>
                  </div>
                )}

                {/* Filter and Vector Toggle Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs border-t border-navy-800/80">
                  <div className="flex items-center gap-2 text-slate-400">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-medium text-slate-300">Active Detection Vectors:</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleVector('missing')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md border text-xs transition-colors ${
                        selectedVectors.includes('missing')
                          ? 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300 font-medium'
                          : 'bg-navy-900 border-navy-800 text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <Layers className="w-3 h-3" />
                      <span>Missing Facets</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleVector('conflict')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md border text-xs transition-colors ${
                        selectedVectors.includes('conflict')
                          ? 'bg-amber-950/80 border-amber-500/40 text-amber-300 font-medium'
                          : 'bg-navy-900 border-navy-800 text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <AlertCircle className="w-3 h-3" />
                      <span>Conflicting Claims</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleVector('outdated')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md border text-xs transition-colors ${
                        selectedVectors.includes('outdated')
                          ? 'bg-purple-950/80 border-purple-500/40 text-purple-300 font-medium'
                          : 'bg-navy-900 border-navy-800 text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      <span>Outdated Data</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleVector('evidence')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md border text-xs transition-colors ${
                        selectedVectors.includes('evidence')
                          ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300 font-medium'
                          : 'bg-navy-900 border-navy-800 text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <FileCheck2 className="w-3 h-3" />
                      <span>Evidence Lineage</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Quick Exploration Topic Chips */}
          <div className="mt-5 text-left">
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Try high-ambiguity research topics with known information voids:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_TOPICS.map((topic, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectSample(topic)}
                  className="px-3 py-1.5 rounded-lg bg-navy-900/80 hover:bg-navy-800 border border-navy-700/60 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 text-xs transition-all duration-150 flex items-center gap-1.5 group"
                >
                  <span className="truncate max-w-[280px] sm:max-w-none">{topic}</span>
                  <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Value Prop Micro-Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 text-left">
            <div className="p-4 rounded-xl bg-navy-900/40 border border-navy-800/80">
              <div className="text-cyan-400 font-mono text-sm font-semibold mb-1">Vector 01</div>
              <div className="text-white font-medium text-sm">Absence Detection</div>
              <div className="text-slate-400 text-xs mt-1">Highlights unexamined assumptions & skipped control variables.</div>
            </div>
            <div className="p-4 rounded-xl bg-navy-900/40 border border-navy-800/80">
              <div className="text-amber-400 font-mono text-sm font-semibold mb-1">Vector 02</div>
              <div className="text-white font-medium text-sm">Discrepancy Matrix</div>
              <div className="text-slate-400 text-xs mt-1">Maps clashing statistics across peer-reviewed & industry sources.</div>
            </div>
            <div className="p-4 rounded-xl bg-navy-900/40 border border-navy-800/80">
              <div className="text-purple-400 font-mono text-sm font-semibold mb-1">Vector 03</div>
              <div className="text-white font-medium text-sm">Temporal Half-Life</div>
              <div className="text-slate-400 text-xs mt-1">Detects superseded metrics and outdated benchmarks.</div>
            </div>
            <div className="p-4 rounded-xl bg-navy-900/40 border border-navy-800/80">
              <div className="text-emerald-400 font-mono text-sm font-semibold mb-1">Vector 04</div>
              <div className="text-white font-medium text-sm">Lineage Auditing</div>
              <div className="text-slate-400 text-xs mt-1">Traces claims back to primary empirical data or flags circular citations.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
