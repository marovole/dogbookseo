# Dogbooks SEO Landing Pages

Programmatic SEO (pSEO) 引流站，为 [Dogbooks](https://dogbooks.io) 预测市场游戏自动生成多语言话题页面。

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| **Astro** | 5.x | 静态站点生成 (SSG)，零 JS 运行时 |
| **Tailwind CSS** | 4.x | 原子化样式，极小打包体积 |
| **TypeScript** | 5.x | 类型安全 |
| **Fontsource** | - | 本地字体托管 (Space Grotesk, IBM Plex Sans, JetBrains Mono) |
| **Brave Search API** | - | 话题采集 (免费 2000 次/月) |
| **Chutes LLM** | DeepSeek V3 | 内容生成 |
| **Cloudflare Pages** | - | 部署 + 全球 CDN |
| **GitHub Actions** | - | 每日自动化流水线 |

## 架构

```
┌─────────────────────────────────────────────────────────────────────┐
│                         GitHub Actions (Daily Cron)                  │
│                                                                      │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────────────┐  │
│   │ Brave Search │───▶│  Chutes LLM  │───▶│  JSON Content Files  │  │
│   │    API       │    │ (DeepSeek V3)│    │  src/content/topics/ │  │
│   └──────────────┘    └──────────────┘    └──────────────────────┘  │
│                                                    │                 │
└────────────────────────────────────────────────────│─────────────────┘
                                                     │
                                                     ▼
┌─────────────────────────────────────────────────────────────────────┐
│                           Astro Build (SSG)                          │
│                                                                      │
│   src/pages/                                                         │
│   ├── index.astro              → /  (301 redirect to /en/)          │
│   └── [lang]/                                                        │
│       ├── index.astro          → /{lang}/                           │
│       └── topics/                                                    │
│           ├── index.astro      → /{lang}/topics/                    │
│           └── [...slug].astro  → /{lang}/topics/{slug}              │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Cloudflare Pages (CDN)                        │
│                                                                      │
│   dogbooks.co                                                        │
│   ├── /en/topics/...           (English - Global)                   │
│   ├── /zh-TW/topics/...        (繁體中文 - Taiwan/HK)               │
│   ├── /hi/topics/...           (हिन्दी - India)                       │
│   ├── /pt/topics/...           (Português - Brazil/Latam)           │
│   └── /es/topics/...           (Español - Latam)                    │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## 目录结构

```
dogbook-seo/
├── src/
│   ├── components/          # Astro 组件
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── SEOHead.astro
│   │   ├── StructuredData.astro
│   │   ├── TopicCard.astro
│   │   ├── LanguageSwitcher.astro
│   │   └── CTA.astro
│   ├── config/
│   │   └── site.ts          # 站点配置
│   ├── content/
│   │   ├── config.ts        # Content Collections schema
│   │   └── topics/          # 话题 JSON 数据
│   │       ├── global/      # 北美/全球 (en)
│   │       ├── india/       # 印度 (hi)
│   │       ├── taiwan_hk/   # 台港 (zh-TW)
│   │       └── latam/       # 拉美 (pt, es)
│   ├── i18n/
│   │   ├── languages.ts     # 语言配置
│   │   └── ui.ts            # UI 翻译
│   ├── layouts/
│   │   └── Base.astro       # 基础布局
│   ├── pages/
│   │   ├── index.astro      # 根目录重定向
│   │   └── [lang]/          # 多语言路由
│   └── styles/
│       └── global.css       # Tailwind 入口
├── scripts/                 # 数据采集脚本
│   ├── pipeline.ts          # 完整流水线
│   ├── collect.ts           # Brave 采集
│   ├── generate.ts          # LLM 生成
│   ├── brave-client.ts      # Brave API 客户端
│   ├── llm-client.ts        # Chutes LLM 客户端
│   └── regions.ts           # 区域配置
├── public/
│   ├── _redirects           # Cloudflare Pages 重定向
│   ├── _headers             # 安全头
│   └── robots.txt
├── data/
│   └── processed.json       # 去重记录
└── .github/workflows/
    └── daily.yml            # 每日自动化
```

## 多语言与区域

| 区域 | 语言 | 话题类型 |
|------|------|----------|
| **Global** | English (en) | 美国政治、NBA、NFL、好莱坞、美股、科技 |
| **India** | Hindi (hi) | 板球、宝莱坞、印度政治、印度股市 |
| **Taiwan/HK** | 繁體中文 (zh-TW) | 台湾选举、港股、中华职棒、台剧 |
| **Latam** | Português (pt), Español (es) | 足球、巴西政治、拉美经济 |

## SEO 特性

- **hreflang**: 多语言页面互链
- **Structured Data**: NewsArticle + FAQPage schema
- **Sitemap**: 按语言自动生成
- **Edge Redirect**: Cloudflare 边缘 301 重定向
- **Canonical URLs**: 避免重复内容
- **Local Fonts**: 消除 FOUT，优化 LCP

## 快速开始

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 构建
npm run build

# 运行流水线 (采集 + 生成)
npm run pipeline
```

## 环境变量

```bash
# .env
BRAVE_API_KEY=BSA...        # Brave Search API
CHUTES_API_KEY=cpk_...      # Chutes LLM API
CHUTES_MODEL=deepseek-ai/DeepSeek-V3-0324
```

## 成本

| 服务 | 月度用量 | 成本 |
|------|----------|------|
| Brave Search | ~750 次 | $0 (免费 2000/月) |
| Chutes LLM | ~120 次 | $0 (订阅内) |
| GitHub Actions | ~150 分钟 | $0 (免费 2000/月) |
| Cloudflare Pages | 无限 | $0 |
| **总计** | | **$0/月** |

## 相关链接

- [Dogbooks 游戏](https://dogbooks.io)
- [Astro 文档](https://docs.astro.build)
- [Brave Search API](https://api-dashboard.search.brave.com)

## License

ISC
