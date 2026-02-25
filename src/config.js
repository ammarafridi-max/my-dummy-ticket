export const BACKEND = import.meta.env.VITE_BACKEND_URL;
export const VIEWTRIP_URL = import.meta.env.VITE_VIEWTRIP_BACKEND;
export const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;
export const TINYMCE_API_KEY = import.meta.env.VITE_TINYMCE_API_KEY || '';
export const CURRENCY = 'AED';
export const PRICING_OPTIONS = [
  { value: '2 Days', label: '2 Days', price: 49 },
  { value: '7 Days', label: '7 Days', price: 69 },
  { value: '14 Days', label: '14 Days', price: 79 },
];
