---
name: code-region-organizer
description: 代码区域组织规范。写入代码时自动按功能分区并添加注释分隔。确保代码按职责分组、每个区域有清晰的分隔注释、代码简洁无冗余。在编写或修改 React 组件、hooks、工具函数等代码文件时触发。
---

# 代码区域组织规范

写入代码时，必须按功能将代码划分为清晰的区域，并用统一格式的注释标记每个区域的职责。

## 核心原则

1. **按功能分区**：将代码按职责分组，每组相关代码归入同一区域
2. **注释标记区域**：每个区域顶部使用 `// ── 区域名 ──` 格式标注
3. **简洁无冗余**：每个区域的代码保持精简，不重复、不啰嗦

## 注释格式

使用全角破折号 `──` 包裹区域名称：

```ts
// ── 区域名称 ──
```

- 区域名用简短中文描述（2-6 个字为宜）
- `//` 后跟一个空格，然后是 `──`，再跟一个空格，然后是区域名，再跟一个空格和 `──`

## 区域划分指南

### React 组件内部的标准分区顺序

```tsx
const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  // ── 路由 & 上下文 ──
  const { botId } = useRobotContext()
  const history = useHistory()

  // ── 本地状态 ──
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Item[]>([])

  // ── 远程数据 ──
  const { data: listRes, mutate } = useSWR(...)

  // ── 派生数据 ──
  const filteredList = useMemo(() => data.filter(...), [data])
  const totalCount = filteredList.length

  // ── 副作用 ──
  useEffect(() => { ... }, [])

  // ── 事件处理 ──
  const handleSubmit = useCallback(() => { ... }, [])
  const handleDelete = useCallback(() => { ... }, [])

  // ── 渲染 ──
  return <div>...</div>
}
```

### 推荐的区域名称

以下是常见的区域名称，根据实际代码选择合适的：

| 区域名 | 适用场景 |
|--------|---------|
| 路由参数 / 路由 & 上下文 | useParams、useHistory、useContext 等 |
| 本地状态 | useState 声明 |
| 远程数据 | useSWR、useQuery 等数据获取 |
| 派生数据 | useMemo、计算属性 |
| Refs | useRef 声明 |
| 副作用 | useEffect |
| 回调 / 事件处理 | useCallback、事件处理函数 |
| 工具函数 | 组件内辅助函数 |
| 表格列配置 | columns 定义 |
| 表单配置 | form 相关配置 |
| 渲染辅助 | 渲染子片段的函数 |
| 渲染 | return JSX |
| 类型定义 | interface / type 声明 |
| 常量 | 文件顶部常量定义 |
| 导出 | export 语句 |

### 非组件文件的分区

#### Hook 文件
```ts
export function useMyHook(params: Params) {
  // ── 参数解析 ──
  const { id, type } = params

  // ── 状态 ──
  const [value, setValue] = useState('')

  // ── 数据请求 ──
  const { data } = useSWR(...)

  // ── 操作方法 ──
  const update = useCallback(() => { ... }, [])

  // ── 返回值 ──
  return { value, update, data }
}
```

#### 工具函数文件
```ts
// ── 类型定义 ──
interface FormatOptions { ... }

// ── 日期格式化 ──
export function formatDate(date: Date): string { ... }
export function parseDate(str: string): Date { ... }

// ── 数字格式化 ──
export function formatNumber(num: number): string { ... }
export function formatPercent(num: number): string { ... }

// ── 字符串处理 ──
export function truncate(str: string, len: number): string { ... }
```

## 规则细节

### 何时需要分区

- 文件内代码超过 **15 行**时应考虑分区
- 存在 **2 个及以上不同职责的代码块**时必须分区
- 单个区域只有 1 行代码也可以单独成区（如只有一个 useEffect）

### 何时不需要分区

- 文件内容极短（<15 行）且职责单一
- 纯类型定义文件（只有 interface/type）
- 纯常量导出文件

### 区域间的空行

- 每个区域注释的**上方**留一个空行（首个区域除外）
- 区域注释与下方代码之间**不留空行**
- 同一区域内的代码按逻辑可适当留空行

```tsx
// ── 本地状态 ──
const [name, setName] = useState('')
const [age, setAge] = useState(0)

// ── 远程数据 ──
const { data } = useSWR(...)
```

### 简洁性要求

- 一个区域内不要混入不相关的代码
- 避免在事件处理区域内写大段业务逻辑，应拆为独立函数
- 如果一个区域代码超过 30 行，考虑是否需要进一步拆分子区域或抽取为独立函数/hook
