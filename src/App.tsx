import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { DarkSpotSection } from './components/DarkSpotSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { Footer } from './components/Footer';
import { QueryInspectionModal } from './components/QueryInspectionModal';
import { GapVector, AnalyzeApiResponse } from './types';
import { analyzeTopicApi } from './services/api';

export const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeQuery, setActiveQuery] = useState('');
  const [activeVectors, setActiveVectors] = useState<GapVector[]>([
    'missing',
    'conflict',
    'outdated',
    'evidence'
  ]);
  const [apiData, setApiData] = useState<AnalyzeApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleScrollToSearch = () => {
    searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 400);
  };

  const executeAnalysis = async (query: string, vectors: GapVector[]) => {
    setIsLoading(true);
    setApiError(null);
    try {
      const data = await analyzeTopicApi(query, vectors);
      setApiData(data);
    } catch (err: any) {
      console.error('GapLens backend API call failed:', err);
      setApiError(err.message || 'Failed to communicate with FastAPI backend.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevealGaps = (query: string, vectors: GapVector[]) => {
    setActiveQuery(query);
    setActiveVectors(vectors);
    setModalOpen(true);
    executeAnalysis(query, vectors);
  };

  const handleRetry = () => {
    if (activeQuery) {
      executeAnalysis(activeQuery, activeVectors);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-navy-darkest text-slate-100 font-sans selection:bg-cyan-500 selection:text-navy-950">
      
      {/* Top Navigation */}
      <Header onScrollToSearch={handleScrollToSearch} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Research Input & Primary CTA */}
        <Hero 
          onRevealGaps={handleRevealGaps} 
          inputRef={searchInputRef}
          isLoading={isLoading}
        />

        {/* Feature Sections: Missing, Conflict, Outdated, Evidence */}
        <Features />

        {/* Step-by-Step "How It Works" Section */}
        <HowItWorks />

        {/* Digital Dark Spot Conceptual Breakdown & Comparison */}
        <DarkSpotSection />

        {/* Clean Engineering Standards & Architecture Section */}
        <ArchitectureSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Query Inspection & Backend Live Findings Modal */}
      <QueryInspectionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        query={activeQuery}
        selectedVectors={activeVectors}
        apiData={apiData}
        isLoading={isLoading}
        error={apiError}
        onRetry={handleRetry}
      />

    </div>
  );
};

export default App;
