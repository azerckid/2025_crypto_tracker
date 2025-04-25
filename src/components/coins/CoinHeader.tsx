import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const CoinImage = styled.img`
  width: 64px;
  height: 64px;
  margin-right: ${props => props.theme.spacing.md};
`;

const CoinInfo = styled.div`
  flex: 1;
`;

const CoinName = styled.h3`
  margin: 0;
  color: ${props => props.theme.colors.text};
`;

const CoinSymbol = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
`;

interface CoinHeaderProps {
    name: string;
    symbol: string;
    image: string;
}

const CoinHeader = ({ name, symbol, image }: CoinHeaderProps) => {
    return (
        <HeaderContainer>
            <CoinImage src={image} alt={name} />
            <CoinInfo>
                <CoinName>{name}</CoinName>
                <CoinSymbol>{symbol.toUpperCase()}</CoinSymbol>
            </CoinInfo>
        </HeaderContainer>
    );
};

export default CoinHeader; 