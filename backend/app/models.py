from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class AnalyzeRequest(BaseModel):
    query: str = Field(..., min_length=2, max_length=500, description="The topic, question, or claim to analyze")
    vectors: List[str] = Field(
        default=["missing", "conflict", "outdated", "evidence"],
        description="The detection vectors to run: missing, conflict, outdated, evidence"
    )
    focus: Optional[str] = Field(default="auto", description="Domain focus, e.g. scholarship, policy, science, auto")

class SourceItem(BaseModel):
    title: str
    url: str
    domain: str
    is_official_gov: bool
    publication_date: Optional[str] = None
    http_status: int
    verification_status: str  # VERIFIED_OFFICIAL, VERIFIED_PUBLIC, UNVERIFIED_THIRD_PARTY, UNREACHABLE
    snippet: Optional[str] = None

class MissingGapItem(BaseModel):
    aspect: str
    description: str
    severity: str  # CRITICAL, MODERATE, INFORMATIONAL
    impact: str
    suggested_inquiry: str

class DiscrepancySource(BaseModel):
    name: str
    url: str
    assertion: str

class ConflictItem(BaseModel):
    claim_topic: str
    source_a: DiscrepancySource
    source_b: DiscrepancySource
    discrepancy_type: str  # DEADLINE, FINANCIAL_AMOUNT, ELIGIBILITY, CRITERION
    analysis: str

class OutdatedItem(BaseModel):
    item: str
    observed_date: Optional[str] = None
    status: str  # EXPIRED_DEADLINE, SUPERSEDED_STANDARD, PAST_ACADEMIC_CYCLE, POSSIBLY_STALE
    details: str
    source_url: Optional[str] = None

class EvidenceAudit(BaseModel):
    total_sources_analyzed: int
    official_gov_sources_count: int
    third_party_sources_count: int
    unverified_claims: List[str]
    epistemic_confidence_score: int  # 0 to 100
    audit_summary: str

class AnalyzeResponse(BaseModel):
    query: str
    timestamp: str
    category: str
    detection_vectors_processed: List[str]
    sources_checked: List[SourceItem]
    missing_information: List[MissingGapItem]
    conflicts: List[ConflictItem]
    outdated_information: List[OutdatedItem]
    evidence_audit: EvidenceAudit
    execution_time_ms: float
