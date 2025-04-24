import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { CoinPriceData } from '../api/coins';
import styled from 'styled-components';

const ChartContainer = styled.div`
  height: 400px;
  position: relative;
`;

interface PriceChartProps {
    priceHistory: CoinPriceData | undefined;
    coinName: string;
}

const PriceChart: React.FC<PriceChartProps> = ({ priceHistory, coinName }) => {
    // 차트 데이터 준비
    const prepareChartData = () => {
        if (!priceHistory || !priceHistory.prices || priceHistory.prices.length === 0) {
            return {
                labels: [],
                datasets: [
                    {
                        label: 'Price (USD)',
                        data: [],
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        tension: 0.1,
                        pointRadius: 0,
                        borderWidth: 2,
                    },
                ],
            };
        }

        // 데이터 포인트가 너무 많으면 일부만 표시
        const maxDataPoints = 100;
        const step = Math.max(1, Math.floor(priceHistory.prices.length / maxDataPoints));

        const filteredPrices = priceHistory.prices.filter((_, index) => index % step === 0);

        return {
            labels: filteredPrices.map(price => {
                const date = new Date(price[0]);
                return date.toLocaleDateString();
            }),
            datasets: [
                {
                    label: 'Price (USD)',
                    data: filteredPrices.map(price => price[1]),
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    tension: 0.1,
                    pointRadius: 0,
                    borderWidth: 2,
                },
            ],
        };
    };

    const chartData = prepareChartData();

    // 차트 옵션
    const chartOptions: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: `${coinName} Price Chart`,
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                ticks: {
                    callback: (value) => `$${value.toLocaleString()}`,
                },
            },
            x: {
                ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                },
            },
        },
    };

    return (
        <ChartContainer>
            <Line
                data={chartData}
                options={chartOptions}
                redraw={true}
            />
        </ChartContainer>
    );
};

export default PriceChart; 