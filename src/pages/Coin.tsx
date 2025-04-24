import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { fetchCoinDetail, CoinDetail } from '../api/coins';

const CoinContainer = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const BackButton = styled.button`
  display: inline-block;
  margin-bottom: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  border-radius: ${props => props.theme.borderRadius.md};
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }
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

const CoinHeader = styled.div`
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

const CoinDescription = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
`;

const PriceInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

const PriceCard = styled.div`
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const PriceLabel = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const PriceValue = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
`;

const Coin = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const navigate = useNavigate();

  const { data: coinDetail, isLoading: isLoadingDetail, isError: isDetailError, refetch: refetchDetail } = useQuery<CoinDetail>({
    queryKey: ['coinDetail', coinId],
    queryFn: () => fetchCoinDetail(coinId!),
    enabled: !!coinId,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoadingDetail) {
    return (
      <CoinContainer>
        <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
        <LoadingSpinner>
          Loading coin data...
        </LoadingSpinner>
      </CoinContainer>
    );
  }

  if (isDetailError) {
    return (
      <CoinContainer>
        <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
        <ErrorMessage>
          <div>Error loading coin data. Please try again later.</div>
          <RetryButton onClick={() => refetchDetail()}>Retry</RetryButton>
        </ErrorMessage>
      </CoinContainer>
    );
  }

  if (!coinDetail) {
    return (
      <CoinContainer>
        <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
        <ErrorMessage>
          <div>No data available for this coin.</div>
        </ErrorMessage>
      </CoinContainer>
    );
  }

  return (
    <CoinContainer>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <CoinHeader>
        <CoinImage src={coinDetail.image.large} alt={coinDetail.name} />
        <CoinInfo>
          <CoinName>{coinDetail.name}</CoinName>
          <CoinSymbol>{coinDetail.symbol.toUpperCase()}</CoinSymbol>
        </CoinInfo>
      </CoinHeader>

      <PriceInfo>
        <PriceCard>
          <PriceLabel>Current Price</PriceLabel>
          <PriceValue>${coinDetail.market_data.current_price.usd.toLocaleString()}</PriceValue>
        </PriceCard>
        <PriceCard>
          <PriceLabel>All Time High</PriceLabel>
          <PriceValue>${coinDetail.market_data.ath.usd.toLocaleString()}</PriceValue>
        </PriceCard>
        <PriceCard>
          <PriceLabel>All Time Low</PriceLabel>
          <PriceValue>${coinDetail.market_data.atl.usd.toLocaleString()}</PriceValue>
        </PriceCard>
      </PriceInfo>

      <CoinDescription>
        <h3>About {coinDetail.name}</h3>
        <p>{coinDetail.description.en}</p>
      </CoinDescription>
    </CoinContainer>
  );
};

export default Coin; 