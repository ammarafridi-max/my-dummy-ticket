import { apiFetch } from './apiClient';

const URL = '/api/flights';

export async function getFlightsApi(formData) {
  return await apiFetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
}
