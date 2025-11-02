import { useState } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import { useUIStore } from '../stores/useUIStore'
import { useNodeStore } from '../stores/useNodeStore'
import { submitQuestion } from '../services/aiService'

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
`

const SearchInput = styled.input`
  flex: 1;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background-color: ${theme.colors.backgroundSecondary};
  border: 1px solid ${theme.colors.cardBorder};
  border-radius: ${theme.borderRadius.lg};
  color: ${theme.colors.text};
  font-size: 1rem;
  transition: border-color ${theme.transitions.normal};

  &:focus {
    outline: none;
    border-color: ${theme.colors.highlight};
  }

  &::placeholder {
    color: ${theme.colors.textTertiary};
  }
`

const SubmitButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background-color: ${theme.colors.highlight};
  color: ${theme.colors.background};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color ${theme.transitions.normal};

  &:hover:not(:disabled) {
    background-color: ${theme.colors.highlightSecondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export function QuestionInput() {
  const [question, setQuestion] = useState('')
  const { isLoading, setLoading } = useUIStore()
  const { addNode } = useNodeStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const trimmedQuestion = question.trim()
    if (!trimmedQuestion) {
      return
    }

    setLoading(true)
    try {
      const response = await submitQuestion(trimmedQuestion)
      
      // 创建卡片节点
      const cardNode = {
        id: `card-${Date.now()}`,
        type: 'card' as const,
        content: {
          text: response.text,
          images: response.images,
          terms: response.terms,
          papers: response.papers,
        },
        createdAt: Date.now(),
      }
      addNode(cardNode)

      // 创建问题节点
      if (response.followUpQuestions && response.followUpQuestions.length > 0) {
        response.followUpQuestions.forEach((followUp, index) => {
          const questionNode = {
            id: `question-${Date.now()}-${index}`,
            type: 'question' as const,
            content: {
              text: followUp,
            },
            parentId: cardNode.id,
            createdAt: Date.now(),
          }
          addNode(questionNode)
        })
      }

      setQuestion('')
    } catch (error) {
      console.error('Error submitting question:', error)
      useUIStore.getState().setError('提交问题失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputContainer>
        <SearchInput
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="输入你的问题，探索知识的奥秘..."
          disabled={isLoading}
          maxLength={500}
        />
        <SubmitButton type="submit" disabled={isLoading || !question.trim()}>
          {isLoading ? '思考中...' : '提问'}
        </SubmitButton>
      </InputContainer>
    </form>
  )
}

