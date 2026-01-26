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
    }),
  });
}

export async function getInsuranceApplicationApi(sessionId) {
  return await apiFetch(`${URL}/${sessionId}`);
}

export async function downloadInsurancePolicyApi(policyId) {
  return await apiFetch(`${URL}/download/${policyId}`);
}
