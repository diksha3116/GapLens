import React, { useState } from 'react';
import { 
  EyeOff, 
  GitFork, 
  History, 
  Network, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert, 
  SearchCode, 
  FileQuestion 
} from 'lucide-react';
import { FeatureDetail, GapVector } from '../types';

const FEATURES_DATA: FeatureDetail[] = [
  {
    id: 'missing',
    title: 'Missing Information Detection',
    tagline: 'Illuminating Epistemic Voids & Unasked Questions',
    badge: 'Vector 01 // Dark Spot Audit',
    description:
      'Search engines and AI models are optimized to retrieve existing tokens, naturally obscuring what is absent. GapLens maps the theoretical boundary of any subject to pinpoint critical variables, unaddressed counter-theses, and missing control populations that standard research fails to solicit.',
    detectionMechanism: [
      'Semantic ontology boundary comparison against domain knowledge standards',
      'Evaluation of omitted adverse parameters, negative findings, and failure cases',
      'Structural gap discovery across regulatory, scientific, and commercial dimensions',
      'Automated generation of targeted investigative inquiries to bridge the dark spots'
    ],
    keyIndicators: [
      'Absence of Longitudinal Safety Studies',
      'Unspecified Population Demographics',
      'Missing Baseline Control Benchmarks',
      'Unreported Economic Externality Models'
    ],
    preventedHarm:
      'Prevents high-stakes decision-makers from confusing "no reported adverse data" with "empirically proven safe."',
    sampleSignals: [
      'Identifies when an AI policy paper discusses adoption incentives but completely omits liability frameworks.',
      'Flags medical summaries omitting interaction profiles for pregnant or immunocompromised sub-populations.'
    ]
  },
  {
    id: 'conflict',
    title: 'Conflict & Contradiction Detection',
    tagline: 'Surfacing Polarity Divergence Across Divergent Authorities',
    badge: 'Vector 02 // Claim Friction',
    description:
      'When authoritative entities report contradictory metrics or irreconcilable conclusions, single-source queries present false consensus. GapLens continuously cross-references claims to surface points of ideological, methodology, or statistical friction without forcing an artificial compromise.',
    detectionMechanism: [
      'Cross-corpus semantic predicate extraction and polarity alignment',
      'Mathematical claim discrepancy calculation across peer-reviewed papers',
      'Stakeholder bias profiling and methodological divergence tracking',
      'Identification of disputed assertions versus established consensus'
    ],
    keyIndicators: [
      'Disparate Quantitative Projections (>25% Variance)',
      'Directly Clashing Efficacy Conclusions',
      'Mutually Exclusive Timeline Projections',
      'Contradictory Regulatory Interpretations'
    ],
    preventedHarm:
      'Prevents blind adoption of a single partisan source by exposing active academic and industry schisms.',
    sampleSignals: [
      'Flags when one climate report asserts 2030 battery parity while another technical body models 2038.',
      'Highlights clinical disagreements regarding minimum therapeutic dosages between international regulators.'
    ]
  },
  {
    id: 'outdated',
    title: 'Outdated Information Detection',
    tagline: 'Guarding Against Temporal Knowledge Decay',
    badge: 'Vector 03 // Temporal Half-Life',
    description:
      'Web algorithms reward historically popular pages, allowing superseded specifications, defunct guidelines, and outdated statistics to outrank newer empirical breakthroughs. GapLens audits the publication lineage to flag stale assumptions before they corrupt current analyses.',
    detectionMechanism: [
      'Temporal anchoring and timestamp verification of fundamental assertions',
      'Automated cross-check against superseding publications and revisions',
      'Regulatory lifecycle monitoring for deprecated statutes and sunset clauses',
      'Velocity tracking for rapidly evolving technical domains'
    ],
    keyIndicators: [
      'Superseded Experimental Methodologies',
      'Defunct Statutory & Regulatory Standards',
      'Pre-Replication Scientific Assertions',
      'Stale Pricing & Production Volume Baselines'
    ],
    preventedHarm:
      'Guards against implementing deprecated security protocols or basing financial projections on defunct market structures.',
    sampleSignals: [
      'Detects references to deprecated ISO standards in active enterprise compliance drafts.',
      'Identifies when an article cites 2019 computing cost estimates that have experienced a 10x deflationary shift.'
    ]
  },
  {
    id: 'evidence',
    title: 'Evidence Lineage & Provenance Tracking',
    tagline: 'Deconstructing Circular Citations and Unsubstantiated Assertions',
    badge: 'Vector 04 // Epistemic Chain of Custody',
    description:
      'The modern internet suffers from citation dilution: dozens of blogs and news outlets quote one another in circular loops, creating the illusion of deep consensus from a single unverified blog post. GapLens traces every assertion back to its primary root artifact.',
    detectionMechanism: [
      'Directed Acyclic Graph (DAG) reconstruction of source attribution chains',
      'Detection of closed-loop circular citation topologies',
      'Primary vs. secondary vs. tertiary evidence classification',
      'Quantitative empirical grounding score for key assertions'
    ],
    keyIndicators: [
      'Circular Self-Referential Media Loops',
      'Zero-Primary-Source Assertions ("Zombie Facts")',
      'Diluted Citations Missing Empirical Root Links',
      'Distorted Press Release Paraphrasing'
    ],
    preventedHarm:
      'Exposes fabricated factoids that masquerade as widespread truth simply through repetitive regurgitation.',
    sampleSignals: [
      'Uncovers when 14 tech publications cite each other in a circle, originating from a deleted speculative tweet.',
      'Traces a widely shared statistical claim back to an unverified non-peer-reviewed whitepaper.'
    ]
  }
];

