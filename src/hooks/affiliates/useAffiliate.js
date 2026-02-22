import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getAffiliateApi } from '../../services/apiAffiliates';

export function useAffiliate(id) {
  const navigate = useNavigate();

  const {
    data: affiliate,
    isLoading: isLoadingAffiliate,
    isError: isErrorAffiliate,
  } = useQuery({
    queryKey: ['affiliate', id],
    queryFn: () => getAffiliateApi(id),
    enabled: Boolean(id),
    onError: (error) => {
      toast.error(error.message || 'Could not fetch affiliate');
      navigate('/affiliates');
    },
  });

  return {
    affiliate,
    isLoadingAffiliate,
    isErrorAffiliate,
  };
}
