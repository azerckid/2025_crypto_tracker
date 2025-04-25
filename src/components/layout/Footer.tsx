import styled from 'styled-components';

const FooterContainer = styled.footer`
  margin-top: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
`;

const FooterLink = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const Footer = () => {
    return (
        <FooterContainer>
            <FooterContent>
                <div>© 2024 Crypto Tracker</div>
                <div>
                    <FooterLink href="https://github.com/azerckid" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </FooterLink>
                </div>
            </FooterContent>
        </FooterContainer>
    );
};

export default Footer; 