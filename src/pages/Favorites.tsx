import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { fetchCoins } from '../api/coins';
import { useFavorites } from '../hooks/useFavorites';
import CoinCard from '../components/cards/CoinCard';
import LoadingSpinner from '../components/loading/LoadingSpinner';
import ErrorMessage from '../components/error/ErrorMessage';

const Container = styled.div`
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

const EmptyMessage = styled.div`
    text-align: center;
    padding: ${props => props.theme.spacing.xl};
    color: ${props => props.theme.colors.textSecondary};
    font-size: 1.2rem;
`;

const Favorites = () => {
    const { favorites, isLoading: isFavoritesLoading } = useFavorites();

    // 즐겨찾기 코인의 최신 데이터 가져오기
    const { data: updatedCoins, isLoading: isCoinsLoading, isError, refetch } = useQuery({
        queryKey: ['favoriteCoins', favorites.map(f => f.id)],
        queryFn: () => fetchCoins(1, 100),
        enabled: favorites.length > 0
    });

    const favoriteCoins = updatedCoins?.filter(coin =>
        favorites.some(fav => fav.id === coin.id)
    ) || [];

    const isLoading = isFavoritesLoading || (favorites.length > 0 && isCoinsLoading);

    if (isLoading) {
        return (
            <Container>
                <LoadingSpinner message="Loading favorites..." />
            </Container>
        );
    }

    if (isError) {
        return (
            <Container>
                <ErrorMessage
                    message="Error loading coin data. Please try again later."
                    onRetry={() => refetch()}
                />
            </Container>
        );
    }

    return (
        <Container>
            <Title>My Favorites</Title>
            {favorites.length === 0 ? (
                <EmptyMessage>
                    No favorite coins yet. Add some coins to your favorites!
                </EmptyMessage>
            ) : (
                <CoinsList>
                    {favoriteCoins.map((coin) => (
                        <CoinCard
                            key={coin.id}
                            coin={coin}
                        />
                    ))}
                </CoinsList>
            )}
        </Container>
    );
};

export default Favorites; 