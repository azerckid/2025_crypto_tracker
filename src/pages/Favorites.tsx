import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { fetchCoins, Coin } from '../api/coins';
import CoinCard from '../components/cards/CoinCard';
import LoadingSpinner from '../components/loading/LoadingSpinner';
import ErrorMessage from '../components/error/ErrorMessage';
import useFavorites from '../hooks/useFavorites';

const FavoritesContainer = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const FavoritesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
`;

const EmptyStateTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const EmptyStateText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const BrowseButton = styled.button`
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

const Favorites = () => {
    const navigate = useNavigate();
    const { favorites, isLoading: isFavoritesLoading, removeFavorite } = useFavorites();

    // 즐겨찾기 코인의 최신 데이터 가져오기
    const { data: coins, isLoading: isCoinsLoading, isError, refetch } = useQuery<Coin[]>({
        queryKey: ['coins', 'favorites'],
        queryFn: () => fetchCoins(1, 100), // 더 많은 결과를 가져옴
        enabled: favorites.length > 0,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    // 즐겨찾기 코인의 최신 데이터 필터링
    const favoriteCoins = coins?.filter(coin =>
        favorites.some(fav => fav.id === coin.id)
    ) || [];

    const isLoading = isFavoritesLoading || (favorites.length > 0 && isCoinsLoading);

    if (isLoading) {
        return (
            <FavoritesContainer>
                <LoadingSpinner message="Loading favorites..." />
            </FavoritesContainer>
        );
    }

    if (isError) {
        return (
            <FavoritesContainer>
                <ErrorMessage
                    message="Error loading coin data. Please try again later."
                    onRetry={() => refetch()}
                />
            </FavoritesContainer>
        );
    }

    return (
        <FavoritesContainer>
            <Title>My Favorites</Title>

            {favorites.length === 0 ? (
                <EmptyStateContainer>
                    <EmptyStateTitle>No favorites yet</EmptyStateTitle>
                    <EmptyStateText>
                        Add your favorite cryptocurrencies to see them here.
                    </EmptyStateText>
                    <BrowseButton onClick={() => navigate('/coins')}>
                        Browse Coins
                    </BrowseButton>
                </EmptyStateContainer>
            ) : (
                <FavoritesList>
                    {favoriteCoins.map((coin) => (
                        <CoinCard
                            key={coin.id}
                            coin={coin}
                            isFavorite={true}
                            onToggleFavorite={() => removeFavorite(coin.id)}
                        />
                    ))}
                </FavoritesList>
            )}
        </FavoritesContainer>
    );
};

export default Favorites; 