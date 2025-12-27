# Change: Initialize Astro Foundation for Dogbook SEO Site

## Why
Dogbook 需要一个基于 Astro 5.x 的 SEO 引流站点基础架构，用于承载多语言话题内容页面，实现零 JS 输出和极致性能。

## What Changes
- 初始化 Astro 5.x 项目结构
- 集成 Tailwind CSS 4.x 样式系统
- 创建基础布局组件 (`Base.astro`, `Header.astro`, `Footer.astro`)
- 配置站点基础信息 (`src/config/site.ts`)
- 实现根路由重定向 (`/` → `/en/`)
- 配置开发环境 (`astro.config.mjs`, `tailwind.config.mjs`)

## Impact
- Affected specs: `project-setup`, `base-layout`
- Affected code: 
  - `astro.config.mjs`
  - `tailwind.config.mjs`
  - `package.json`
  - `src/config/site.ts`
  - `src/layouts/Base.astro`
  - `src/components/Header.astro`
  - `src/components/Footer.astro`
  - `src/components/CTA.astro`
  - `src/pages/index.astro`
  - `src/styles/global.css`
  - `public/robots.txt`
  - `public/favicon.ico`

## Frontend Implementation Requirement
**必须使用 `modern-frontend-design` Skill 进行所有前端页面和组件的设计与实现**
