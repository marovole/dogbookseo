# Tasks: add-content-i18n-system

## 1. Content Collections Setup
- [x] 1.1 Create `src/content/config.ts` with collection definitions
- [x] 1.2 Define `topicSchema` with Zod validation
- [x] 1.3 Configure `region` enum: `global`, `india`, `taiwan_hk`, `latam`
- [x] 1.4 Configure `category` enum: `politics`, `economy`, `tech`, `entertainment`, `sports`
- [x] 1.5 Define `locale` record for multi-language content

## 2. Content Directory Structure
- [x] 2.1 Create `src/content/topics/global/` for North America/Global (en)
- [x] 2.2 Create `src/content/topics/india/` for India (hi)
- [x] 2.3 Create `src/content/topics/taiwan_hk/` for Taiwan/HK (zh-TW)
- [x] 2.4 Create `src/content/topics/latam/` for Latin America (pt + es)
- [x] 2.5 Create subdirectories for each category under each region

## 3. i18n System
- [x] 3.1 Create `src/i18n/languages.ts` with language configuration
- [x] 3.2 Create `src/i18n/ui.ts` with UI translations for all 5 languages
- [x] 3.3 Define helper functions for getting translations by locale
- [x] 3.4 Include translations for: navigation, buttons, labels, common phrases

## 4. Language Switcher Component (使用 modern-frontend-design Skill)
- [x] 4.1 Create `src/components/LanguageSwitcher.astro`
- [x] 4.2 Display current language with flag/icon
- [x] 4.3 Show dropdown with available languages
- [x] 4.4 Preserve current page path when switching language
- [x] 4.5 Integrate into Header component

## 5. Topic Card Component (使用 modern-frontend-design Skill)
- [x] 5.1 Create `src/components/TopicCard.astro`
- [x] 5.2 Display topic title, question, and category
- [x] 5.3 Show prediction options (Yes/No or localized)
- [x] 5.4 Include link to topic detail page
- [x] 5.5 Add visual indicator for topic status (active/closed)

## 6. Dynamic Routing
- [x] 6.1 Create `src/pages/[lang]/index.astro` for localized homepage
- [x] 6.2 Create `src/pages/[lang]/topics/index.astro` for topic listing
- [x] 6.3 Create `src/pages/[lang]/topics/[...slug].astro` for topic detail
- [x] 6.4 Implement `getStaticPaths()` for all dynamic routes
- [x] 6.5 Filter topics by language/region in each route

## 7. Sample Content
- [x] 7.1 Create 1 sample topic for each region (5 total: 2 global, 1 india, 1 taiwan_hk, 1 latam)
- [x] 7.2 Verify content renders correctly in each language

## 8. Verification
- [x] 8.1 Verify Content Collections load without errors
- [x] 8.2 Build generates 16 pages across all 5 locales
- [x] 8.3 Verify topic listing filters by region correctly
- [x] 8.4 Test topic detail page renders with correct locale content
