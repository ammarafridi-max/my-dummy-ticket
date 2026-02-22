import { apiFetch } from './apiClient';

const URL = '/api/auth/login';

export async function loginApi(credentials) {
  return await apiFetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
}
