import styled from 'styled-components';

const HomeContainer = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Home = () => {
    return (
        <HomeContainer>
            <Title>Welcome to Crypto Tracker</Title>
            <p>Track your favorite cryptocurrencies in real-time.</p>
        </HomeContainer>
    );
};

export default Home; 