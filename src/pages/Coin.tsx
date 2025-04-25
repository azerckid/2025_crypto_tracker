import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { fetchCoinDetail, CoinDetail } from '../api/coins';
import CoinHeader from '../components/coins/CoinHeader';
import BackButton from '../components/buttons/BackButton';
import Tabs from '../components/tabs/Tabs';
import LoadingSpinner from '../components/loading/LoadingSpinner';
import ErrorMessage from '../components/error/ErrorMessage';

const CoinContainer = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const Coin = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const navigate = useNavigate();

  const { data: coinDetail, isLoading, isError, refetch } = useQuery<CoinDetail>({
    queryKey: ['coinDetail', coinId],
    queryFn: () => fetchCoinDetail(coinId!),
    enabled: !!coinId,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <CoinContainer>
        <BackButton onClick={() => navigate(-1)} />
        <LoadingSpinner message="Loading coin details..." />
      </CoinContainer>
    );
  }

  if (isError) {
    return (
      <CoinContainer>
        <BackButton onClick={() => navigate(-1)} />
        <ErrorMessage
          message="Error loading coin data. Please try again later."
          onRetry={() => refetch()}
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
    { id: 'price', label: 'Price', path: '' },
    { id: 'chart', label: 'Chart', path: 'chart' }
  ];

  const handleTabChange = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      navigate(`/coins/${coinId}/${tab.path}`);
    }
  };

  // 현재 경로에서 활성 탭 결정
  const currentPath = window.location.pathname;
  const activeTab = currentPath.includes('chart') ? 'chart' : 'price';

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
        onTabChange={handleTabChange}
        tabs={tabs}
      />

      <Outlet context={{ coinDetail }} />
    </CoinContainer>
  );
};

export default Coin; 