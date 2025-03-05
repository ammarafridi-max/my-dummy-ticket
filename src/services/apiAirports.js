import { baseURL } from '../config';

export async function fetchAirports(keyword) {
  const res = await fetch(`${baseURL}/api/airports?keyword=${keyword}`);
  if (!res.ok) throw new Error('Could not fetch airports');
  const data = await res.json();
  return data;
}
