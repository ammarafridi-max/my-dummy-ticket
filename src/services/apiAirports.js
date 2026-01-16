import { apiFetch } from './apiClient';

const URL = '/api/airports';

export async function getAirportsApi(query) {
  return await apiFetch(`${URL}?keyword=${query}`);
}
