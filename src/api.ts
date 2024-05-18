const BASE_URL = `https://api.coingecko.com/api/v3/`;

async function fetchWithCredentials(url: string) {
  return fetch(url, {
    credentials: 'same-origin',
  }).then((response) => response.json());
}

export async function fetchCoins() {
  const url = `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1`;
  return fetchWithCredentials(url);
}

export async function fetchCoinInfo(coinId: string) {
  const url = `${BASE_URL}/coins/${coinId}?localization=false`;
  return fetchWithCredentials(url);
}

export async function fetchCoinHistory(coinId: string) {
  const url = `${BASE_URL}/coins/${coinId}/ohlc?vs_currency=usd&days=14`;
  return fetchWithCredentials(url);
}
