import styled from 'styled-components';

const SpinnerContainer = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.2rem;
`;

interface LoadingSpinnerProps {
    message?: string;
}

const LoadingSpinner = ({ message = 'Loading...' }: LoadingSpinnerProps) => {
    return (
        <SpinnerContainer>
            {message}
        </SpinnerContainer>
    );
};

export default LoadingSpinner; 