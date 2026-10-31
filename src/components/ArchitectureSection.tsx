import React from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Code2, 
  CheckCircle2, 
  Server
} from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  return (
    <section id="architecture" className="py-24 bg-navy-950/80 border-t border-navy-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase mb-4">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Engineering & Design Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Built for <span className="cyan-gradient-text">Epistemic Truth</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            GapLens adheres to strict architectural principles: transparent heuristics, responsive accessibility, zero mocked hallucinations, and a clean interface ready for downstream ingestion microservices.
          </p>
        </div>

        {/* 3 Core Architecture Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="rounded-2xl bg-navy-900/40 border border-navy-800 p-8 glass-panel-hover">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-300 mb-6">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Zero-Hallucination Integrity</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Unlike generic generative bots that fabricate references to present an illusion of completeness, GapLens is designed to audit genuine empirical documents or flag when no verification exists.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-400 border-t border-navy-800 pt-4">
              <li className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>No synthetic mock citations</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Deterministic gap quantification</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Transparent epistemic boundaries</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-navy-900/40 border border-navy-800 p-8 glass-panel-hover">
            <div className="w-12 h-12 rounded-xl bg-navy-800/80 border border-navy-700 flex items-center justify-center text-cyan-300 mb-6">
              <Code2 className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Modern Reactive Frontend</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Crafted with React, TypeScript, Vite, and Tailwind CSS. Provides ultra-responsive interaction, sub-millisecond local state transitions, and a crisp Navy, White, and subtle Cyan visual system.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-400 border-t border-navy-800 pt-4">
              <li className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Strict TypeScript type safety</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Accessible mobile-first layouts</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Zero bloated dependencies</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-navy-900/40 border border-navy-800 p-8 glass-panel-hover">
            <div className="w-12 h-12 rounded-xl bg-navy-800/80 border border-navy-700 flex items-center justify-center text-cyan-300 mb-6">
              <Server className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Backend Integration Contract</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              The query engine generates a standardized REST/WebSocket payload ready to connect with your downstream FastAPI, LangChain, or Neo4j knowledge graph backend without client refactoring.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-400 border-t border-navy-800 pt-4">
              <li className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Standardized JSON payload schema</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Pluggable vector store interface</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Decoupled API architecture</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
