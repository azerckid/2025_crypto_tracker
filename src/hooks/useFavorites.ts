import { useState, useEffect } from 'react';
import { Coin } from '../api/coins';
import { db } from '../utils/indexedDB';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<Coin[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 초기 로드 시 IndexedDB에서 즐겨찾기 가져오기
    useEffect(() => {
        const loadFavorites = async () => {
            try {
                await db.openDB();
                const storedFavorites = await db.getAll();
                setFavorites(storedFavorites);
            } catch (error) {
                console.error('Error loading favorites:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadFavorites();
    }, []);

    // 즐겨찾기 추가
    const addFavorite = async (coin: Coin) => {
        if (favorites.length >= 5) {
            alert('즐겨찾기는 최대 5개까지만 추가할 수 있습니다.');
            return false;
        }

        try {
            const exists = await db.has(coin.id);
            if (exists) {
                alert('이미 즐겨찾기에 추가된 코인입니다.');
                return false;
            }

            await db.add(coin);
            setFavorites(prev => [...prev, coin]);
            return true;
        } catch (error) {
            console.error('Error adding favorite:', error);
            return false;
        }
    };

    // 즐겨찾기 제거
    const removeFavorite = async (coinId: string) => {
        try {
            await db.remove(coinId);
            setFavorites(prev => prev.filter(coin => coin.id !== coinId));
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    // 즐겨찾기 여부 확인
    const isFavorite = async (coinId: string) => {
        try {
            return await db.has(coinId);
        } catch (error) {
            console.error('Error checking favorite status:', error);
            return false;
        }
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