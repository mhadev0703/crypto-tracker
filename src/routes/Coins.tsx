import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    padding: 0px 20px;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
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

interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins() {
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const getCoins = async() => {
        const response = await axios("https://api.coinpaprika.com/v1/coins");
        setCoins(response.data.slice(0, 100));
        setLoading(false);
    };

    useEffect(() => {
        getCoins();
    });

    return (
        <Container>
            <Header>
                <Title>Coin</Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : (
                <CoinsList>
                {coins.map((coin) => (
                    <Coin key={coin.id}>
                        <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                            <Img 
                                src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} 
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