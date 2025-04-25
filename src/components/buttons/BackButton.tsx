import styled from 'styled-components';

const StyledBackButton = styled.button`
  display: inline-block;
  margin-bottom: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  border-radius: ${props => props.theme.borderRadius.md};
  text-decoration: none;
  transition: background-color 0.2s ease;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }
`;

interface BackButtonProps {
    onClick: () => void;
    children?: React.ReactNode;
}

const BackButton = ({ onClick, children = '← Back' }: BackButtonProps) => {
    return (
        <StyledBackButton onClick={onClick}>
            {children}
        </StyledBackButton>
    );
};

export default BackButton; 