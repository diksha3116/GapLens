export type GapVector = 'missing' | 'conflict' | 'outdated' | 'evidence';

export interface DetectionScope {
  id: GapVector;
  label: string;
  description: string;
  iconName: string;
  color: string;
  active: boolean;
}

export interface ResearchQueryState {
  query: string;
  selectedVectors: GapVector[];
  domainScope: string;
  confidenceThreshold: number;
  timestamp: string;
}

export interface FeatureDetail {
  id: GapVector;
  title: string;
  tagline: string;
  badge: string;
  description: string;
  detectionMechanism: string[];
  keyIndicators: string[];
  preventedHarm: string;
  sampleSignals: string[];
}

export interface StepItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  technicalDetails: string[];
}

// Live Backend API Response Types
export interface SourceChecked {
  title: string;
  url: string;
  domain: string;
  is_official_gov: boolean;
  publication_date: string | null;
  http_status: number;
  verification_status: string; // VERIFIED_OFFICIAL, VERIFIED_PUBLIC, UNVERIFIED_THIRD_PARTY, UNREACHABLE_*
  snippet: string | null;
}

export interface ApiMissingGap {
  aspect: string;
  description: string;
  severity: 'CRITICAL' | 'MODERATE' | 'INFORMATIONAL';
  impact: string;
  suggested_inquiry: string;
}

export interface DiscrepancySource {
  name: string;
  url: string;
  assertion: string;
}

export interface ApiConflict {
  claim_topic: string;
  source_a: DiscrepancySource;
  source_b: DiscrepancySource;
  discrepancy_type: string;
  analysis: string;
}

export interface ApiOutdatedItem {
  item: string;
  observed_date: string | null;
  status: string;
  details: string;
  source_url: string | null;
}

export interface ApiEvidenceAudit {
  total_sources_analyzed: number;
  official_gov_sources_count: number;
  third_party_sources_count: number;
  unverified_claims: string[];
  epistemic_confidence_score: number;
  audit_summary: string;
}

export interface AnalyzeApiResponse {
  query: string;
  timestamp: string;
  category: string;
  detection_vectors_processed: string[];
  sources_checked: SourceChecked[];
  missing_information: ApiMissingGap[];
  conflicts: ApiConflict[];
  outdated_information: ApiOutdatedItem[];
  evidence_audit: ApiEvidenceAudit;
  execution_time_ms: number;
}
