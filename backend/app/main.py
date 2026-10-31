"""
GapLens Epistemic Gap Detection Backend.
FastAPI Application providing real-world information gap diagnostics.
"""

import time
import logging
import asyncio
from datetime import datetime, timezone
from typing import List

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from app.models import (
    AnalyzeRequest, 
    AnalyzeResponse, 
    SourceItem
)
from app.search import search_live_sources
from app.extractor import fetch_and_extract_source
from app.analyzer import run_epistemic_analysis
from app.gov_scholarships import is_scholarship_query

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("gaplens.main")

app = FastAPI(
    title="GapLens API",
    description="AI-Assisted Information Gap Detection Platform for the Digital Dark Spot Challenge",
    version="1.0.0"
)

# Configure CORS so existing Vite frontend can communicate with backend
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://localhost:4173",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "platform": "GapLens API",
        "status": "online",
        "theme": "Digital Dark Spot Detection Platform",
        "docs_url": "/docs"
    }

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "engine": "GapLens Epistemic Engine v1.0"
    }

@app.post("/api/analyze", response_model=AnalyzeResponse)
async def analyze_topic(payload: AnalyzeRequest):
    """
    Main GapLens Epistemic Analysis Endpoint:
    1. Accepts user research query and selected detection vectors.
    2. Searches live, authentic public web sources (prioritizing .gov/.nic.in for scholarships).
    3. Fetches live HTML, validates HTTP status, checks publication/update dates.
    4. Analyzes missing information, conflicting claims, outdated data, and evidence lineage.
    5. Returns transparent, structured JSON with real source references.
    """
    start_time = time.time()
    query = payload.query.strip()
    vectors = [v.lower() for v in payload.vectors]

    logger.info(f"Received analysis request: '{query}' with vectors: {vectors}")

    if not query:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Query string cannot be empty."
        )

    # 1. Retrieve real live web sources
    raw_sources = await search_live_sources(query, max_results=7)
    logger.info(f"Discovered {len(raw_sources)} candidate live sources for '{query}'")

    # 2. Extract genuine page content concurrently using asyncio.gather
    fetch_tasks = [fetch_and_extract_source(s, timeout_seconds=4.0) for s in raw_sources]
    extracted_sources = await asyncio.gather(*fetch_tasks)

    # Convert to Pydantic SourceItems
    sources_checked: List[SourceItem] = []
    for es in extracted_sources:
        sources_checked.append(SourceItem(
            title=es.get("title", es.get("domain", "")),
            url=es.get("url", ""),
            domain=es.get("domain", ""),
            is_official_gov=es.get("is_official_gov", False),
            publication_date=es.get("publication_date"),
            http_status=es.get("http_status", 0),
            verification_status=es.get("verification_status", "UNVERIFIED"),
            snippet=es.get("snippet")
        ))

    # 3. Perform Epistemic Gap Analysis across real extracted text
    missing_gaps, conflicts, outdated, evidence_audit = run_epistemic_analysis(
        query=query,
        extracted_sources=extracted_sources,
        vectors=vectors
    )

    execution_time_ms = round((time.time() - start_time) * 1000, 2)
    is_scholarship = is_scholarship_query(query)

    response = AnalyzeResponse(
        query=query,
        timestamp=datetime.now(timezone.utc).isoformat(),
        category="SCHOLARSHIP_WELFARE" if is_scholarship else "GENERAL_RESEARCH",
        detection_vectors_processed=vectors,
        sources_checked=sources_checked,
        missing_information=missing_gaps,
        conflicts=conflicts,
        outdated_information=outdated,
        evidence_audit=evidence_audit,
        execution_time_ms=execution_time_ms
    )

    logger.info(f"Completed analysis in {execution_time_ms}ms with {len(sources_checked)} sources, {len(missing_gaps)} missing gaps, {len(conflicts)} conflicts.")
    return response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
