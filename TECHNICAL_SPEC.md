# Dogbook 少数派游戏 SEO 引流站 - 技术方案

## 项目概述

基于 Programmatic SEO (pSEO) 模式，为 Dogbook 少数派游戏构建自动化 SEO 引流站点。通过区域本地化话题矩阵，实现多语言长尾关键词覆盖和自然流量获取。

---

## 域名结构

| 用途 | 域名 | 说明 |
|------|------|------|
| **SEO 营销站** | `dogbooks.org` | 内容引流、多语言话题 |
| **游戏 DApp** | `dogbooks.io` | 现有游戏站 |

```
dogbooks.org                    ← SEO 营销站（本项目）
├── /en/topics/...              ← 英文话题
├── /zh-TW/topics/...           ← 繁體中文话题
├── /hi/topics/...              ← 印地语话题
├── /pt/topics/...              ← 葡萄牙语话题
├── /es/topics/...              ← 西班牙语话题
└── Header: [Launch App] → dogbooks.io

dogbooks.io                     ← 游戏 DApp（现有）
└── 少数派游戏
```

---

## 多语言与区域策略

### 语言矩阵

| 语言 | 代码 | 目标市场 | 话题来源 |
|------|------|----------|----------|
| **English** | `en` | **美国、加拿大、全球** | **北美/全球新闻** |
| 繁體中文 | `zh-TW` | 台湾、香港 | 台港区域新闻 |
| हिन्दी | `hi` | 印度 | 印度区域新闻 |
| Português | `pt` | 巴西 | 拉美区域新闻 |
| Español | `es` | 拉美、西班牙 | 拉美区域新闻 |

### 区域话题采集（本地化）

| 区域 | 语言 | 话题类型 | 每日话题数 |
|------|------|----------|------------|
| **北美/全球** | en | 美国政治、NBA、NFL、好莱坞、美股、科技 | 5 |
| **印度** | hi | 板球、宝莱坞、印度政治、印度股市 | 5 |
| **台港** | zh-TW | 台湾选举、港股、中华职棒、台剧 | 5 |
| **拉美** | pt + es | 足球、巴西政治、拉美经济 | 5 |

**每日总计**：20 个话题 → 约 25 个页面（拉美话题双语）

---

## 技术栈

| 组件 | 选择 | 说明 |
|------|------|------|
| **框架** | Astro 5.x | 零 JS 输出、原生 SSG |
| **样式** | Tailwind CSS 4.x | 原子化、极小体积 |
| **内容** | Content Collections (MDX) | 类型安全、结构化 |
| **搜索 API** | Brave Search | 免费 2000 次/月 |
| **LLM API** | Chutes (DeepSeek V3) | 订阅内使用 |
| **部署** | Cloudflare Pages | 免费、全球 CDN |
| **自动化** | GitHub Actions | Cron 定时任务 |

---

## 站点架构（精简版）

```
dogbooks.org
│
├── /                           ← 根目录重定向到 /en/
│
├── /[lang]/                    ← 多语言路由
│   ├── /                       ← 首页（游戏介绍 + 话题列表）
│   └── /topics/
│       ├── /                   ← 话题列表（可按分类筛选）
│       └── /[slug]             ← 话题详情页（核心 pSEO 页面）
│
└── Header 固定元素
    ├── Logo
    ├── 语言切换
    └── [Launch App] → dogbooks.io
```

**URL 示例**：
- `/en/topics/india-t20-series-2025` - 英文话题
- `/zh-TW/topics/taiwan-election-2026` - 繁體中文话题
- `/pt/topics/brasileirao-2025` - 葡萄牙语话题

---

## 目录结构

