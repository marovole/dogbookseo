# Change: Add SEO Optimization and CI/CD Deployment

## Why
Dogbook SEO 站点需要完善的搜索引擎优化配置和自动化部署流程，以确保内容被搜索引擎正确索引，并每日自动生成新话题页面。

## What Changes
- 创建 SEO 组件 (`SEOHead.astro`) 包含 meta, hreflang, canonical 标签
- 配置多语言 Sitemap 自动生成
- 完善 robots.txt 配置
- 创建 GitHub Actions 每日定时任务 (`daily.yml`)
- 配置 Cloudflare Pages 部署
- 管理环境变量与 GitHub Secrets

## Impact
- Affected specs: `seo`, `ci-cd`
- Affected code:
  - `src/components/SEOHead.astro`
  - `astro.config.mjs` (sitemap integration)
  - `public/robots.txt`
  - `.github/workflows/daily.yml`
  - Repository Secrets configuration

## Dependencies
- 依赖提案 `add-data-pipeline` 完成

## Frontend Implementation Requirement
**必须使用 `modern-frontend-design` Skill 进行 SEO 相关前端组件的设计与实现**
