import { collect } from './collect';
import { generate } from './generate';
import { getUsageCount } from './brave-client';
import { type Region } from './regions';

interface PipelineResult {
  collected: Map<Region, number>;
  generated: number;
  skipped: number;
  braveApiUsage: number;
  duration: number;
}

export async function runPipeline(regions?: Region[]): Promise<PipelineResult> {
  const startTime = Date.now();
  
  console.log('═'.repeat(60));
  console.log('🚀 DOGBOOK SEO PIPELINE');
  console.log('═'.repeat(60));
  console.log(`📅 Date: ${new Date().toISOString()}`);
  console.log(`🌍 Regions: ${regions?.join(', ') || 'all'}`);
  console.log('═'.repeat(60));

  // Step 1: Collect topics from news
  console.log('\n📥 STEP 1: Collecting topics from news sources...\n');
  const collectionResults = await collect(regions);

  const collected = new Map<Region, number>();
  for (const [region, topics] of collectionResults) {
    collected.set(region, topics.length);
  }

  // Step 2: Generate content files
  console.log('\n📝 STEP 2: Generating content files...\n');
  const { generated, skipped } = await generate();

  const duration = Math.round((Date.now() - startTime) / 1000);
  const braveApiUsage = getUsageCount();

  // Summary
  console.log('\n' + '═'.repeat(60));
  console.log('📊 PIPELINE COMPLETE');
  console.log('═'.repeat(60));
  console.log('\n📥 Collection Results:');
  let totalCollected = 0;
  for (const [region, count] of collected) {
    console.log(`   ${region}: ${count} topics`);
    totalCollected += count;
  }
  console.log(`   Total: ${totalCollected} topics`);

  console.log('\n📝 Generation Results:');
  console.log(`   Generated: ${generated} new topics`);
  console.log(`   Skipped: ${skipped} duplicates`);

  console.log('\n📈 API Usage:');
  console.log(`   Brave API calls: ${braveApiUsage}`);
  console.log(`   Monthly limit: 2000`);
  console.log(`   Usage: ${((braveApiUsage / 2000) * 100).toFixed(1)}%`);

  console.log('\n⏱️  Duration:', duration, 'seconds');
  console.log('═'.repeat(60));

  return {
    collected,
    generated,
    skipped,
    braveApiUsage,
    duration,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runPipeline()
    .then((result) => {
      console.log('\n✅ Pipeline finished successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Pipeline failed:', error.message);
      process.exit(1);
    });
}
