# Project Context: Dogbook SEO Landing Pages

## Purpose

Build a Programmatic SEO (pSEO) traffic-driving website for Dogbook (少数派游戏), a minority game prediction DApp. The site generates daily content across 5 languages (English, Traditional Chinese, Hindi, Portuguese, Spanish) by scraping news, using LLM to create prediction topics, and publishing to a multi-language Astro static site.

## Tech Stack

### Core Framework
- **Astro 5.x** - Zero-JS static site generation
- **Tailwind CSS 4.x** - Atomic utility-based styling
- **TypeScript** - Type-safe development

### Content & Data
- **Astro Content Collections** - Structured topic schema with Zod validation
- **MDX** (planned) - Rich markdown content with embedded components

### External APIs
- **Brave Search API** - News and trending topic retrieval (2000 requests/month free tier)
- **Chutes LLM API** - DeepSeek V3 language model for topic generation
  - Model: `deepseek-ai/DeepSeek-V3-0324`
  - Subscribed usage (no per-request cost)

### Deployment
- **Cloudflare Pages** - Zero-cost static hosting with global CDN
- **GitHub Actions** - Daily cron-triggered automation pipeline
- **Git** - Source control and CI/CD integration

## Supported Languages & Regions

| Region | Language | Code | Topic Types | Examples |
|--------|----------|------|-------------|----------|
| **Global/North America** | English | `en` | Politics, Sports (NFL/NBA), Entertainment, Tech, Economy | US Elections, Super Bowl, Oscars, Fed Rates |
| **India** | हिन्दी | `hi` | Sports (Cricket/IPL), Bollywood, Politics, Economy | India Cricket, IPL, Sensex |
| **Taiwan/Hong Kong** | 繁體中文 | `zh-TW` | Politics, Baseball, Entertainment, Economy | Taiwan Election, CPBL, Hong Kong Stock |
| **Latin America** | Português / Español | `pt` / `es` | Sports (Football), Politics, Economy | Brasileirão, Lula, Bovespa |

**Daily Goal**: ~5 topics per region = ~20 topics/day ≈ 25 pages (latam bilingual)

## Directory Structure

```
src/
├── config/
│   └── site.ts                 # Site metadata & locale config
├── content/
│   ├── config.ts               # Astro Content Collections schema
│   └── topics/                 # Topic content by region/category
│       ├── global/
│       ├── india/
│       ├── taiwan_hk/
│       └── latam/
├── i18n/
│   ├── ui.ts                   # UI translations
│   └── languages.ts            # Language helpers
├── layouts/
│   └── Base.astro              # Root layout
├── components/
│   ├── SEOHead.astro           # Meta, OG, hreflang
│   ├── Header.astro            # Nav + Launch App button
│   ├── Footer.astro            # Copyright
│   ├── LanguageSwitcher.astro  # Language selector
│   ├── TopicCard.astro         # Preview card component
│   └── CTA.astro               # Call-to-action button
├── pages/
│   ├── index.astro             # Root redirect → /en/
│   └── [lang]/
│       ├── index.astro         # Homepage per language
│       └── topics/
│           ├── index.astro     # Topic listing
│           └── [...slug].astro # Topic detail page
└── styles/
    └── global.css              # Global Tailwind + custom

scripts/
├── brave-client.ts             # Brave Search API wrapper
├── llm-client.ts               # Chutes LLM API wrapper
├── regions.ts                  # Region/category configs
├── collect.ts                  # News collection script
├── generate.ts                 # CSV → Content Collections
└── pipeline.ts                 # Full orchestration

data/
├── raw/                        # CSV output per region/date
├── processed.json              # Dedup tracking
└── example-topics.json         # Reference samples

.github/workflows/
└── daily.yml                   # 00:00 UTC cron trigger

public/
├── robots.txt                  # SEO crawler config
└── favicon.ico

openspec/                       # Spec-driven development
├── specs/                      # Deployed capabilities
│   ├── project-setup/
│   ├── base-layout/
│   ├── content-collections/
│   ├── i18n/
│   ├── routing/
│   ├── brave-search/
│   ├── llm-generation/
│   ├── pipeline/
│   ├── seo/
│   └── ci-cd/
└── changes/
    └── archive/                # Completed change proposals
```

## Project Conventions

### Code Style
- **TypeScript** - Strict mode enabled
- **ESLint + Prettier** - Consistent formatting
- **Naming**: kebab-case for files, camelCase for functions, CONSTANT_CASE for env vars
- **Astro Components**: Use `.astro` for islands, avoid client-side hydration unless necessary

### Architecture Patterns
- **Astro Layouts** - Single `Base.astro` layout for all pages
- **Content-driven** - Topics stored as structured content, rendered dynamically
- **Language-aware routing** - `/[lang]/` prefix for all URLs
- **Deduplication** - Processed slug tracking to avoid duplicate pages
- **Multi-region pipelining** - 4 regions processed in parallel daily

