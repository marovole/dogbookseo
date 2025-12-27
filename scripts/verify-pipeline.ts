import * as fs from 'fs';
import * as path from 'path';

interface VerificationReport {
  status: 'pass' | 'warn' | 'fail';
  checks: {
    name: string;
    status: 'pass' | 'warn' | 'fail';
    message: string;
  }[];
  summary: {
    totalTopics: number;
    byRegion: Record<string, number>;
    byCategory: Record<string, number>;
    byLanguage: Record<string, number>;
  };
}

function getTopics(): Array<{
  slug: string;
  region: string;
  category: string;
  locale: Record<string, any>;
  publishedAt: string;
  expirationDate: string;
}> {
  const topicsDir = path.join(process.cwd(), 'src/content/topics');
  const topics: Array<any> = [];

  function walkDir(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.name.endsWith('.json')) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        topics.push(JSON.parse(content));
      }
    }
  }

  if (fs.existsSync(topicsDir)) {
    walkDir(topicsDir);
  }

  return topics;
}

function verifyPipeline(): VerificationReport {
  const checks: VerificationReport['checks'] = [];
  const topics = getTopics();

  // Check 1: Topics exist
  checks.push({
    name: 'Topic files exist',
    status: topics.length > 0 ? 'pass' : 'fail',
    message: `Found ${topics.length} topic files`,
  });

  if (topics.length === 0) {
    return {
      status: 'fail',
      checks,
      summary: {
        totalTopics: 0,
        byRegion: {},
        byCategory: {},
        byLanguage: {},
      },
    };
  }

  // Check 2: Minimum topics per region
  const byRegion: Record<string, number> = {};
  for (const topic of topics) {
    byRegion[topic.region] = (byRegion[topic.region] || 0) + 1;
  }

  const expectedRegions = ['global', 'india', 'taiwan_hk', 'latam'];
  let allRegionsPresent = true;
  for (const region of expectedRegions) {
    if (!byRegion[region] || byRegion[region] === 0) {
      allRegionsPresent = false;
    }
  }

  checks.push({
    name: 'All regions have content',
    status: allRegionsPresent ? 'pass' : 'warn',
    message: `Regions: ${Object.entries(byRegion)
      .map(([k, v]) => `${k}(${v})`)
      .join(', ')}`,
  });

  // Check 3: All topics have required fields
  let fieldsValid = true;
  for (const topic of topics) {
    if (
      !topic.slug ||
      !topic.region ||
      !topic.category ||
      !topic.locale ||
      !topic.expirationDate
    ) {
      fieldsValid = false;
      break;
    }
  }

  checks.push({
    name: 'All topics have required fields',
    status: fieldsValid ? 'pass' : 'fail',
    message: fieldsValid
      ? 'All topics valid'
      : 'Some topics missing required fields',
  });

  // Check 4: Check for duplicate slugs
  const slugs = topics.map((t) => t.slug);
  const uniqueSlugs = new Set(slugs);
  const hasDuplicates = slugs.length !== uniqueSlugs.size;

  checks.push({
    name: 'No duplicate slugs',
    status: !hasDuplicates ? 'pass' : 'warn',
    message: hasDuplicates ? `${slugs.length - uniqueSlugs.size} duplicates found` : 'All slugs unique',
  });

  // Check 5: Valid expiration dates
  let validDates = true;
  for (const topic of topics) {
    try {
      const date = new Date(topic.expirationDate);
      if (isNaN(date.getTime())) {
        validDates = false;
        break;
      }
    } catch {
      validDates = false;
      break;
    }
  }

  checks.push({
    name: 'All expiration dates valid',
    status: validDates ? 'pass' : 'fail',
    message: validDates ? 'All dates parseable' : 'Invalid date format found',
  });

  // Check 6: Language coverage
  const languages = new Set<string>();
  for (const topic of topics) {
    Object.keys(topic.locale).forEach((lang) => languages.add(lang));
  }

  const expectedLanguages = ['en', 'hi', 'zh-TW', 'pt', 'es'];
  let allLanguagesCovered = true;
  for (const lang of expectedLanguages) {
    if (!languages.has(lang)) {
      allLanguagesCovered = false;
    }
  }

  checks.push({
    name: 'All languages present',
    status: allLanguagesCovered ? 'pass' : 'warn',
    message: `Languages: ${Array.from(languages).join(', ')}`,
  });

  // Check 7: Processed.json exists and is valid
  const processedPath = path.join(process.cwd(), 'data', 'processed.json');
  let processedValid = false;
  try {
    if (fs.existsSync(processedPath)) {
      const content = fs.readFileSync(processedPath, 'utf-8');
      const data = JSON.parse(content);
      processedValid = Array.isArray(data.slugs) && typeof data.lastUpdated === 'string';
    }
  } catch {}

  checks.push({
    name: 'processed.json is valid',
    status: processedValid ? 'pass' : 'warn',
    message: processedValid ? 'Valid format' : 'Missing or invalid',
  });

  // Check 8: Published dates are reasonable
  const now = new Date();
  let reasonableDates = true;
  for (const topic of topics) {
    try {
      const pubDate = new Date(topic.publishedAt);
      // Published date should be recent (within last 30 days)
      const daysDiff = (now.getTime() - pubDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysDiff < -1 || daysDiff > 30) {
        reasonableDates = false;
      }
    } catch {
      reasonableDates = false;
    }
  }

  checks.push({
    name: 'Published dates are reasonable',
    status: reasonableDates ? 'pass' : 'warn',
    message: reasonableDates ? 'All dates recent' : 'Some dates are unusual',
  });

  // Category summary
  const byCategory: Record<string, number> = {};
  for (const topic of topics) {
    byCategory[topic.category] = (byCategory[topic.category] || 0) + 1;
  }

  // Language summary
  const byLanguage: Record<string, number> = {};
  for (const lang of languages) {
    const count = topics.filter((t) => t.locale[lang]).length;
    byLanguage[lang] = count;
  }

  // Determine overall status
  const failCount = checks.filter((c) => c.status === 'fail').length;
  const overallStatus: 'pass' | 'warn' | 'fail' =
    failCount > 0 ? 'fail' : checks.some((c) => c.status === 'warn') ? 'warn' : 'pass';

  return {
    status: overallStatus,
    checks,
    summary: {
      totalTopics: topics.length,
      byRegion,
      byCategory,
      byLanguage,
    },
  };
}

