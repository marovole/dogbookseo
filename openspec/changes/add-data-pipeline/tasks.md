# Tasks: add-data-pipeline

## 1. Environment Setup
- [ ] 1.1 Create `.env.example` with required environment variables
- [ ] 1.2 Add `tsx` as dev dependency for running TypeScript scripts
- [ ] 1.3 Create `data/raw/` and `data/` directories
- [ ] 1.4 Initialize `data/processed.json` with empty structure

## 2. Brave Search API Client
- [ ] 2.1 Create `scripts/brave-client.ts`
- [ ] 2.2 Implement search function with rate limiting
- [ ] 2.3 Handle API errors and retries
- [ ] 2.4 Return structured search results
- [ ] 2.5 Add usage tracking for free tier monitoring

## 3. Region Configuration
- [ ] 3.1 Create `scripts/regions.ts`
- [ ] 3.2 Define search queries for `global` region (en)
- [ ] 3.3 Define search queries for `india` region (hi)
- [ ] 3.4 Define search queries for `taiwan_hk` region (zh-TW)
- [ ] 3.5 Define search queries for `latam` region (pt + es)
- [ ] 3.6 Include category assignments for each query set

## 4. Chutes LLM API Client
- [ ] 4.1 Create `scripts/llm-client.ts`
- [ ] 4.2 Implement chat completion function
- [ ] 4.3 Design prompt for generating prediction topics
- [ ] 4.4 Include multi-language output support
- [ ] 4.5 Parse LLM response into structured topic data

## 5. Collection Script
- [ ] 5.1 Create `scripts/collect.ts`
- [ ] 5.2 Implement per-region collection logic
- [ ] 5.3 Call Brave Search API for each query
- [ ] 5.4 Process results with LLM to generate topics
- [ ] 5.5 Output raw CSV files to `data/raw/[region]_[date].csv`

## 6. Generation Script
- [ ] 6.1 Create `scripts/generate.ts`
- [ ] 6.2 Read raw CSV files from `data/raw/`
- [ ] 6.3 Transform to MDX/JSON format matching Content Schema
- [ ] 6.4 Check against `data/processed.json` for duplicates
- [ ] 6.5 Write topic files to `src/content/topics/[region]/[category]/`
- [ ] 6.6 Update `data/processed.json` with new slugs

## 7. Deduplication System
- [ ] 7.1 Define `processed.json` structure with slugs array
- [ ] 7.2 Implement slug-based deduplication check
- [ ] 7.3 Add timestamp tracking for each run

## 8. Pipeline Script
- [ ] 8.1 Create `scripts/pipeline.ts` as main entry point
- [ ] 8.2 Orchestrate: collect → generate flow
- [ ] 8.3 Add logging and progress output
- [ ] 8.4 Handle errors gracefully with partial success
- [ ] 8.5 Output summary of generated topics

## 9. NPM Scripts
- [ ] 9.1 Add `"collect": "tsx scripts/collect.ts"` to package.json
- [ ] 9.2 Add `"generate": "tsx scripts/generate.ts"` to package.json
- [ ] 9.3 Add `"pipeline": "tsx scripts/pipeline.ts"` to package.json

## 10. Verification
- [ ] 10.1 Test Brave Search API with sample query
- [ ] 10.2 Test LLM generation with sample input
- [ ] 10.3 Run full pipeline and verify output files
- [ ] 10.4 Verify generated content matches Schema
- [ ] 10.5 Test deduplication by running pipeline twice
