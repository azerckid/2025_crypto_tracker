import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { fetchCoins, Coin } from '../api/coins';
import Pagination from '../components/layout/Pagination';
import CoinCard from '../components/cards/CoinCard';

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
          <CoinCard key={coin.id} coin={coin} />
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