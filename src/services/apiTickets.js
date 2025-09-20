import { BASEURL } from '../config';

export async function getDummyTicketApi(sessionId) {
  const res = await fetch(`${BASEURL}/api/ticket/${sessionId}`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(
      err.message,
      'An error occurred while retrieving your data'
    );
  }

  const data = await res.json();
  return data?.data;
}

export async function getStripePaymentURL(ticketData) {
  const sessionId = localStorage.getItem('SESSION_ID');

  if (!sessionId) {
    throw new Error('Session ID is missing. Please restart the process.');
  }

  const res = await fetch(`${BASEURL}/api/ticket/buy-ticket`, {
    method: 'POST',
    body: JSON.stringify(ticketData),
    headers: { 'X-Session-ID': sessionId, 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Could not get payment URL');
  }

  const data = await res.json();
  return data?.url;
}
