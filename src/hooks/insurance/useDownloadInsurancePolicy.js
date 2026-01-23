import { useMutation } from '@tanstack/react-query';
import { downloadInsurancePolicyApi } from '../../services/apiInsurance';
import toast from 'react-hot-toast';

export function useDownloadInsurancePolicy() {
  const { mutate: downloadPolicy } = useMutation({
    mutationFn: policyId => downloadInsurancePolicyApi(policyId),
    onSuccess: data => {
      window.location.assign(data.policyDocuments);
      toast.success('Policy downloaded');
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  return { downloadPolicy };
}
