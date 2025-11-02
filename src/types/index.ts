// 论文数据结构
export interface Paper {
  title: string;
  authors: string[];
  year: number;
  abstract: string;
  url: string;
  citationCount?: number;
  venue?: string;
  paperId?: string; // Semantic Scholar paperId
}

// 节点数据结构
export interface Node {
  id: string;
  type: 'card' | 'question';
  content: {
    text?: string;
    images?: string[];
    terms?: string[];
    followUpQuestions?: string[];
    papers?: Paper[];
  };
  parentId?: string;
  childrenIds?: string[];
  position?: { x: number; y: number };
  createdAt: number;
}

// AI 响应类型
export interface AIResponse {
  text: string;
  images?: string[];
  terms?: string[];
  followUpQuestions?: string[];
  papers?: Paper[];
}

// UI 状态类型
export interface UIState {
  isLoading: boolean;
  error: string | null;
}

