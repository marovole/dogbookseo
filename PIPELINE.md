# 自动化采集管道配置与修复指南

## 概览

完整的自动化管道包括三个步骤：

1. **采集（Collect）** - 从 Brave Search API 获取新闻
2. **生成（Generate）** - 使用 LLM 将新闻转换为话题
3. **构建（Build）** - Astro 构建静态网站

### 完整管道入口

```bash
npm run pipeline  # 采集 + 生成
npm run build     # 构建网站
```

### 独立命令

```bash
npm run collect      # 只采集数据
npm run generate     # 只生成内容（从已有的 CSV）
npm run test:pipeline # 生成测试数据（无需 API 密钥）
npm run test:build    # 生成测试数据并构建
```

---

## 配置需求

### 1. 环境变量

创建 `.env` 文件（不要提交到 git）：

```bash
# Brave Search API - 免费 2000 次/月
BRAVE_API_KEY=your_brave_api_key_here

# Chutes (DeepSeek LLM) - 订阅内使用
CHUTES_API_KEY=your_chutes_api_key_here
CHUTES_MODEL=deepseek-ai/DeepSeek-V3-0324
```

### 2. API 密钥获取

**Brave Search**：
- 访问 https://api-dashboard.search.brave.com/
- 注册免费账户
- 复制 API Key

**Chutes/DeepSeek**：
- 访问 https://llm.chutes.ai/
- 创建账户并订阅
- 获取 API Token

### 3. GitHub Secrets 配置（用于自动化）

在 GitHub 仓库设置中添加 Secrets：
- `BRAVE_API_KEY`
- `CHUTES_API_KEY`

路径：Settings → Secrets and variables → Actions → New repository secret

---

## 数据流

```
┌─────────────────────────────────────────────────────────┐
│                 GitHub Actions (Daily)                  │
│              Cron: 0 0 * * * (00:00 UTC)                │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│         collect.ts (并行采集 4 个地区)                   │
│                                                         │
│  ├─ global: 30 个搜索查询                               │
│  ├─ india: 25 个搜索查询                                │
│  ├─ taiwan_hk: 20 个搜索查询                            │
│  └─ latam: 20 个搜索查询 (双语)                         │
│                                                         │
│  输出: /data/raw/region_YYYY-MM-DD.csv                 │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│      llm-client.ts (使用 Chutes LLM API)               │
│                                                         │
│  为每条新闻生成：                                        │
│  - slug: URL 安全的标识符                               │
│  - title: 本地化标题                                    │
│  - question: 二元问题                                   │
│  - description: SEO 描述                                │
│  - options: ["Yes", "No"]                             │
│  - keywords: 搜索关键词                                 │
│  - expirationDate: 预测过期时间                         │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│        generate.ts (转换为 JSON 内容文件)               │
│                                                         │
│  CSV → JSON 文件在：                                    │
│  src/content/topics/region/category/slug.json          │
│                                                         │
│  同时更新：/data/processed.json (去重记录)             │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│          astro build (构建静态网站)                     │
│                                                         │
│  输出: /dist/ (可部署到 Cloudflare Pages)               │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│      Git Commit & Push → Cloudflare Pages 自动部署      │
└─────────────────────────────────────────────────────────┘
```

---

## 文件结构

```
data/
├── raw/                      # 采集的原始 CSV 文件
│   ├── global_2025-12-27.csv
│   ├── india_2025-12-27.csv
│   ├── taiwan_hk_2025-12-27.csv
│   └── latam_2025-12-27.csv
│
└── processed.json             # 已处理的 slug 记录（去重）

src/content/topics/
├── global/
│   ├── politics/
│   ├── sports/
│   ├── economy/
│   ├── tech/
│   └── entertainment/
│
├── india/
│   ├── politics/
│   ├── sports/
│   ├── economy/
│   └── entertainment/
│
├── taiwan_hk/
│   ├── politics/
│   ├── sports/
│   ├── economy/
│   └── entertainment/
│
└── latam/
    ├── politics/
    ├── sports/
    ├── economy/
    └── entertainment/
```

---

## 本地开发工作流

### 1. 使用测试数据快速开发

```bash
# 生成 25 个测试话题（无需 API 密钥）
npm run test:pipeline

# 本地开发服务器
npm run dev
```

访问 http://localhost:3000 查看本地站点。

### 2. 完整管道测试（需要 API 密钥）

```bash
# 设置环境变量
export BRAVE_API_KEY=your_key
export CHUTES_API_KEY=your_key

# 运行完整管道
npm run pipeline

# 构建
npm run build

# 预览
npm run preview
```

---

## 常见问题排查

### 问题：采集没有生成数据

