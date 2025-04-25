import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { useState } from 'react';
import { fetchCoinDetail, fetchCoinPriceHistory, CoinDetail, CoinPriceData } from '../api/coins';
import PriceChart from '../components/charts/PriceChart';
import CoinHeader from '../components/coins/CoinHeader';
import BackButton from '../components/buttons/BackButton';
import Tabs from '../components/tabs/Tabs';
import PriceCard from '../components/cards/PriceCard';
import LoadingSpinner from '../components/loading/LoadingSpinner';
import ErrorMessage from '../components/error/ErrorMessage';

const CoinContainer = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const PriceInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

const CoinDescription = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
`;

const ContentContainer = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
`;

const defaultPriceData: CoinPriceData = {
  prices: [],
  market_caps: [],
  total_volumes: []
};

const Coin = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'price' | 'chart'>('price');

  const { data: coinDetail, isLoading: isLoadingDetail, isError: isDetailError, refetch: refetchDetail } = useQuery<CoinDetail>({
    queryKey: ['coinDetail', coinId],
    queryFn: () => fetchCoinDetail(coinId!),
    enabled: !!coinId,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  const { data: priceHistory, isLoading: isLoadingPrice, isError: isPriceError } = useQuery<CoinPriceData, Error>({
    queryKey: ['coinPrice', coinId],
    queryFn: () => fetchCoinPriceHistory(coinId!),
    enabled: !!coinId && activeTab === 'chart',
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoadingDetail) {
    return (
      <CoinContainer>
        <BackButton onClick={() => navigate(-1)} />
        <LoadingSpinner message="Loading coin details..." />
      </CoinContainer>
    );
  }

  if (isDetailError || (activeTab === 'chart' && isPriceError)) {
    return (
      <CoinContainer>
        <BackButton onClick={() => navigate(-1)} />
        <ErrorMessage
          message="Error loading coin data. Please try again later."
          onRetry={() => refetchDetail()}
        />
      </CoinContainer>
    );
  }

  if (!coinDetail) {
    return (
      <CoinContainer>
        <BackButton onClick={() => navigate(-1)} />
        <ErrorMessage message="No data available for this coin." />
      </CoinContainer>
    );
  }

  const tabs = [
    { id: 'price', label: 'Price' },
    { id: 'chart', label: 'Chart' }
  ];

  return (
    <CoinContainer>
      <BackButton onClick={() => navigate(-1)} />
      <CoinHeader
        name={coinDetail.name}
        symbol={coinDetail.symbol}
        image={coinDetail.image.large}
      />

      <Tabs
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as 'price' | 'chart')}
        tabs={tabs}
      />

      <ContentContainer>
        {activeTab === 'price' && (
          <>
            <PriceInfo>
              <PriceCard
                label="Current Price"
                value={`$${coinDetail.market_data.current_price.usd.toLocaleString()}`}
              />
              <PriceCard
                label="All Time High"
                value={`$${coinDetail.market_data.ath.usd.toLocaleString()}`}
              />
              <PriceCard
                label="All Time Low"
                value={`$${coinDetail.market_data.atl.usd.toLocaleString()}`}
              />
            </PriceInfo>

            <CoinDescription>
              <h3>About {coinDetail.name}</h3>
              <p>{coinDetail.description.en}</p>
            </CoinDescription>
          </>
        )}

        {activeTab === 'chart' && (
          isLoadingPrice ? (
            <LoadingSpinner message="Loading price history..." />
          ) : (
            <PriceChart
              priceHistory={priceHistory || defaultPriceData}
              coinName={coinDetail.name}
            />
          )
        )}
      </ContentContainer>
    </CoinContainer>
  );
};

export default Coin; 