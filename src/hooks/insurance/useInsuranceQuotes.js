import { useMutation } from '@tanstack/react-query';
import { getQuotesApi } from '../../services/apiInsurance';
import toast from 'react-hot-toast';

export function useInsuranceQuotes() {
  const { data, mutate, isPending, error } = useMutation({
    mutationFn: getQuotesApi,
    onError: err => {
      toast.error(err.message || 'Failed to fetch insurance quotes');
    },
  });

  return {
    insuranceQuotes: data,
    getInsuranceQuotes: mutate,
    isPendingInsuranceQuotes: isPending,
    error,
  };
}
