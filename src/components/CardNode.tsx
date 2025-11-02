import styled from 'styled-components'
import { theme } from '../styles/theme'
import { fadeIn } from '../styles/animations'
import { Node } from '../types'
import ReactMarkdown from 'react-markdown'
import { PaperList } from './PaperList'

const CardContainer = styled.div`
  background-color: ${theme.colors.cardBackground};
  border: 1px solid ${theme.colors.cardBorder};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.lg};
  transition: transform ${theme.transitions.normal}, box-shadow ${theme.transitions.normal};
  animation: ${fadeIn} 0.5s ease-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg}, 0 0 20px rgba(255, 215, 0, 0.1);
  }
`

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
`

const CardContent = styled.div`
  color: ${theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: ${theme.spacing.lg};

  p {
    margin-bottom: ${theme.spacing.md};
  }

  /* Markdown 样式 */
  strong {
    color: ${theme.colors.highlight};
    font-weight: 600;
  }

  code {
    background-color: ${theme.colors.backgroundTertiary};
    padding: 2px 6px;
    border-radius: ${theme.borderRadius.sm};
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
  }

  pre {
    background-color: ${theme.colors.backgroundTertiary};
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.md};
    overflow-x: auto;
    margin: ${theme.spacing.md} 0;
  }
`

interface CardNodeProps {
  node: Node
}

export function CardNode({ node }: CardNodeProps) {
  return (
    <CardContainer>
      {node.content.text && (
        <>
          <CardTitle>回答</CardTitle>
          <CardContent>
            <ReactMarkdown>{node.content.text}</ReactMarkdown>
          </CardContent>
        </>
      )}
      {node.content.papers && node.content.papers.length > 0 && (
        <PaperList papers={node.content.papers} />
      )}
    </CardContainer>
  )
}

