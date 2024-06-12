import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo } from "../api";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import styled, { useTheme } from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  padding-bottom: 20px;
`;

const Box = styled.div`
  background-color: ${(props) => props.theme.boxColor};
  border: 1px solid ${(props) => props.theme.accentColor};
  border-radius: 0.4rem;
  padding: 20px 16px;
  text-align: right;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  gap: 6px;
  svg {
    margin: -8px;
  }
`;
const Percentage = styled.div<{ isDecreasing: boolean }>`
  display: flex;
  flex-direction: column;
  :first-child {
    font-size: 16px;
    color: ${(props) => props.theme.textColor};
    font-weight: 450;
  }
  :last-child {
    font-size: 36px;
    font-weight: 550;
    color: ${(props) => (props.isDecreasing ? props.theme.negativeColor : props.theme.positiveColor)};
  }
`;

export interface PriceProps {
  coinId: string;
}

interface IMarketData {
  current_price: {
    usd: number;
  };
  high_24h: {
    usd: number;
  };
  low_24h: {
    usd: number;
  };
  price_change_24h: number;
  price_change_percentage_1h_in_currency: {
    usd: number;
  };
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_14d: number;
  price_change_percentage_30d: number;
  price_change_percentage_1y: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  total_supply: number;
  max_supply: number;
}
interface IInfoData {
  id: string;
  symbol: string;
  name: string;
  market_cap_rank: number;
  market_data: IMarketData;
  last_updated: string;
}


function Price({ coinId }: PriceProps) {
  const theme = useTheme();
  
  const { isLoading, data } = useQuery<IInfoData>({
    queryKey: ["info", coinId],
    queryFn: () => fetchCoinInfo(coinId),
    refetchInterval: 30 * 60 * 1000,
  });

  console.log('Data:', data);

  if (isLoading) {
    return <div>Loading Price History...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const {
    price_change_percentage_1h_in_currency,
    price_change_percentage_24h,
    price_change_percentage_7d,
    price_change_percentage_14d,
    price_change_percentage_30d,
    price_change_percentage_1y,
  } = data.market_data;

  const renderBox = (period: string, value: number) => (
    <Box key={period}>
      {value < 0 ? (
        <FaArrowDown size={64} color={theme.negativeColor} />
      ) : (
        <FaArrowUp size={64} color={theme.positiveColor} />
      )}
      <Percentage isDecreasing={value < 0}>
        <span>{period}</span>
        <span>{value.toFixed(3)}%</span>
      </Percentage>
    </Box>
  );

  return (
    <Container>
      {price_change_percentage_1h_in_currency && renderBox("1 hour", price_change_percentage_1h_in_currency.usd)}
      {renderBox("24 hours", price_change_percentage_24h)}
      {renderBox("7 days", price_change_percentage_7d)}
      {renderBox("14 days", price_change_percentage_14d)}
      {renderBox("30 days", price_change_percentage_30d)}
      {renderBox("1 year", price_change_percentage_1y)}
    </Container>
  );
}

export default Price;