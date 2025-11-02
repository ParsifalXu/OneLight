import styled from 'styled-components'
import { theme } from '../styles/theme'
import { lightFlicker, lightPulse } from '../styles/animations'
import { useNodeStore } from '../stores/useNodeStore'
import { CardNode } from './CardNode'
import { QuestionNode } from './QuestionNode'

const CanvasContainer = styled.div`
  width: 100%;
  min-height: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
`

const LoadingOverlay = styled.div<{ $isLoading: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(10, 10, 10, 0.8);
  display: ${props => props.$isLoading ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(2px);
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.lg};
`

const LightIcon = styled.div`
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, ${theme.colors.highlight} 0%, transparent 70%);
  border-radius: 50%;
  animation: ${lightFlicker} 2s ease-in-out infinite;
  position: relative;

  &::before {
    content: '💡';
    font-size: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    filter: drop-shadow(0 0 10px ${theme.colors.highlight});
  }
`

const LoadingText = styled.div`
  color: ${theme.colors.highlight};
  font-size: 1.2rem;
  font-weight: 500;
  animation: ${lightPulse} 2s ease-in-out infinite;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
`

interface NodeCanvasProps {
  isLoading: boolean
}

export function NodeCanvas({ isLoading }: NodeCanvasProps) {
  const { nodes } = useNodeStore()

  // 按创建时间排序，并组织成树形结构
  const sortedNodes = [...nodes].sort((a, b) => a.createdAt - b.createdAt)

  return (
    <CanvasContainer>
      {isLoading && (
        <LoadingOverlay $isLoading={isLoading}>
          <LoadingContainer>
            <LightIcon />
            <LoadingText>灯光闪烁，智慧涌现...</LoadingText>
          </LoadingContainer>
        </LoadingOverlay>
      )}
      {sortedNodes.map((node) => {
        if (node.type === 'card') {
          return <CardNode key={node.id} node={node} />
        } else {
          return <QuestionNode key={node.id} node={node} />
        }
      })}
      {nodes.length === 0 && !isLoading && (
        <div style={{ 
          textAlign: 'center', 
          color: theme.colors.textTertiary,
          padding: theme.spacing.xxl 
        }}>
          还没有任何内容，开始你的第一次提问吧
        </div>
      )}
    </CanvasContainer>
  )
}

