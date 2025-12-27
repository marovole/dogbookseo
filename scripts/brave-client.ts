interface BraveSearchResult {
  title: string;
  url: string;
  description: string;
  publishedDate?: string;
}

interface BraveWebSearchResponse {
  web?: {
    results: {
      title: string;
      url: string;
      description: string;
      age?: string;
    }[];
  };
}

let usageCount = 0;
const MONTHLY_LIMIT = 2000;
const WARNING_THRESHOLD = 0.8;

export async function searchBrave(
  query: string,
  count: number = 5,
  lang: string = 'en'
): Promise<BraveSearchResult[]> {
  const apiKey = process.env.BRAVE_API_KEY;

  if (!apiKey) {
    throw new Error('BRAVE_API_KEY environment variable is not set');
  }

  if (usageCount >= MONTHLY_LIMIT) {
    throw new Error(`Brave API monthly limit reached (${MONTHLY_LIMIT})`);
  }

  const url = new URL('https://api.search.brave.com/res/v1/web/search');
  url.searchParams.set('q', query);
  url.searchParams.set('count', count.toString());
  url.searchParams.set('search_lang', lang);
  url.searchParams.set('freshness', 'pw'); // Past week

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

  if (usageCount / MONTHLY_LIMIT >= WARNING_THRESHOLD) {
    console.warn(
      `⚠️  Brave API usage warning: ${usageCount}/${MONTHLY_LIMIT} (${Math.round(
        (usageCount / MONTHLY_LIMIT) * 100
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

export async function searchWithRetry(
  query: string,
  count: number = 5,
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
        const delay = Math.pow(2, i) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

export function getUsageCount(): number {
  return usageCount;
}

export function resetUsageCount(): void {
  usageCount = 0;
}
