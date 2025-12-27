# 快速启动指南

## 当前状态

✅ **管道已修复并工作** - 25 个测试话题已生成，41 个页面已构建

### 验证状态

```bash
npm run verify
```

```
✅ All regions have content (global: 8, india: 6, latam: 5, taiwan_hk: 6)
✅ All languages present (en, hi, pt, es, zh-TW)
✅ Total 25 topics, 41 pages
```

---

## 本地开发（5分钟启动）

### 1. 用测试数据启动开发服务器

```bash
npm run test:pipeline  # 生成测试数据（无需 API 密钥）
npm run dev            # 启动开发服务器
```

访问 http://localhost:3000 查看网站。

### 2. 构建并预览

```bash
npm run test:build     # 生成测试数据 + 构建
npm run preview        # 预览生产构建
```

---

## 完整自动化管道（需要 API 密钥）

### 第一步：获取 API 密钥

1. **Brave Search**：https://api-dashboard.search.brave.com/
   - 注册免费账户
   - 复制 API Key（免费 2000 次请求/月）

2. **Chutes/DeepSeek**：https://llm.chutes.ai/
   - 创建账户
   - 订阅获取 API Token

### 第二步：配置环境变量

创建 `.env` 文件：

```bash
BRAVE_API_KEY=your_brave_key_here
CHUTES_API_KEY=your_chutes_key_here
CHUTES_MODEL=deepseek-ai/DeepSeek-V3-0324
```

### 第三步：运行完整管道

```bash
# 采集新闻 + 生成话题
npm run pipeline

# 构建网站
npm run build

# 验证
npm run verify
```

### 第四步：提交并推送

```bash
git add -A
git commit -m "feat: add generated topics"
git push
```

---

## 自动化部署到 Cloudflare Pages

### 1. 连接 GitHub

访问 https://dash.cloudflare.com/
1. Pages → Create application
2. Connect to Git → 选择你的仓库

### 2. 配置构建

- **Build command**: `npm run build`
- **Build output**: `dist`
- **Node version**: `20`

### 3. 添加环境变量

在 Cloudflare Pages 设置中添加：
- `BRAVE_API_KEY`
- `CHUTES_API_KEY`

### 4. 配置域名

1. 添加自定义域名：`dogbooks.org`
2. 更新 DNS 或使用 Cloudflare NS

---

## 日常使用流程

### 每日自动化（GitHub Actions）

已配置 `.github/workflows/daily.yml`：
- **运行时间**：每天 00:00 UTC
- **流程**：采集 → 生成 → 构建 → 自动部署
- **预期结果**：每天新增 ~20 个话题，~25 个页面

如果定时任务不运行：
```bash
# 触发 CI
git commit --allow-empty -m "Trigger CI"
git push
```

---

## 常用命令速查

```bash
# 开发
npm run dev              # 启动开发服务器

# 测试
npm run test:pipeline    # 生成 25 个测试话题
npm run test:build       # 生成测试数据并构建

# 生产
npm run pipeline         # 采集 + 生成（需要 API 密钥）
npm run build            # 构建网站
npm run preview          # 预览生产版本

# 监控
npm run verify           # 验证管道状态和数据完整性
```

---

## 文件映射

### 核心管道脚本

| 文件 | 功能 | 输入 | 输出 |
|------|------|------|------|
| `scripts/collect.ts` | 从 Brave Search 采集新闻 | 搜索查询 | `/data/raw/*.csv` |
| `scripts/llm-client.ts` | 用 LLM 生成话题 | 新闻标题 | 话题 JSON |
| `scripts/generate.ts` | 转换 CSV 为内容文件 | `/data/raw/*.csv` | `/src/content/topics/*/*.json` |
| `scripts/pipeline.ts` | 完整管道入口 | 无 | 网站内容 |
| `scripts/test-pipeline.ts` | 生成测试数据 | 无 | 25 个测试话题 |
| `scripts/verify-pipeline.ts` | 验证数据质量 | `/src/content/topics/` | 验证报告 |

### 页面组件

| 文件 | 功能 |
|------|------|
| `src/pages/[lang]/index.astro` | 首页（按语言） |
| `src/pages/[lang]/topics/index.astro` | 话题列表（按语言） |
| `src/pages/[lang]/topics/[...slug].astro` | 话题详情页 |
| `src/components/SEOHead.astro` | SEO 元标签 |
| `src/components/Header.astro` | 导航头 |

---

## 问题排查

### Q: 为什么本地没有话题？
A: 运行 `npm run test:pipeline` 生成测试数据

### Q: GitHub Actions 没有生成新话题？
A: 
1. 检查 GitHub Secrets 是否已配置
2. 检查 Actions 是否启用：Settings → Actions
3. 手动触发：`git commit --allow-empty -m "Trigger" && git push`

### Q: Brave API 超配额？
A: 每月限 2000 次，按需减少查询数量（见 `scripts/regions.ts`）

### Q: 生成了重复话题？
A: 清空处理记录：`echo '{"slugs":[],"lastUpdated":null}' > data/processed.json`

---

## 下一步

1. ✅ **立即体验**：`npm run test:pipeline && npm run dev`
2. 🔑 **设置生产环境**：获取 API 密钥并配置 `.env`
3. 🚀 **部署上线**：连接 Cloudflare Pages
4. 📊 **监控效果**：检查 Google Search Console

详见 [PIPELINE.md](./PIPELINE.md) 获取完整文档。
