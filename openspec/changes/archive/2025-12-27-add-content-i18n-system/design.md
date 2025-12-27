# Design: add-content-i18n-system

## Context
Dogbook SEO 站点需要支持 5 种语言和 4 个区域的话题内容。每个区域有其对应的语言，需要一个灵活的内容管理和国际化系统。

## Goals
- 类型安全的内容管理 (Content Collections + Zod)
- 支持区域特定的内容 (不同区域不同话题)
- UI 翻译与内容翻译分离
- 语言切换保持页面上下文

## Non-Goals
- 不实现自动翻译功能
- 不实现内容版本控制
- 不实现内容编辑后台

## Decisions

### Decision 1: Content Collections 作为内容层
- **选择**: 使用 Astro Content Collections 管理话题内容
- **原因**: 类型安全、编译时验证、与 Astro 原生集成
- **替代方案**: MDX 文件 (无 Schema 验证), JSON 文件 (不如 Content Collections 灵活)

### Decision 2: 区域-语言映射
```
Region        → Languages
global        → en
india         → hi
taiwan_hk     → zh-TW
latam         → pt, es
```
- **选择**: 区域决定可用语言，话题只包含区域相关语言
- **原因**: 减少翻译工作量，话题本地化更相关

### Decision 3: 话题 Schema 设计
```typescript
{
  slug: string,           // URL 路径标识
  region: enum,           // 区域
  category: enum,         // 分类
  locale: {               // 只包含区域语言
    [lang]: {
      title: string,
      question: string,
      description: string
    }
  },
  options: [string, string],  // 预测选项
  keywords: string[],
  status: 'active' | 'closed',
  publishedAt: Date,
  expirationDate: string,
  source: string
}
```

### Decision 4: i18n 架构
- **UI 翻译**: `src/i18n/ui.ts` - 静态 UI 文案
- **内容翻译**: 内嵌在话题数据的 `locale` 字段
- **原因**: 分离关注点，UI 翻译与内容翻译独立维护

### Decision 5: 路由结构
```
/[lang]/                    → 首页
/[lang]/topics/             → 话题列表
/[lang]/topics/[slug]       → 话题详情
```
- **选择**: 语言代码作为 URL 前缀
- **原因**: SEO 友好，符合 Google 多语言指南

### Decision 6: 语言切换逻辑
- 切换语言时保持当前页面路径
- 如果目标语言没有当前话题，重定向到话题列表
- 使用纯链接实现，无需 JavaScript

## Risks / Trade-offs

### Risk 1: 内容缺失处理
- **风险**: 某些话题可能缺少特定语言版本
- **缓解**: 在详情页检查语言版本，缺失时显示回退语言或提示

### Risk 2: 拉美双语复杂性
- **风险**: latam 区域需要同时生成 pt 和 es 两个版本
- **缓解**: 在 getStaticPaths 中为 latam 话题生成两个路由

## Open Questions
- 语言切换下拉是否需要显示语言原生名称？(建议: 是)
- 话题卡片是否需要显示区域标签？(待定)
