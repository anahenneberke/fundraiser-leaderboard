import fetch from 'isomorphic-fetch';

export const appId = 'dfc1cd72';
export const charityId = '183092';
export const baseUrl = 'https://api.justgiving.com';
export const fundraisersPath = `/${appId}/v1/charity/${charityId}/leaderboard`;

export function fetchFundraisers() {
  return fetch(baseUrl + fundraisersPath, {
      method: 'GET',
      headers: {' Content Type' : 'application/json' },
    })
    .then(errorHandler)
    .then(res => res.json())
    .then(res => res.pages)
    .then(pages => pages.map(page => ({
      amount : page.amount.toFixed(2),
      name: page.owner
    })));
}

function errorHandler(res) {
  if (!res.ok) {
    throw Error('Data Unavailable');
  }
  return res;
}
