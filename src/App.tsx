import styled from 'styled-components'
import { theme } from './styles/theme'
import { QuestionInput } from './components/QuestionInput'
import { NodeCanvas } from './components/NodeCanvas'
import { useUIStore } from './stores/useUIStore'

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${theme.spacing.xl};
`

const Header = styled.header`
  width: 100%;
  max-width: 1200px;
  margin-bottom: ${theme.spacing.xxl};
  text-align: center;
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 300;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${theme.colors.textSecondary};
  font-style: italic;
`

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`

function App() {
  const { isLoading, error } = useUIStore()

  return (
    <AppContainer>
      <Header>
        <Title>OneLight</Title>
        <Subtitle>千年暗室，一灯即明</Subtitle>
        <Subtitle>Even a glimmer can dispel endless darkness</Subtitle>
      </Header>
      <ContentContainer>
        <QuestionInput />
        {error && (
          <div style={{ color: theme.colors.error, textAlign: 'center' }}>
            {error}
          </div>
        )}
        <NodeCanvas isLoading={isLoading} />
      </ContentContainer>
    </AppContainer>
  )
}

export default App

