import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface PriceProps {
    coinId: string;
}

function Price({ coinId }: PriceProps) {
    const { isLoading, data } = useQuery<IHistorical[]>({
        queryKey: ["ohlcv", coinId], 
        queryFn: () => fetchCoinHistory(coinId),
    });
    
    return <h1>Price</h1>
}

export default Price;