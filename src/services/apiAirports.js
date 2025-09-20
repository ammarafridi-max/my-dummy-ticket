import { BASEURL } from '../config';

export async function getAirportsApi(query) {
  const res = await fetch(`${BASEURL}/api/airports?keyword=${query}`);

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Could not fetch airports');
  }

  const data = await res.json();

  return data?.result;
}
