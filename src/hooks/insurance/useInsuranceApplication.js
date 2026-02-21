import { useQuery } from '@tanstack/react-query';
import { getInsuranceApplicationApi } from '../../services/apiInsurance';

export function useInsuranceApplication(sessionId) {
  const {
    data: insuranceApplication,
    isLoading: isLoadingInsuranceApplication,
    isError: isErrorInsuranceApplication,
    refetch,
  } = useQuery({
    queryKey: ['insurance-application', sessionId],
    queryFn: () => getInsuranceApplicationApi(sessionId),
    enabled: !!sessionId,
  });

  return { insuranceApplication, isLoadingInsuranceApplication, isErrorInsuranceApplication, refetch };
}
