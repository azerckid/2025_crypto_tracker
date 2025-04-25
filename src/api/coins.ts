import axios from 'axios';

// API 기본 URL
const COINGECKO_URL = 'https://api.coingecko.com/api/v3';

// 타입 정의
export interface Coin {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    price_change_percentage_24h: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
}

export interface CoinDetail {
    id: string;
    symbol: string;
    name: string;
    image: {
        thumb: string;
        small: string;
        large: string;
    };
    description: {
        en: string;
    };
    market_data: {
        current_price: {
            usd: number;
            krw: number;
        };
        ath: {
            usd: number;
            krw: number;
        };
        atl: {
            usd: number;
            krw: number;
        };
    };
}

export interface CoinPriceData {
    prices: [number, number][]; // [timestamp, price]
    market_caps: [number, number][]; // [timestamp, market_cap]
    total_volumes: [number, number][]; // [timestamp, total_volume]
}

export interface SearchResult {
    coins: {
        id: string;
        name: string;
        symbol: string;
        market_cap_rank: number;
        thumb: string;
        large: string;
    }[];
}

// API 함수
export const fetchCoins = async (page: number = 1, perPage: number = 20): Promise<Coin[]> => {
    const response = await axios.get(`${COINGECKO_URL}/coins/markets`, {
        params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: perPage,
            page: page,
            sparkline: false,
        },
    });
    return response.data;
};

export const fetchCoinDetail = async (coinId: string): Promise<CoinDetail> => {
    const response = await axios.get(`${COINGECKO_URL}/coins/${coinId}`, {
        params: {
            localization: false,
            tickers: false,
            market_data: true,
            community_data: false,
            developer_data: false,
            sparkline: false,
        },
    });
    return response.data;
};

export const fetchCoinPriceHistory = async (coinId: string): Promise<CoinPriceData> => {
    const response = await axios.get(`${COINGECKO_URL}/coins/${coinId}/market_chart`, {
        params: {
            vs_currency: 'usd',
            days: 30,
            interval: 'daily',
        },
    });
    return response.data;
};

export const searchCoins = async (query: string): Promise<SearchResult> => {
    const response = await axios.get(`${COINGECKO_URL}/search`, {
        params: {
            query,
        },
    });
    return response.data;
}; 