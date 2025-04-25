import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions
} from 'chart.js';
import styled from 'styled-components';
import { CoinPriceData } from '../api/coins';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ChartContainer = styled.div`
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.sm};
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoDataMessage = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.2rem;
  text-align: center;
`;

interface PriceChartProps {
    priceHistory: CoinPriceData;
    coinName: string;
}

const PriceChart = ({ priceHistory, coinName }: PriceChartProps) => {
    if (!priceHistory || !priceHistory.prices || priceHistory.prices.length === 0) {
        return (
            <ChartContainer>
                <NoDataMessage>No price data available</NoDataMessage>
            </ChartContainer>
        );
    }

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: `${coinName} Price Chart (30 Days)`,
            },
        },
        scales: {
            y: {
                type: 'linear',
                beginAtZero: false,
                ticks: {
                    callback: function (value) {
                        return `$${Number(value).toLocaleString()}`;
                    }
                }
            },
            x: {
                ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                }
            }
        }
    };

    const data = {
        labels: priceHistory.prices.map(([timestamp]) =>
            new Date(timestamp).toLocaleDateString()
        ),
        datasets: [
            {
                label: 'Price (USD)',
                data: priceHistory.prices.map(([, price]) => price),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                tension: 0.1,
            },
        ],
    };

    return (
        <ChartContainer>
            <Line options={options} data={data} />
        </ChartContainer>
    );
};

export default PriceChart; 