```
dogbook-seo/
├── src/
│   ├── config/
│   │   └── site.ts              # 站点配置
│   │
│   ├── content/
│   │   ├── config.ts            # Schema 定义
│   │   └── topics/              # 话题内容（按区域）
│   │       ├── global/          # 北美/全球区域 (en)
│   │       │   ├── sports/
│   │       │   ├── politics/
│   │       │   ├── economy/
│   │       │   ├── tech/
│   │       │   └── entertainment/
│   │       ├── india/           # 印度区域 (hi)
│   │       │   ├── sports/
│   │       │   ├── politics/
│   │       │   ├── economy/
│   │       │   └── entertainment/
│   │       ├── taiwan_hk/       # 台港区域 (zh-TW)
│   │       │   ├── politics/
│   │       │   ├── sports/
│   │       │   ├── economy/
│   │       │   └── entertainment/
│   │       └── latam/           # 拉美区域 (pt + es)
│   │           ├── sports/
│   │           ├── politics/
│   │           ├── economy/
│   │           └── entertainment/
│   │
│   ├── i18n/
│   │   ├── ui.ts                # UI 文案翻译
│   │   └── languages.ts         # 语言配置
│   │
│   ├── layouts/
│   │   └── Base.astro           # 唯一布局
│   │
│   ├── components/
│   │   ├── SEOHead.astro        # Meta + OG + hreflang
│   │   ├── Header.astro         # 导航 + Launch App
│   │   ├── Footer.astro         # 底部
│   │   ├── TopicCard.astro      # 话题卡片
│   │   ├── LanguageSwitcher.astro # 语言切换
│   │   └── CTA.astro            # 引流按钮
│   │
│   ├── pages/
│   │   ├── index.astro          # 根目录重定向
│   │   └── [lang]/
│   │       ├── index.astro      # 首页
│   │       └── topics/
│   │           ├── index.astro  # 话题列表
│   │           └── [...slug].astro # 话题详情
│   │
│   └── styles/
│       └── global.css
│
├── data/
│   ├── raw/                     # 原始 CSV（按区域/日期）
│   │   ├── india_2025-12-27.csv
│   │   ├── taiwan_hk_2025-12-27.csv
│   │   └── latam_2025-12-27.csv
│   └── processed.json           # 已处理记录
│
├── scripts/
│   ├── collect.ts               # 采集入口
│   ├── regions.ts               # 区域配置
│   ├── brave-client.ts          # Brave Search API
│   ├── llm-client.ts            # Chutes LLM API
│   ├── generate.ts              # CSV → MDX
│   └── pipeline.ts              # 完整流水线
│
├── .github/workflows/
│   └── daily.yml                # 定时任务
│
├── public/
│   ├── favicon.ico
│   └── robots.txt
│
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── README.md
```

---

## 数据结构

### 站点配置

```typescript
// src/config/site.ts
export const siteConfig = {
  name: "Dogbooks",
  url: "https://dogbooks.org",
  appUrl: "https://dogbooks.io",
  defaultLocale: "en",
  locales: ["en", "zh-TW", "hi", "pt", "es"],
}
```

### 话题 Schema

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const topicSchema = z.object({
  slug: z.string(),
  region: z.enum(['global', 'india', 'taiwan_hk', 'latam']),
  category: z.enum(['politics', 'economy', 'tech', 'entertainment', 'sports']),
  
  // 多语言内容（只包含该区域的语言）
  locale: z.record(z.string(), z.object({
    title: z.string(),
    question: z.string(),
    description: z.string(),
  })),
  
  options: z.tuple([z.string(), z.string()]),
  keywords: z.array(z.string()),
  
  status: z.enum(['active', 'closed']).default('active'),
  publishedAt: z.date(),
  expirationDate: z.string(),
  source: z.string(),
  image: z.string().optional(),
});

export const collections = {
  topics: defineCollection({ schema: topicSchema }),
};
```

### 话题示例（北美/全球区域）

```typescript
// 北美话题：只有 en
{
  slug: "super-bowl-2025",
  region: "global",
  category: "sports",
  locale: {
    en: {
      title: "Super Bowl 2025 Prediction",
      question: "Will the Kansas City Chiefs win Super Bowl 2025?",
      description: "Predict the winner of Super Bowl LIX"
    }
  },
  options: ["Yes", "No"],
  keywords: ["Super Bowl", "NFL", "Kansas City Chiefs", "2025"],
  status: "active",
  publishedAt: new Date("2025-12-27"),
  expirationDate: "2025-02-09T23:00:00",
  source: "ESPN"
}
```

### 话题示例（印度区域）

```typescript
// 印度话题：只有 hi
{
  slug: "india-t20-series-2025",
  region: "india",
  category: "sports",
  locale: {
    hi: {
      title: "भारत T20 सीरीज भविष्यवाणी",
      question: "क्या भारत ऑस्ट्रेलिया के खिलाफ T20 सीरीज जीतेगा?",
      description: "भारत बनाम ऑस्ट्रेलिया T20 सीरीज के परिणाम की भविष्यवाणी करें"
    }
  },
  options: ["हाँ", "नहीं"],
  keywords: ["भारत क्रिकेट", "T20 सीरीज", "भारत बनाम ऑस्ट्रेलिया"],
  status: "active",
  publishedAt: new Date("2025-12-27"),
  expirationDate: "2025-12-30T18:00:00",
  source: "ESPN Cricinfo"
}
```

### 话题示例（台港区域）

```typescript
// 台港话题：只有 zh-TW
{
  slug: "taiwan-election-2026",
  region: "taiwan_hk",
  category: "politics",
  locale: {
    "zh-TW": {
      title: "2026台灣地方選舉預測",
      question: "國民黨能否在2026地方選舉中勝出？",
      description: "預測2026年台灣地方選舉結果"
    }
  },
  options: ["會", "不會"],
  keywords: ["台灣選舉", "2026選舉", "國民黨", "民進黨"],
  status: "active",
  publishedAt: new Date("2025-12-27"),
  expirationDate: "2026-11-20",
  source: "中央社"
}
```

---

## 区域搜索配置

```typescript
// scripts/regions.ts

