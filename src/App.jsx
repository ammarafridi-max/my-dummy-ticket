import '@fontsource-variable/outfit';
import { useEffect } from 'react';
import { initializeGA } from './lib/analytics';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './client/app/AppRoutes';
import AdminAppRoutes from './admin/app/AdminAppRoutes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300 * 1000,
    },
  },
});

function App() {
  const isAdminPath =
    typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdminPath) return undefined;

    const init = () => initializeGA();

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(init);
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(init, 1200);
    return () => window.clearTimeout(timeoutId);
  }, [isAdminPath]);

  return (
    <HelmetProvider>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        {isAdminPath ? <AdminAppRoutes /> : <AppRoutes />}
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
