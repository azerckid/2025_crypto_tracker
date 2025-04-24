import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins, Coin } from '../api/coins';
import Pagination from '../components/Pagination';

const CoinsContainer = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const CoinsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const CoinCard = styled(Link)`
  display: flex;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
  color: ${props => props.theme.colors.text};

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

const LoadingSpinner = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.error};
  padding: ${props => props.theme.spacing.xl};
  font-size: 1.2rem;
`;

const RetryButton = styled.button`
  margin-top: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const Coins = () => {
  const [page, setPage] = useState(1);
  const perPage = 20;

  const { data: coins, isLoading, isError, refetch } = useQuery<Coin[]>({
    queryKey: ['coins', page],
    queryFn: () => fetchCoins(page, perPage),
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) {
    return (
      <LoadingSpinner>
        Loading coins data...
      </LoadingSpinner>
    );
  }

  if (isError) {
    return (
      <ErrorMessage>
        <div>Error loading coins data. Please try again later.</div>
        <RetryButton onClick={() => refetch()}>Retry</RetryButton>
      </ErrorMessage>
    );
  }

  return (
    <CoinsContainer>
      <Title>Cryptocurrencies</Title>
      <CoinsList>
        {coins?.map((coin) => (
          <CoinCard key={coin.id} to={`/coins/${coin.id}`}>
            <CoinImage src={coin.image} alt={coin.name} />
            <CoinInfo>
              <CoinNameContainer>
                <CoinName>{coin.name}</CoinName>
                <CoinSymbol>{coin.symbol.toUpperCase()}</CoinSymbol>
              </CoinNameContainer>
              <CoinPrice>${coin.current_price.toLocaleString()}</CoinPrice>
              <PriceChange isPositive={coin.price_change_percentage_24h >= 0}>
                {coin.price_change_percentage_24h >= 0 ? '+' : ''}
                {coin.price_change_percentage_24h.toFixed(2)}%
              </PriceChange>
              <PriceRange>
                <HighPrice>H: ${coin.high_24h.toLocaleString()}</HighPrice>
                <LowPrice>L: ${coin.low_24h.toLocaleString()}</LowPrice>
              </PriceRange>
              <CoinRank>#{coin.market_cap_rank}</CoinRank>
            </CoinInfo>
          </CoinCard>
        ))}
      </CoinsList>

      <Pagination
        currentPage={page}
        totalPages={5}
        onPageChange={handlePageChange}
      />
    </CoinsContainer>
  );
};

export default Coins; 