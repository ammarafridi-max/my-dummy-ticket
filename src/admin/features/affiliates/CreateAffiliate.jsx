import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import AffiliateForm from './AffiliateForm';
import { useCreateAffiliate } from '../../../hooks/affiliates/useCreateAffiliate';

export default function CreateAffiliate() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      email: '',
      commissionPercent: 25,
    },
  });

  const { createAffiliate, isCreatingAffiliate } = useCreateAffiliate();

  function onSubmit(values) {
    const payload = {
      name: values.name?.trim(),
      email: values.email?.trim().toLowerCase(),
      commissionPercent: Number(values.commissionPercent),
    };

    createAffiliate(payload);
  }

  return (
    <>
      <Helmet>
        <title>Create Affiliate</title>
      </Helmet>

      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Affiliates', href: '/affiliates' },
          { label: 'Create Affiliate', href: '/affiliates/create' },
        ]}
      />
      <PageHeading>Create Affiliate</PageHeading>

      <AffiliateForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} isLoading={isCreatingAffiliate} />
    </>
  );
}
