import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import { FaMoon, FaSun } from "react-icons/fa"; 

const Container = styled.div`
    padding: 0px 20px;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ToggleButton = styled.button`
    border: none;
    background-color: ${(props) => props.theme.textColor};
    padding: 14px;
    display: flex;
    color: ${(props) => props.theme.bgColor};
    border-radius: 15px;
    &:hover {
        cursor: pointer;
    }
    position: absolute;
    right: 0;
    margin-top: 10px;
`;

const CoinsList = styled.ul`
    padding-inline-start: 0px;
`;

const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.bgColor};
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
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
    const isDark = useRecoilValue(isDarkAtom);
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
                <ToggleButton onClick={toggleDarkAtom}>
                  {isDark ? <FaSun /> : <FaMoon />}
                </ToggleButton>
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