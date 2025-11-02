import styled from 'styled-components'
import { theme } from '../styles/theme'
import { slideIn } from '../styles/animations'
import { Node } from '../types'
import { useUIStore } from '../stores/useUIStore'
import { useNodeStore } from '../stores/useNodeStore'
import { submitQuestion } from '../services/aiService'

const QuestionContainer = styled.div`
  background-color: ${theme.colors.questionBackground};
  border: 1px solid ${theme.colors.questionBorder};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  cursor: pointer;
  transition: all ${theme.transitions.normal};
  margin-left: ${theme.spacing.xl};
  position: relative;
  animation: ${slideIn} 0.4s ease-out;

  &::before {
    content: '';
    position: absolute;
    left: -${theme.spacing.xl};
    top: 50%;
    width: ${theme.spacing.xl};
    height: 1px;
    background: linear-gradient(to right, ${theme.colors.questionBorder}, transparent);
  }

  &:hover {
    background-color: ${theme.colors.questionHover};
    border-color: ${theme.colors.highlight};
    transform: translateX(4px);
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.2);
  }
`

const QuestionText = styled.div`
  color: ${theme.colors.text};
  font-size: 1rem;
  line-height: 1.6;
`

interface QuestionNodeProps {
  node: Node
}

export function QuestionNode({ node }: QuestionNodeProps) {
  const { setLoading } = useUIStore()
  const { addNode, updateNode } = useNodeStore()

  const handleClick = async () => {
    if (!node.content.text) return

    setLoading(true)
    try {
      // 将问题节点转换为卡片节点
      const response = await submitQuestion(node.content.text)
      
      updateNode(node.id, {
        type: 'card',
        content: {
          text: response.text,
          images: response.images,
          terms: response.terms,
          papers: response.papers,
        },
      })

      // 创建新的问题节点
      if (response.followUpQuestions && response.followUpQuestions.length > 0) {
        response.followUpQuestions.forEach((followUp, index) => {
          const questionNode = {
            id: `question-${Date.now()}-${index}`,
            type: 'question' as const,
            content: {
              text: followUp,
            },
            parentId: node.id,
            createdAt: Date.now(),
          }
          addNode(questionNode)
        })
      }
    } catch (error) {
      console.error('Error submitting question:', error)
      useUIStore.getState().setError('提交问题失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <QuestionContainer onClick={handleClick}>
      <QuestionText>{node.content.text}</QuestionText>
    </QuestionContainer>
  )
}

