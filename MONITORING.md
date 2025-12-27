# 管道监控与维护指南

## 自动化管道状态

### GitHub Actions 配置

✅ **已配置**：
- 自动定时任务：每天 00:00 UTC
- 手动触发：可随时通过 workflow_dispatch 运行
- 环境变量：BRAVE_API_KEY, CHUTES_API_KEY 已配置到 GitHub Secrets

### 工作流程

```
每天 00:00 UTC
    ↓
Checkout → Install → Collect News → Generate Topics 
    ↓
Build Site → Verify Quality → Commit & Push
    ↓
Cloudflare Pages 自动部署
```

---

## 监控 Brave API 使用量

### API 配额信息

- **免费配额**：2,000 次请求/月
- **日均使用量**：~95 次请求
- **月均使用量**：~2,850 次请求
- **配额用尽时间**：约 21 天

### 监控方法

#### 1. 实时监控（推荐）
访问 https://api-dashboard.search.brave.com/
- 查看 "API Calls" 统计
- 观察趋势和配额剩余

#### 2. 检查 GitHub Actions 日志

打开最近的 workflow 运行：
https://github.com/marovole/dogbookseo/actions

查看 "Run pipeline" 步骤的输出：
```
📈 API Usage:
   Brave API calls: 95
   Monthly limit: 2000
   Usage: 4.8%
```

#### 3. 定期检查提交

```bash
# 查看最近 30 天的生成记录
git log --since="30 days ago" --grep="daily topics" --oneline
```

---

## 成本分析与升级选项

### 当前情况（免费方案）

| 指标 | 数值 |
|------|------|
| 月API请求 | ~2,850 |
| 免费配额 | 2,000 |
| 超额 | ~850/月 |
| 超额成本 | ~$3-5 |
| 总费用 | $0（免费配额内）|

⚠️ **注意**：当前方案超过免费配额，需要升级！

### 升级选项

#### A. 降低查询数量（零成本）

修改 `scripts/regions.ts`，减少查询：

```typescript
// 之前：每个类别 2-5 个查询
categories: [
  {
    name: 'Politics/US',
    queries: [
      'US election 2026',
      'Trump Biden politics'
    ]
  }
]

// 之后：每个类别 1 个查询
categories: [
  {
    name: 'Politics/US',
    queries: ['US election 2026']
  }
]
```

**预期效果**：
- 查询数：95 → 20/天
- 月请求：2,850 → 600
- 配额：充足（2,000/月）
- 话题数：~20/天 → ~4/天

#### B. 升级 Brave API 付费计划（最便宜）

访问 https://api-dashboard.search.brave.com/
- **Basic**: $5/月 + 超额计费
- **Pro**: $20/月 无限请求

**推荐**：Basic 计划（$5/月）

#### C. 使用替代搜索源（开源）

1. **Searxng**（自建搜索聚合）
   - 零成本
   - 支持多个搜索引擎
   - 需要自己维护服务器

2. **RSS 源直接采集**
   - 零成本
   - 速度快
   - 需要维护 RSS 源列表

---

## 常见问题排查

### Q1: GitHub Actions 没有运行

**检查清单**：
- [ ] Actions 已启用：Settings → Actions → Enable
- [ ] Secrets 已配置：Settings → Secrets and variables
- [ ] `daily.yml` 文件存在
- [ ] 仓库至少有一次有效的 push

**解决方案**：
```bash
# 手动触发一次
# 访问 https://github.com/marovole/dogbookseo/actions
# 点击 "Daily Topics Pipeline" → "Run workflow"
```

### Q2: 管道运行但没有生成新话题

**常见原因**：
1. Brave API 配额已用完
2. LLM API 调用失败
3. 搜索没有返回相关结果

**排查步骤**：
```bash
# 1. 查看最新运行日志
git log -1 --format="%b"

# 2. 检查 GitHub Actions 输出
# 访问 https://github.com/marovole/dogbookseo/actions/workflows/daily.yml

# 3. 本地测试
npm run test:pipeline  # 验证管道本身
npm run verify         # 验证生成的数据
```

### Q3: 生成的话题质量差

**改进方法**：

1. **优化 LLM 提示词** (`scripts/llm-client.ts`)
   ```typescript
   // 调整 systemPrompt 以获得更好的输出
   const systemPrompt = `You are a prediction market topic generator...`
   ```

