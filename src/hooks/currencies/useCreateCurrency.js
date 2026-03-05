import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createCurrencyApi } from '../../services/apiCurrencies';

export function useCreateCurrency() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createCurrency, isLoading: isCreatingCurrency } = useMutation({
    mutationFn: createCurrencyApi,
    onSuccess: () => {
      toast.success('Currency created successfully');
      queryClient.invalidateQueries({ queryKey: ['currencies'] });
      navigate('/currencies');
    },
    onError: (err) => {
      toast.error(err.message || 'Currency could not be created');
    },
  });

  return { createCurrency, isCreatingCurrency };
}
