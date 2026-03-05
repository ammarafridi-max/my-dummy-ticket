import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { updateCurrencyApi } from '../../services/apiCurrencies';

export function useUpdateCurrency() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: updateCurrency, isLoading: isUpdatingCurrency } = useMutation({
    mutationFn: ({ code, currencyData }) => updateCurrencyApi(code, currencyData),
    onSuccess: (_, variables) => {
      toast.success('Currency updated successfully');
      queryClient.invalidateQueries({ queryKey: ['currencies'] });
      queryClient.invalidateQueries({ queryKey: ['currency', variables.code] });
      navigate('/currencies');
    },
    onError: (err) => {
      toast.error(err.message || 'Currency could not be updated');
    },
  });

  return { updateCurrency, isUpdatingCurrency };
}
