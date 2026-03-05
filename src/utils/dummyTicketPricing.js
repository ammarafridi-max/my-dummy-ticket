import { PRICING_OPTIONS } from '../config';

export function normalizePricingOptions(pricing) {
  const source = Array.isArray(pricing?.options) && pricing.options.length > 0 ? pricing.options : PRICING_OPTIONS;

  return source
    .map((option, index) => ({
      value: option.validity || option.value,
      label: option.validity || option.label || option.value,
      price: Number(option.price),
      sortOrder: Number.isFinite(Number(option.sortOrder)) ? Number(option.sortOrder) : index,
    }))
    .filter((option) => option.value && Number.isFinite(option.price))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getTicketPriceByValidity(pricing, validity) {
  const options = normalizePricingOptions(pricing);
  const match = options.find((option) => option.value === validity);

  if (match) return match.price;

  return options[0]?.price || 0;
}
