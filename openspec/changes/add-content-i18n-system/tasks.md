# Tasks: add-content-i18n-system

## 1. Content Collections Setup
- [ ] 1.1 Create `src/content/config.ts` with collection definitions
- [ ] 1.2 Define `topicSchema` with Zod validation
- [ ] 1.3 Configure `region` enum: `global`, `india`, `taiwan_hk`, `latam`
- [ ] 1.4 Configure `category` enum: `politics`, `economy`, `tech`, `entertainment`, `sports`
- [ ] 1.5 Define `locale` record for multi-language content

## 2. Content Directory Structure
- [ ] 2.1 Create `src/content/topics/global/` for North America/Global (en)
- [ ] 2.2 Create `src/content/topics/india/` for India (hi)
- [ ] 2.3 Create `src/content/topics/taiwan_hk/` for Taiwan/HK (zh-TW)
- [ ] 2.4 Create `src/content/topics/latam/` for Latin America (pt + es)
- [ ] 2.5 Create subdirectories for each category under each region

## 3. i18n System
- [ ] 3.1 Create `src/i18n/languages.ts` with language configuration
- [ ] 3.2 Create `src/i18n/ui.ts` with UI translations for all 5 languages
- [ ] 3.3 Define helper functions for getting translations by locale
- [ ] 3.4 Include translations for: navigation, buttons, labels, common phrases

## 4. Language Switcher Component (使用 modern-frontend-design Skill)
- [ ] 4.1 Create `src/components/LanguageSwitcher.astro`
- [ ] 4.2 Display current language with flag/icon
- [ ] 4.3 Show dropdown with available languages
- [ ] 4.4 Preserve current page path when switching language
- [ ] 4.5 Integrate into Header component

## 5. Topic Card Component (使用 modern-frontend-design Skill)
- [ ] 5.1 Create `src/components/TopicCard.astro`
- [ ] 5.2 Display topic title, question, and category
- [ ] 5.3 Show prediction options (Yes/No or localized)
- [ ] 5.4 Include link to topic detail page
- [ ] 5.5 Add visual indicator for topic status (active/closed)

## 6. Dynamic Routing
- [ ] 6.1 Create `src/pages/[lang]/index.astro` for localized homepage
- [ ] 6.2 Create `src/pages/[lang]/topics/index.astro` for topic listing
- [ ] 6.3 Create `src/pages/[lang]/topics/[...slug].astro` for topic detail
- [ ] 6.4 Implement `getStaticPaths()` for all dynamic routes
- [ ] 6.5 Filter topics by language/region in each route

## 7. Sample Content
- [ ] 7.1 Create 1 sample topic for each region (4 total)
- [ ] 7.2 Verify content renders correctly in each language

## 8. Verification
- [ ] 8.1 Verify Content Collections load without errors
- [ ] 8.2 Test language switching between all 5 locales
- [ ] 8.3 Verify topic listing filters by region correctly
- [ ] 8.4 Test topic detail page renders with correct locale content