export const regions = {
  // 北美/全球（英文）
  global: {
    languages: ['en'],
    searchLang: 'en',
    categories: [
      {
        name: "Politics/US",
        queries: ["US election 2026", "Trump Biden politics news"]
      },
      {
        name: "Sports/NFL",
        queries: ["NFL playoffs Super Bowl predictions"]
      },
      {
        name: "Sports/NBA",
        queries: ["NBA Finals predictions 2025"]
      },
      {
        name: "Entertainment/Hollywood",
        queries: ["Oscars predictions 2025", "box office weekend"]
      },
      {
        name: "Economy/US",
        queries: ["S&P 500 prediction", "Fed rate decision"]
      },
      {
        name: "Technology",
        queries: ["OpenAI Apple Google AI news"]
      }
    ]
  },

  // 印度（只有印地语）
  india: {
    languages: ['hi'],
    searchLang: 'en',  // 搜索用英文，输出翻译成印地语
    categories: [
      {
        name: "Sports/Cricket",
        queries: ["India cricket match results", "IPL 2025 news"]
      },
      {
        name: "Movies/Bollywood",
        queries: ["Bollywood box office collection"]
      },
      {
        name: "Politics/India",
        queries: ["India elections BJP Congress"]
      },
      {
        name: "Economy/India",
        queries: ["Sensex Nifty Indian stock market"]
      }
    ]
  },
  
  // 台港（繁體中文）
  taiwan_hk: {
    languages: ['zh-TW'],
    searchLang: 'zh-TW',
    categories: [
      {
        name: "Politics/Taiwan",
        queries: ["台灣選舉 2025 2026", "柯文哲 賴清德"]
      },
      {
        name: "Sports/Baseball",
        queries: ["中華職棒 CPBL 2025"]
      },
      {
        name: "Entertainment",
        queries: ["台劇 韓劇 收視率"]
      },
      {
        name: "Economy/Stock",
        queries: ["台股 港股 預測"]
      }
    ]
  },
  
  // 拉美（葡萄牙语 + 西班牙语）
  latam: {
    languages: ['pt', 'es'],
    searchLang: 'pt',
    categories: [
      {
        name: "Sports/Football",
        queries: ["Brasileirão 2025 resultados", "Copa Libertadores"]
      },
      {
        name: "Politics/Brazil",
        queries: ["Lula Bolsonaro eleições Brasil"]
      },
      {
        name: "Economy/Latam",
        queries: ["Bovespa real dólar previsão"]
      },
      {
        name: "Sports/Argentina",
        queries: ["Argentina futbol Messi selección"]
      }
    ]
  }
};
```

---

## 自动化流程

### 每日流程图

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    每日自动化流程（4 区域并行）                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   GitHub Actions (Cron: 每天 00:00 UTC)                                     │
│          │                                                                  │
│          ├──▶ 北美/全球采集 (~10 次搜索) ──▶ LLM (en) ──▶ 5 话题           │
│          │                                                                  │
│          ├──▶ 印度采集 (~6 次搜索) ──▶ LLM (hi) ──▶ 5 话题                 │
│          │                                                                  │
│          ├──▶ 台港采集 (~4 次搜索) ──▶ LLM (zh-TW) ──▶ 5 话题              │
│          │                                                                  │
│          └──▶ 拉美采集 (~5 次搜索) ──▶ LLM (pt+es) ──▶ 5 话题              │
│                                                                             │
│          │                                                                  │
│          ▼                                                                  │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │ 数据处理：去重 → 生成 MDX → 构建 → Git Push                         │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│          │                                                                  │
│          ▼                                                                  │
│   Cloudflare Pages 自动部署 ──▶ 新页面上线                                  │
│                                                                             │
│   每日总计：~25 次搜索，20 个话题，~25 个新页面                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### GitHub Actions 配置

```yaml
# .github/workflows/daily.yml

name: Daily Topics Pipeline

on:
  schedule:
    - cron: '0 0 * * *'
  workflow_dispatch:

env:
  BRAVE_API_KEY: ${{ secrets.BRAVE_API_KEY }}
  CHUTES_API_KEY: ${{ secrets.CHUTES_API_KEY }}
  CHUTES_MODEL: deepseek-ai/DeepSeek-V3-0324

