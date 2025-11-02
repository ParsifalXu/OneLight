import styled from 'styled-components'
import { theme } from '../styles/theme'
import { Paper } from '../types'

const PapersSection = styled.div`
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.cardBorder};
`

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.lg};
`

const PaperCard = styled.div`
  background-color: ${theme.colors.paperBackground};
  border: 1px solid ${theme.colors.paperBorder};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.md};
  transition: transform ${theme.transitions.normal}, box-shadow ${theme.transitions.normal};

  &:hover {
    transform: translateX(4px);
    box-shadow: ${theme.shadows.md};
  }
`

const PaperTitle = styled.a`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.link};
  text-decoration: none;
  display: block;
  margin-bottom: ${theme.spacing.sm};

  &:hover {
    color: ${theme.colors.linkHover};
    text-decoration: underline;
  }
`

const PaperMeta = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing.sm};
`

const PaperAbstract = styled.div`
  font-size: 0.95rem;
  color: ${theme.colors.textTertiary};
  line-height: 1.6;
  margin-top: ${theme.spacing.sm};
`

interface PaperListProps {
  papers: Paper[]
}

export function PaperList({ papers }: PaperListProps) {
  if (!papers || papers.length === 0) return null

  return (
    <PapersSection>
      <SectionTitle>📚 相关论文推荐</SectionTitle>
      {papers.map((paper, index) => (
        <PaperCard key={paper.paperId || index}>
          <PaperTitle href={paper.url} target="_blank" rel="noopener noreferrer">
            {paper.title}
          </PaperTitle>
          <PaperMeta>
            {paper.authors.join(', ')} · {paper.year}
            {paper.citationCount && ` · ${paper.citationCount} 次引用`}
            {paper.venue && ` · ${paper.venue}`}
          </PaperMeta>
          <PaperAbstract>{paper.abstract}</PaperAbstract>
        </PaperCard>
      ))}
    </PapersSection>
  )
}

