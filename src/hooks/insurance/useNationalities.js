import { useQuery } from '@tanstack/react-query';
import { getNationalities } from '../../services/apiInsurance';
import toast from 'react-hot-toast';

export function useNationalities() {
  const { data, isLoading, error } = useQuery({
    queryFn: getNationalities,
    queryKey: ['nationalities'],
    onError: err => {
      toast.error(err.message || 'Failed to fetch nationalities');
    },
  });

  return {
    nationalities: data,
    isPendingInsuranceQuotes: isLoading,
    error,
  };
}