export const Features: React.FC = () => {
  const [activeTab, setActiveTab] = useState<GapVector>('missing');

  const activeFeature = FEATURES_DATA.find((f) => f.id === activeTab) || FEATURES_DATA[0];

  return (
    <section id="detection-vectors" className="py-24 bg-navy-950/70 border-y border-navy-800/80 relative">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase mb-4">
            <SearchCode className="w-3.5 h-3.5 text-cyan-400" />
            <span>Detection Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Four Vectors of <span className="cyan-gradient-text">Epistemic Discovery</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Every information vacuum introduces catastrophic blind spots. GapLens evaluates information landscapes through four complementary analytical dimensions.
          </p>
        </div>

        {/* Vector Selection Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto mb-12">
          {FEATURES_DATA.map((feature) => {
            const isSelected = activeTab === feature.id;
            return (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={`p-4 rounded-xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-navy-900 border-cyan-400/80 shadow-glow-cyan text-white'
                    : 'bg-navy-900/40 border-navy-800 hover:border-navy-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                      isSelected ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' : 'bg-navy-950 text-slate-500'
                    }`}>
                      {feature.id.toUpperCase()}
                    </span>
                    {feature.id === 'missing' && <EyeOff className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />}
                    {feature.id === 'conflict' && <GitFork className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />}
                    {feature.id === 'outdated' && <History className={`w-4 h-4 ${isSelected ? 'text-purple-400' : 'text-slate-500'}`} />}
                    {feature.id === 'evidence' && <Network className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />}
                  </div>
                  <div className="font-bold text-sm sm:text-base leading-snug">
                    {feature.title.replace(' Detection', '')}
                  </div>
                </div>

                <div className={`mt-3 flex items-center gap-1 text-xs font-semibold ${
                  isSelected ? 'text-cyan-300' : 'text-slate-500'
                }`}>
                  <span>Inspect Vector</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Feature Deep Dive Card */}
        <div className="max-w-5xl mx-auto rounded-2xl bg-navy-900/80 border border-navy-700/80 p-6 sm:p-10 shadow-glow-navy backdrop-blur-xl relative overflow-hidden">
          {/* Subtle Corner Glow Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            
            {/* Left Column: Core Narrative & Description */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-block px-3 py-1 rounded-md bg-navy-800 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-3 border border-navy-700">
                  {activeFeature.badge}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeFeature.title}
                </h3>
                <p className="text-sm font-medium text-cyan-300 mt-1">
                  {activeFeature.tagline}
                </p>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {activeFeature.description}
              </p>

              {/* Prevented Harm Alert Box */}
              <div className="p-4 rounded-xl bg-navy-950/90 border border-cyan-500/30 flex items-start gap-3.5">
                <ShieldAlert className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-cyan-300">
                    Epistemic Risk Neutralized
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    {activeFeature.preventedHarm}
                  </p>
                </div>
              </div>

              {/* Detection Mechanism List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-400">
                  Algorithmic Detection Mechanics
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {activeFeature.detectionMechanism.map((mech, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{mech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Key Indicators & Real-World Detection Signatures */}
            <div className="lg:col-span-5 space-y-6 bg-navy-950/70 p-6 rounded-xl border border-navy-800">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-cyan-300 flex items-center gap-2 mb-3">
                  <FileQuestion className="w-4 h-4 text-cyan-400" />
                  <span>Key Analytical Indicators</span>
                </h4>
                <div className="space-y-2">
                  {activeFeature.keyIndicators.map((indicator, idx) => (
                    <div 
                      key={idx}
                      className="px-3 py-2 rounded-lg bg-navy-900/90 border border-navy-800 text-xs font-medium text-slate-200 flex items-center justify-between"
                    >
                      <span>{indicator}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-navy-800/80">
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-400 mb-3">
                  Sample Analytical Signatures
                </h4>
                <div className="space-y-3">
                  {activeFeature.sampleSignals.map((signal, idx) => (
                    <div 
                      key={idx} 
                      className="text-xs text-slate-300 bg-navy-900/50 p-3 rounded-lg border-l-2 border-cyan-400"
                    >
                      "{signal}"
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Feature Grid Summary for fast skimming */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-navy-900/30 border border-navy-800/90 hover:border-cyan-500/30 transition-all">
            <EyeOff className="w-8 h-8 text-cyan-400 mb-4" />
            <h4 className="font-bold text-white text-base mb-2">Missing Information</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Discovers hidden assumptions, missing demographic stratifications, and unaddressed negative findings that search engines leave unanswered.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-navy-900/30 border border-navy-800/90 hover:border-amber-500/30 transition-all">
            <GitFork className="w-8 h-8 text-amber-400 mb-4" />
            <h4 className="font-bold text-white text-base mb-2">Conflicting Claims</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Exposes quantitative divergences, irreconcilable findings, and disputed scientific theses across divergent industry and academic publications.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-navy-900/30 border border-navy-800/90 hover:border-purple-500/30 transition-all">
            <History className="w-8 h-8 text-purple-400 mb-4" />
            <h4 className="font-bold text-white text-base mb-2">Outdated Information</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Audits publication timelines to deprecate superseded metrics, obsolete regulations, and stale baselines that linger on top search results.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-navy-900/30 border border-navy-800/90 hover:border-emerald-500/30 transition-all">
            <Network className="w-8 h-8 text-emerald-400 mb-4" />
            <h4 className="font-bold text-white text-base mb-2">Evidence Tracking</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Constructs citation directed graphs to dismantle circular echo chambers and verify whether assertions trace to empirical primary sources.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
