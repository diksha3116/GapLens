import React from 'react';
import { 
  AlertTriangle, 
  Search, 
  Bot, 
  ScanSearch, 
  CheckCircle, 
  XCircle, 
  Shield
} from 'lucide-react';

export const DarkSpotSection: React.FC = () => {
  return (
    <section id="dark-spot-paradigm" className="py-24 bg-navy-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase mb-4">
            <AlertTriangle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Problem Statement Forensic</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            The Anatomy of a <span className="cyan-gradient-text">Digital Dark Spot</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            A "Digital Dark Spot" occurs when modern search algorithms and generative AI present a superficially complete answer that completely masks what is absent, disputed, or superseded.
          </p>
        </div>

        {/* 3-Way Architectural Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Column 1: Conventional Search Engines */}
          <div className="rounded-2xl bg-navy-900/40 border border-navy-800 p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 mb-6">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Conventional Search Engines</h3>
              <p className="text-xs font-mono text-slate-400 mb-4 uppercase tracking-wider">
                Ranked by Popularity & SEO
              </p>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Optimized for click-through rate and content volume. High-frequency assertions are pushed to the top, while critical missing caveats and minority dissent remain buried on page 10.
              </p>

              <div className="space-y-3 border-t border-navy-800/80 pt-4">
                <div className="flex items-start gap-2 text-xs text-rose-300">
                  <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>Treats absence of indexed web pages as absence of issue</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-rose-300">
                  <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>Rewards outdated evergreen articles over recent corrections</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-rose-300">
                  <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>Susceptible to SEO circular backlink syndicates</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-navy-800 text-[11px] font-mono text-slate-500">
              Result: Popularity Bias & Ghost Consensus
            </div>
          </div>

          {/* Column 2: Standard Generative AI (LLMs) */}
          <div className="rounded-2xl bg-navy-900/40 border border-navy-800 p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 mb-6">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Generic AI Chatbots</h3>
              <p className="text-xs font-mono text-slate-400 mb-4 uppercase tracking-wider">
                Ranked by Probabilistic Fluency
              </p>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Trained to provide convincing narrative completions. When confronted with an information void, standard models smoothly hallucinate plausible assumptions rather than flagging the blind spot.
              </p>

              <div className="space-y-3 border-t border-navy-800/80 pt-4">
                <div className="flex items-start gap-2 text-rose-300">
                  <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>Invents confident explanations over admitting epistemic voids</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-rose-300">
                  <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>Flattens active controversies into misleading pseudo-consensus</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-rose-300">
                  <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>Lacks native temporal tracking of superseded benchmarks</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-navy-800 text-[11px] font-mono text-slate-500">
              Result: Hallucinatory Certainty & Unseen Voids
            </div>
          </div>

          {/* Column 3: GapLens Epistemic Platform */}
          <div className="rounded-2xl bg-gradient-to-b from-navy-900 to-navy-950 border border-cyan-500/40 p-6 flex flex-col justify-between shadow-glow-cyan relative">
            <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-cyan-400 text-navy-950 text-[10px] font-bold tracking-wider uppercase font-mono">
              The GapLens Solution
            </div>

            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-400/50 flex items-center justify-center text-cyan-300 mb-6 shadow-glow-cyan">
                <ScanSearch className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">GapLens Epistemic Engine</h3>
              <p className="text-xs font-mono text-cyan-300 mb-4 uppercase tracking-wider">
                Audited by Absence, Friction & Lineage
              </p>
              <p className="text-sm text-slate-200 leading-relaxed mb-6">
                Specifically engineered to detect the boundary of knowledge. It inverts search: evaluating what has <span className="text-cyan-300 font-semibold">NOT</span> been verified, which authorities disagree, and what data is expiring.
              </p>

              <div className="space-y-3 border-t border-navy-800/80 pt-4">
                <div className="flex items-start gap-2 text-xs text-cyan-200">
                  <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Explicitly pinpoints missing variables and omitted populations</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-cyan-200">
                  <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Highlights contradiction vectors without forcing false balance</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-cyan-200">
                  <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Traces circular citations to expose unsupported assertions</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-cyan-500/30 text-[11px] font-mono text-cyan-300 font-semibold">
              Result: High-Precision Epistemic Awareness
            </div>
          </div>

        </div>

        {/* Epistemic Axiom Callout */}
        <div className="mt-12 p-6 rounded-xl bg-navy-900/60 border border-navy-800 text-center max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <Shield className="w-8 h-8 text-cyan-400 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white">The Epistemic Mandate</h4>
              <p className="text-xs text-slate-400">
                In science, medicine, policy, and engineering, the most hazardous errors stem not from what is known to be false, but from what was assumed to be complete.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold text-cyan-300 px-3 py-1.5 rounded-lg bg-navy-950 border border-cyan-500/30 whitespace-nowrap">
            Zero-Hallucination Guardrail
          </span>
        </div>

      </div>
    </section>
  );
};
