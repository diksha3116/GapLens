"""
GapLens Epistemic Gap, Conflict, and Temporal Decay Analyzer.
Performs deterministic, fact-grounded analysis across real extracted sources.
Never invents dates, facts, or citations.
"""

from typing import List, Dict, Any, Tuple
from datetime import datetime

from app.models import (
    MissingGapItem, 
    ConflictItem, 
    OutdatedItem, 
    EvidenceAudit,
    DiscrepancySource
)
from app.gov_scholarships import (
    SCHOLARSHIP_ESSENTIAL_DIMENSIONS, 
    is_scholarship_query,
    is_official_gov_domain
)

def run_epistemic_analysis(
    query: str, 
    extracted_sources: List[Dict[str, Any]], 
    vectors: List[str]
) -> Tuple[List[MissingGapItem], List[ConflictItem], List[OutdatedItem], EvidenceAudit]:
    """
    Executes the multi-vector gap analysis over the genuine retrieved sources.
    Only runs the vectors selected by the user.
    """
    is_scholarship = is_scholarship_query(query)

    missing_gaps: List[MissingGapItem] = []
    conflicts: List[ConflictItem] = []
    outdated: List[OutdatedItem] = []

    # 1. Missing Information Vector
    if "missing" in vectors:
        missing_gaps = _detect_missing_information(query, extracted_sources, is_scholarship)

    # 2. Conflict & Contradiction Vector
    if "conflict" in vectors:
        conflicts = _detect_conflicts(extracted_sources)

    # 3. Outdated Information Vector
    if "outdated" in vectors:
        outdated = _detect_outdated_data(extracted_sources)

    # 4. Evidence Lineage & Epistemic Audit
    evidence_audit = _perform_evidence_audit(extracted_sources)

    return missing_gaps, conflicts, outdated, evidence_audit


def _detect_missing_information(
    query: str, 
    sources: List[Dict[str, Any]], 
    is_scholarship: bool
) -> List[MissingGapItem]:
    """Identifies critical unaddressed facets across the retrieved corpus."""
    gaps: List[MissingGapItem] = []
    all_text = " ".join([s.get("extracted_text", "") + " " + s.get("snippet", "") for s in sources]).lower()

    if is_scholarship:
        # Check against standard government scholarship requirements
        for dimension in SCHOLARSHIP_ESSENTIAL_DIMENSIONS:
            keywords = dimension["keywords"]
            # If none of the keywords appear in the extracted corpus
            if not any(kw in all_text for kw in keywords):
                gaps.append(MissingGapItem(
                    aspect=dimension["aspect"],
                    description=f"None of the retrieved sources specify the official {dimension['aspect'].lower()} for '{query}'.",
                    severity="CRITICAL" if "Income" in dimension["aspect"] or "Deadline" in dimension["aspect"] else "MODERATE",
                    impact=dimension["impact"],
                    suggested_inquiry=dimension["suggested_inquiry"]
                ))

        # Check for Grievance Redressal / Helpdesk Contact omission
        if not any(k in all_text for k in ["helpdesk", "toll free", "grievance", "complaint", "support email"]):
            gaps.append(MissingGapItem(
                aspect="Official Dispute & Grievance Redressal Channel",
                description="The retrieved pages lack designated helpline numbers or grievance portal URLs for rejected/stuck applications.",
                severity="INFORMATIONAL",
                impact="Applicants encountering portal verification freezes have no direct recourse path.",
                suggested_inquiry="Search for the specific ministry nodal officer directory or NSP helpdesk contact."
            ))
    else:
        # General research / policy / technical query missing info detection
        if not any(k in all_text for k in ["sample size", "participants", "methodology", "cohort", "control group"]):
            gaps.append(MissingGapItem(
                aspect="Methodological Sample Size & Baseline Controls",
                description="The retrieved sources present assertions without detailing experimental sample sizes or control groups.",
                severity="MODERATE",
                impact="Assertions cannot be independently validated for statistical significance without sample transparency.",
                suggested_inquiry="Investigate primary peer-reviewed papers for the underlying sample demographics and control baselines."
            ))

        if not any(k in all_text for k in ["conflict of interest", "funding", "disclosure", "grant number", "financial interest"]):
            gaps.append(MissingGapItem(
                aspect="Funding & Institutional Conflict of Interest Disclosures",
                description="Retrieved public sources do not disclose the funding entities or financial affiliations backing the assertions.",
                severity="INFORMATIONAL",
                impact="Unseen commercial or institutional sponsorship introduces hidden editorial bias.",
                suggested_inquiry="Check regulatory or scientific filings for author conflict-of-interest declarations."
            ))

    return gaps


