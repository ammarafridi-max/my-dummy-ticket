import "@fontsource-variable/outfit";
import { useEffect } from 'react';
import { initializeGA } from './lib/analytics';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './app/AppRoutes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300 * 1000,
    },
  },
});

function App() {
  useEffect(() => {
    initializeGA();
  }, []);

  return (
    <HelmetProvider>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