jobs:
  collect-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          
      - run: npm ci
      
      - name: Collect and generate topics
        run: npm run pipeline
        
      - name: Build site
        run: npm run build
        
      - name: Commit and push
        run: |
          git config user.email "action@github.com"
          git config user.name "GitHub Action"
          git add .
          git diff --staged --quiet || git commit -m "chore: daily topics $(date +%Y-%m-%d)"
          git push
```

---

## SEO 优化

### hreflang 标签

```html
<!-- 印度话题页：en + hi 版本 -->
<link rel="alternate" hreflang="en" href="https://dogbooks.org/en/topics/india-t20-series" />
<link rel="alternate" hreflang="hi" href="https://dogbooks.org/hi/topics/india-t20-series" />
<link rel="alternate" hreflang="x-default" href="https://dogbooks.org/en/topics/india-t20-series" />

<!-- 台港话题页：只有 zh-TW -->
<link rel="alternate" hreflang="zh-TW" href="https://dogbooks.org/zh-TW/topics/taiwan-election" />
<link rel="alternate" hreflang="x-default" href="https://dogbooks.org/zh-TW/topics/taiwan-election" />
```

### 页面 Meta

```html
<title>Will India win T20 series? | Dogbooks</title>
<meta name="description" content="Predict the outcome of India vs Australia T20 series using Minority Game" />
<link rel="canonical" href="https://dogbooks.org/en/topics/india-t20-series" />
```

### Sitemap

自动生成，按语言分组：
- `sitemap-en.xml`
- `sitemap-zh-TW.xml`
- `sitemap-hi.xml`
- `sitemap-pt.xml`
- `sitemap-es.xml`
- `sitemap-index.xml`

---

## 去重策略

```typescript
// data/processed.json
{
  "slugs": [
    "india-t20-series-2025",
    "taiwan-election-2026",
    ...
  ],
  "lastUpdated": "2025-12-27"
}

// 去重：检查 slug 是否存在
function isDuplicate(slug: string, processed: ProcessedData): boolean {
  return processed.slugs.includes(slug);
}
```

---

## 成本分析

| 组件 | 每日用量 | 月度用量 | 成本 |
|------|----------|----------|------|
| Brave Search | ~25 次 | ~750 次 | $0（免费 2000 次/月） |
| Chutes LLM | ~4 次 | ~120 次 | $0（订阅内） |
| GitHub Actions | ~5 分钟 | ~150 分钟 | $0（免费 2000 分钟/月） |
| Cloudflare Pages | 无限 | 无限 | $0 |
| **总计** | | | **$0/月** |

**Brave 免费额度使用率**：750 / 2000 = 37.5% ✅

---

## 环境变量

```bash
# .env
BRAVE_API_KEY=BSA...
CHUTES_API_KEY=cpk_...
CHUTES_MODEL=deepseek-ai/DeepSeek-V3-0324
```

GitHub Secrets:
- `BRAVE_API_KEY`
- `CHUTES_API_KEY`

---

## 部署

### 首次部署

```bash
# 1. 克隆项目
git clone https://github.com/xxx/dogbook-seo.git
cd dogbook-seo

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env

# 4. 本地开发
npm run dev

# 5. 连接 Cloudflare Pages
# - 创建 Pages 项目
# - 连接 GitHub 仓库
# - 构建命令：npm run build
# - 输出目录：dist
# - 绑定域名：dogbooks.org
```

### NPM Scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "collect": "tsx scripts/collect.ts",
    "generate": "tsx scripts/generate.ts",
    "pipeline": "tsx scripts/pipeline.ts"
  }
}
```

---

## 页面数量预估

| 时间 | 话题数 | 页面数（含多语言） |
|------|--------|-------------------|
| 1 天 | 20 | ~25 |
| 1 周 | 140 | ~175 |
| 1 月 | 600 | ~750 |
| 3 月 | 1800 | ~2250 |

---

## 注意事项

### SEO
- [ ] 每页 title 唯一，包含关键词
- [ ] description 限 160 字符
- [ ] hreflang 标签正确配置
- [ ] canonical URL 正确
- [ ] sitemap 自动生成

### 性能
- [ ] 零 JS 输出
- [ ] 页面体积 < 50KB
- [ ] Lighthouse 95+

### 自动化
- [ ] GitHub Secrets 正确配置
- [ ] 仓库保持活跃（避免 Cron 被禁用）
- [ ] Brave API 用量监控

---

## 参考

- [Astro 文档](https://docs.astro.build)
- [Brave Search API](https://api-dashboard.search.brave.com)
- [Cloudflare Pages](https://developers.cloudflare.com/pages)
- [Coinbase Learn](https://www.coinbase.com/learn) - 架构参考
