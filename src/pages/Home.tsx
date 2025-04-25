import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Description = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.xl};
  font-size: 1.2rem;
  line-height: 1.6;
`;

const NavigateButton = styled.button`
  display: inline-block;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1.1rem;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <Title>Welcome to Crypto Tracker</Title>
      <Description>
        Track real-time cryptocurrency prices, view detailed charts, and stay updated with the latest market trends.
      </Description>
      <NavigateButton onClick={() => navigate('/coins')}>
        View Cryptocurrency List
      </NavigateButton>
    </HomeContainer>
  );
};

export default Home; 