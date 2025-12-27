# API 成本优化方案

## 当前情况

### 成本分析

| 项目 | 数值 |
|------|------|
| 每日搜索查询 | 95 |
| 月均请求 | ~2,850 |
| 免费配额 | 2,000/月 |
| 超额 | ~850/月 |
| 超额成本 | $3-5/月 |

**结论**：当前方案 **超过免费配额**，需要升级或优化

---

## 三个方案对比

### 方案 A：降低查询数量 ⭐ 推荐

**成本**：$0  
**工作量**：30 分钟  
**效果**：保持关键内容，降低成本

#### 实施步骤

1. 打开 `scripts/regions.ts`
2. 每个地区减少 50% 的查询

**修改示例**：

```typescript
// 全球地区 - 从 30 个查询降至 15 个
global: {
  categories: [
    {
      name: 'Politics/US',
      category: 'politics',
      queries: [
        'US 2024 election results',      // 保留
        'Trump Biden 2025 political news' // 删除多余
      ],
    },
    {
      name: 'Sports/NFL',
      category: 'sports',
      queries: [
        'NFL playoffs Super Bowl 2025 predictions', // 保留
      ],
    },
    // ... 删除重复/低优先级的查询
  ],
},

// 印度地区 - 从 25 个查询降至 12 个
india: {
  categories: [
    {
      name: 'Sports/Cricket',
      category: 'sports',
      queries: [
        'India cricket match 2025 prediction',
        'IPL 2025 predictions cricket'
      ],
    },
    // ... 精简查询
  ],
},

// 台港地区 - 从 20 个查询降至 10 个
taiwan_hk: {
  categories: [
    {
      name: 'Politics/Taiwan',
      category: 'politics',
      queries: [
        '台灣政治 2025 預測',
        '2026選舉 預測 台灣'
      ],
    },
    // ... 精简查询
  ],
},

// 拉美地区 - 从 20 个查询降至 10 个
latam: {
  categories: [
    {
      name: 'Sports/Football',
      category: 'sports',
      queries: [
        'Brasileirão 2025 previsão campeão',
        'Copa Libertadores 2025 previsão'
      ],
    },
    // ... 精简查询
  ],
}
```

#### 预期结果

| 指标 | 之前 | 之后 | 节省 |
|------|------|------|------|
| 每日查询 | 95 | 47 | 50% |
| 每日话题 | ~20 | ~10 | 50% |
| 月请求 | ~2,850 | ~1,410 | $0 |
| **成本** | **$3-5** | **$0** | **100%** |

✅ **配额充足，零成本运行**

---

### 方案 B：升级 Brave API 付费计划

**成本**：$5-20/月  
**工作量**：5 分钟  
**效果**：无限制使用，保持完整功能

#### 升级步骤

1. 访问 https://api-dashboard.search.brave.com/
2. 选择付费计划
3. 绑定付款方式

#### 价格对比

| 计划 | 价格 | 请求数 | 适用场景 |
|------|------|--------|---------|
| Free | $0 | 2,000/月 | 测试 |
| **Basic** | **$5/月** | **50,000/月** | ⭐ 推荐 |
| Pro | $20/月 | 无限 | 大规模 |

#### 收益分析

- 基础计划足够覆盖当前需求（2,850 < 50,000）
- 留有 16x 的增长空间
- 月成本仅 $5，极低

**推荐**：升级到 Basic 计划（$5/月）

---

### 方案 C：使用替代数据源

**成本**：$0  
**工作量**：2-3 周  
**效果**：完全免费，但需要开发工作

#### 选项 1：RSS 源采集

**优点**：
- 零成本
- 速度快
- 无配额限制

**缺点**：
- 需要维护 RSS 源列表
- 信息量有限

**实施流程**：
```typescript
// 创建 scripts/rss-client.ts
import Parser from 'rss-parser';

export async function collectFromRSS(feeds: string[]) {
  const parser = new Parser();
  const topics = [];
  
  for (const feedUrl of feeds) {
    const feed = await parser.parseURL(feedUrl);
    // 从 RSS 项生成话题
  }
  
  return topics;
}
```

