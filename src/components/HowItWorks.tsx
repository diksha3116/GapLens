import React, { useState } from 'react';
import { 
  Workflow, 
  Binary, 
  ArrowRight, 
  Check,
  ChevronRight,
  Cpu,
  Sparkles
} from 'lucide-react';
import { StepItem } from '../types';

const STEPS: StepItem[] = [
  {
    number: '01',
    title: 'Perimeter Scoping & Corpus Ingestion',
    subtitle: 'Aggregating Beyond Algorithmic Echo Chambers',
    description:
      'Instead of scraping only top-ranked search results that recycle common SEO narratives, GapLens queries across diverse data archetypes: peer-reviewed literature, regulatory gazettes, clinical registers, and corporate disclosures.',
    technicalDetails: [
      'Multi-domain crawler targeting preprints, filings, and primary repositories',
      'Neutral query expansion without confirmation-bias biasing',
      'Metadata extraction: publication timestamps, author credentials, funding disclaimers'
    ]
  },
  {
    number: '02',
    title: 'Epistemic Knowledge Graph Mapping',
    subtitle: 'Structuring Claims into Verifiable Semantic Triplets',
    description:
      'Every ingested document is parsed into discrete epistemological units: Subject-Predicate-Object claims linked directly to their methodology type (empirical, theoretical, speculative, or anecdotal) and contextual constraints.',
    technicalDetails: [
      'Deconstruction of unstructured text into formal assertion triples',
      'Mapping of sample sizes, confidence intervals, and boundary conditions',
      'Temporal anchoring to capture exact validity timeframes'
    ]
  },
  {
    number: '03',
    title: 'Multi-Vector Gap & Friction Synthesis',
    subtitle: 'Executing Dark Spot, Conflict, and Half-Life Diagnostics',
    description:
      'The graph is audited using four specialized analytical algorithms: identifying absent dimensions (missing data), measuring mathematical variance between opposing claims (conflict), and tracing citation loops back to their root.',
    technicalDetails: [
      'Topological void detection comparing subject against complete domain ontologies',
      'Bipolar sentiment and numerical divergence clustering across assertions',
      'Directed Acyclic Graph (DAG) cycle-detection for circular attribution rings'
    ]
  },
  {
    number: '04',
    title: 'Decision-Grade Gap Matrix Delivery',
    subtitle: 'Transforming Epistemic Uncertainty into Targeted Next Steps',
    description:
      'GapLens presents the user with an actionable forensic blueprint: clearly segregating high-confidence facts from unverified assumptions, exposing disputed claims with counter-evidence, and issuing direct prompts for missing inquiries.',
    technicalDetails: [
      'Forensic gap categorization (critical omissions vs. minor oversights)',
      'Direct cross-source confrontation views showing exact statistical friction',
      'Generation of investigative prompts to guide subsequent primary research'
    ]
  }
];

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="py-24 bg-navy-darkest relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase mb-4">
            <Workflow className="w-3.5 h-3.5 text-cyan-400" />
            <span>Process Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How GapLens <span className="cyan-gradient-text">Diagnoses Knowledge Voids</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            From raw input to epistemic illumination: a deterministic, multi-stage pipeline designed to detect what conventional search algorithms conceal.
          </p>
        </div>

        {/* Step Progress Bar for Desktop */}
        <div className="hidden lg:grid grid-cols-4 gap-4 mb-12">
          {STEPS.map((step, idx) => {
            const isCurrent = activeStep === idx;
            const isCompleted = activeStep > idx;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer relative ${
                  isCurrent
                    ? 'bg-navy-900 border-cyan-400 shadow-glow-cyan'
                    : isCompleted
                    ? 'bg-navy-950 border-navy-700/80 hover:border-slate-600 text-slate-300'
                    : 'bg-navy-950/60 border-navy-900 hover:border-navy-800 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-xs font-bold ${isCurrent ? 'text-cyan-400' : 'text-slate-500'}`}>
                    STEP {step.number}
                  </span>
                  {isCompleted ? (
                    <Check className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <div className={`w-2 h-2 rounded-full ${isCurrent ? 'bg-cyan-400 animate-ping' : 'bg-navy-800'}`} />
                  )}
                </div>
                <div className={`font-semibold text-sm truncate ${isCurrent ? 'text-white' : 'text-slate-400'}`}>
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Step Showcase Card */}
        <div className="rounded-2xl bg-gradient-to-b from-navy-900/90 to-navy-950 border border-navy-800 p-6 sm:p-10 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Step Left Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono font-bold flex items-center justify-center text-lg shadow-glow-cyan">
                  {STEPS[activeStep].number}
                </span>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                    Phase Execution
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {STEPS[activeStep].title}
                  </h3>
                </div>
              </div>

              <p className="text-sm font-medium text-slate-300 italic">
                "{STEPS[activeStep].subtitle}"
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {STEPS[activeStep].description}
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-400">
                  Engineering Blueprint Specifications:
                </h4>
                <div className="space-y-2">
                  {STEPS[activeStep].technicalDetails.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 bg-navy-950/70 p-3 rounded-lg border border-navy-800/80">
                      <Binary className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-lg bg-navy-900 border border-navy-700 text-xs font-semibold text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Previous Phase
                </button>
                <button
                  type="button"
                  disabled={activeStep === STEPS.length - 1}
                  onClick={() => setActiveStep(prev => Math.min(STEPS.length - 1, prev + 1))}
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-navy-950 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
                >
                  <span>Next Phase</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Step Right Visual Diagram Panel */}
            <div className="lg:col-span-5 bg-navy-950/90 rounded-xl border border-navy-800 p-6 flex flex-col justify-between h-full min-h-[340px]">
              <div className="flex items-center justify-between border-b border-navy-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono font-semibold text-white">PIPELINE_ORCHESTRATOR</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  ACTIVE
                </span>
              </div>

              {/* Visual State Representation */}
              <div className="space-y-4 my-auto py-2">
                <div className="p-3.5 rounded-lg bg-navy-900/80 border border-navy-700/80">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Target Vector Resolution</span>
                    <span className="text-cyan-400 font-mono">100% Coverage</span>
                  </div>
                  <div className="w-full bg-navy-950 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-500" 
                      style={{ width: `${((activeStep + 1) / STEPS.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-navy-900/60 border border-navy-800">
                    <div className="text-slate-400 text-[11px]">Primary Ingestion</div>
                    <div className="text-white font-mono font-bold mt-1">Direct Sources</div>
                  </div>
                  <div className="p-3 rounded-lg bg-navy-900/60 border border-navy-800">
                    <div className="text-slate-400 text-[11px]">Epistemic Rigor</div>
                    <div className="text-cyan-300 font-mono font-bold mt-1">Zero-Hallucination</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-navy-900/40 border border-navy-800/80 text-xs text-slate-300 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Deterministic audit mechanism that prioritizes absent and conflicting evidence over easy answers.
                  </span>
                </div>
              </div>

              {/* Micro Status Footer */}
              <div className="pt-3 border-t border-navy-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Phase ID: GL-SYS-0{activeStep + 1}</span>
                <span>Latency Target: &lt; 850ms</span>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Step List */}
        <div className="lg:hidden mt-8 space-y-3">
          {STEPS.map((step, idx) => (
            <button
              key={step.number}
              onClick={() => setActiveStep(idx)}
              className={`w-full text-left p-4 rounded-xl border flex items-center justify-between ${
                activeStep === idx 
                  ? 'bg-navy-900 border-cyan-400 text-white' 
                  : 'bg-navy-950 border-navy-800 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-cyan-400">0{idx + 1}</span>
                <span className="font-semibold text-sm">{step.title}</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
