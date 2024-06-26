import { useMatch, useLocation, useParams, Routes, Route, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo } from "../api";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 60%;
    margin: 10px auto 0 auto;
    position: relative;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
    margin: 0 auto;
`;

const Back = styled.div`
  position: absolute;
  top: 35px;
  left: 20px;
  border-radius: 10px;
  color: ${(props) => props.theme.textColor};
  padding: 8px 4px;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
  a {
    padding: 8px 4px;
  }
`;

const Loader = styled.span`
    text-align: center;
    display: block;
    padding-top: 20px;
`;

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 10px;
`;

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;

const Description = styled.p`
    margin: 20px 30px;
    line-height: 1.5;
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;

const Tab = styled.span<{ $isActive:boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 7px 0px;
    border-radius: 10px;
    color: ${props => props.$isActive ? props.theme.accentColor : props.theme.textColor};
    a {
        display: block;
    }
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
    market_cap_rank: number;
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

// Strip HTML function defined outside the component 
function stripHtml(html: string): string {
    var tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
}

function Coin() {
    
    const { coinId } = useParams() as unknown as RouteParams;
    const { state } = useLocation() as LocationState;    
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");

    const { isLoading: infoLoading, data: infoData} = useQuery<InfoData>({
        queryKey: ["coinData", coinId],
        queryFn: () => fetchCoinInfo(coinId),
    });

    const loading = infoLoading;

    return (
        <Container>
            <Helmet>
                <title>
                    {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
                </title>
            </Helmet>
            <Back>
                <Link to="/">&larr; Back</Link>
            </Back>
            <Header>
                <Title>
                    {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
                </Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.market_cap_rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>${infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price:</span>
                            <span>${infoData?.market_data.current_price.usd.toFixed(2)}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description.en ? stripHtml(infoData.description.en) : 'No description available'}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Supply:</span>
                            <span>{infoData?.market_data.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{infoData?.market_data.max_supply}</span>
                        </OverviewItem>
                    </Overview>

                    <Tabs>
                        <Tab $isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tab>
                        <Tab $isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>Price</Link>
                        </Tab>
                    </Tabs>
                    
                    <Routes>
                        <Route path="chart" element={<Chart coinId={coinId} />} />
                        <Route path="price" element={<Price coinId={coinId} />} />
                    </Routes>
                </>
            )}
        </Container> 
    );
}
export default Coin;