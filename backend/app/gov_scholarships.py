"""
GapLens Government Scholarship Registry & Verification Knowledge Base.
Prioritizes and validates official government sources for scholarship-related inquiries.
"""

from typing import List, Dict, Any, Tuple

# Official government portals for scholarships and student welfare
OFFICIAL_GOV_DOMAINS = [
    "scholarships.gov.in",       # National Scholarship Portal (NSP) - India
    "education.gov.in",          # Ministry of Education, Government of India
    "ugc.ac.in",                 # University Grants Commission (UGC)
    "aicte-india.org",           # All India Council for Technical Education (Pragati, Saksham, PMSSS)
    "pfms.nic.in",               # Public Financial Management System (DBT)
    "india.gov.in",              # National Portal of India
    "myscheme.gov.in",           # Official Indian Government Scheme Discovery Portal
    "dbtbharat.gov.in",          # Direct Benefit Transfer Bharat Portal
    "tribal.nic.in",             # Ministry of Tribal Affairs Scholarships
    "socialjustice.gov.in",      # Ministry of Social Justice & Empowerment
    "minorityaffairs.gov.in",    # Ministry of Minority Affairs Scholarships
    "dst.gov.in",                # Department of Science and Technology (INSPIRE)
    "csirhrdg.res.in",           # CSIR Fellowships
    "studentaid.gov",            # US Department of Education Federal Student Aid
    "grants.gov",                # US Federal Grants
    "nsf.gov",                   # US National Science Foundation
]

# Essential scholarship information dimensions that an applicant needs to know.
# If these are missing from a source, GapLens flags them as "Missing Information".
SCHOLARSHIP_ESSENTIAL_DIMENSIONS = [
    {
        "aspect": "Annual Family Income Ceiling",
        "keywords": ["income", "lakh", "per annum", "income certificate", "family income", "ews"],
        "impact": "Applicants risk disqualification if family income thresholds (e.g. ₹2.5L, ₹6.0L, or ₹8.0L) are omitted.",
        "suggested_inquiry": "Verify the exact gross annual family income ceiling and issuing authority for the income certificate."
    },
    {
        "aspect": "Application & Institutional Verification Deadlines",
        "keywords": ["deadline", "last date", "closing date", "institute verification", "defective verification", "extended"],
        "impact": "NSP and AICTE require multi-tier verification (Institute L1, State/District L2). Omitting verification cutoffs leads to rejection.",
        "suggested_inquiry": "Check the exact sub-deadlines: Student registration, Institute INO verification, and DNO/SNO verification."
    },
    {
        "aspect": "Minimum Academic Qualifying Criteria",
        "keywords": ["percentage", "marks", "cgpa", "cutoff", "minimum score", "qualifying examination"],
        "impact": "Unspecified academic cutoffs (e.g. 50%, 60%, or top 20th percentile) result in wasted application effort.",
        "suggested_inquiry": "Confirm the minimum percentage or CGPA required in the preceding qualifying examination."
    },
    {
        "aspect": "Aadhaar Seeding & Direct Benefit Transfer (DBT) Bank Mandate",
        "keywords": ["aadhaar", "dbt", "npcil", "seeding", "bank account", "pfms"],
        "impact": "Funds will fail to disburse if the student's bank account is not mapped to NPCI for Aadhaar-based DBT payment.",
        "suggested_inquiry": "Verify if the bank account is actively Aadhaar-seeded on the NPCI mapper before applying."
    },
    {
        "aspect": "Concurrent Scholarship Restriction Clause",
        "keywords": ["other scholarship", "concurrent", "duplication", "double benefit", "avail", "sole"],
        "impact": "Most government schemes strictly prohibit holding multiple scholarships; violation can lead to clawback and blacklisting.",
        "suggested_inquiry": "Check whether receiving another central or state scholarship disqualifies the student from this scheme."
    },
    {
        "aspect": "Renewal vs. Fresh Application Conditions",
        "keywords": ["renewal", "subsequent year", "fresh", "backlog", "attendance"],
        "impact": "Renewal often requires minimum attendance (e.g. 75%) and passing all semester subjects without arrears.",
        "suggested_inquiry": "Confirm the academic progression standards required to maintain scholarship eligibility across years."
    }
]

SCHOLARSHIP_KEYWORDS = [
    "scholarship", "scholarships", "nsp", "fellowship", "fellowships", 
    "stipend", "grant", "pmsss", "pragati", "saksham", "post matric", 
    "pre matric", "merit cum means", "aicte", "ugc", "inspire",
    "dbt", "freeship", "financial aid", "tuition waiver"
]

def is_scholarship_query(query: str) -> bool:
    """Checks if a user query is related to scholarships, fellowships, or educational financial aid."""
    q_lower = query.lower()
    return any(keyword in q_lower for keyword in SCHOLARSHIP_KEYWORDS)

def is_official_gov_domain(url_or_domain: str) -> bool:
    """Returns True if the URL or domain belongs to a recognized official government source."""
    d_lower = url_or_domain.lower()
    for official in OFFICIAL_GOV_DOMAINS:
        if official in d_lower:
            return True
    # General government domain checks
    if any(suffix in d_lower for suffix in [".gov.in", ".nic.in", ".gov", ".mil"]):
        return True
    return False

def get_official_scholarship_seeds(query: str) -> List[Tuple[str, str]]:
    """
    Returns curated official portal search queries and direct primary seeds
    for scholarship queries to guarantee prioritized government coverage.
    """
    seeds = []
    q_lower = query.lower()
    
    if "pragati" in q_lower or "saksham" in q_lower or "swanath" in q_lower:
        seeds.append(("AICTE Pragati / Saksham Scheme Portal", "https://www.aicte-india.org/schemes/students-development-schemes"))
        seeds.append(("National Scholarship Portal - AICTE Schemes", "https://scholarships.gov.in"))
    elif "pmsss" in q_lower or "j&k" in q_lower or "jk" in q_lower:
        seeds.append(("AICTE PMSSS J&K and Ladakh Portal", "https://www.aicte-india.org/bureaus/pms-jk"))
        seeds.append(("National Scholarship Portal", "https://scholarships.gov.in"))
    elif "ugc" in q_lower or "net" in q_lower or "jrf" in q_lower:
        seeds.append(("UGC Official Schemes", "https://www.ugc.ac.in"))
        seeds.append(("NSP UGC Schemes", "https://scholarships.gov.in"))
    elif "post matric" in q_lower or "pre matric" in q_lower or "merit" in q_lower:
        seeds.append(("National Scholarship Portal Official", "https://scholarships.gov.in"))
        seeds.append(("MyScheme Government Scholarships", "https://www.myscheme.gov.in"))
    else:
        seeds.append(("National Scholarship Portal (Government of India)", "https://scholarships.gov.in"))
        seeds.append(("MyScheme Educational Schemes Portal", "https://www.myscheme.gov.in"))
        
    return seeds
