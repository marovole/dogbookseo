# Design: init-astro-foundation

## Context
Dogbook SEO 引流站需要一个高性能、零 JS 输出的静态站点基础架构。选择 Astro 5.x 作为框架，因为它原生支持 SSG 且可以实现零客户端 JavaScript。

## Goals
- 零 JS 输出，极致页面性能
- Lighthouse 性能分数 95+
- 页面体积 < 50KB
- 支持多语言路由结构

## Non-Goals
- 不在此阶段实现内容系统
- 不在此阶段实现多语言切换功能
- 不在此阶段实现 SEO meta 标签

## Decisions

### Decision 1: Astro 5.x + SSG
- **选择**: 使用 Astro 5.x 静态站点生成模式
- **原因**: 原生零 JS 输出，性能最优
- **替代方案**: Next.js (过重), Hugo (不支持 Content Collections)

### Decision 2: Tailwind CSS 4.x
- **选择**: 使用 Tailwind CSS 4.x 原子化 CSS
- **原因**: 极小体积，按需生成，与 Astro 完美集成
- **替代方案**: CSS Modules (更冗长), Sass (体积更大)

### Decision 3: 目录结构
```
src/
├── config/site.ts      # 站点配置
├── layouts/Base.astro  # 唯一布局
├── components/         # 可复用组件
├── pages/              # 路由页面
└── styles/global.css   # 全局样式
```

### Decision 4: 根路由重定向策略
- **选择**: 使用 meta refresh + JS fallback 重定向
- **原因**: 兼容性最好，不依赖服务端
- **实现**: `<meta http-equiv="refresh" content="0;url=/en/">`

## Risks / Trade-offs

### Risk 1: Tailwind 4.x 兼容性
- **风险**: Tailwind 4.x 是较新版本，可能存在 Astro 集成问题
- **缓解**: 使用官方 `@astrojs/tailwind` 集成，必要时降级到 3.x

### Risk 2: 零 JS 限制
- **风险**: 无法使用客户端交互功能
- **缓解**: 语言切换等功能使用纯 CSS 或服务端渲染

## Open Questions
- 是否需要支持暗色模式？(当前假设: 不需要)
- favicon 使用什么图标？(待设计提供)
