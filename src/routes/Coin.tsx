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

interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    tags: string[];
    team: string[];
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    links: any;
    links_extended: any;
    whitepaper: any;
    first_data_at: string;
    last_data_at: string;
}

interface PriceData {

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
                console.log(infoData);
                
                const priceResponse = await axios.get(`https://api.coinpaprika.com/v1/tickers/${coinId}`);
                const priceData = priceResponse.data;
                console.log(priceData);
                setInfo(infoData);
                setPriceInfo(priceData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); 
            }
        };
        fetchData();
    }, [coinId]); 

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