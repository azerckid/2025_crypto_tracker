import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import { useTheme } from './contexts/ThemeContext'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md};
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  text-align: center;
`

const ThemeToggle = styled.button`
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }
`

const PageContainer = styled.div`
  background-color: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
`

function App() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Router>
      <Container>
        <Header>
          <Title>Crypto Tracker</Title>
          <ThemeToggle onClick={toggleTheme}>
            {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </ThemeToggle>
        </Header>
        <PageContainer>
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/about" element={<div>About Page</div>} />
          </Routes>
        </PageContainer>
      </Container>
    </Router>
  )
}

export default App
