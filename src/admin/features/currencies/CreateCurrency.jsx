import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import CurrencyForm from './CurrencyForm';
import { useCreateCurrency } from '../../../hooks/currencies/useCreateCurrency';

export default function CreateCurrency() {
  const { register, handleSubmit } = useForm();
  const { createCurrency, isCreatingCurrency } = useCreateCurrency();

  function onSubmit(data) {
    createCurrency({
      ...data,
      code: String(data.code || '').toUpperCase(),
      rate: data.rate ?? 1,
      isBaseCurrency: data.isBaseCurrency === 'true',
    });
  }

  return (
    <>
      <Helmet>
        <title>Create Currency</title>
      </Helmet>

      <Breadcrumb
        paths={[
          { label: 'Home', path: '/' },
          { label: 'Currencies', path: '/currencies' },
          { label: 'Create Currency', path: '/currencies/create' },
        ]}
      />
      <PageHeading>Create Currency</PageHeading>

      <CurrencyForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isLoading={isCreatingCurrency}
      />
    </>
  );
}
