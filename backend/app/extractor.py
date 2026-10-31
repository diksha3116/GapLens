"""
GapLens Real Live Source Extractor.
Fetches genuine live content, HTTP status codes, publication dates, and domain verification.
"""

import logging
import re
from typing import Dict, Any, Optional
from urllib.parse import urlparse
import httpx
from bs4 import BeautifulSoup
from dateutil import parser as date_parser

from app.gov_scholarships import is_official_gov_domain
from app.models import SourceItem

logger = logging.getLogger("gaplens.extractor")

DEFAULT_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}

async def fetch_and_extract_source(source_info: Dict[str, str], timeout_seconds: float = 6.0) -> Dict[str, Any]:
    """
    Connects to the real URL via HTTP, reads HTTP status, publication date metadata,
    and extracts textual body content.
    """
    url = source_info.get("url", "")
    title = source_info.get("title", "")
    fallback_snippet = source_info.get("snippet", "")

    parsed_url = urlparse(url)
    domain = parsed_url.netloc or parsed_url.path.split("/")[0]
    is_gov = is_official_gov_domain(domain)

    # Classify verification status
    if is_gov:
        verification_status = "VERIFIED_OFFICIAL"
    elif any(domain.endswith(suffix) for suffix in [".edu", ".org", ".ac.in", ".res.in"]):
        verification_status = "VERIFIED_PUBLIC"
    else:
        verification_status = "UNVERIFIED_THIRD_PARTY"

    result_payload: Dict[str, Any] = {
        "title": title or domain,
        "url": url,
        "domain": domain,
        "is_official_gov": is_gov,
        "publication_date": None,
        "http_status": 0,
        "verification_status": verification_status,
        "snippet": fallback_snippet,
        "extracted_text": "",
        "dates_found_in_text": [],
        "amounts_found": [],
    }

    if not url.startswith("http://") and not url.startswith("https://"):
        result_payload["verification_status"] = "UNVERIFIED_INVALID_URL"
        result_payload["http_status"] = 400
        return result_payload

    try:
        async with httpx.AsyncClient(
            headers=DEFAULT_HEADERS, 
            timeout=timeout_seconds, 
            follow_redirects=True, 
            verify=False  # Many government portals use internal/state CAs
        ) as client:
            resp = await client.get(url)
            result_payload["http_status"] = resp.status_code

            # Extract Last-Modified HTTP header if present
            if "last-modified" in resp.headers:
                try:
                    parsed_dt = date_parser.parse(resp.headers["last-modified"])
                    result_payload["publication_date"] = parsed_dt.strftime("%Y-%m-%d")
                except Exception:
                    pass

            if resp.status_code == 200 and resp.text:
                soup = BeautifulSoup(resp.text, "html.parser")

                # If original title was empty, grab <title> tag
                page_title = soup.title.string.strip() if soup.title and soup.title.string else ""
                if page_title:
                    result_payload["title"] = page_title

                # Extract HTML meta publication dates
                pub_date = _extract_meta_date(soup)
                if pub_date:
                    result_payload["publication_date"] = pub_date

                # Remove non-content elements
                for tag in soup(["script", "style", "noscript", "svg", "nav", "footer", "iframe"]):
                    tag.decompose()

                # Extract readable text
                body = soup.find("body") or soup
                text = " ".join(body.stripped_strings)
                result_payload["extracted_text"] = text[:6000]  # First 6000 chars for analysis

                # If snippet was empty, synthesize snippet from real text
                if not result_payload["snippet"] and text:
                    result_payload["snippet"] = text[:250] + "..."

                # Extract dates and currency figures for discrepancy analysis
                result_payload["dates_found_in_text"] = _find_dates_in_text(text)
                result_payload["amounts_found"] = _find_amounts_in_text(text)

            elif resp.status_code in [401, 403, 404, 500, 502, 503]:
                result_payload["http_status"] = resp.status_code
                result_payload["verification_status"] = "UNREACHABLE_HTTP_ERROR"
                logger.warning(f"HTTP {resp.status_code} received for URL: {url}")
    except httpx.TimeoutException:
        logger.warning(f"Connection timed out for URL: {url}")
        result_payload["http_status"] = 408
        result_payload["verification_status"] = "UNREACHABLE_TIMED_OUT"
    except Exception as e:
        logger.warning(f"Failed to fetch content from {url}: {e}")
        result_payload["http_status"] = 599
        result_payload["verification_status"] = "UNREACHABLE_CONNECTION_ERROR"

    return result_payload


def _extract_meta_date(soup: BeautifulSoup) -> Optional[str]:
    """Finds publication or update date from HTML meta tags."""
    date_meta_names = [
        "article:published_time", "article:modified_time", 
        "og:updated_time", "publication_date", "date", 
        "dc.date", "last-modified", "revision_date"
    ]
    for meta_name in date_meta_names:
        tag = soup.find("meta", attrs={"property": meta_name}) or soup.find("meta", attrs={"name": meta_name})
        if tag and tag.get("content"):
            try:
                dt = date_parser.parse(tag["content"])
                return dt.strftime("%Y-%m-%d")
            except Exception:
                continue

    # Try <time> tag
    time_tag = soup.find("time")
    if time_tag and time_tag.get("datetime"):
        try:
            dt = date_parser.parse(time_tag["datetime"])
            return dt.strftime("%Y-%m-%d")
        except Exception:
            pass

    return None


def _find_dates_in_text(text: str) -> list:
    """Finds date patterns, academic years (e.g. 2022-23, 2024-25), and deadlines."""
    patterns = [
        r'\b20[12]\d[-–/][12]\d\b',             # Academic years e.g. 2023-24, 2022-23
        r'\b(?:3[01]|[12][0-9]|0?[1-9])[\s./-](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[\s./-]20[12]\d\b', # e.g. 31 October 2024
        r'\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+(?:3[01]|[12][0-9]|0?[1-9]),?\s+20[12]\d\b',
    ]
    found = []
    for pat in patterns:
        matches = re.findall(pat, text, flags=re.IGNORECASE)
        for m in matches:
            if m not in found:
                found.append(m)
    return found[:8]


def _find_amounts_in_text(text: str) -> list:
    """Finds stated financial grants, stipend sums, or income limits."""
    patterns = [
        r'(?:Rs\.?|INR|₹)\s*[0-9,]+(?:\s*(?:Lakh|Crore|per annum|per month|p\.a\.))?',
        r'\b[0-9]+(?:\.[0-9]+)?\s*Lakh(?:s)?\s*(?:per annum|p\.a\.)?',
        r'\$\s*[0-9,]+(?:\s*(?:k|million|per year))?',
    ]
    found = []
    for pat in patterns:
        matches = re.findall(pat, text, flags=re.IGNORECASE)
        for m in matches:
            if m not in found:
                found.append(m)
    return found[:6]
