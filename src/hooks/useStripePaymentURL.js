import { useMutation, useQuery } from '@tanstack/react-query';
import { getStripePaymentURL } from '../services/apiTickets';

export function useStripePaymentURL() {
  const {
    data: url,
    mutate: createStripePayment,
    isPending: isLoadingStripePaymentURL,
    isError: isErrorStripePaymentURL,
    error,
  } = useMutation({
    mutationFn: getStripePaymentURL,
  });

  return {
    createStripePayment,
    url,
    isLoadingStripePaymentURL,
    isErrorStripePaymentURL,
    error,
  };
}
