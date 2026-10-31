# GapLens FastAPI Backend

AI-Assisted Information Gap Detection Platform — Backend Service.

## 🌟 Key Capabilities
- **Real-World Live Retrieval**: Retrieves authentic, publicly accessible sources across the web without fabricated or hallucinated citations.
- **Government Source Prioritization**: For scholarship and educational grant inquiries, automatically targets and prioritizes official government repositories (`.gov.in`, `.nic.in`, `.gov`, `scholarships.gov.in`, `aicte-india.org`, `ugc.ac.in`).
- **Epistemic Gap Analysis Engine**:
  - **Missing Information**: Identifies unaddressed dimensions (income caps, multi-tier verification deadlines, Aadhaar DBT requirements, concurrent scholarship restrictions).
  - **Conflicting Claims**: Pinpoints disparate timelines, deadlines, and conflicting financial figures across retrieved sources.
  - **Outdated Data**: Detects superseded statutory guidelines, expired dates, and references to past academic cycles.
  - **Evidence Lineage & Epistemic Audit**: Tracks domain authority, marks verified government sources vs. unverified commercial blogs, and calculates confidence scores.
- **CORS Enabled**: Configured to seamlessly communicate with the GapLens Vite frontend (`http://localhost:5173`).

---

## 🛠️ Requirements & Installation

### Prerequisites
- Python 3.10+ (Python 3.12 installed in Windows user environment)

### 1. Install Dependencies
```powershell
pip install -r requirements.txt
```
*(If python is located at `C:\Users\acer\AppData\Local\Programs\Python\Python312\python.exe`, use `& "C:\Users\acer\AppData\Local\Programs\Python\Python312\Scripts\pip.exe" install -r requirements.txt`)*

---

## 🚀 Running the Backend

### Option A: Using the Windows Batch Launcher
Double-click `run.bat` in the `backend/` folder or run from PowerShell:
```powershell
.\run.bat
```

### Option B: Running via Uvicorn Command
```powershell
cd backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
```

The API will be live at:
- **Root**: `http://127.0.0.1:8001/`
- **Health Check**: `http://127.0.0.1:8001/api/health`
- **Interactive Swagger Docs**: `http://127.0.0.1:8001/docs`
- **Analysis Endpoint**: `POST http://127.0.0.1:8001/api/analyze`

---

## 📡 API Contract: `POST /api/analyze`

### Request Body
```json
{
  "query": "AICTE Pragati Scholarship for Girls eligibility deadline",
  "vectors": ["missing", "conflict", "outdated", "evidence"],
  "focus": "auto"
}
```

### Response Schema
```json
{
  "query": "AICTE Pragati Scholarship for Girls eligibility deadline",
  "timestamp": "2026-10-31T10:44:44.869Z",
  "category": "SCHOLARSHIP_WELFARE",
  "detection_vectors_processed": ["missing", "conflict", "outdated", "evidence"],
  "sources_checked": [
    {
      "title": "NSP : National Scholarship Portal",
      "url": "https://scholarships.gov.in",
      "domain": "scholarships.gov.in",
      "is_official_gov": true,
      "publication_date": "2026-10-30",
      "http_status": 200,
      "verification_status": "VERIFIED_OFFICIAL",
      "snippet": "..."
    }
  ],
  "missing_information": [],
  "conflicts": [
    {
      "claim_topic": "Application Timeline & Stated Dates Discrepancy",
      "source_a": {
        "name": "NSP Portal",
        "url": "https://scholarships.gov.in",
        "assertion": "Cites timeline milestone: 31 October 2026"
      },
      "source_b": {
        "name": "Commercial Aggregator",
        "url": "https://example.com/scholarship",
        "assertion": "Cites timeline milestone: 30 November 2026"
      },
      "discrepancy_type": "DEADLINE",
      "analysis": "..."
    }
  ],
  "outdated_information": [],
  "evidence_audit": {
    "total_sources_analyzed": 7,
    "official_gov_sources_count": 2,
    "third_party_sources_count": 5,
    "unverified_claims": [...],
    "epistemic_confidence_score": 80,
    "audit_summary": "..."
  },
  "execution_time_ms": 3598.3
}
```
