import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';

const Container = styled.div`
    padding: 0px 20px;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
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

interface RouteParams {
    coinId: string;
}

interface LocationState {
    state: {
        name: string;
        rank: number;
    }
}

function Coin() {
    const [loading, setLoading] = useState(true);
    const { coinId } = useParams() as unknown as RouteParams;
    const { state } = useLocation() as LocationState;
    const [info, setInfo] = useState({});
    const [priceInfo, setPriceInfo] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const infoResponse = await axios.get(`https://api.coinpaprika.com/v1/coins/${coinId}`);
                const infoData = infoResponse.data;
                
                const priceResponse = await axios.get(`https://api.coinpaprika.com/v1/tickers/${coinId}`);
                const priceData = priceResponse.data;
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); 
            }
        };
        fetchData();
    }, []); 

    return (
        <Container>
            <Header>
                <Title>{state?.name || "Loading..."}</Title>
            </Header>
            {loading ? (<Loader>Loading...</Loader>) : null}
        </Container> 
    );
}
export default Coin;