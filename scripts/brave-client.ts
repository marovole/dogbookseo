import type { BraveSearchResult } from './types';
import {
  BRAVE_API_MONTHLY_LIMIT,
  BRAVE_API_WARNING_THRESHOLD,
  BRAVE_SEARCH_FRESHNESS,
  DEFAULT_SEARCH_COUNT,
  RETRY_BASE_DELAY_MS,
} from './constants';

interface BraveApiWebResult {
  title: string;
  url: string;
  description: string;
  age?: string;
}

interface BraveWebSearchResponse {
  web?: {
    results: BraveApiWebResult[];
  };
}

let usageCount = 0;

/**
 * Search the web using Brave Search API
 * @param query - Search query string
 * @param count - Number of results to return
 * @param lang - Language code for search results
 * @returns Array of search results
 * @throws Error if API key is not set or monthly limit is reached
 */
export async function searchBrave(
  query: string,
  count: number = DEFAULT_SEARCH_COUNT,
  lang: string = 'en'
): Promise<BraveSearchResult[]> {
  const apiKey = process.env.BRAVE_API_KEY;

  if (!apiKey) {
    throw new Error('BRAVE_API_KEY environment variable is not set');
  }

  if (usageCount >= BRAVE_API_MONTHLY_LIMIT) {
    throw new Error(`Brave API monthly limit reached (${BRAVE_API_MONTHLY_LIMIT})`);
  }

  const url = new URL('https://api.search.brave.com/res/v1/web/search');
  url.searchParams.set('q', query);
  url.searchParams.set('count', count.toString());
  url.searchParams.set('search_lang', lang);
  url.searchParams.set('freshness', BRAVE_SEARCH_FRESHNESS);

  const response = await fetch(url.toString(), {
    headers: {
      Accept: 'application/json',
      'X-Subscription-Token': apiKey,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Brave API error: ${response.status} - ${errorText}`);
  }

  usageCount++;

  const usagePercentage = usageCount / BRAVE_API_MONTHLY_LIMIT;
  if (usagePercentage >= BRAVE_API_WARNING_THRESHOLD) {
    console.warn(
      `⚠️  Brave API usage warning: ${usageCount}/${BRAVE_API_MONTHLY_LIMIT} (${Math.round(
        usagePercentage * 100
      )}%)`
    );
  }

  const data: BraveWebSearchResponse = await response.json();

  if (!data.web?.results) {
    return [];
  }

  return data.web.results.map((result) => ({
    title: result.title,
    url: result.url,
    description: result.description,
    publishedDate: result.age,
  }));
}

/**
 * Search with automatic retry on failure using exponential backoff
 * @param query - Search query string
 * @param count - Number of results to return
 * @param lang - Language code for search results
 * @param retries - Maximum number of retry attempts
 * @returns Array of search results
 */
export async function searchWithRetry(
  query: string,
  count: number = DEFAULT_SEARCH_COUNT,
  lang: string = 'en',
  retries: number = 3
): Promise<BraveSearchResult[]> {
  let lastError: Error | null = null;

  for (let i = 0; i < retries; i++) {
    try {
      return await searchBrave(query, count, lang);
    } catch (error) {
      lastError = error as Error;
      console.warn(`Search attempt ${i + 1} failed: ${lastError.message}`);
      
      if (i < retries - 1) {
        const delay = Math.pow(2, i) * RETRY_BASE_DELAY_MS;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

/** Get current API usage count for this session */
export function getUsageCount(): number {
  return usageCount;
}

/** Reset API usage count (for testing purposes) */
export function resetUsageCount(): void {
  usageCount = 0;
}

/** Get the monthly API limit */
export function getMonthlyLimit(): number {
  return BRAVE_API_MONTHLY_LIMIT;
}
