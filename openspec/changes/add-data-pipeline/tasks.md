# Tasks: add-data-pipeline

## 1. Environment Setup
- [x] 1.1 Create `.env.example` with required environment variables
- [x] 1.2 Add `tsx` as dev dependency for running TypeScript scripts (already installed)
- [x] 1.3 Create `data/raw/` and `data/` directories
- [x] 1.4 Initialize `data/processed.json` with empty structure

## 2. Brave Search API Client
- [x] 2.1 Create `scripts/brave-client.ts`
- [x] 2.2 Implement search function with rate limiting
- [x] 2.3 Handle API errors and retries (exponential backoff)
- [x] 2.4 Return structured search results
- [x] 2.5 Add usage tracking for free tier monitoring (warning at 80%)

## 3. Region Configuration
- [x] 3.1 Create `scripts/regions.ts`
- [x] 3.2 Define search queries for `global` region (en)
- [x] 3.3 Define search queries for `india` region (hi)
- [x] 3.4 Define search queries for `taiwan_hk` region (zh-TW)
- [x] 3.5 Define search queries for `latam` region (pt + es)
- [x] 3.6 Include category assignments for each query set

## 4. Chutes LLM API Client
- [x] 4.1 Create `scripts/llm-client.ts`
- [x] 4.2 Implement chat completion function with JSON mode
- [x] 4.3 Design prompt for generating prediction topics
- [x] 4.4 Include multi-language output support (latam dual-language)
- [x] 4.5 Parse LLM response into structured topic data

## 5. Collection Script
- [x] 5.1 Create `scripts/collect.ts`
- [x] 5.2 Implement per-region collection logic
- [x] 5.3 Call Brave Search API for each query
- [x] 5.4 Process results with LLM to generate topics
- [x] 5.5 Output raw CSV files to `data/raw/[region]_[date].csv`

## 6. Generation Script
- [x] 6.1 Create `scripts/generate.ts`
- [x] 6.2 Read raw CSV files from `data/raw/`
- [x] 6.3 Transform to JSON format matching Content Schema
- [x] 6.4 Check against `data/processed.json` for duplicates
- [x] 6.5 Write topic files to `src/content/topics/[region]/[category]/`
- [x] 6.6 Update `data/processed.json` with new slugs

## 7. Deduplication System
- [x] 7.1 Define `processed.json` structure with slugs array
- [x] 7.2 Implement slug-based deduplication check
- [x] 7.3 Add timestamp tracking for each run

## 8. Pipeline Script
- [x] 8.1 Create `scripts/pipeline.ts` as main entry point
- [x] 8.2 Orchestrate: collect → generate flow
- [x] 8.3 Add logging and progress output
- [x] 8.4 Handle errors gracefully with partial success
- [x] 8.5 Output summary of generated topics

## 9. NPM Scripts
- [x] 9.1 Add `"collect": "tsx scripts/collect.ts"` to package.json (already configured)
- [x] 9.2 Add `"generate": "tsx scripts/generate.ts"` to package.json (already configured)
- [x] 9.3 Add `"pipeline": "tsx scripts/pipeline.ts"` to package.json (already configured)

## 10. Verification
- [x] 10.1 TypeScript compilation passes for all scripts
- [x] 10.2 Astro build succeeds with pipeline scripts in place
- [ ] 10.3 Run full pipeline with API keys (requires user to set env vars)
- [ ] 10.4 Verify generated content matches Schema
- [ ] 10.5 Test deduplication by running pipeline twice
