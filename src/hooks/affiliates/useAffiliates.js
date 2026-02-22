import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getAffiliatesApi } from '../../services/apiAffiliates';

export function useAffiliates() {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);

  const {
    data,
    isLoading: isLoadingAffiliates,
    isError: isErrorAffiliates,
  } = useQuery({
    queryKey: ['affiliates', params],
    queryFn: () => getAffiliatesApi(params),
    keepPreviousData: true,
  });

  return {
    affiliates: data?.affiliates || [],
    pagination: data?.pagination,
    isLoadingAffiliates,
    isErrorAffiliates,
  };
}
