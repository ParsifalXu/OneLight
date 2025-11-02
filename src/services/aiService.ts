import { AIResponse, Paper } from '../types'
import { searchPapers, extractKeywords } from './paperService'

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

/**
 * 提交问题到 AI 服务并获取响应
 */
export async function submitQuestion(question: string): Promise<AIResponse> {
  // 1. 先查询相关论文（如果问题是科研相关的）
  const isResearchQuestion = detectResearchQuestion(question)
  let papers: Paper[] = []
  
  if (isResearchQuestion) {
    try {
      const keywords = extractKeywords(question)
      papers = await searchPapers(keywords, 5)
    } catch (error) {
      console.error('Error fetching papers:', error)
      // 即使论文查询失败，也继续 AI 问答
    }
  }

  // 2. 构建 AI Prompt
  const systemPrompt = buildSystemPrompt(papers)
  const userPrompt = question

  // 3. 调用 OpenAI API
  const apiKey = (import.meta.env as { VITE_OPENAI_API_KEY?: string }).VITE_OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OpenAI API Key 未配置，请在 .env.local 中设置 VITE_OPENAI_API_KEY')
  }

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error?.message || 'AI 服务调用失败')
    }

    const data = await response.json()
    const aiText = data.choices[0]?.message?.content || ''

    // 4. 解析 AI 响应，提取后续问题
    const followUpQuestions = extractFollowUpQuestions(aiText)

    return {
      text: aiText,
      followUpQuestions,
      papers: papers.length > 0 ? papers : undefined,
    }
  } catch (error) {
    console.error('Error calling OpenAI API:', error)
    throw error
  }
}

/**
 * 检测问题是否为科研相关问题
 */
function detectResearchQuestion(question: string): boolean {
  const researchKeywords = [
    '研究', '论文', '实验', '方法', '理论', '算法', '模型', '数据', '分析',
    'research', 'paper', 'study', 'experiment', 'method', 'theory', 'algorithm',
    'model', 'data', 'analysis', '论文', '发表', '作者'
  ]
  
  const lowerQuestion = question.toLowerCase()
  return researchKeywords.some(keyword => lowerQuestion.includes(keyword))
}

/**
 * 构建系统 Prompt
 */
function buildSystemPrompt(papers: Paper[]): string {
  let prompt = `你是一个专业的AI助手，擅长回答各种问题。请用中文回答。

回答要求：
1. 答案要准确、专业、易懂
2. 使用 Markdown 格式，并用 **粗体** 标记重要的专业术语
3. 如果提供了相关论文，请在回答中引用这些论文
4. 在回答末尾，生成 2-3 个相关的后续问题，用"## 后续问题"标题标注

`

  if (papers.length > 0) {
    prompt += `\n以下是相关论文信息，你可以在回答中引用：\n\n`
    papers.forEach((paper, index) => {
      prompt += `${index + 1}. ${paper.title} (${paper.authors.join(', ')}, ${paper.year})\n`
      prompt += `   摘要：${paper.abstract.substring(0, 200)}...\n\n`
    })
  }

  return prompt
}

/**
 * 从 AI 响应中提取后续问题
 */
function extractFollowUpQuestions(text: string): string[] {
  const questions: string[] = []
  
  // 查找"## 后续问题"或类似标题
  const followUpMatch = text.match(/##\s*后续问题\s*\n([\s\S]*)/i)
  
  if (followUpMatch) {
    const questionsText = followUpMatch[1]
    // 按行分割，提取问题
    const lines = questionsText.split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.match(/^[-*•]\s*$/)) // 过滤空行和列表标记
    
    lines.forEach(line => {
      // 移除列表标记
      const cleanLine = line.replace(/^[-*•]\s*/, '').replace(/^\d+\.\s*/, '').trim()
      if (cleanLine.length > 5 && cleanLine.includes('？') || cleanLine.includes('?')) {
        questions.push(cleanLine)
      }
    })
  } else {
    // 如果没有明确的后续问题部分，尝试从文本末尾提取问题
    const lines = text.split('\n').slice(-5)
    lines.forEach(line => {
      const trimmed = line.trim()
      if ((trimmed.includes('？') || trimmed.includes('?')) && trimmed.length > 10) {
        const clean = trimmed.replace(/^[-*•]\s*/, '').trim()
        if (clean.length > 10) {
          questions.push(clean)
        }
      }
    })
  }

  return questions.slice(0, 3) // 最多返回 3 个问题
}

