export const baseURL =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_BACKEND_URL_DEV
    : import.meta.env.VITE_BACKEND_URL_PROD;