def _detect_conflicts(sources: List[Dict[str, Any]]) -> List[ConflictItem]:
    """Compares claims, dates, and amounts across retrieved sources to surface discrepancies."""
    conflicts: List[ConflictItem] = []

    # Filter sources with valid content
    valid_sources = [s for s in sources if s.get("http_status") == 200 and (s.get("extracted_text") or s.get("snippet"))]
    if len(valid_sources) < 2:
        return conflicts

    # 1. Compare dates / deadlines across sources
    for i in range(len(valid_sources)):
        for j in range(i + 1, len(valid_sources)):
            s1 = valid_sources[i]
            s2 = valid_sources[j]

            dates1 = s1.get("dates_found_in_text", [])
            dates2 = s2.get("dates_found_in_text", [])

            # If both have dates, check for divergent dates
            divergent_dates = [d1 for d1 in dates1 if d1 not in dates2]
            if divergent_dates and dates2:
                # Discrepancy in reported timeline
                conflicts.append(ConflictItem(
                    claim_topic="Application Timeline & Stated Dates Discrepancy",
                    source_a=DiscrepancySource(
                        name=s1.get("title", s1.get("domain", "Source A")),
                        url=s1.get("url", ""),
                        assertion=f"Cites timeline milestone: {divergent_dates[0]}"
                    ),
                    source_b=DiscrepancySource(
                        name=s2.get("title", s2.get("domain", "Source B")),
                        url=s2.get("url", ""),
                        assertion=f"Cites timeline milestone: {dates2[0]}"
                    ),
                    discrepancy_type="DEADLINE",
                    analysis=f"Sources cite differing dates ({divergent_dates[0]} vs {dates2[0]}). One source may reflect an unannounced extension or an outdated previous year's notification."
                ))
                break  # Max 1 timeline conflict per pair

    # 2. Compare financial figures or income limits if found
    for i in range(len(valid_sources)):
        for j in range(i + 1, len(valid_sources)):
            s1 = valid_sources[i]
            s2 = valid_sources[j]

            amounts1 = s1.get("amounts_found", [])
            amounts2 = s2.get("amounts_found", [])

            diff_amounts = [a1 for a1 in amounts1 if a1 not in amounts2]
            if diff_amounts and amounts2:
                conflicts.append(ConflictItem(
                    claim_topic="Financial Grant / Income Cap Discrepancy",
                    source_a=DiscrepancySource(
                        name=s1.get("title", s1.get("domain", "Source A")),
                        url=s1.get("url", ""),
                        assertion=f"Mentions financial figure: {diff_amounts[0]}"
                    ),
                    source_b=DiscrepancySource(
                        name=s2.get("title", s2.get("domain", "Source B")),
                        url=s2.get("url", ""),
                        assertion=f"Mentions financial figure: {amounts2[0]}"
                    ),
                    discrepancy_type="FINANCIAL_AMOUNT",
                    analysis=f"Discrepancy found between stated financial parameters ({diff_amounts[0]} vs {amounts2[0]}). Official guidelines should be consulted to confirm revised stipend amounts."
                ))
                break

    return conflicts[:4]  # Return top relevant conflicts


def _detect_outdated_data(sources: List[Dict[str, Any]]) -> List[OutdatedItem]:
    """Identifies stale timestamps, expired deadlines, and past academic years."""
    outdated_items: List[OutdatedItem] = []
    current_year = datetime.now().year  # 2026

    for s in sources:
        url = s.get("url", "")
        title = s.get("title", s.get("domain", ""))
        pub_date = s.get("publication_date")
        dates_in_text = s.get("dates_found_in_text", [])
        text = s.get("extracted_text", "")

        # 1. Check publication date
        if pub_date:
            try:
                pub_year = int(pub_date.split("-")[0])
                if pub_year < current_year - 1:
                    outdated_items.append(OutdatedItem(
                        item=f"Publication Date Over 1 Year Old ({pub_date})",
                        observed_date=pub_date,
                        status="POSSIBLY_STALE",
                        details=f"The source '{title}' was last updated in {pub_date}. Statutory provisions or deadlines may have since been superseded.",
                        source_url=url
                    ))
            except Exception:
                pass

        # 2. Check for past academic cycles (e.g. 2021-22, 2022-23, 2023-24)
        for date_str in dates_in_text:
            if any(past_cycle in date_str for past_cycle in ["2021-22", "2022-23", "2023-24", "2020", "2021", "2022", "2023"]):
                outdated_items.append(OutdatedItem(
                    item=f"Reference to Past Academic/Fiscal Cycle ({date_str})",
                    observed_date=date_str,
                    status="PAST_ACADEMIC_CYCLE",
                    details=f"Page still features dates referencing the past {date_str} cycle. This may indicate an unrefreshed page that has not been updated for the current {current_year} session.",
                    source_url=url
                ))
                break

    return outdated_items[:5]


def _perform_evidence_audit(sources: List[Dict[str, Any]]) -> EvidenceAudit:
    """Calculates epistemic lineage, domain authority, and unverified assertion flags."""
    total = len(sources)
    gov_count = sum(1 for s in sources if s.get("is_official_gov"))
    third_party_count = sum(1 for s in sources if s.get("verification_status") == "UNVERIFIED_THIRD_PARTY")

    unverified_claims = []
    for s in sources:
        if s.get("verification_status") == "UNVERIFIED_THIRD_PARTY":
            domain = s.get("domain", "Unknown")
            unverified_claims.append(
                f"Information from commercial aggregator '{domain}' lacks direct digital signature or Gazette link."
            )

    # Epistemic Confidence Scoring:
    # High if official .gov.in sources were successfully reachable.
    score = 50
    if gov_count >= 1:
        score += 35
    if gov_count >= 2:
        score += 10
    if third_party_count > 0:
        score -= min(15, third_party_count * 5)
    
    score = max(20, min(95, score))

    summary = (
        f"Audited {total} public web sources. "
        f"Verified {gov_count} official government portal(s) and {third_party_count} third-party aggregator(s). "
        f"Epistemic confidence evaluated at {score}% based on primary authority coverage."
    )

    return EvidenceAudit(
        total_sources_analyzed=total,
        official_gov_sources_count=gov_count,
        third_party_sources_count=third_party_count,
        unverified_claims=unverified_claims[:4],
        epistemic_confidence_score=score,
        audit_summary=summary
    )
