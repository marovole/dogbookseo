# Change: Add Data Collection Pipeline

## Why
Dogbook SEO 站点需要自动化的数据采集流水线，每日从新闻源获取热点话题，通过 LLM 生成预测问题，并转换为网站内容。

## What Changes
- 创建 Brave Search API 客户端用于话题采集
- 创建 Chutes LLM API 客户端用于内容生成
- 配置区域搜索查询 (`regions.ts`)
- 实现采集脚本 (`collect.ts`)
- 实现 MDX 生成脚本 (`generate.ts`)
- 创建完整流水线脚本 (`pipeline.ts`)
- 实现去重策略和已处理记录管理

## Impact
- Affected specs: `brave-search`, `llm-generation`, `pipeline`
- Affected code:
  - `scripts/brave-client.ts`
  - `scripts/llm-client.ts`
  - `scripts/regions.ts`
  - `scripts/collect.ts`
  - `scripts/generate.ts`
  - `scripts/pipeline.ts`
  - `data/raw/` (CSV 输出目录)
  - `data/processed.json`
  - `package.json` (scripts)

## Dependencies
- 依赖提案 `add-content-i18n-system` 完成 (需要 Content Schema)

## Environment Variables Required
- `BRAVE_API_KEY` - Brave Search API 密钥
- `CHUTES_API_KEY` - Chutes LLM API 密钥
- `CHUTES_MODEL` - LLM 模型标识 (默认: `deepseek-ai/DeepSeek-V3-0324`)
