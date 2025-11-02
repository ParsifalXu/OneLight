import { Paper } from '../types'

// Semantic Scholar API 响应类型
interface SemanticScholarPaper {
  paperId: string;
  title: string;
  year?: number;
  authors: Array<{ name: string }>;
  abstract?: string;
  citationCount?: number;
  venue?: string;
  url?: string;
  externalIds?: {
    ArXiv?: string;
    DOI?: string;
  };
}

interface SemanticScholarResponse {
  data: SemanticScholarPaper[];
}

/**
 * 从 Semantic Scholar API 查询论文
 */
export async function searchPapers(query: string, limit: number = 5): Promise<Paper[]> {
  try {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodedQuery}&limit=${limit}&fields=title,year,authors,abstract,citationCount,venue,url,externalIds`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Semantic Scholar API error: ${response.status}`);
    }

    const data: SemanticScholarResponse = await response.json();
    
    return data.data.map((paper): Paper => ({
      title: paper.title,
      authors: paper.authors.map(a => a.name),
      year: paper.year || new Date().getFullYear(),
      abstract: paper.abstract || '摘要不可用',
      url: paper.url || `https://www.semanticscholar.org/paper/${paper.paperId}`,
      citationCount: paper.citationCount,
      venue: paper.venue,
      paperId: paper.paperId,
    }));
  } catch (error) {
    console.error('Error searching papers:', error);
    // 返回空数组，不中断流程
    return [];
  }
}

/**
 * 从问题中提取关键词（简单实现，后续可优化）
 */
export function extractKeywords(question: string): string {
  // 移除常见的疑问词和停用词
  const stopWords = ['什么', '怎么', '如何', '为什么', '是', '的', '了', '吗', '呢', 'what', 'how', 'why', 'is', 'the', 'a', 'an'];
  
  // 简单的关键词提取：取前几个重要词汇
  const words = question
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.includes(word));
  
  // 返回前 3-5 个关键词的组合
  return words.slice(0, 5).join(' ');
}

