import * as fs from 'fs';
import * as path from 'path';
import { searchWithRetry } from './brave-client';
import { generateTopicFromNews, generateTopicsForLatam } from './llm-client';
import { regions, type Region, type Category } from './regions';
import type { CollectedTopic, BraveSearchResult, CategoryConfig, GeneratedTopic } from './types';
import { API_THROTTLE_DELAY_MS, DEFAULT_SEARCH_COUNT } from './constants';

/**
 * Extract hostname from URL safely
 */
function extractHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return 'unknown';
  }
}

/**
 * Create a collected topic from LATAM generation result
 */
function createLatamTopic(
  latamTopics: { pt: GeneratedTopic; es: GeneratedTopic },
  region: Region,
  category: Category,
  sourceUrl: string
): CollectedTopic {
  return {
    slug: latamTopics.pt.slug,
    region,
    category,
    locale: {
      pt: {
        title: latamTopics.pt.title,
        question: latamTopics.pt.question,
        description: latamTopics.pt.description,
      },
      es: {
        title: latamTopics.es.title,
        question: latamTopics.es.question,
        description: latamTopics.es.description,
      },
    },
    options: latamTopics.pt.options,
    keywords: latamTopics.pt.keywords,
    expirationDate: latamTopics.pt.expirationDate,
    source: extractHostname(sourceUrl),
  };
}

/**
 * Create a collected topic from standard generation result
 */
function createStandardTopic(
  topic: GeneratedTopic,
  region: Region,
  category: Category,
  targetLang: string,
  sourceUrl: string
): CollectedTopic {
  return {
    slug: topic.slug,
    region,
    category,
    locale: {
      [targetLang]: {
        title: topic.title,
        question: topic.question,
        description: topic.description,
      },
    },
    options: topic.options,
    keywords: topic.keywords,
    expirationDate: topic.expirationDate,
    source: extractHostname(sourceUrl),
  };
}

/**
 * Process a single search query and generate topic
 */
async function processQuery(
  query: string,
  region: Region,
  categoryDef: CategoryConfig,
  searchLang: string,
  targetLang: string
): Promise<CollectedTopic | null> {
  console.log(`      🔍 Searching: "${query}"`);
  const results = await searchWithRetry(query, DEFAULT_SEARCH_COUNT, searchLang);

  if (results.length === 0) {
    console.log(`      ⚠️  No results found`);
    return null;
  }

  const firstSearchResult = results[0];
  console.log(`      📰 Found: "${firstSearchResult.title.substring(0, 50)}..."`);

  if (region === 'latam') {
    const latamTopics = await generateTopicsForLatam(
      firstSearchResult.title,
      firstSearchResult.description,
      categoryDef.category
    );

    if (latamTopics) {
      console.log(`      ✅ Generated topic: ${latamTopics.pt.slug}`);
      return createLatamTopic(latamTopics, region, categoryDef.category, firstSearchResult.url);
    }
  } else {
    const topic = await generateTopicFromNews(
      firstSearchResult.title,
      firstSearchResult.description,
      categoryDef.category,
      targetLang
    );

    if (topic) {
      console.log(`      ✅ Generated topic: ${topic.slug}`);
      return createStandardTopic(topic, region, categoryDef.category, targetLang, firstSearchResult.url);
    }
  }

  return null;
}

/**
 * Collect topics for a specific region
 */
async function collectForRegion(region: Region): Promise<CollectedTopic[]> {
  const config = regions[region];
  const topics: CollectedTopic[] = [];
  
  console.log(`\n📍 Collecting topics for region: ${region}`);
  console.log(`   Languages: ${config.languages.join(', ')}`);

  for (const categoryDef of config.categories) {
    console.log(`   📂 Category: ${categoryDef.name}`);
    
    for (const query of categoryDef.queries) {
      try {
        const topic = await processQuery(
          query,
          region,
          categoryDef,
          config.searchLang,
          config.languages[0]
        );
        
        if (topic) {
          topics.push(topic);
        }

        await new Promise((resolve) => setTimeout(resolve, API_THROTTLE_DELAY_MS));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`      ❌ Error processing query "${query}": ${errorMessage}`);
      }
    }
  }

  return topics;
}

/**
 * Save collected topics to CSV file
 */
async function saveToCSV(topics: CollectedTopic[], region: Region): Promise<string> {
  const date = new Date().toISOString().split('T')[0];
  const filename = `${region}_${date}.csv`;
  const filepath = path.join(process.cwd(), 'data', 'raw', filename);

  // Ensure directory exists
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const headers = ['slug', 'region', 'category', 'locale_json', 'options', 'keywords', 'expirationDate', 'source'];
  const rows = topics.map((topic) => [
    topic.slug,
    topic.region,
    topic.category,
    JSON.stringify(topic.locale),
    JSON.stringify(topic.options),
    JSON.stringify(topic.keywords),
    topic.expirationDate,
    topic.source,
  ]);

  const csv = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
  ].join('\n');

  fs.writeFileSync(filepath, csv, 'utf-8');
  console.log(`   💾 Saved to ${filename}`);

  return filepath;
}

export async function collect(targetRegions?: Region[]): Promise<Map<Region, CollectedTopic[]>> {
  const regionsToCollect = targetRegions || (Object.keys(regions) as Region[]);
  const results = new Map<Region, CollectedTopic[]>();

  console.log('🚀 Starting topic collection');
  console.log(`   Regions: ${regionsToCollect.join(', ')}`);

  for (const region of regionsToCollect) {
    try {
      const topics = await collectForRegion(region);
      results.set(region, topics);
      
      if (topics.length > 0) {
        await saveToCSV(topics, region);
      }
      
      console.log(`   📊 ${region}: ${topics.length} topics collected`);
    } catch (error) {
      console.error(`   ❌ Failed to collect for ${region}: ${(error as Error).message}`);
      results.set(region, []);
    }
  }

  return results;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  collect().then((results) => {
    console.log('\n📈 Collection Summary:');
    let total = 0;
    for (const [region, topics] of results) {
      console.log(`   ${region}: ${topics.length} topics`);
      total += topics.length;
    }
    console.log(`   Total: ${total} topics`);
  });
}
