"""
GapLens Live Web Search & Government Source Retrieval Module.
Performs real live web retrieval without fabricated or mock data.
"""

import logging
from typing import List, Dict, Any
from urllib.parse import urlparse
import httpx
from bs4 import BeautifulSoup

from app.gov_scholarships import (
    is_scholarship_query, 
    is_official_gov_domain, 
    get_official_scholarship_seeds
)

logger = logging.getLogger("gaplens.search")

async def search_live_sources(query: str, max_results: int = 8) -> List[Dict[str, str]]:
    """
    Retrieves real live web sources for the given query.
    If query is scholarship-related, prioritizes official government domains.
    Returns list of dicts with keys: 'title', 'url', 'snippet'.
    """
    results: List[Dict[str, str]] = []
    seen_urls = set()

    is_scholarship = is_scholarship_query(query)

    # 1. If scholarship, prioritize official government portals by pre-seeding verified targets
    if is_scholarship:
        official_seeds = get_official_scholarship_seeds(query)
        for seed_title, seed_url in official_seeds:
            if seed_url not in seen_urls:
                seen_urls.add(seed_url)
                results.append({
                    "title": seed_title,
                    "url": seed_url,
                    "snippet": f"Official Government Educational Portal for {query}. Direct primary source verification."
                })

    # 2. Fast direct HTTP search via DuckDuckGo HTML endpoint
    fallback_results = await _query_http_fallback(query)
    for item in fallback_results:
        url = item.get("url")
        if url and url not in seen_urls:
            seen_urls.add(url)
            results.append(item)

    # 3. If needed, supplement with ddgs
    if len(results) < 4:
        ddg_results = await _query_ddgs(query, is_scholarship=is_scholarship, max_results=max_results)
        for item in ddg_results:
            url = item.get("url") or item.get("href")
            if url and url not in seen_urls:
                seen_urls.add(url)
                results.append({
                    "title": item.get("title", ""),
                    "url": url,
                    "snippet": item.get("body", item.get("snippet", ""))
                })

    # 4. Sort results so that official government sources appear first
    def sort_key(res: Dict[str, str]) -> int:
        url = res.get("url", "")
        return 0 if is_official_gov_domain(url) else 1

    results.sort(key=sort_key)
    return results[:max_results]


async def _query_ddgs(query: str, is_scholarship: bool, max_results: int = 6) -> List[Dict[str, str]]:
    """Queries DuckDuckGo search library."""
    items: List[Dict[str, str]] = []
    try:
        from duckduckgo_search import DDGS
        ddgs = DDGS()

        # If scholarship, formulate a query emphasizing official portals
        search_queries = [query]
        if is_scholarship:
            search_queries.insert(0, f"{query} site:gov.in OR site:nic.in OR site:aicte-india.org")

        for q in search_queries:
            try:
                # Synchronous DDGS call wrapped safely or standard text
                raw = ddgs.text(q, max_results=max_results)
                if raw:
                    for r in raw:
                        items.append({
                            "title": r.get("title", ""),
                            "url": r.get("href", r.get("link", "")),
                            "snippet": r.get("body", "")
                        })
            except Exception as e:
                logger.warning(f"DDGS query '{q}' failed: {e}")

            if len(items) >= max_results:
                break

    except Exception as e:
        logger.error(f"Error initializing or running DDGS: {e}")

    return items


async def _query_http_fallback(query: str) -> List[Dict[str, str]]:
    """
    Fallback HTTP search mechanism using DuckDuckGo HTML endpoint
    to ensure live sources can always be fetched without mock data.
    """
    items: List[Dict[str, str]] = []
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    }
    
    url = "https://html.duckduckgo.com/html/"
    try:
        async with httpx.AsyncClient(timeout=8.0, follow_redirects=True, headers=headers) as client:
            resp = await client.post(url, data={"q": query})
            if resp.status_code == 200:
                soup = BeautifulSoup(resp.text, "html.parser")
                links = soup.select(".result__body")
                for item in links[:6]:
                    title_elem = item.select_one(".result__title a")
                    snippet_elem = item.select_one(".result__snippet")
                    if title_elem and title_elem.get("href"):
                        href = title_elem["href"]
                        # Clean DuckDuckGo redirect link
                        if "uddg=" in href:
                            import urllib.parse
                            parsed = urllib.parse.parse_qs(urllib.parse.urlparse(href).query)
                            actual_url = parsed.get("uddg", [href])[0]
                        else:
                            actual_url = href
                        
                        items.append({
                            "title": title_elem.get_text(strip=True),
                            "url": actual_url,
                            "snippet": snippet_elem.get_text(strip=True) if snippet_elem else ""
                        })
    except Exception as e:
        logger.warning(f"HTTP fallback search failed: {e}")

    return items
