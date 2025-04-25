import styled from 'styled-components';

const CardContainer = styled.div`
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const PriceLabel = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const PriceValue = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
`;

interface PriceCardProps {
    label: string;
    value: string | number;
}

const PriceCard = ({ label, value }: PriceCardProps) => {
    return (
        <CardContainer>
            <PriceLabel>{label}</PriceLabel>
            <PriceValue>{value}</PriceValue>
        </CardContainer>
    );
};

export default PriceCard; 