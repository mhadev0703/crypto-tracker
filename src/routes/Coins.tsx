import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import DarkModeToggle from "../components/DarkModeToggle";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 600px;
    margin: 10px auto 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    position: relative;
    
    @media (max-width: 480px) {
        padding: 0 5px;
    }
`;


const CoinsList = styled.ul`
    padding-inline-start: 0px;
    margin-top: 10px;
`;

const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.nameColor};
    border-radius: 15px;
    margin-bottom: 10px;
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
    
    @media (max-width: 480px) {
        font-size: 32px;
    }
    
    @media (max-width: 320px) {
        font-size: 24px;
    }
`;

const Loader = styled.span`
    text-align: center;
    display: block;
    padding-top: 20px;
`;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

interface InfoData {
    id: string;
    name: string;
    symbol: string;
    market_cap_rank: number;
    image: string;
    description: { en: string };
    market_data: {
        current_price: {
            usd: number;
        };
        max_supply: number;
            total_supply: number;
        circulating_supply: number;
    };
}


function Coins() {
    const { isLoading, data } = useQuery<InfoData[]>({
        queryKey: ["allcoins"],
        queryFn: fetchCoins,
        select: data => data.slice(0, 50),
    });

    return (
        <Container>
            <Helmet>
                <title>CryptoTracker</title>
            </Helmet>
            <Header>
                <Title>CryptoTracker</Title>
                <DarkModeToggle />
            </Header>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <CoinsList>
                {data?.map((coin) => (
                    <Coin key={coin.id}>
                        <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                            <Img 
                                src={coin.image} 
                            />
                            {coin.name} &rarr;
                        </Link>
                    </Coin>
                ))}
            </CoinsList>
            )}
        </Container>
    );
}
export default Coins;