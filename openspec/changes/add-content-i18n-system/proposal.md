# Change: Add Content Collections and i18n System

## Why
Dogbook SEO 站点需要结构化的话题内容管理系统和多语言支持，以便自动生成不同区域和语言的话题页面。

## What Changes
- 配置 Astro Content Collections 和话题 Schema
- 创建话题数据结构 (topicSchema) 支持多语言内容
- 实现多语言 UI 翻译系统 (`src/i18n/`)
- 创建语言切换组件 (`LanguageSwitcher.astro`)
- 建立区域内容目录结构 (`global/`, `india/`, `taiwan_hk/`, `latam/`)
- 实现动态多语言路由 (`[lang]/`, `[...slug].astro`)

## Impact
- Affected specs: `content-collections`, `i18n`, `routing`
- Affected code:
  - `src/content/config.ts`
  - `src/content/topics/` (各区域目录)
  - `src/i18n/ui.ts`
  - `src/i18n/languages.ts`
  - `src/components/LanguageSwitcher.astro`
  - `src/components/TopicCard.astro`
  - `src/pages/[lang]/index.astro`
  - `src/pages/[lang]/topics/index.astro`
  - `src/pages/[lang]/topics/[...slug].astro`

## Dependencies
- 依赖提案 `init-astro-foundation` 完成

## Frontend Implementation Requirement
**必须使用 `modern-frontend-design` Skill 进行所有前端页面和组件的设计与实现**
