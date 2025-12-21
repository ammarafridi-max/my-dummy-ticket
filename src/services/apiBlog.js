import { BACKEND } from '../config';
import { apiFetch } from './apiClient';

const URL = `/api/blogs`;

export async function getAllBlogsApi() {
  return await apiFetch(URL);
}

export function getBlogBySlugApi(slug) {
  return apiFetch(`${URL}/slug/${encodeURIComponent(slug)}`);
}