**推荐 RSS 源**：
- BBC News
- Reuters
- Hindustan Times
- Taiwan News
- O Globo (Brazil)

#### 选项 2：爬虫采集

**优点**：
- 完全自定义
- 无配额限制

**缺点**：
- 高度定制工作
- 可能违反网站 ToS

**建议**：仅用于开源新闻网站

#### 选项 3：Serper / SerpAPI 替代

**成本**：$0（免费额度较小，但可用）  
**速度**：快  
**质量**：接近 Brave

```typescript
// 使用 Serper API（5,000 请求/月免费）
import { Serper } from 'serper-api';

const serper = new Serper(process.env.SERPER_API_KEY);
const results = await serper.search('query');
```

---

## 快速决策框架

### 我应该选择哪个方案？

**选择方案 A 如果**：✅
- 想保持 $0 成本
- 愿意接受 ~10 话题/天
- 有时间做优化

**选择方案 B 如果**：✅
- 想保持完整功能（20 话题/天）
- 可以负担 $5/月
- 需要快速解决（推荐）

**选择方案 C 如果**：⚠️
- 有 2-3 周的开发时间
- 想完全免费运行
- 愿意维护额外系统

---

## 立即行动

### 推荐步骤（5 分钟）

```bash
# 1. 升级 Brave API 到 Basic 计划
# 访问 https://api-dashboard.search.brave.com/billing
# 选择 Basic ($5/月)

# 2. 验证无需改动代码
npm run pipeline  # 现在有充足配额了

# 3. 更新文档（可选）
# 记录升级时间和配额信息
```

### 或者降低成本（30 分钟）

```bash
# 1. 备份当前配置
git checkout -b optimize/reduce-queries

# 2. 编辑 scripts/regions.ts
# 按上面的示例降低查询数量

# 3. 测试新配置
npm run test:pipeline
npm run verify

# 4. 本地运行完整管道
npm run pipeline

# 5. 构建和验证
npm run build && npm run verify

# 6. 提交和推送
git add -A
git commit -m "optimize: reduce API queries by 50%"
git push origin optimize/reduce-queries
# 然后在 GitHub 创建 PR 审核
```

---

## 长期策略

### 第 1 阶段（现在）
- [ ] 选择方案 A 或 B
- [ ] 实施解决方案
- [ ] 验证成本

### 第 2 阶段（1 个月后）
- [ ] 监控 API 使用量
- [ ] 分析话题质量
- [ ] 如需优化，调整查询

### 第 3 阶段（3 个月后）
- [ ] 如方案 C 有价值，启动开发
- [ ] 集成替代数据源
- [ ] 实现多源混合采集

---

## 成本历史记录

```
当前月份（2025-12）：
- API 请求：~2,850
- 超额：~850
- 成本：$3-5（待支付）

下月（2026-01）预测：
方案 A：0 成本（配额充足）
方案 B：$5 成本（Basic 计划）
方案 C：0 成本（需开发）
```

---

## 常见问题

**Q: 如果选择方案 A，话题会减少吗？**  
A: 是的，从 ~20/天 降至 ~10/天。但保留了核心话题，仍能满足基本需求。

**Q: Basic 计划的 50,000/月 请求足够吗？**  
A: 足够。即使每天 100 个查询，月请求也只有 3,000。

**Q: 我能同时用多个方案吗？**  
A: 可以，但通常不必要。选择最符合需求的一个即可。

**Q: 方案 C 需要多长时间？**  
A: 2-3 周（RSS 采集），或 4-6 周（完整爬虫）。

**Q: 如果我改变主意了？**  
A: 可以随时切换，无锁定期。

---

## 建议

**最佳选择**：**方案 B（升级到 Basic 计划）**

**原因**：
1. ✅ 成本低（$5/月，仅售价一杯咖啡）
2. ✅ 0 工作量（5 分钟完成）
3. ✅ 保持完整功能（20 话题/天）
4. ✅ 增长空间大（50,000/月配额）
5. ✅ 支持增长（未来可扩展）

**立即升级**：https://api-dashboard.search.brave.com/billing

---

**成本优化完成后**，自动化管道将稳定运行，每天生成 20+ 话题，带动 SEO 流量增长。
