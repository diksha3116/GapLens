import { AnalyzeApiResponse, GapVector } from '../types';

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://127.0.0.1:8001';

export async function analyzeTopicApi(
  query: string,
  vectors: GapVector[] = ['missing', 'conflict', 'outdated', 'evidence'],
  focus: string = 'auto'
): Promise<AnalyzeApiResponse> {
  const url = `${API_BASE_URL}/api/analyze`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: query.trim(),
        vectors: vectors.length > 0 ? vectors : ['missing', 'conflict', 'outdated', 'evidence'],
        focus: focus || 'auto',
      }),
    });

    if (!response.ok) {
      let errorMessage = `API Error ${response.status}: ${response.statusText}`;
      try {
        const errorJson = await response.json();
        if (errorJson.detail) {
          errorMessage = typeof errorJson.detail === 'string' 
            ? errorJson.detail 
            : JSON.stringify(errorJson.detail);
        }
      } catch {
        const errorText = await response.text().catch(() => '');
        if (errorText) errorMessage += ` - ${errorText}`;
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(
        `Cannot connect to GapLens backend at ${url}. Please ensure the FastAPI server is running on http://127.0.0.1:8001.`
      );
    }
    throw error;
  }
}
