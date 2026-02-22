import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { seedAffiliatesApi } from '../../services/apiAffiliates';

export function useSeedAffiliates() {
  const queryClient = useQueryClient();

  const { mutate: seedAffiliates, isLoading: isSeedingAffiliates } = useMutation({
    mutationFn: seedAffiliatesApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['affiliates'] });
      toast.success('5 affiliate test records created');
    },
    onError: (error) => {
      toast.error(error.message || 'Could not seed affiliates');
    },
  });

  return { seedAffiliates, isSeedingAffiliates };
}
