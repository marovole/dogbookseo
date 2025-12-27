# Design: add-data-pipeline

## Context
Dogbook SEO 站点需要每日自动采集 20 个热点话题，覆盖 4 个区域，每个区域约 5 个话题。使用 Brave Search 免费层 (2000 次/月) 获取新闻，Chutes LLM (DeepSeek V3) 生成预测问题。

## Goals
- 每日自动采集 20 个话题
- 控制 Brave API 用量在免费额度内 (~750 次/月)
- 生成类型安全的 Content Collection 内容
- 避免重复话题

## Non-Goals
- 不实现实时采集
- 不实现内容审核系统
- 不实现话题过期自动处理

## Decisions

### Decision 1: Brave Search API
- **选择**: 使用 Brave Search API 作为新闻源
- **原因**: 免费层 2000 次/月足够使用，无需 Google API 付费
- **替代方案**: Google Custom Search (付费), NewsAPI (限制更多)

### Decision 2: Chutes + DeepSeek V3
- **选择**: 使用 Chutes 平台调用 DeepSeek V3
- **原因**: 订阅内使用，成本固定，中文能力强
- **替代方案**: OpenAI (更贵), Claude (更贵)

### Decision 3: 流水线架构
```
Brave Search → Raw CSV → LLM Processing → MDX Files → Content Collections
```
- **选择**: 两阶段流程，中间存储 CSV
- **原因**: 便于调试，可以单独重跑 LLM 生成步骤

### Decision 4: LLM Prompt 设计
```
输入: 新闻标题 + 摘要
输出: {
  slug, title, question, description, 
  options, keywords, expirationDate, category
}
```
- LLM 负责: 生成预测问题、确定过期时间、提取关键词
- 代码负责: 区域/语言分配、Schema 验证、去重

### Decision 5: 去重策略
- **基于 slug**: 使用 slug 作为唯一标识符
- **存储**: `data/processed.json` 记录所有已生成的 slug
- **检查时机**: 生成 MDX 之前检查

### Decision 6: API 用量优化
- 每区域每天 ~6 次搜索
- 总计 ~25 次/天 × 30 天 = 750 次/月
- 安全边际: 使用率 37.5% (750/2000)

### Decision 7: 数据流
```
scripts/
├── regions.ts        # 区域配置 (静态)
├── brave-client.ts   # Brave API 封装
├── llm-client.ts     # Chutes API 封装
├── collect.ts        # 采集逻辑
├── generate.ts       # MDX 生成
└── pipeline.ts       # 主入口

data/
├── raw/              # 原始 CSV (按区域/日期)
│   ├── global_2025-12-27.csv
│   ├── india_2025-12-27.csv
│   └── ...
└── processed.json    # 已处理记录
```

## Risks / Trade-offs

### Risk 1: LLM 输出不一致
- **风险**: LLM 可能输出格式不符合预期
- **缓解**: 使用 JSON mode，添加输出验证和重试逻辑

### Risk 2: Brave API 额度耗尽
- **风险**: 如果超过免费额度，采集会失败
- **缓解**: 添加用量计数器，接近限额时发出警告

### Risk 3: 新闻源质量
- **风险**: 某些搜索结果可能不适合生成预测话题
- **缓解**: LLM 提示中加入话题筛选指令，跳过不适合的结果

## Open Questions
- 是否需要人工审核生成的话题？(当前假设: 不需要)
- 话题过期后如何处理？(待定: 可能标记为 closed)
