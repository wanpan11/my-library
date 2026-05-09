# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## 项目概述

基于 pnpm 的 monorepo，包含多个可复用的 React 工具包，发布在 `@wanp` scope 下。

## 常用命令

```bash
pnpm install              # 安装所有依赖
pnpm start                # 启动 demo 应用（Vite 开发服务器）
pnpm build                # 构建所有包
pnpm lint                 # ESLint + TypeScript 类型检查

# 测试（目前只有 useSwrData 有测试）
pnpm --filter @wanp/use-swr-data test    # 运行所有测试
npx vitest run packages/useSwrData/test/index.test.tsx  # 运行单个测试文件
```

## 架构

### Monorepo 结构

- `packages/useSwrData` — `@wanp/use-swr-data`：基于 SWR 封装的数据请求 Hook，支持普通模式和分页模式（内置 pageInfo/searchInfo 状态管理）。已发布到 npm。
- `packages/createContainer` — `create-container`：基于依赖收集的 Context 状态管理。通过观察者模式包装 React Context，消费者仅在 `setDep` 选择的状态变化时才重新渲染（浅比较）。
- `packages/cacheRoute` — `cache-route`：react-router-dom v6 的路由缓存方案，通过 `display: none` 切换保持组件挂载状态。
- `demo/` — 基于 Vite 的演示应用，用于调试所有包。

### 构建

各包使用 Rollup + `@rollup/plugin-typescript` 输出 ES 模块到 `dist/`。React 及 peer 依赖设为 external。各包共享根目录的 `tsconfig.json`（rollup 配置中引用 `../../tsconfig.json`）。

### 测试

使用 Vitest + jsdom 环境。测试通过 `@testing-library/react` 渲染组件，使用 `vi.useFakeTimers()` 处理 SWR 的异步行为。

### 代码风格

- ESLint 使用 `@antfu/eslint-config`，开启 React 支持
- 双引号、需要分号
- pre-commit 钩子通过 `lint-staged` 执行 ESLint 修复 + `tsc --noEmit` 类型检查
- **编写或修改 React 组件、hooks、工具函数等代码文件时，必须先加载 `code-region-organizer` skill，按功能分区并添加 `// ── 区域名 ──` 格式的注释分隔**
