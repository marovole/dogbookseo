# Design: add-seo-deployment

## Context
Dogbook SEO 站点的核心目标是搜索引擎流量获取。需要完善的 SEO 配置和自动化部署流程，确保每日新话题页面被正确索引。

## Goals
- 所有页面 Lighthouse SEO 分数 100
- 正确的多语言 hreflang 配置
- 自动化每日内容更新和部署
- 零人工干预的 CI/CD 流程

## Non-Goals
- 不实现 AMP 页面
- 不实现结构化数据 (Schema.org) - 可后续添加
- 不实现付费广告追踪

## Decisions

### Decision 1: SEO Meta 策略
```html
<!-- 每页必须有 -->
<title>{topic.title} | Dogbooks</title>
<meta name="description" content="{topic.description}" />
<link rel="canonical" href="{full_url}" />
```
- **选择**: 动态生成 title 和 description
- **原因**: 每个话题页面需要唯一的 meta 信息

### Decision 2: Hreflang 配置
```html
<!-- 话题页示例 -->
<link rel="alternate" hreflang="en" href="/en/topics/{slug}" />
<link rel="alternate" hreflang="hi" href="/hi/topics/{slug}" />
<link rel="alternate" hreflang="x-default" href="/en/topics/{slug}" />
```
- **选择**: 为每个话题生成所有可用语言的 hreflang
- **注意**: 只为该话题实际存在的语言版本生成 hreflang

### Decision 3: Sitemap 结构
```
/sitemap-index.xml
├── /sitemap-en.xml
├── /sitemap-zh-TW.xml
├── /sitemap-hi.xml
├── /sitemap-pt.xml
└── /sitemap-es.xml
```
- **选择**: 使用 Astro 官方 sitemap 集成，按语言分组
- **原因**: 便于 Google 按语言索引

### Decision 4: GitHub Actions 工作流
```yaml
on:
  schedule:
    - cron: '0 0 * * *'  # 每天 UTC 00:00
  workflow_dispatch:       # 手动触发
```
- **选择**: 定时 + 手动触发
- **原因**: 定时确保每日更新，手动触发便于测试

### Decision 5: 部署策略
```
GitHub Actions → Build → Git Push → Cloudflare Pages Auto Deploy
```
- **选择**: GitHub Actions 构建后推送，Cloudflare 自动部署
- **替代方案**: GitHub Actions 直接调用 Cloudflare API (更复杂)

### Decision 6: Git Commit 策略
```bash
git commit -m "chore: daily topics $(date +%Y-%m-%d)"
```
- **选择**: 自动 commit 使用日期标识
- **注意**: 只在有变更时 commit (`git diff --staged --quiet ||`)

## Risks / Trade-offs

### Risk 1: GitHub Actions Cron 可靠性
- **风险**: GitHub 可能因仓库不活跃而禁用 cron
- **缓解**: 确保仓库保持活跃，或使用外部 cron 服务触发

### Risk 2: API 密钥安全
- **风险**: 密钥可能泄露
- **缓解**: 使用 GitHub Secrets，从不在代码中硬编码

### Risk 3: 构建失败
- **风险**: 每日构建可能因各种原因失败
- **缓解**: GitHub Actions 失败通知，手动重试机制

## Open Questions
- 是否需要添加 Schema.org 结构化数据？(建议后续添加)
- 是否需要 Google Analytics 或其他分析？(待定)
