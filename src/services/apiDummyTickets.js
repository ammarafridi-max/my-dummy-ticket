import { apiFetch } from './apiClient';

const URL = '/api/ticket';

export async function getDummyTicketsApi(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const result = await apiFetch(`${URL}?${queryString}`);

  return {
    data: result.data,
    pagination: result.pagination,
    results: result.results,
  };
}

export async function getDummyTicketApi(sessionId) {
  const result = await apiFetch(`${URL}/${sessionId}`);
  return result;
}

export async function updateDummyTicketApi({ sessionId, orderStatus }) {
  const result = await apiFetch(`${URL}/${sessionId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderStatus }),
  });

  return result;
}

export async function deleteDummyTicketApi(sessionId) {
  await apiFetch(`${URL}/${sessionId}`, {
    method: 'DELETE',
  });

  return true;
}

export async function refundDummyTicketApi(transactionId) {
  const result = await apiFetch(`${URL}/${transactionId}/refund`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  console.log(result);

  return result;
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

export async function createDummyTicketApi(data) {
  return await apiFetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}
