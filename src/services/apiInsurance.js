import { apiFetch } from './apiClient';

const URL = `/api/insurance`;

export async function getQuotesApi({ journeyType, startDate, endDate, region, quantity }) {
  return await apiFetch(`${URL}/quote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ journeyType, startDate, endDate, region, quantity }),
  });
}