**原因 1：API 密钥未设置**
```bash
# 检查环境变量
echo $BRAVE_API_KEY
echo $CHUTES_API_KEY

# 设置缺失的密钥
export BRAVE_API_KEY=your_key
```

**原因 2：Brave API 配额已用完**
- 每月限额 2000 次请求
- 当前配置使用 ~95 次/天，月使用量约 37%
- 如需更多配额，升级 Brave API 计划

**原因 3：LLM API 故障**
- 检查网络连接
- 验证 Chutes 服务状态
- 查看错误日志

### 问题：生成的内容重复

**解决方案**：
```bash
# 清空已处理记录（小心使用）
echo '{"slugs": [], "lastUpdated": null}' > data/processed.json

# 重新生成
npm run generate
```

### 问题：GitHub Actions 定时任务未运行

**检查清单**：
1. ✅ 仓库已 push 至 GitHub
2. ✅ `.github/workflows/daily.yml` 存在
3. ✅ GitHub Secrets 已配置（BRAVE_API_KEY，CHUTES_API_KEY）
4. ✅ 仓库未禁用 Actions（Settings → Actions → Enable）
5. ✅ 至少有一次成功的 push（Cron 需要活跃的仓库）

**重新启用定时任务**：
```bash
# 进行任何提交来 "唤醒" Cron
git commit --allow-empty -m "Trigger CI"
git push
```

---

## 性能监控

### 每日数据量预估

| 指标 | 数值 |
|------|------|
| 搜索查询数 | ~95 个/天 |
| API 调用数 | ~95 次/天 |
| 生成话题数 | ~20 个/天 |
| 生成页面数 | ~25 个/天（含多语言） |
| 月页面累积 | ~750 个 |

### API 使用量

**Brave Search**：
- 每日：~95 次
- 每月：~2,850 次（免费额度 2,000 次）
- **解决方案**：需要付费升级或减少查询数

**Chutes LLM**：
- 每日：~20 次
- 包含在订阅内，无额外成本

---

## 优化建议

### 1. 减少 Brave 查询成本

**方案 A：减少查询数量** (推荐)
```typescript
// scripts/regions.ts - 每个类别最多 2 个查询
categories: [
  {
    name: 'Politics/US',
    category: 'politics',
    queries: ['US 2024 election results', 'Biden Trump 2025 news'], // 从 5 减到 2
  },
  // ...
]
```

**方案 B：改用免费替代方案**
- Searxng（自建搜索引擎）
- 直接抓取 RSS 源
- Google News API

### 2. 提高生成质量

```typescript
// scripts/llm-client.ts - 调整 LLM 参数
temperature: 0.5,        // 降低随机性，提高一致性
max_tokens: 1500,        // 适当降低，加快速度
response_format: { type: 'json_object' }  // 强制 JSON 格式
```

### 3. 添加内容审核

```typescript
// 在 generate.ts 中添加：
- 检查 slug 长度（<50 字符）
- 验证 description 长度（<160 字符）
- 过滤敏感话题
- 检查重复关键词
```

---

## 部署到 Cloudflare Pages

### 1. 连接 GitHub 仓库

访问 https://dash.cloudflare.com/
1. Pages → Create application → Connect to Git
2. 选择你的 GitHub 账户和仓库
3. 选择部署分支（main）

### 2. 配置构建设置

- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node version**: `20`

### 3. 添加环境变量

在 Cloudflare Pages 设置中：
- `BRAVE_API_KEY` = your key
- `CHUTES_API_KEY` = your key

### 4. 配置域名

1. 添加自定义域名：`dogbooks.org`
2. 更新 DNS 记录（或使用 Cloudflare NS）
3. 等待 DNS 传播（1-24 小时）

---

## 恢复与重置

### 清空所有生成的内容（仅开发用）

```bash
# 删除生成的话题
rm -rf src/content/topics/*/

# 重置处理记录
echo '{"slugs": [], "lastUpdated": null}' > data/processed.json

# 删除原始 CSV
rm -f data/raw/*.csv
```

### 恢复到特定日期的版本

```bash
# 查看历史
git log --oneline

# 恢复到特定提交
git checkout <commit_hash> -- src/content/topics/
```

---

## 下一步

1. **立即行动**：
   - [ ] 获取 Brave Search API 密钥
   - [ ] 获取 Chutes LLM API 密钥
   - [ ] 配置 GitHub Secrets
   - [ ] 测试本地管道：`npm run test:pipeline && npm run build`

2. **部署**：
   - [ ] 连接 Cloudflare Pages
   - [ ] 验证自动部署工作
   - [ ] 配置自定义域名

3. **监控**：
   - [ ] 检查 GitHub Actions 日志
   - [ ] 监控 Brave API 使用量
   - [ ] 收集用户反馈
