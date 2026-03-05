import { useQuery } from '@tanstack/react-query';
import { getDummyTicketPricingApi } from '../../services/apiPricing';

export function useDummyTicketPricing() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['dummy-ticket-pricing'],
    queryFn: getDummyTicketPricingApi,
  });

  return {
    pricing: data,
    isLoadingPricing: isLoading,
    isErrorPricing: isError,
    pricingError: error,
  };
}