2. **添加内容审核** (`scripts/generate.ts`)
   ```typescript
   // 检查生成的话题是否符合要求
   if (!validateTopic(topic)) {
     console.warn('Invalid topic:', topic);
     continue;
   }
   ```

3. **增加搜索查询** (`scripts/regions.ts`)
   ```typescript
   // 搜索更多相关新闻，选择最佳结果
   queries: ['US election 2026', 'Biden Trump campaign 2025', ...]
   ```

### Q4: Brave API 返回"配额已用"错误

**立即解决**：
1. 停止自动化（暂时禁用 cron）
2. 升级 API 计划
3. 或减少查询数量

**临时方案**：
```bash
# 使用测试数据，不消耗 API 配额
npm run test:pipeline
npm run build
```

---

## 日常维护任务

### 每日（自动）
- ✅ GitHub Actions 采集新话题
- ✅ 自动生成内容
- ✅ 自动构建网站
- ✅ 自动部署到 Cloudflare Pages

### 每周
- [ ] 检查 Brave API 使用量
- [ ] 查看生成的话题质量
- [ ] 检查是否有错误日志

### 每月
- [ ] 分析 API 配额用量
- [ ] 评估是否需要升级
- [ ] 检查 SEO 排名变化
- [ ] 更新搜索查询策略

### 每季度
- [ ] 分析话题数据（什么类别最受欢迎）
- [ ] 优化 LLM 提示词
- [ ] 考虑替代数据源
- [ ] 评估投资回报率（ROI）

---

## 性能优化建议

### 短期（本周）

1. **立即处理 API 成本**
   - [ ] 选择升级选项（A、B 或 C）
   - [ ] 如选择 A，更新 `scripts/regions.ts`
   - [ ] 如选择 B，升级 Brave API 计划

2. **添加监控告警**
   ```bash
   # 将以下添加到 .github/workflows/daily.yml
   - name: Alert on high API usage
     if: api_usage > 1500
     run: |
       echo "WARNING: API usage above 75%"
   ```

### 中期（本月）

1. **优化搜索策略**
   - 分析哪些查询最有效
   - 淘汰低效查询
   - 添加高质量查询

2. **改进内容质量**
   - 调整 LLM 参数
   - 添加话题验证规则
   - 实施人工审核流程

### 长期（本季度）

1. **多源采集**
   - 集成 RSS 源
   - 整合新闻 API
   - 建立爬虫系统

2. **智能调度**
   - 根据地区时区调整采集时间
   - 高峰时段增加采集频率
   - 低谷时段降低成本

---

## 紧急恢复流程

### 如果管道崩溃

```bash
# 1. 停止自动化（GitHub Actions 中禁用 cron）
# 访问 .github/workflows/daily.yml，注释掉 schedule 部分

# 2. 本地诊断
npm run verify          # 检查数据完整性
npm run test:pipeline   # 验证管道逻辑

# 3. 修复问题
# 根据错误信息修改代码

# 4. 本地测试
npm run pipeline        # 使用真实 API 测试
npm run build           # 构建验证

# 5. 恢复自动化
# 重新启用 GitHub Actions
```

### 如果需要临时回滚

```bash
# 查看最后一个好的版本
git log --oneline | head -20

# 回滚到该版本
git reset --hard <commit_hash>

# 强制推送（谨慎！）
git push origin main --force
```

---

## 文件清单

| 文件 | 用途 | 维护周期 |
|------|------|---------|
| `.github/workflows/daily.yml` | 自动化配置 | 月度 |
| `scripts/regions.ts` | 搜索配置 | 月度 |
| `scripts/llm-client.ts` | LLM 提示词 | 半月度 |
| `scripts/generate.ts` | 数据处理 | 季度 |
| `MONITORING.md` | 本文档 | 月度 |

---

## 支持与反馈

### 遇到问题？

1. **检查日志**：GitHub Actions → 最新运行 → 查看详细输出
2. **运行验证**：`npm run verify`
3. **参考文档**：`PIPELINE.md` / `QUICKSTART.md`

### 报告问题

在 GitHub Issues 中提交，包括：
- 错误信息
- 运行时间
- 最近的修改

---

**最后更新**：2025-12-27  
**维护者**：Amp AI  
**状态**：✅ 运行中
