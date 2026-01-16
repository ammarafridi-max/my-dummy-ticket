import { apiFetch } from './apiClient';

const URL = '/api/ticket';

export async function getDummyTicketApi(sessionId) {
  return await apiFetch(`${URL}/${sessionId}`);
}

export async function getStripePaymentURL(ticketData) {
  const sessionId = localStorage.getItem('SESSION_ID');

  if (!sessionId) {
    throw new Error('Session ID is missing. Please restart the process.');
  }

  return await apiFetch(`${URL}/checkout`, {
    method: 'POST',
    body: JSON.stringify(ticketData),
    headers: { 'X-Session-ID': sessionId, 'Content-Type': 'application/json' },
  });
}
