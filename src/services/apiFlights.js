import { BACKEND } from '../config';

export async function getFlightsApi(formData) {
  const response = await fetch(`${BACKEND}/api/flights`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Failed to fetch flights');
  }

  const data = await response.json();
  return data?.flights;
}
