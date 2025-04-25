import styled from 'styled-components';

const ErrorContainer = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.error};
  padding: ${props => props.theme.spacing.xl};
  font-size: 1.2rem;
`;

const RetryButton = styled.button`
  margin-top: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
    return (
        <ErrorContainer>
            <div>{message}</div>
            {onRetry && <RetryButton onClick={onRetry}>Retry</RetryButton>}
        </ErrorContainer>
    );
};

export default ErrorMessage; 