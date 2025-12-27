import * as fs from 'fs';
import * as path from 'path';
import { type Region, type Category } from './types';
import { isValidRegion, isValidCategory, type TopicData } from './types';

/** Tracking data for processed topics */
interface ProcessedData {
  slugs: string[];
  lastUpdated: string | null;
}

/** Load processed data from disk */
function loadProcessedData(): ProcessedData {
  const filepath = path.join(process.cwd(), 'data', 'processed.json');
  
  if (!fs.existsSync(filepath)) {
    return { slugs: [], lastUpdated: null };
  }

  const content = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(content);
}

/** Save processed data to disk */
function saveProcessedData(data: ProcessedData): void {
  const filepath = path.join(process.cwd(), 'data', 'processed.json');
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
}

/** Check if a slug has already been processed */
function isDuplicate(slug: string, processed: ProcessedData): boolean {
  return processed.slugs.includes(slug);
}

/**
 * Parse CSV content into array of row objects
 * Handles quoted fields with embedded commas and escaped quotes
 */
function parseCSV(content: string): Record<string, string>[] {
  const lines = content.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map((h) => h.trim());
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;

    for (const char of lines[i]) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.replace(/""/g, '"'));
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.replace(/""/g, '"'));

    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    rows.push(row);
  }

  return rows;
}

/** Get content directory path for a region/category combination */
function getContentPath(region: Region, category: Category): string {
  return path.join(process.cwd(), 'src', 'content', 'topics', region, category);
}

/**
 * Validate and parse a CSV row into TopicData
 * @returns TopicData if valid, null if validation fails
 */
function parseAndValidateRow(row: Record<string, string>): TopicData | null {
  const { slug, region, category, locale_json, options, keywords, expirationDate, source } = row;

  if (!slug) {
    console.log(`      ⚠️  Skipping row with no slug`);
    return null;
  }

  if (!isValidRegion(region)) {
    console.log(`      ⚠️  Invalid region "${region}" for slug: ${slug}`);
    return null;
  }

  if (!isValidCategory(category)) {
    console.log(`      ⚠️  Invalid category "${category}" for slug: ${slug}`);
    return null;
  }

  try {
    return {
      slug,
      region,
      category,
      locale: JSON.parse(locale_json),
      options: JSON.parse(options),
      keywords: JSON.parse(keywords),
      status: 'active',
      publishedAt: new Date().toISOString().split('T')[0],
      expirationDate,
      source,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log(`      ⚠️  Failed to parse JSON fields for slug "${slug}": ${errorMessage}`);
    return null;
  }
}

/**
 * Generate content files from CSV data
 */
async function generateFromCSV(processed: ProcessedData): Promise<{ generated: number; skipped: number }> {
  const rawDir = path.join(process.cwd(), 'data', 'raw');
  let generated = 0;
  let skipped = 0;

  if (!fs.existsSync(rawDir)) {
    console.log('   ⚠️  No raw data directory found');
    return { generated, skipped };
  }

  const csvFiles = fs.readdirSync(rawDir).filter((f) => f.endsWith('.csv'));
  console.log(`   📁 Found ${csvFiles.length} CSV files`);

  for (const csvFile of csvFiles) {
    console.log(`\n   📄 Processing CSV: ${csvFile}`);
    const content = fs.readFileSync(path.join(rawDir, csvFile), 'utf-8');
    const rows = parseCSV(content);
    console.log(`      Found ${rows.length} rows`);

    for (const row of rows) {
      const topicData = parseAndValidateRow(row);
      
      if (!topicData) {
        continue;
      }

      if (isDuplicate(topicData.slug, processed)) {
        console.log(`      ⏭️  Skipping duplicate: ${topicData.slug}`);
        skipped++;
        continue;
      }

      try {
        const contentDir = getContentPath(topicData.region, topicData.category);
        if (!fs.existsSync(contentDir)) {
          fs.mkdirSync(contentDir, { recursive: true });
        }

        const filepath = path.join(contentDir, `${topicData.slug}.json`);
        fs.writeFileSync(filepath, JSON.stringify(topicData, null, 2), 'utf-8');

        processed.slugs.push(topicData.slug);
        generated++;
        console.log(`      ✅ Generated: ${topicData.slug}`);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`      ❌ Error writing ${topicData.slug}: ${errorMessage}`);
      }
    }
  }

  return { generated, skipped };
}

/**
 * Main generation function - processes CSV files and generates content
 */
export async function generate(): Promise<{ generated: number; skipped: number }> {
  console.log('🔄 Starting topic generation from data sources');

  const processed = loadProcessedData();
  
  // Generate from CSV files (new data from pipeline)
  const { generated: csvGenerated, skipped: csvSkipped } = await generateFromCSV(processed);

  processed.lastUpdated = new Date().toISOString();
  saveProcessedData(processed);

  console.log(`\n📊 Generation Summary:`);
  console.log(`   Generated: ${csvGenerated}`);
  console.log(`   Skipped (duplicates): ${csvSkipped}`);

  return { generated: csvGenerated, skipped: csvSkipped };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generate();
}
