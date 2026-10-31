# GapLens — Digital Dark Spot Detection Platform

> **"Don't Just Find Answers. Find What's Missing."**

GapLens is a complete, full-stack platform built for the hackathon problem statement:  
**"Digital Dark Spot – AI-Assisted Information Gap Detection Platform"**.

The repository consists of:
1. **Frontend**: Modern, responsive React + TypeScript + Vite + Tailwind CSS interface.
2. **Backend**: High-performance Python FastAPI service with live web source retrieval, official government source prioritization for scholarships, and multi-vector gap analysis.

---

## 🌟 Architecture Overview

```
GapLens/
├── backend/                         # Python FastAPI Microservice
│   ├── app/
│   │   ├── main.py                  # FastAPI application & CORS setup
│   │   ├── models.py                # Pydantic request/response schemas
│   │   ├── search.py                # Live web retriever & query expansion
│   │   ├── extractor.py             # Live HTML parser, date & metadata extractor
│   │   ├── analyzer.py              # Epistemic analysis: missing info, conflicts, outdated data
│   │   └── gov_scholarships.py      # Official Government portal registry (.gov.in, .nic.in, NSP)
│   ├── requirements.txt             # FastAPI, Uvicorn, HTTPX, BeautifulSoup4, Pydantic, etc.
│   ├── run.bat                      # 1-Click Windows Batch Launcher
│   └── README.md                    # Detailed backend docs
│
├── src/                             # React + TypeScript Frontend
│   ├── components/
│   │   ├── Header.tsx               # Brand navigation & pipeline status
│   │   ├── Hero.tsx                 # Search input, sample topics & "Reveal Information Gaps" CTA
│   │   ├── Features.tsx             # 4 Gap Vector deep-dive cards
│   │   ├── HowItWorks.tsx           # 4-stage pipeline walkthrough
│   │   ├── DarkSpotSection.tsx      # Digital Dark Spot conceptual comparison
│   │   ├── ArchitectureSection.tsx  # Engineering standards & zero-hallucination mandate
│   │   ├── QueryInspectionModal.tsx # Live API findings, verified sources, and raw JSON
│   │   └── Footer.tsx               # Attribution & technical specifications
│   ├── services/
│   │   └── api.ts                   # Backend communication client
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces
│   └── App.tsx                      # Master application orchestrator
│
├── package.json                     # Frontend scripts & dependencies
└── vite.config.ts                   # Vite configuration
```

---

## 🚀 How to Run the Platform (Windows)

To run the complete platform, start the **FastAPI Backend** and the **Vite Frontend**.

### Step 1: Start the Backend (Port 8001)

Open a terminal or command prompt in the `GapLens` root directory:

```powershell
cd backend
.\run.bat
```

*Or run directly with Python:*
```powershell
cd backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
```

- **API Root**: `http://127.0.0.1:8001/`
- **Health Check**: `http://127.0.0.1:8001/api/health`
- **Interactive Swagger Docs**: `http://127.0.0.1:8001/docs`
- **Analysis Endpoint**: `POST http://127.0.0.1:8001/api/analyze`

---

### Step 2: Start the Frontend (Port 5173)

Open a second terminal in the `GapLens` root directory:

```powershell
npm.cmd run dev
```
*(or `npm run dev`)*

Open your browser at:
👉 **`http://localhost:5173`**

---

## 🔍 Live Features Demonstrated

1. **Government Source Prioritization (Scholarships)**:
   - Try entering: `AICTE Pragati Scholarship for Girls eligibility deadline` or `National Scholarship Portal NSP post matric scheme`.
   - The backend targets verified official government portals (`scholarships.gov.in`, `aicte-india.org`, `myscheme.gov.in`, `education.gov.in`) and highlights them with **OFFICIAL GOV** badges.
2. **Missing Information Detection**:
   - Detects omitted criteria (family income limits, verification deadlines, Aadhaar DBT bank account mandates, sample sizes).
3. **Conflicting Claims Detection**:
   - Compares dates, deadlines, and financial amounts across differing sources and surfaces exact contradictory assertions.
4. **Outdated Information Detection**:
   - Flags superseded statutory benchmarks and references to past academic cycles (e.g. `2020-21`, `2022-23`).
5. **Real-World Evidence Tracking**:
   - Every source displays its genuine URL, domain, HTTP status code (200, 403, 408), publication date metadata when present, and an epistemic confidence score.
   - **Zero Hallucination Mandate**: No fake citations or synthetic AI results are ever fabricated.
