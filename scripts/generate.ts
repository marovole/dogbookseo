import * as fs from 'fs';
import * as path from 'path';
import { type Region, type Category } from './regions';

interface ProcessedData {
  slugs: string[];
  lastUpdated: string | null;
}

interface TopicData {
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
  status: 'active' | 'closed';
  publishedAt: string;
  expirationDate: string;
  source: string;
}

function loadProcessedData(): ProcessedData {
  const filepath = path.join(process.cwd(), 'data', 'processed.json');
  
  if (!fs.existsSync(filepath)) {
    return { slugs: [], lastUpdated: null };
  }

  const content = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(content);
}

function saveProcessedData(data: ProcessedData): void {
  const filepath = path.join(process.cwd(), 'data', 'processed.json');
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
}

function isDuplicate(slug: string, processed: ProcessedData): boolean {
  return processed.slugs.includes(slug);
}

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

function getContentPath(region: Region, category: Category): string {
  return path.join(process.cwd(), 'src', 'content', 'topics', region, category);
}

export async function generate(): Promise<{ generated: number; skipped: number }> {
  console.log('🔄 Starting topic generation from CSV files');

  const rawDir = path.join(process.cwd(), 'data', 'raw');
  const processed = loadProcessedData();
  
  let generated = 0;
  let skipped = 0;

  if (!fs.existsSync(rawDir)) {
    console.log('   ⚠️  No raw data directory found');
    return { generated, skipped };
  }

  const csvFiles = fs.readdirSync(rawDir).filter((f) => f.endsWith('.csv'));
  console.log(`   📁 Found ${csvFiles.length} CSV files`);

  for (const csvFile of csvFiles) {
    console.log(`\n   📄 Processing: ${csvFile}`);
    const content = fs.readFileSync(path.join(rawDir, csvFile), 'utf-8');
    const rows = parseCSV(content);
    console.log(`      Found ${rows.length} rows in CSV`);

    for (const row of rows) {
      const slug = row.slug;

      if (!slug) {
        console.log(`      ⚠️  Skipping row with no slug`);
        continue;
      }

      if (isDuplicate(slug, processed)) {
        console.log(`      ⏭️  Skipping duplicate: ${slug}`);
        skipped++;
        continue;
      }

      try {
        const region = row.region as Region;
        const category = row.category as Category;
        const locale = JSON.parse(row.locale_json);
        const options = JSON.parse(row.options);
        const keywords = JSON.parse(row.keywords);

        const topicData: TopicData = {
          slug,
          region,
          category,
          locale,
          options,
          keywords,
          status: 'active',
          publishedAt: new Date().toISOString().split('T')[0],
          expirationDate: row.expirationDate,
          source: row.source,
        };

        const contentDir = getContentPath(region, category);
        if (!fs.existsSync(contentDir)) {
          fs.mkdirSync(contentDir, { recursive: true });
        }

        const filepath = path.join(contentDir, `${slug}.json`);
        fs.writeFileSync(filepath, JSON.stringify(topicData, null, 2), 'utf-8');

        processed.slugs.push(slug);
        generated++;
        console.log(`      ✅ Generated: ${slug}`);
      } catch (error) {
        console.error(`      ❌ Error processing ${slug}: ${(error as Error).message}`);
      }
    }
  }

  processed.lastUpdated = new Date().toISOString();
  saveProcessedData(processed);

  console.log(`\n📊 Generation Summary:`);
  console.log(`   Generated: ${generated}`);
  console.log(`   Skipped (duplicates): ${skipped}`);

  return { generated, skipped };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generate();
}
