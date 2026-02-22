import { useQuery } from '@tanstack/react-query';
import { getAffiliateTicketsApi } from '../../services/apiAffiliates';

export function useAffiliateTickets(id, params = {}) {
  const {
    data,
    isLoading: isLoadingAffiliateTickets,
    isError: isErrorAffiliateTickets,
  } = useQuery({
    queryKey: ['affiliate-tickets', id, params],
    queryFn: () => getAffiliateTicketsApi(id, params),
    enabled: Boolean(id),
    keepPreviousData: true,
  });

  return {
    tickets: data?.tickets || [],
    pagination: data?.pagination,
    isLoadingAffiliateTickets,
    isErrorAffiliateTickets,
  };
}
