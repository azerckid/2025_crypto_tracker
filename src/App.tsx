import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`
const PageContainer = styled.div`
  background-color: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  flex: 1;
`

function App() {
  return (
    <Container>
      <Header />
      <PageContainer>
        <Outlet />
      </PageContainer>
      <Footer />
    </Container>
  )
}

export default App
