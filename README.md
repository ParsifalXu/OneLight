# OneLight

千年暗室，一灯即明  
Even a glimmer can dispel endless darkness

## 项目简介

OneLight 是一个 AI 驱动的问答界面系统，特别为科研人员设计。系统通过接入论文引用数据库，能够提出更专业的科研问题，并提供高质量的相关论文链接和介绍。

## 核心功能

- 🤖 AI 问答：基于 OpenAI GPT 的智能问答
- 📚 论文推荐：自动查询并推荐相关学术论文
- 🎨 卡片式展示：直观的节点式内容展示
- 🔗 交互式探索：通过问题节点深度探索主题
- 🌙 暗色主题：符合"千年暗室，一灯即明"的设计理念

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **状态管理**: Zustand
- **样式方案**: styled-components
- **Markdown 渲染**: react-markdown
- **AI 服务**: OpenAI API
- **论文数据库**: Semantic Scholar API

## 快速开始

### 安装依赖

```bash
npm install
```

### 配置环境变量

复制 `.env.example` 为 `.env.local` 并填入你的 OpenAI API Key：

```bash
cp .env.example .env.local
```

在 `.env.local` 中设置：

```
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

## 项目结构

```
src/
├── components/     # React 组件
├── services/      # 服务层（AI、论文数据库等）
├── stores/         # Zustand 状态管理
├── styles/         # 样式定义
└── types/          # TypeScript 类型定义
```

## 开发规范

- 使用 TypeScript 进行类型安全
- 遵循 ESLint 代码规范
- 使用 styled-components 进行样式管理
- 组件使用函数式组件 + Hooks

## License

MIT
