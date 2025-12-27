import * as fs from 'fs';
import * as path from 'path';
import { searchWithRetry } from './brave-client';
import { generateTopicFromNews, generateTopicsForLatam, type GeneratedTopic } from './llm-client';
import { regions, type Region, type Category } from './regions';

interface CollectedTopic {
  slug: string;
  region: Region;
  category: Category;
  locale: Record<string, {
    title: string;
    question: string;
    description: string;
  }>;
  options: [string, string];
  keywords: string[];
  expirationDate: string;
  source: string;
}

async function collectForRegion(region: Region): Promise<CollectedTopic[]> {
  const config = regions[region];
  const topics: CollectedTopic[] = [];
  
  console.log(`\n📍 Collecting topics for region: ${region}`);
  console.log(`   Languages: ${config.languages.join(', ')}`);

  for (const categoryConfig of config.categories) {
    console.log(`   📂 Category: ${categoryConfig.name}`);
    
    for (const query of categoryConfig.queries) {
      try {
        console.log(`      🔍 Searching: "${query}"`);
        const results = await searchWithRetry(query, 3, config.searchLang);
        
        if (results.length === 0) {
          console.log(`      ⚠️  No results found`);
          continue;
        }

        const topResult = results[0];
        console.log(`      📰 Found: "${topResult.title.substring(0, 50)}..."`);

        if (region === 'latam') {
          const latamTopics = await generateTopicsForLatam(
            topResult.title,
            topResult.description,
            categoryConfig.category
          );

          if (latamTopics) {
            topics.push({
              slug: latamTopics.pt.slug,
              region,
              category: categoryConfig.category,
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
              source: new URL(topResult.url).hostname,
            });
            console.log(`      ✅ Generated topic: ${latamTopics.pt.slug}`);
          }
        } else {
          const targetLang = config.languages[0];
          const topic = await generateTopicFromNews(
            topResult.title,
            topResult.description,
            categoryConfig.category,
            targetLang
          );

          if (topic) {
            topics.push({
              slug: topic.slug,
              region,
              category: categoryConfig.category,
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
              source: new URL(topResult.url).hostname,
            });
            console.log(`      ✅ Generated topic: ${topic.slug}`);
          }
        }

        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`      ❌ Error: ${(error as Error).message}`);
      }
    }
  }

  return topics;
}

async function saveToCSV(topics: CollectedTopic[], region: Region): Promise<string> {
  const date = new Date().toISOString().split('T')[0];
  const filename = `${region}_${date}.csv`;
  const filepath = path.join(process.cwd(), 'data', 'raw', filename);

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
