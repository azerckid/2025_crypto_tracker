import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  flex-wrap: wrap;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const FilterLabel = styled.label`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
`;

const FilterSelect = styled.select`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.textSecondary};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

interface FilterSectionProps {
    filters: {
        priceRange: string;
        marketCap: string;
        change24h: string;
    };
    onFilterChange: (filters: { [key: string]: string }) => void;
}

const FilterSection = ({ filters, onFilterChange }: FilterSectionProps) => {
    const handleChange = (key: string, value: string) => {
        onFilterChange({ [key]: value });
    };

    return (
        <FilterContainer>
            <FilterGroup>
                <FilterLabel>Price Range</FilterLabel>
                <FilterSelect
                    value={filters.priceRange}
                    onChange={(e) => handleChange('priceRange', e.target.value)}
                >
                    <option value="all">All Prices</option>
                    <option value="0-100">$0 - $100</option>
                    <option value="100-1000">$100 - $1,000</option>
                    <option value="1000+">$1,000+</option>
                </FilterSelect>
            </FilterGroup>

            <FilterGroup>
                <FilterLabel>Market Cap</FilterLabel>
                <FilterSelect
                    value={filters.marketCap}
                    onChange={(e) => handleChange('marketCap', e.target.value)}
                >
                    <option value="all">All Market Caps</option>
                    <option value="small">Small (&lt; $1B)</option>
                    <option value="medium">Medium ($1B - $10B)</option>
                    <option value="large">Large (&gt; $10B)</option>
                </FilterSelect>
            </FilterGroup>

            <FilterGroup>
                <FilterLabel>24h Change</FilterLabel>
                <FilterSelect
                    value={filters.change24h}
                    onChange={(e) => handleChange('change24h', e.target.value)}
                >
                    <option value="all">All Changes</option>
                    <option value="positive">Positive Only</option>
                    <option value="negative">Negative Only</option>
                </FilterSelect>
            </FilterGroup>
        </FilterContainer>
    );
};

export default FilterSection; 