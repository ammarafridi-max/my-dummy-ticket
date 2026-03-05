import { useQuery } from '@tanstack/react-query';
import { getAdminDummyTicketPricingApi } from '../../services/apiPricing';

export function useAdminDummyTicketPricing() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['admin-dummy-ticket-pricing'],
    queryFn: getAdminDummyTicketPricingApi,
  });

  return {
    pricing: data,
    isLoadingPricing: isLoading,
    isErrorPricing: isError,
    pricingError: error,
  };
}
