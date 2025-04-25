import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Coin } from '../../api/coins';
import { useFavorites } from '../../hooks/useFavorites';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { useState, useEffect } from 'react';

interface CoinCardProps {
  coin: Coin;
}

const Card = styled.div`
    background-color: ${props => props.theme.colors.cardBg};
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: translateY(-2px);
    }
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

const CoinInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const CoinImage = styled.img`
    width: 32px;
    height: 32px;
`;

const CoinName = styled.h3`
    margin: 0;
    color: ${props => props.theme.colors.text};
    font-size: 1.1rem;
`;

const CoinSymbol = styled.span`
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.9rem;
`;

const FavoriteButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: ${props => props.theme.colors.primary};
    font-size: 1.2rem;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }
`;

const CardBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const PriceInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const Price = styled.span`
    font-size: 1.2rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
`;

const PriceChange = styled.span<{ isPositive: boolean }>`
    color: ${props => props.isPositive ? props.theme.colors.success : props.theme.colors.danger};
    font-weight: 500;
`;

const MarketCap = styled.span`
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.9rem;
`;

const CoinCard = ({ coin }: CoinCardProps) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [isCurrentlyFavorite, setIsCurrentlyFavorite] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const status = await isFavorite(coin.id);
      setIsCurrentlyFavorite(status);
    };
    checkFavoriteStatus();
  }, [coin.id, isFavorite]);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Link 클릭 이벤트 방지
    try {
      if (isCurrentlyFavorite) {
        await removeFavorite(coin.id);
        setIsCurrentlyFavorite(false);
      } else {
        const success = await addFavorite(coin);
        if (success) {
          setIsCurrentlyFavorite(true);
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <Link to={`/coins/${coin.id}`} style={{ textDecoration: 'none' }}>
      <Card>
        <CardHeader>
          <CoinInfo>
            <CoinImage src={coin.image} alt={coin.name} />
            <CoinName>{coin.name}</CoinName>
            <CoinSymbol>{coin.symbol.toUpperCase()}</CoinSymbol>
          </CoinInfo>
          <FavoriteButton onClick={handleFavoriteClick}>
            {isCurrentlyFavorite ? <FaStar /> : <FaRegStar />}
          </FavoriteButton>
        </CardHeader>
        <CardBody>
          <PriceInfo>
            <Price>${coin.current_price.toLocaleString()}</Price>
            <PriceChange isPositive={coin.price_change_percentage_24h > 0}>
              {coin.price_change_percentage_24h > 0 ? '+' : ''}
              {coin.price_change_percentage_24h.toFixed(2)}%
            </PriceChange>
          </PriceInfo>
          <MarketCap>
            Market Cap: ${coin.market_cap.toLocaleString()}
          </MarketCap>
        </CardBody>
      </Card>
    </Link>
  );
};

export default CoinCard; 