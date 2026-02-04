import { apiFetch } from './apiClient';

const URL = `/api/blogs`;

export async function getAllBlogsApi() {
  const data = await apiFetch(`${URL}?status=published`);
  return data.blogs;
}

export async function getBlogBySlugApi(slug) {
  return await apiFetch(`${URL}/slug/${encodeURIComponent(slug)}`);
}
