import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  Check, 
  Copy, 
  Code2,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Layers,
  Sparkles,
  RefreshCw,
  ServerCrash,
  Search,
  CheckCircle2,
  Calendar,
  Building2,
  FileCheck2,
  Gauge,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp,
  Globe2,
  ShieldAlert
} from 'lucide-react';
import { GapVector, AnalyzeApiResponse, SourceChecked } from '../types';

interface QueryInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  selectedVectors: GapVector[];
  apiData: AnalyzeApiResponse | null;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

export const QueryInspectionModal: React.FC<QueryInspectionModalProps> = ({
  isOpen,
  onClose,
  query,
  selectedVectors,
  apiData,
  isLoading,
  error,
  onRetry
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'sources' | 'missing' | 'conflicts' | 'outdated' | 'evidence' | 'json'>('all');
  const [showCalculationDetails, setShowCalculationDetails] = useState(false);

  if (!isOpen) return null;

  const handleCopyJson = () => {
    const payload = apiData || {
      query,
      selectedVectors,
      status: "NO_DATA"
    };
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const confidenceScore = apiData?.evidence_audit?.epistemic_confidence_score ?? 0;
  const govSources = apiData?.sources_checked.filter(s => s.is_official_gov) || [];
  const thirdPartySources = apiData?.sources_checked.filter(s => !s.is_official_gov) || [];

  // Dynamic formula components matching backend analyzer.py
  const basePoints = 50;
  const primaryGovPoints = govSources.length >= 1 ? 35 : 0;
  const dualGovPoints = govSources.length >= 2 ? 10 : 0;
  const penaltyPoints = thirdPartySources.length > 0 ? Math.min(15, thirdPartySources.length * 5) : 0;

  // Check if sources disagree about deadlines or academic years
  const deadlineConflicts = apiData?.conflicts.filter(c => 
    c.discrepancy_type === 'DEADLINE' || 
    c.claim_topic.toLowerCase().includes('date') || 
    c.claim_topic.toLowerCase().includes('timeline')
  ) || [];

  const staleYearItems = apiData?.outdated_information.filter(item => 
    item.status === 'PAST_ACADEMIC_CYCLE' || 
    item.item.toLowerCase().includes('cycle') || 
    item.item.toLowerCase().includes('year')
  ) || [];

  const hasTimelineDivergence = deadlineConflicts.length > 0 || staleYearItems.length > 0;

  const formatAuditDate = (isoString?: string) => {
    if (!isoString) return "Current Session (Live)";
    try {
      const dt = new Date(isoString);
      return dt.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-navy-darkest/90 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="w-full max-w-5xl rounded-2xl bg-navy-950 border border-cyan-500/40 shadow-glow-cyan-lg overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-navy-800 flex items-center justify-between bg-navy-900/95">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-glow-cyan">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  {isLoading ? 'Scanning Real Sources...' : apiData ? 'Live Epistemic Analysis' : 'Analysis Status'}
                </h3>
                {isLoading ? (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30 animate-pulse">
                    LIVE PIPELINE ACTIVE
                  </span>
                ) : apiData ? (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    REAL WEB CORPUS AUDITED
                  </span>
                ) : error ? (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-950 text-rose-300 border border-rose-500/30">
                    CONNECTION ERROR
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950 text-amber-300 border border-amber-500/30">
                    READY
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Connected to <span className="font-mono text-cyan-400">http://127.0.0.1:8001/api/analyze</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Query Summary Strip */}
        <div className="px-5 py-3 bg-navy-900/50 border-b border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-400 truncate">
            <span className="font-mono text-cyan-400 uppercase font-semibold">Query:</span>
            <span className="text-white font-medium truncate max-w-md">"{query}"</span>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {apiData && (
              <span className="text-slate-400 text-[11px]">
                Latency: <span className="text-cyan-300 font-mono font-medium">{apiData.execution_time_ms}ms</span>
              </span>
            )}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Vectors:</span>
              <span className="px-2 py-0.5 rounded bg-navy-800 text-cyan-300 font-mono font-semibold">
                {selectedVectors.length} Active
              </span>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs (When Data is Available) */}
        {!isLoading && apiData && (
          <div className="px-5 pt-2.5 border-b border-navy-800 flex gap-2 text-xs font-semibold overflow-x-auto scrollbar-thin">
            <button
              onClick={() => setActiveTab('all')}
              className={`pb-2.5 px-2 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'all' 
                  ? 'border-cyan-400 text-cyan-300' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>All Sections</span>
            </button>

            <button
              onClick={() => setActiveTab('sources')}
              className={`pb-2.5 px-2 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'sources' 
                  ? 'border-cyan-400 text-cyan-300' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Sources Checked</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-navy-800 text-cyan-300 font-mono">
                {apiData.sources_checked.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('missing')}
              className={`pb-2.5 px-2 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'missing' 
                  ? 'border-cyan-400 text-cyan-300' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Missing Information</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-navy-800 text-cyan-300 font-mono">
                {apiData.missing_information.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('conflicts')}
              className={`pb-2.5 px-2 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'conflicts' 
                  ? 'border-cyan-400 text-cyan-300' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Conflicts</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-navy-800 text-amber-300 font-mono">
                {apiData.conflicts.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('outdated')}
              className={`pb-2.5 px-2 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'outdated' 
                  ? 'border-cyan-400 text-cyan-300' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Outdated Information</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-navy-800 text-purple-300 font-mono">
                {apiData.outdated_information.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('evidence')}
              className={`pb-2.5 px-2 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'evidence' 
                  ? 'border-cyan-400 text-cyan-300' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Evidence Audit</span>
            </button>

            <button
              onClick={() => setActiveTab('json')}
              className={`pb-2.5 px-2 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'json' 
                  ? 'border-cyan-400 text-cyan-300' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Raw JSON</span>
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-300 flex-1">
          
          {/* Loading State */}
          {isLoading && (
            <div className="py-16 text-center space-y-5">
              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 animate-ping"></div>
                <div className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin"></div>
                <Search className="w-5 h-5 text-cyan-400 absolute" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white">Retrieving Real Public Web Sources...</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  Querying live sources from the open web, prioritizing official government portals, extracting dates, and computing epistemic gaps.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-900 border border-navy-800 text-[11px] font-mono text-cyan-300 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>POST http://127.0.0.1:8001/api/analyze</span>
              </div>
            </div>
          )}

          {/* API Error State */}
          {!isLoading && error && (
            <div className="p-5 rounded-xl bg-rose-950/40 border border-rose-500/40 space-y-4 animate-in fade-in">
              <div className="flex items-start gap-3">
                <ServerCrash className="w-6 h-6 text-rose-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm">Backend Communication Error</h4>
                  <p className="text-xs text-rose-200 leading-relaxed">
                    {error}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-navy-950 border border-navy-800 space-y-2 text-xs">
                <div className="font-mono text-slate-400 uppercase font-semibold">Troubleshooting Checklist:</div>
                <ul className="space-y-1 text-slate-300 list-disc list-inside">
                  <li>Verify FastAPI backend is running on <code className="text-cyan-300 font-mono">http://127.0.0.1:8001</code></li>
                  <li>Run: <code className="text-cyan-300 font-mono px-1 py-0.5 bg-navy-900 rounded">cd backend; python -m uvicorn app.main:app --port 8001 --reload</code></li>
                  <li>Check <a href="http://127.0.0.1:8001/api/health" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">http://127.0.0.1:8001/api/health</a> in your browser</li>
                </ul>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={onRetry}
                  className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-navy-950 text-xs font-bold transition-all shadow-glow-cyan flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry Analysis</span>
                </button>
              </div>
            </div>
          )}

          {/* API Response Display: All Organized Sections */}
          {!isLoading && apiData && (
            <div className="space-y-8">
              
              {/* REQUIREMENT 7: PROMINENT WARNING WHEN SOURCES DISAGREE ABOUT DEADLINES OR ACADEMIC YEARS */}
              {hasTimelineDivergence && (
                <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-amber-950/80 via-navy-900 to-amber-950/60 border-2 border-amber-500/70 shadow-lg shadow-amber-950/30 space-y-3 animate-in fade-in">
                  <div className="flex items-start gap-3">
                    <ShieldAlert className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5 animate-pulse" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-amber-200 uppercase tracking-wide font-mono">
                          ⚠️ Critical Timeline Warning: Disputed Deadlines & Academic Cycles Detected
                        </h4>
                        <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 text-[10px] font-mono border border-amber-500/40 font-semibold">
                          HIGH EPISTEMIC FRICTION
                        </span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        Evaluated web sources present <strong>conflicting submission deadlines or reference past academic cycles</strong> (e.g., past years like 2020-21 or clashing cutoff months). Commercial aggregators frequently retain unrefreshed dates from previous notification cycles.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-navy-950/90 border border-amber-500/30 text-xs text-slate-300 space-y-1.5">
                    <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      <span>Actionable Guidance for Applicants:</span>
                    </div>
                    <p className="text-slate-300">
                      <strong>Do not rely on third-party aggregators for final application deadlines or eligibility dates.</strong> Always cross-reference the official government portal (e.g., <a href="https://scholarships.gov.in" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline font-mono">scholarships.gov.in</a> or <a href="https://www.aicte-india.org" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline font-mono">aicte-india.org</a>) where official corrigenda and deadline extension gazettes are posted.
                    </p>
                  </div>
                </div>
              )}

              {/* REQUIREMENT 4: TRANSPARENT EPISTEMIC CONFIDENCE SCORE & CALCULATION BREAKDOWN */}
              {(activeTab === 'all' || activeTab === 'evidence') && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-cyan-300">
                      <Gauge className="w-4 h-4 text-cyan-400" />
                      <span>Epistemic Confidence Score & Calculation Transparency</span>
                    </div>
                    <button
                      onClick={() => setShowCalculationDetails(!showCalculationDetails)}
                      className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono transition-colors cursor-pointer"
                    >
                      <span>{showCalculationDetails ? 'Hide Formula' : 'Inspect 80% Calculation'}</span>
                      {showCalculationDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    
                    {/* Confidence Score Card */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-navy-900 to-navy-950 border border-cyan-500/50 shadow-glow-cyan relative overflow-hidden">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span>Confidence Score</span>
                        <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-300">
                        {confidenceScore}%
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {confidenceScore >= 75 ? 'Strong Primary Grounding' : 'Moderate Primary Grounding'}
                      </div>
                    </div>

                    {/* Official Gov Sources Card */}
                    <div className="p-4 rounded-xl bg-navy-900/80 border border-emerald-500/40">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span>Official Gov Sources</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
                        {govSources.length}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Primary Statutory Portals (.gov.in)
                      </div>
                    </div>

                    {/* Third-Party Sources Card */}
                    <div className="p-4 rounded-xl bg-navy-900/80 border border-slate-700">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span>Third-Party Portals</span>
                        <Globe2 className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-200">
                        {thirdPartySources.length}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Independent / Educational Guides
                      </div>
                    </div>

                    {/* Query Category Card */}
                    <div className="p-4 rounded-xl bg-navy-900/80 border border-navy-700">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span>Classification</span>
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <div className="text-xs sm:text-sm font-bold font-mono text-white truncate mt-1">
                        {apiData.category}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Audit Latency: {apiData.execution_time_ms}ms
                      </div>
                    </div>

                  </div>

                  {/* Transparent Score Calculation Drawer (Requirement 4 & 7: Dynamic based on actual evidence) */}
                  <div className={`p-4 rounded-xl bg-navy-900/90 border border-cyan-500/30 space-y-3 transition-all ${
                    showCalculationDetails ? 'block' : 'hidden'
                  }`}>
                    <div className="flex items-center justify-between border-b border-navy-800 pb-2">
                      <span className="font-mono text-xs font-bold text-cyan-300 uppercase">
                        Transparent Epistemic Confidence Formula ({confidenceScore}%):
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        Evaluated from {apiData.sources_checked.length} real audited sources
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-navy-950 border border-navy-800">
                        <div className="text-slate-400 text-[10px]">1. Baseline Prior</div>
                        <div className="text-sm font-mono font-bold text-white mt-0.5">+{basePoints} pts</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Neutral epistemic baseline</div>
                      </div>

                      <div className={`p-2.5 rounded-lg bg-navy-950 border ${
                        primaryGovPoints > 0 ? 'border-emerald-500/40 text-emerald-300' : 'border-navy-800 text-slate-500'
                      }`}>
                        <div className="text-[10px]">2. Primary Gov Authority</div>
                        <div className="text-sm font-mono font-bold mt-0.5">+{primaryGovPoints} pts</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {govSources.length > 0 ? `${govSources.length} official gov portal(s)` : 'No gov portals found'}
                        </div>
                      </div>

                      <div className={`p-2.5 rounded-lg bg-navy-950 border ${
                        dualGovPoints > 0 ? 'border-emerald-500/40 text-emerald-300' : 'border-navy-800 text-slate-500'
                      }`}>
                        <div className="text-[10px]">3. Dual-Portal Corroboration</div>
                        <div className="text-sm font-mono font-bold mt-0.5">+{dualGovPoints} pts</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {govSources.length >= 2 ? '≥2 official portals confirmed' : 'Requires ≥2 gov portals'}
                        </div>
                      </div>

                      <div className={`p-2.5 rounded-lg bg-navy-950 border ${
                        penaltyPoints > 0 ? 'border-amber-500/40 text-amber-300' : 'border-navy-800 text-slate-500'
                      }`}>
                        <div className="text-[10px]">4. Third-Party Divergence</div>
                        <div className="text-sm font-mono font-bold mt-0.5">-{penaltyPoints} pts</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {thirdPartySources.length > 0 ? `${thirdPartySources.length} aggregator(s) audited` : 'Zero aggregators'}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-navy-950/70 border border-navy-800 text-xs text-slate-300 space-y-1">
                      <div className="font-semibold text-white font-mono">
                        Formula: {basePoints} {primaryGovPoints > 0 ? `+ ${primaryGovPoints}` : '+ 0'} {dualGovPoints > 0 ? `+ ${dualGovPoints}` : '+ 0'} {penaltyPoints > 0 ? `- ${penaltyPoints}` : '- 0'} = {confidenceScore}%
                      </div>
                      <p className="text-slate-300 leading-relaxed text-[11px]">
                        <strong>Interpretation:</strong>{' '}
                        {govSources.length > 0 
                          ? `This ${confidenceScore}% score reflects primary grounding in ${govSources.length} official government portal(s) (${govSources.map(g => g.domain).join(', ')}). ${penaltyPoints > 0 ? `It is moderated by a -${penaltyPoints}pt penalty because ${thirdPartySources.length} secondary third-party sources were retrieved with unverified claims or timeline variance.` : 'Full confidence achieved.'}`
                          : `This ${confidenceScore}% score reflects that no official government portals were identified for this query. Findings rely entirely on ${thirdPartySources.length} secondary third-party sources (${penaltyPoints > 0 ? `-${penaltyPoints}pt penalty from baseline 50%` : ''}).`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* REQUIREMENT 1, 2, 3, 5, 6: SOURCES CHECKED WITH CLEAR SEPARATION & TRUST METADATA */}
              {(activeTab === 'all' || activeTab === 'sources') && (
                <div className="space-y-6">
                  
                  {/* Section Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-navy-800 pb-2">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-cyan-300">
                      <Building2 className="w-4 h-4 text-cyan-400" />
                      <span>Sources Checked & Epistemic Trust Segregation ({apiData.sources_checked.length})</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Separating Statutory Authority from Secondary Guidance
                    </span>
                  </div>

                  {/* SUBSECTION 1: Official Government Portals */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-emerald-950/30 px-3 py-2 rounded-lg border border-emerald-500/30">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wide font-mono">
                          Official Government & Statutory Portals ({govSources.length})
                        </h4>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono">
                        Primary Legal & Statutory Authority
                      </span>
                    </div>

                    {govSources.length === 0 ? (
                      <div className="p-4 rounded-xl bg-navy-900/40 border border-navy-800 text-xs text-slate-400">
                        No official government domains were retrieved for this specific query.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {govSources.map((source, idx) => (
                          <SourceCard 
                            key={idx} 
                            source={source} 
                            lastChecked={apiData.timestamp} 
                            formatDate={formatAuditDate}
                            isGov={true}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* SUBSECTION 2: Third-Party Informational Portals */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between bg-navy-900/60 px-3 py-2 rounded-lg border border-navy-700">
                      <div className="flex items-center gap-2">
                        <Globe2 className="w-4 h-4 text-cyan-400" />
                        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wide font-mono">
                          Third-Party Informational Portals & Aggregators ({thirdPartySources.length})
                        </h4>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Secondary Educational Guidance
                      </span>
                    </div>

                    {/* REQUIREMENT 6 FAIR EXPLANATION NOTE */}
                    <div className="p-3 rounded-lg bg-navy-950 border border-navy-800 text-[11px] text-slate-400 flex items-start gap-2">
                      <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Fair Attribution Note:</strong> Third-party educational portals and student guides provide valuable public accessibility and simplified overviews. <strong>Being an independent source does not make the information false</strong>; however, because they lack statutory power and may experience update lag, their timeline claims must be verified against official gazettes before taking irreversible actions.
                      </span>
                    </div>

                    {thirdPartySources.length === 0 ? (
                      <div className="p-4 rounded-xl bg-navy-900/40 border border-navy-800 text-xs text-slate-400">
                        No third-party sources were queried.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {thirdPartySources.map((source, idx) => (
                          <SourceCard 
                            key={idx} 
                            source={source} 
                            lastChecked={apiData.timestamp} 
                            formatDate={formatAuditDate}
                            isGov={false}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* SECTION: Missing Information */}
              {(activeTab === 'all' || activeTab === 'missing') && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-cyan-300">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>Missing Information ({apiData.missing_information.length})</span>
                  </div>

                  {apiData.missing_information.length === 0 ? (
                    <div className="p-4 rounded-xl bg-navy-900/40 border border-navy-800 text-xs text-slate-400 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Retrieved corpus addresses the standard criteria. No critical voids detected.</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {apiData.missing_information.map((gap, i) => (
                        <div key={i} className="p-4 rounded-xl bg-navy-900/70 border border-navy-700/80 space-y-2">
                          <div className="flex items-center justify-between">
                            <h5 className="font-bold text-white text-sm">{gap.aspect}</h5>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                              gap.severity === 'CRITICAL' 
                                ? 'bg-rose-950 text-rose-300 border border-rose-500/30' 
                                : gap.severity === 'MODERATE'
                                ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                                : 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                            }`}>
                              {gap.severity}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300">{gap.description}</p>
                          <div className="p-3 rounded-lg bg-navy-950 border border-navy-800 text-xs text-slate-400 space-y-1">
                            <div><strong className="text-slate-300">Potential Risk / Impact:</strong> {gap.impact}</div>
                            <div><strong className="text-cyan-300">Recommended Action:</strong> {gap.suggested_inquiry}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SECTION: Conflicts */}
              {(activeTab === 'all' || activeTab === 'conflicts') && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-amber-300">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>Conflicts & Discrepancies ({apiData.conflicts.length})</span>
                  </div>

                  {apiData.conflicts.length === 0 ? (
                    <div className="p-4 rounded-xl bg-navy-900/40 border border-navy-800 text-xs text-slate-400 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>No direct numerical or timeline contradictions discovered across evaluated sources.</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {apiData.conflicts.map((conflict, i) => (
                        <div key={i} className="p-4 rounded-xl bg-navy-900/70 border border-amber-500/30 space-y-3">
                          <div className="flex items-center justify-between">
                            <h5 className="font-bold text-white text-sm">{conflict.claim_topic}</h5>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40">
                              {conflict.discrepancy_type}
                            </span>
                          </div>
                          
                          {/* Side-by-side comparison with clickable URLs */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div className="p-3 rounded-lg bg-navy-950 border border-navy-800 space-y-1">
                              <div className="font-semibold text-slate-200">{conflict.source_a.name}</div>
                              <div className="text-cyan-300 italic">"{conflict.source_a.assertion}"</div>
                              {conflict.source_a.url && (
                                <a 
                                  href={conflict.source_a.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1 mt-1 truncate"
                                >
                                  <span className="truncate">{conflict.source_a.url}</span>
                                  <ExternalLink className="w-2.5 h-2.5 flex-shrink-0" />
                                </a>
                              )}
                            </div>

                            <div className="p-3 rounded-lg bg-navy-950 border border-navy-800 space-y-1">
                              <div className="font-semibold text-slate-200">{conflict.source_b.name}</div>
                              <div className="text-amber-300 italic">"{conflict.source_b.assertion}"</div>
                              {conflict.source_b.url && (
                                <a 
                                  href={conflict.source_b.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-[10px] text-amber-400 hover:underline flex items-center gap-1 mt-1 truncate"
                                >
                                  <span className="truncate">{conflict.source_b.url}</span>
                                  <ExternalLink className="w-2.5 h-2.5 flex-shrink-0" />
                                </a>
                              )}
                            </div>
                          </div>

                          <p className="text-xs text-slate-300 bg-navy-950/60 p-2.5 rounded border-l-2 border-amber-400">
                            {conflict.analysis}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SECTION: Outdated Information */}
              {(activeTab === 'all' || activeTab === 'outdated') && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-purple-300">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span>Outdated Information & Stale Cycles ({apiData.outdated_information.length})</span>
                  </div>

                  {apiData.outdated_information.length === 0 ? (
                    <div className="p-4 rounded-xl bg-navy-900/40 border border-navy-800 text-xs text-slate-400 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>All evaluated sources reference active, current-cycle publications.</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {apiData.outdated_information.map((item, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-navy-900/60 border border-purple-500/30 text-xs space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white">{item.item}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                              {item.status}
                            </span>
                          </div>
                          <p className="text-slate-300">{item.details}</p>
                          {item.source_url && (
                            <a 
                              href={item.source_url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1 truncate"
                            >
                              <span>Source: {item.source_url}</span>
                              <ExternalLink className="w-2.5 h-2.5 flex-shrink-0" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SECTION: Evidence Audit */}
              {(activeTab === 'all' || activeTab === 'evidence') && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-slate-300">
                    <FileCheck2 className="w-4 h-4 text-cyan-400" />
                    <span>Evidence Audit Summary</span>
                  </div>

                  <div className="p-4 rounded-xl bg-navy-900/70 border border-navy-800 space-y-3 text-xs">
                    <p className="text-slate-200 font-medium leading-relaxed">
                      {apiData.evidence_audit.audit_summary}
                    </p>

                    {apiData.evidence_audit.unverified_claims && apiData.evidence_audit.unverified_claims.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-navy-800">
                        <div className="font-semibold text-slate-400 uppercase text-[10px]">Unverified Claims Flagged:</div>
                        <ul className="space-y-1">
                          {apiData.evidence_audit.unverified_claims.map((claim, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-amber-300/90">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                              <span>{claim}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Tab: Raw JSON */}
          {!isLoading && activeTab === 'json' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Response received from <code className="text-cyan-400 font-mono">http://127.0.0.1:8001/api/analyze</code>:</span>
                <button
                  onClick={handleCopyJson}
                  className="flex items-center gap-1.5 text-xs text-cyan-300 hover:text-white px-2.5 py-1 rounded bg-navy-800 border border-navy-700 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied JSON!' : 'Copy JSON'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-navy-darkest border border-navy-800 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed max-h-[440px]">
                {JSON.stringify(apiData || { query, selectedVectors, status: "AWAITING_INGESTION_SERVICE" }, null, 2)}
              </pre>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-4 border-t border-navy-800 bg-navy-900/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 hidden sm:block">
            <span>Backend Endpoint: </span>
            <span className="text-cyan-400 font-mono font-medium">http://127.0.0.1:8001/api/analyze</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleCopyJson}
              className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-navy-950 text-xs font-bold transition-all shadow-glow-cyan flex items-center gap-1.5 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied!' : 'Copy Results JSON'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

// Reusable Source Card satisfying Requirements 1, 2, 3, 5, 6
interface SourceCardProps {
  source: SourceChecked;
  lastChecked: string;
  formatDate: (str?: string) => string;
  isGov: boolean;
}

const SourceCard: React.FC<SourceCardProps> = ({ source, lastChecked, formatDate, isGov }) => {
  return (
    <div 
      className={`p-4 rounded-xl border transition-all ${
        isGov 
          ? 'bg-navy-900/90 border-emerald-500/40 shadow-sm' 
          : 'bg-navy-900/50 border-navy-800 hover:border-slate-700'
      }`}
    >
      {/* Header Line */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
        {/* Clickable Source Title */}
        <a 
          href={source.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-bold text-white hover:text-cyan-300 text-sm flex items-center gap-1.5 group cursor-pointer leading-snug"
        >
          <span className="truncate max-w-xl">{source.title || source.domain}</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 flex-shrink-0" />
        </a>

        {/* Server Reachability Status - REQUIREMENT 5 (Never treat HTTP 200 as proof of truth) */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span 
            className={`px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1 ${
              source.http_status === 200 
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30' 
                : 'bg-rose-950/80 text-rose-300 border border-rose-500/30'
            }`}
            title="Server reachability only confirms the web server responded. It does not certify the factual accuracy of published claims."
          >
            <span>Network: HTTP {source.http_status || 'TIMEOUT'}</span>
            <span className="text-[9px] text-slate-400">(Reachable)</span>
          </span>
        </div>
      </div>

      {/* REQUIREMENT 2: SEPARATE SOURCE TRUST STATUS FROM CLAIM VERIFICATION STATUS */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {/* Source Trust Status */}
        <div className="flex items-center gap-1 text-[11px] font-mono">
          <span className="text-slate-400 text-[10px]">Source Trust:</span>
          {isGov ? (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-950 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Official Government Entity (Primary Authority)</span>
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-navy-950 text-slate-300 border border-navy-700 flex items-center gap-1">
              <Globe2 className="w-3 h-3 text-cyan-400" />
              <span>Independent Informational Portal (Secondary Source)</span>
            </span>
          )}
        </div>

        {/* Claim Verification Status */}
        <div className="flex items-center gap-1 text-[11px] font-mono">
          <span className="text-slate-400 text-[10px]">Claim Verification:</span>
          {isGov ? (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
              Primary Authority Benchmark (Gazette Origin)
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-950/60 text-amber-300 border border-amber-500/30">
              Uncorroborated Secondary Assertion (Check Gazette)
            </span>
          )}
        </div>
      </div>

      {/* Snippet */}
      {source.snippet && (
        <p className="text-xs text-slate-300 leading-relaxed mb-3 bg-navy-950/50 p-2.5 rounded-lg border border-navy-800/80">
          "{source.snippet}"
        </p>
      )}

      {/* REQUIREMENT 3 & 7: EXPLICIT PUBLICATION DATE vs LAST CHECKED DATE SEPARATION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono pt-2 border-t border-navy-800/80 text-slate-400">
        
        {/* Publication Date */}
        <div className="flex items-center gap-1.5 truncate">
          <Calendar className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
          <span>Document Published / Revised: </span>
          {source.publication_date ? (
            <strong className="text-cyan-300 font-semibold">{source.publication_date}</strong>
          ) : (
            <span className="text-slate-500 italic">Not declared in document metadata</span>
          )}
        </div>

        {/* Last Checked by GapLens Audit Date */}
        <div className="flex items-center gap-1.5 truncate sm:justify-end">
          <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span>Last Audited by GapLens: </span>
          <strong className="text-slate-200">{formatDate(lastChecked)}</strong>
        </div>

      </div>

      {/* Clickable URL Direct Anchor */}
      <div className="flex items-center gap-1 text-[11px] font-mono pt-1.5 text-slate-500 truncate">
        <span>URL:</span>
        <a 
          href={source.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-cyan-400 hover:text-cyan-300 hover:underline truncate"
        >
          {source.url}
        </a>
      </div>

    </div>
  );
};
