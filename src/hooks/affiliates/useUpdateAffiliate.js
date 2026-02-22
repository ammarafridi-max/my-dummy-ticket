import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { updateAffiliateApi } from '../../services/apiAffiliates';

export function useUpdateAffiliate() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: updateAffiliate, isLoading: isUpdatingAffiliate } = useMutation({
    mutationFn: ({ id, payload }) => updateAffiliateApi(id, payload),
    onSuccess: (affiliate) => {
      queryClient.invalidateQueries({ queryKey: ['affiliates'] });
      queryClient.setQueryData(['affiliate', affiliate?._id], affiliate);
      toast.success('Affiliate updated successfully');
      navigate('/affiliates');
    },
    onError: (error) => {
      toast.error(error.message || 'Affiliate could not be updated');
    },
  });

  return { updateAffiliate, isUpdatingAffiliate };
}
