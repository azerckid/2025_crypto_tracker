import styled from 'styled-components';

const SearchContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.textSecondary};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
  background-color: ${props => props.theme.colors.surface};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = 'Search...' }: SearchBarProps) => {
    return (
        <SearchContainer>
            <SearchInput
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </SearchContainer>
    );
};

export default SearchBar; 