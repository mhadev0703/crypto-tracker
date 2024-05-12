export interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

{/*
const BASE_URL = `https://api.coinpaprika.com/v1`

export async function fetchCoins() {
    const coins: ICoin[] = await fetch (
        `${BASE_URL}/coins`).then((response) => response.json());
    return coins.slice(0, 100);
}

export async function fetchCoinInfo(coinId: string) {
    return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
      response.json()
    );
}
 
export async function fetchCoinTickers(coinId: string) {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
      response.json()
    );
}

export async function fetchCoinHistory(coinId: string) {
    return fetch(
      `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
    ).then((response) => response.json());
}
*/}

const BASE_URL = `https://api.coingecko.com/api/v3`
const days = 14

export async function fetchCoins() {
    const coins: ICoin[] = await fetch (
      `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1`).then((response) => response.json());
    return coins.slice(0, 50);
}

export async function fetchCoinInfo(coinId: string) {
    return fetch(
        `${BASE_URL}/coins/${coinId}?localization=false`
      ).then((response) => response.json());
}

export async function fetchCoinHistory(coinId: string) {
    return fetch(
        `${BASE_URL}/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`
      ).then((response) => response.json());
}