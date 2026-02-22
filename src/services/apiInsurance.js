import { BACKEND } from '../config';
import { apiFetch } from './apiClient';

const URL = `/api/insurance`;

export async function getNationalities() {
  return await apiFetch(`${URL}/nationalities`);
}

export async function getQuotesApi({ journeyType, startDate, endDate, region, quantity }) {
  return await apiFetch(`${URL}/quote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ journeyType, startDate, endDate, region, quantity }),
  });
}

export async function finalizeInsuranceApi({
  quoteId,
  schemeId,
  journeyType,
  startDate,
  endDate,
  region,
  quantity,
  passengers,
  email,
  mobile,
  address1,
  address2,
  address3,
  address4,
}) {
  return await apiFetch(`${URL}/finalize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      quoteId,
      schemeId,
      journeyType,
      startDate,
      endDate,
      region,
      quantity,
      passengers,
      email,
      mobile,
      address1,
      address2,
      address3,
      address4,
    }),
  });
}

export async function getInsuranceApplicationApi(sessionId) {
  return await apiFetch(`${URL}/${sessionId}`);
}

export async function getInsuranceApplicationsApi(params = {}) {
  const queryString = new URLSearchParams(params).toString();

  const res = await fetch(`${BACKEND}${URL}?${queryString}`, {
    credentials: 'include',
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error fetching data');
  }

  return res.json();
}

export async function confirmInsurancePaymentApi(sessionId) {
  return await apiFetch(`${URL}/confirm-payment/${sessionId}`, {
    method: 'POST',
  });
}

export async function getInsuranceDocumentsApi(policyId) {
  return await apiFetch(`${URL}/documents/${policyId}`);
}

export async function downloadInsurancePolicyApi(policyOrPayload, index = 0) {
  const policyId = typeof policyOrPayload === 'object' ? policyOrPayload?.policyId : policyOrPayload;
  const docIndex = typeof policyOrPayload === 'object' ? policyOrPayload?.index ?? 0 : index;
  return await apiFetch(`${URL}/download/${policyId}/${docIndex}`);
}

export async function deleteInsuranceApplicationApi(sessionId) {
  return await apiFetch(`${URL}/${sessionId}`, {
    method: 'DELETE',
  });
}

export async function updateInsuranceApplicationApi({ sessionId, orderStatus }) {
  return await apiFetch(`${URL}/${sessionId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderStatus }),
  });
}
