import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { CoinDetail } from '../api/coins';
import PriceCard from '../components/cards/PriceCard';

const PriceInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

const CoinDescription = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
`;

interface CoinContextType {
    coinDetail: CoinDetail;
}

const CoinPrice = () => {
    const { coinDetail } = useOutletContext<CoinContextType>();

    return (
        <>
            <PriceInfo>
                <PriceCard
                    label="Current Price"
                    value={`$${coinDetail.market_data.current_price.usd.toLocaleString()}`}
                />
                <PriceCard
                    label="All Time High"
                    value={`$${coinDetail.market_data.ath.usd.toLocaleString()}`}
                />
                <PriceCard
                    label="All Time Low"
                    value={`$${coinDetail.market_data.atl.usd.toLocaleString()}`}
                />
            </PriceInfo>

            <CoinDescription>
                <h3>About {coinDetail.name}</h3>
                <p>{coinDetail.description.en}</p>
            </CoinDescription>
        </>
    );
};

export default CoinPrice; 