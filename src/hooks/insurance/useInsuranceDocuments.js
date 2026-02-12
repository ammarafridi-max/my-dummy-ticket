import { useQuery } from '@tanstack/react-query';
import { getInsuranceDocumentsApi } from '../../services/apiInsurance';
import toast from 'react-hot-toast';

export function useInsuranceDocuments(policyId) {
  const {
    data: insuranceDocuments,
    isLoading: isLoadingInsuranceDocuments,
    isError: isErrorInsuranceDocuments,
    refetch,
  } = useQuery({
    queryKey: ['insurance-documents', policyId],
    queryFn: () => getInsuranceDocumentsApi(policyId),
    enabled: !!policyId,
    onError: err => {
      toast.error(err.message || 'Failed to fetch insurance documents');
    },
  });

  return { insuranceDocuments, isLoadingInsuranceDocuments, isErrorInsuranceDocuments, refetch };
}
