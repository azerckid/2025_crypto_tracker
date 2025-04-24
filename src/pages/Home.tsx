import { Link } from 'react-router-dom';
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

const StyledLink = styled(Link)`
  display: inline-block;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1.1rem;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <Title>Welcome to Crypto Tracker</Title>
      <Description>
        Track real-time cryptocurrency prices, view detailed charts, and stay updated with the latest market trends.
      </Description>
      <StyledLink to="/coins">
        View Cryptocurrency List
      </StyledLink>
    </HomeContainer>
  );
};

export default Home; 