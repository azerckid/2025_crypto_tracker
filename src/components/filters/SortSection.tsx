import styled from 'styled-components';

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const SortLabel = styled.label`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  white-space: nowrap;
`;

const SortSelect = styled.select`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.textSecondary};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

interface SortSectionProps {
    sortBy: string;
    onSortChange: (value: string) => void;
}

const SortSection = ({ sortBy, onSortChange }: SortSectionProps) => {
    return (
        <SortContainer>
            <SortLabel>Sort by:</SortLabel>
            <SortSelect
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
            >
                <option value="market_cap_desc">Market Cap (High to Low)</option>
                <option value="market_cap_asc">Market Cap (Low to High)</option>
                <option value="price_desc">Price (High to Low)</option>
                <option value="price_asc">Price (Low to High)</option>
                <option value="change_desc">24h Change (High to Low)</option>
                <option value="change_asc">24h Change (Low to High)</option>
            </SortSelect>
        </SortContainer>
    );
};

export default SortSection; 