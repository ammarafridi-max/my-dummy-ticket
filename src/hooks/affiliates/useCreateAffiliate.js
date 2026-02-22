import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createAffiliateApi } from '../../services/apiAffiliates';

export function useCreateAffiliate() {
  const navigate = useNavigate();

  const { mutate: createAffiliate, isLoading: isCreatingAffiliate } = useMutation({
    mutationFn: createAffiliateApi,
    onSuccess: () => {
      toast.success('Affiliate created successfully');
      navigate('/affiliates');
    },
    onError: (error) => {
      toast.error(error.message || 'Affiliate could not be created');
    },
  });

  return { createAffiliate, isCreatingAffiliate };
}
