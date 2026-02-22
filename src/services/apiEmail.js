import { apiFetch } from './apiClient';

const URL = '/api/email/send-email';

export async function sendEmailApi(formData) {
  return await apiFetch(URL, {
    method: 'POST',
    body: formData,
  });
}
