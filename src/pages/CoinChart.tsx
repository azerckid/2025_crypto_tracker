import { useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CoinDetail, fetchCoinPriceHistory, CoinPriceData } from '../api/coins';
import PriceChart from '../components/charts/PriceChart';
import LoadingSpinner from '../components/loading/LoadingSpinner';
import ErrorMessage from '../components/error/ErrorMessage';

interface CoinContextType {
    coinDetail: CoinDetail;
}

const defaultPriceData: CoinPriceData = {
    prices: [],
    market_caps: [],
    total_volumes: []
};

const CoinChart = () => {
    const { coinDetail } = useOutletContext<CoinContextType>();
    const coinId = coinDetail.id;

    const { data: priceHistory, isLoading, isError, refetch } = useQuery<CoinPriceData, Error>({
        queryKey: ['coinPrice', coinId],
        queryFn: () => fetchCoinPriceHistory(coinId),
        retry: 1,
        staleTime: 5 * 60 * 1000,
    });

    if (isLoading) {
        return <LoadingSpinner message="Loading price history..." />;
    }

    if (isError) {
        return (
            <ErrorMessage
                message="Error loading price history. Please try again later."
                onRetry={() => refetch()}
            />
        );
    }

    return (
        <PriceChart
            priceHistory={priceHistory || defaultPriceData}
            coinName={coinDetail.name}
        />
    );
};

export default CoinChart; 