import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { FaStar } from 'react-icons/fa';

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

const NavContainer = styled.nav`
  display: flex;
  gap: ${props => props.theme.spacing.md};
`;

const NavLink = styled(Link) <{ active: boolean }>`
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  text-decoration: none;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};

  &:hover {
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.primary};
  }
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
  const location = useLocation();

  return (
    <HeaderContainer>
      <Title>Crypto Tracker</Title>
      <NavContainer>
        <NavLink to="/" active={location.pathname === '/'}>
          Home
        </NavLink>
        <NavLink to="/coins" active={location.pathname === '/coins'}>
          Coins
        </NavLink>
        <NavLink to="/favorites" active={location.pathname === '/favorites'}>
          <FaStar /> Favorites
        </NavLink>
        <NavLink to="/about" active={location.pathname === '/about'}>
          About
        </NavLink>
        <ThemeToggle onClick={toggleTheme}>
          {themeMode === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </ThemeToggle>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header; 