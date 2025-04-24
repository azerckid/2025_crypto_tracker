import styled from 'styled-components';

const AboutContainer = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const About = () => {
    return (
        <AboutContainer>
            <Title>About Crypto Tracker</Title>
            <p>This application helps you track cryptocurrency prices and market trends in real-time.</p>
        </AboutContainer>
    );
};

export default About; 