function formatReport(report: VerificationReport): void {
  const statusEmoji = {
    pass: '✅',
    warn: '⚠️',
    fail: '❌',
  };

  console.log('\n' + '═'.repeat(60));
  console.log('🔍 PIPELINE VERIFICATION REPORT');
  console.log('═'.repeat(60));

  // Overall status
  console.log(`\nOverall Status: ${statusEmoji[report.status]} ${report.status.toUpperCase()}`);

  // Checks
  console.log('\n📋 Verification Checks:');
  for (const check of report.checks) {
    console.log(`  ${statusEmoji[check.status]} ${check.name}`);
    console.log(`     ${check.message}`);
  }

  // Summary
  console.log('\n📊 Content Summary:');
  console.log(`  Total Topics: ${report.summary.totalTopics}`);

  console.log('\n  By Region:');
  for (const [region, count] of Object.entries(report.summary.byRegion)) {
    console.log(`    ${region}: ${count} topics`);
  }

  console.log('\n  By Category:');
  for (const [category, count] of Object.entries(report.summary.byCategory)) {
    console.log(`    ${category}: ${count} topics`);
  }

  console.log('\n  By Language:');
  for (const [lang, count] of Object.entries(report.summary.byLanguage)) {
    console.log(`    ${lang}: ${count} topics`);
  }

  console.log('\n' + '═'.repeat(60));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const report = verifyPipeline();
  formatReport(report);
  process.exit(report.status === 'fail' ? 1 : 0);
}
