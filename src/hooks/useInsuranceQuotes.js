import { useMutation } from '@tanstack/react-query';
import { getQuotesApi } from '../services/apiInsurance';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useInsuranceQuotes() {
  const navigate = useNavigate();

  const {
    data: insuranceQuotes,
    mutate: getInsuranceQuotes,
    isPending: isPendingInsuranceQuotes,
    error,
  } = useMutation({
    mutationFn: ({ journeyType, startDate, endDate, region, quantity }) =>
      getQuotesApi({
        journeyType,
        startDate,
        endDate,
        region,
        quantity,
      }),
    onSuccess: data => {
      navigate('/travel-insurance/quotes', {
        state: { insuranceQuotes: data },
      });
    },
    onError: err => {
      toast.error(err.message);
      navigate('/travel-insurance');
      console.log(err.message);
    },
  });

  return {
    insuranceQuotes,
    getInsuranceQuotes, // call with payload
    isPendingInsuranceQuotes,
    error,
  };
}
