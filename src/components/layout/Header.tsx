import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  text-align: center;
`;

const ThemeToggle = styled.button`
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const Header = () => {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <HeaderContainer>
      <Title>Crypto Tracker</Title>
      <ThemeToggle onClick={toggleTheme}>
        {themeMode === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </ThemeToggle>
    </HeaderContainer>
  );
};

export default Header; 