import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  font-size: 2.5rem;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Message = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.2rem;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const HomeLink = styled(Link)`
  display: inline-block;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.md};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const NotFound = () => {
    return (
        <NotFoundContainer>
            <Title>404 - Page Not Found</Title>
            <Message>
                The page you are looking for might have been removed, had its name changed,
                or is temporarily unavailable.
            </Message>
            <HomeLink to="/">Go to Home</HomeLink>
        </NotFoundContainer>
    );
};

export default NotFound; 