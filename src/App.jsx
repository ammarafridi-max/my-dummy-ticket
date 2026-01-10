import { useEffect } from 'react';
import { initializeGA } from './lib/analytics';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer, Zoom } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { InsuranceProvider } from './context/InsuranceContext';
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
      <ToastContainer transition={Zoom} />
      <QueryClientProvider client={queryClient}>
        <InsuranceProvider>
          <AppRoutes />
        </InsuranceProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