### Testing Strategy
- Manual Lighthouse audits for performance (target: 95+)
- Visual regression testing via screenshots
- Content validation: schema checks during generation

### Git Workflow
- Main branch: Always deployable
- Feature branches: `feature/topic-name` for major changes
- Commits: Descriptive messages, atomic commits
- Automation: GitHub Actions triggers builds on main push

## Domain & SEO Strategy

### Primary Domain
- **dogbooks.org** - SEO traffic site (this project)
- **dogbooks.io** - Game DApp (separate, linked via "Launch App")

### SEO Tactics
1. **Localized Keywords** - Each topic targets long-tail keywords in regional language
2. **Hreflang Tags** - Proper multi-language signaling to Google
3. **Canonical URLs** - Prevent indexing duplicates
4. **Sitemap Per Language** - Language-specific search crawling
5. **Meta Descriptions** - Unique, 160-char summaries
6. **Social Sharing** - Open Graph + Twitter Card tags

### Content Strategy
- **Native Language Content** - No machine translation; LLM generates native topics
- **Topical Authority** - Topics clustered by category (sports, politics, economy)
- **Fresh Content** - Daily new topics increase crawl frequency
- **No Bot Content Markers** - Content appears editorial despite programmatic generation

## Environment Variables

### Required (GitHub Secrets)
```bash
BRAVE_API_KEY=BSA...               # Brave Search API key
CHUTES_API_KEY=cpk_...             # Chutes LLM API key
```

### Optional (Local .env)
```bash
CHUTES_MODEL=deepseek-ai/DeepSeek-V3-0324  # LLM model (default provided)
```

## Important Constraints

1. **Brave API Free Tier**: 2000 requests/month (current plan: 750/month ≈ 37.5%)
2. **Zero JavaScript Output**: All pages must be static HTML (Astro config enforces)
3. **Multi-Language Complexity**: Topics only exist in region-specific language(s) (not all 5 languages per topic)
4. **Deduplication Required**: Track processed slugs to avoid regenerating existing pages
5. **Daily Automation**: Cron must not be disabled (requires at least 1 commit/month)
6. **Performance Budget**: < 50KB per page, 0 runtime JS, Lighthouse 95+

## External Dependencies

| Service | Purpose | Cost | Limit | Status |
|---------|---------|------|-------|--------|
| Brave Search | Topic discovery | Free | 2000 req/mo | Active |
| Chutes LLM | Topic generation | Subscription | Unlimited | Active |
| GitHub Actions | CI/CD automation | Free | 2000 min/mo | Active |
| Cloudflare Pages | Hosting + CDN | Free | Unlimited | Active |

## Key Files & Locations

- **Site Config**: `src/config/site.ts`
- **Topic Schema**: `src/content/config.ts`
- **i18n Translations**: `src/i18n/ui.ts`
- **Region Configs**: `scripts/regions.ts`
- **Pipeline Orchestration**: `scripts/pipeline.ts`
- **Dedup Tracking**: `data/processed.json`
- **Daily Workflow**: `.github/workflows/daily.yml`
- **Astro Config**: `astro.config.mjs`
- **Tailwind Config**: `tailwind.config.mjs`

## Design Requirements

### Frontend Design Mandate
**All UI components and pages MUST use the `modern-frontend-design` Skill** to ensure production-grade, distinctive interfaces that avoid generic AI aesthetics.

Affected components:
- Base layout & Header
- Topic cards & listing pages
- Topic detail pages
- Language switcher
- CTA buttons
- Homepage per language

### SEO Component Design
The `SEOHead.astro` component handles technical SEO but should use design skill for any visible SEO-related UI (metadata display, rich snippets visualization, etc.).

## Monitoring & Metrics

- **Daily Pipeline**: Monitor GitHub Actions logs for collection/generation success rate
- **API Usage**: Brave Search requests (target: stay under 1600/month)
- **Content Output**: Topics generated per region (target: 5/region/day)
- **Duplicate Rate**: Percentage of skipped duplicates (target: < 10%)
- **Site Performance**: Monthly Lighthouse audits (target: 95+ on all metrics)
- **Search Traffic**: Google Search Console tracking (setup after launch)

## Notes

- **Content is Generated**: Topics are AI-created from news, not editorial. Design should make this feel natural and trustworthy.
- **Region-Language Lock**: India only shows Hindi topics, Taiwan only shows zh-TW topics, etc. Global shows English only.
- **Latam Bilingual**: Latam is unique in generating topics in both Portuguese and Spanish daily.
- **Performance Critical**: Zero-JS design is non-negotiable. Every page must be static HTML.
- **SEO-First Mindset**: Every URL, title, description, heading should be optimized for search ranking.
