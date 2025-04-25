import { useState, useEffect } from 'react';
import { Coin } from '../api/coins';

const FAVORITES_KEY = 'crypto_favorites';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<Coin[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 초기 로드 시 localStorage에서 즐겨찾기 가져오기
    useEffect(() => {
        const loadFavorites = () => {
            try {
                const storedFavorites = localStorage.getItem(FAVORITES_KEY);
                if (storedFavorites) {
                    setFavorites(JSON.parse(storedFavorites));
                }
            } catch (error) {
                console.error('Error loading favorites:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadFavorites();
    }, []);

    // 즐겨찾기 추가
    const addFavorite = (coin: Coin) => {
        if (favorites.length >= 5) {
            alert('즐겨찾기는 최대 5개까지만 추가할 수 있습니다.');
            return false;
        }

        if (favorites.some(fav => fav.id === coin.id)) {
            alert('이미 즐겨찾기에 추가된 코인입니다.');
            return false;
        }

        const newFavorites = [...favorites, coin];
        setFavorites(newFavorites);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
        return true;
    };

    // 즐겨찾기 제거
    const removeFavorite = (coinId: string) => {
        const newFavorites = favorites.filter(coin => coin.id !== coinId);
        setFavorites(newFavorites);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    };

    // 즐겨찾기 여부 확인
    const isFavorite = (coinId: string) => {
        return favorites.some(coin => coin.id === coinId);
    };

    return {
        favorites,
        isLoading,
        addFavorite,
        removeFavorite,
        isFavorite
    };
};

export default useFavorites; 