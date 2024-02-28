import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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
    return (
        <Container>
            <Header>
                <Title>{ state?.name || "Loading..." }</Title>
            </Header>
            {loading ? (<Loader>Loading...</Loader>) : null}
        </Container> 
    );
}
export default Coin;