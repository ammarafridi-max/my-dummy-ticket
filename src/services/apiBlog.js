import { apiFetch } from './apiClient';

const URL = `/api/blogs`;

export async function getAllBlogsApi() {
  return await apiFetch(`${URL}?status=published`);
}

export async function getBlogBySlugApi(slug) {
  return await apiFetch(`${URL}/slug/${encodeURIComponent(slug)}`);
}
