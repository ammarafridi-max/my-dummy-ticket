import { useMutation } from '@tanstack/react-query';
import { finalizeInsuranceApi } from '../../services/apiInsurance';
import toast from 'react-hot-toast';

export function useFinalizeInsurance() {
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      quoteId,
      schemeId,
      journeyType,
      startDate,
      endDate,
      region,
      quantity,
      passengers,
      email,
      mobile,
    }) =>
      finalizeInsuranceApi({
        quoteId,
        schemeId,
        journeyType,
        startDate,
        endDate,
        region,
        quantity,
        passengers,
        email,
        mobile,
      }),
    onError: err => {
      toast.error(err.message || 'Failed to fetch insurance quotes');
    },
    onSuccess: data => {
      window.location.assign(data.paymentUrl);
    },
  });

  return {
    finalizeInsurance: mutate,
    isFinalizing: isPending,
  };
}
