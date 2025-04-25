import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Coin } from '../../api/coins';
import { FaStar, FaRegStar } from 'react-icons/fa';

const Card = styled(Link)`
  display: flex;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
  color: ${props => props.theme.colors.text};
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const CoinImage = styled.img`
  width: 48px;
  height: 48px;
  margin-right: ${props => props.theme.spacing.md};
`;

const CoinInfo = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CoinNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 150px;
`;

const CoinName = styled.h3`
  margin: 0;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const CoinSymbol = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  font-size: 0.9rem;
`;

const CoinPrice = styled.div`
  font-weight: bold;
  min-width: 100px;
  text-align: right;
`;

const PriceChange = styled.div<{ isPositive: boolean }>`
  color: ${props => props.isPositive ? props.theme.colors.success : props.theme.colors.error};
  font-weight: bold;
  min-width: 80px;
  text-align: right;
`;

const PriceRange = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 120px;
  text-align: right;
`;

const HighPrice = styled.div`
  color: ${props => props.theme.colors.success};
  font-size: 0.9rem;
`;

const LowPrice = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: 0.9rem;
`;

const CoinRank = styled.div`
  margin-left: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  min-width: 60px;
  text-align: center;
`;

const FavoriteButton = styled.button<{ isFavorite: boolean }>`
  position: absolute;
  top: ${props => props.theme.spacing.sm};
  right: ${props => props.theme.spacing.sm};
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.isFavorite ? props.theme.colors.primary : props.theme.colors.textSecondary};
  font-size: 1.2rem;
  padding: ${props => props.theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

interface CoinCardProps {
  coin: Coin;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

const CoinCard = ({ coin, isFavorite = false, onToggleFavorite }: CoinCardProps) => {
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Link 클릭 이벤트 방지
    if (onToggleFavorite) {
      onToggleFavorite();
    }
  };

  return (
    <Card to={`/coins/${coin.id}`}>
      <FavoriteButton
        isFavorite={isFavorite}
        onClick={handleToggleFavorite}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? <FaStar /> : <FaRegStar />}
      </FavoriteButton>
      <CoinImage src={coin.image} alt={coin.name} />
      <CoinInfo>
        <CoinNameContainer>
          <CoinName>{coin.name}</CoinName>
          <CoinSymbol>{coin.symbol}</CoinSymbol>
        </CoinNameContainer>
        <CoinPrice>${coin.current_price.toLocaleString()}</CoinPrice>
        <PriceChange isPositive={coin.price_change_percentage_24h > 0}>
          {coin.price_change_percentage_24h > 0 ? '+' : ''}
          {coin.price_change_percentage_24h.toFixed(2)}%
        </PriceChange>
        <PriceRange>
          <HighPrice>H: ${coin.high_24h.toLocaleString()}</HighPrice>
          <LowPrice>L: ${coin.low_24h.toLocaleString()}</LowPrice>
        </PriceRange>
        <CoinRank>#{coin.market_cap_rank}</CoinRank>
      </CoinInfo>
    </Card>
  );
};

export default CoinCard; 