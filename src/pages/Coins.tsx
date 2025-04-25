import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins, searchCoins, Coin, SearchResult } from '../api/coins';
import Pagination from '../components/layout/Pagination';
import CoinCard from '../components/cards/CoinCard';
import SearchBar from '../components/search/SearchBar';
import FilterSection from '../components/filters/FilterSection';
import SortSection from '../components/filters/SortSection';
import LoadingSpinner from '../components/loading/LoadingSpinner';
import ErrorMessage from '../components/error/ErrorMessage';
import useDebounce from '../hooks/useDebounce';

const CoinsContainer = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const CoinsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const NoResultsMessage = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.2rem;
`;

const Coins = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const perPage = 20;

  // URL 파라미터에서 검색, 필터, 정렬 상태 가져오기
  const searchQuery = searchParams.get('search') || '';
  const priceRange = searchParams.get('priceRange') || 'all';
  const marketCap = searchParams.get('marketCap') || 'all';
  const change24h = searchParams.get('change24h') || 'all';
  const sortBy = searchParams.get('sort') || 'market_cap_desc';

  // 디바운스된 검색어 (300ms 후에 업데이트)
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // 검색 쿼리
  const { data: searchResults, isLoading: isSearchLoading } = useQuery<SearchResult>({
    queryKey: ['search', debouncedSearchQuery],
    queryFn: () => searchCoins(debouncedSearchQuery),
    enabled: debouncedSearchQuery.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // 코인 목록 쿼리
  const { data: coins, isLoading: isCoinsLoading, isError, refetch } = useQuery<Coin[]>({
    queryKey: ['coins', page],
    queryFn: () => fetchCoins(page, perPage),
    enabled: debouncedSearchQuery.length === 0,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // 검색 결과에서 코인 ID 목록 추출
  const searchCoinIds = searchResults?.coins.map(coin => coin.id) || [];

  // 검색 결과에 해당하는 코인 데이터 가져오기
  const { data: searchCoinsData, isLoading: isSearchCoinsLoading } = useQuery<Coin[]>({
    queryKey: ['searchCoins', searchCoinIds],
    queryFn: async () => {
      if (searchCoinIds.length === 0) return [];
      const response = await fetchCoins(1, 100); // 더 많은 결과를 가져옴
      return response.filter(coin => searchCoinIds.includes(coin.id));
    },
    enabled: searchCoinIds.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // 가격 범위로 필터링
  const priceFilteredCoins = searchQuery.length > 0
    ? searchCoinsData?.filter(coin => {
      if (priceRange === 'all') return true;
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        return coin.current_price >= min && coin.current_price <= max;
      }
      return coin.current_price >= min;
    })
    : coins?.filter(coin => {
      if (priceRange === 'all') return true;
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        return coin.current_price >= min && coin.current_price <= max;
      }
      return coin.current_price >= min;
    });

  // 시가총액으로 필터링
  const marketCapFilteredCoins = priceFilteredCoins?.filter(coin => {
    if (marketCap === 'all') return true;
    const cap = coin.market_cap;
    switch (marketCap) {
      case 'small':
        return cap < 1e9; // 10억 달러 미만
      case 'medium':
        return cap >= 1e9 && cap < 1e10; // 10억 ~ 100억 달러
      case 'large':
        return cap >= 1e10; // 100억 달러 이상
      default:
        return true;
    }
  });

  // 24시간 변동률로 필터링
  const changeFilteredCoins = marketCapFilteredCoins?.filter(coin => {
    if (change24h === 'all') return true;
    const change = coin.price_change_percentage_24h;
    switch (change24h) {
      case 'positive':
        return change > 0;
      case 'negative':
        return change < 0;
      default:
        return true;
    }
  });

  // 정렬 적용
  const sortedCoins = [...(changeFilteredCoins || [])].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return a.current_price - b.current_price;
      case 'price_desc':
        return b.current_price - a.current_price;
      case 'market_cap_asc':
        return a.market_cap - b.market_cap;
      case 'market_cap_desc':
        return b.market_cap - a.market_cap;
      case 'change_asc':
        return (a.price_change_percentage_24h || 0) - (b.price_change_percentage_24h || 0);
      case 'change_desc':
        return (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0);
      default:
        return 0;
    }
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = (value: string) => {
    setSearchParams({ search: value });
    if (value.length === 0) {
      setPage(1); // 검색어가 없을 때 첫 페이지로 이동
    }
  };

  const handleFilterChange = (newFilters: { [key: string]: string }) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...newFilters
    });
  };

  const isLoading = isCoinsLoading || isSearchLoading || isSearchCoinsLoading;

  if (isLoading) {
    return (
      <CoinsContainer>
        <LoadingSpinner message="Loading coins data..." />
      </CoinsContainer>
    );
  }

  if (isError) {
    return (
      <CoinsContainer>
        <ErrorMessage
          message="Error loading coins data. Please try again later."
          onRetry={() => refetch()}
        />
      </CoinsContainer>
    );
  }

  return (
    <CoinsContainer>
      <Title>Cryptocurrencies</Title>

      <ControlsContainer>
        <SearchBar
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search coins..."
        />

        <FilterSection
          filters={{
            priceRange,
            marketCap,
            change24h
          }}
          onFilterChange={handleFilterChange}
        />

        <SortSection
          sortBy={sortBy}
          onSortChange={(value: string) => handleFilterChange({ sort: value })}
        />
      </ControlsContainer>

      <CoinsList>
        {sortedCoins?.length === 0 ? (
          <NoResultsMessage>
            {debouncedSearchQuery.length > 0
              ? `No coins found for "${debouncedSearchQuery}"`
              : 'No coins match the selected filters'}
          </NoResultsMessage>
        ) : (
          sortedCoins?.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))
        )}
      </CoinsList>

      {debouncedSearchQuery.length === 0 && (
        <Pagination
          currentPage={page}
          totalPages={5}
          onPageChange={handlePageChange}
        />
      )}
    </CoinsContainer>
  );
};

export default Coins; 