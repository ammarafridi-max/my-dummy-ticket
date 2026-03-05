import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumb';
import Loading from '../../../components/Loading';
import PageHeading from '../../../components/PageHeading';
import CurrencyForm from './CurrencyForm';
import { useCurrency } from '../../../hooks/currencies/useCurrency';
import { useUpdateCurrency } from '../../../hooks/currencies/useUpdateCurrency';

export default function UpdateCurrency() {
  const { code } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const { currency, isLoadingCurrency } = useCurrency(code);
  const { updateCurrency, isUpdatingCurrency } = useUpdateCurrency();

  useEffect(() => {
    if (!currency) return;

    reset({
      code: currency.code,
      name: currency.name,
      symbol: currency.symbol,
      rate: currency.rate,
      isBaseCurrency: currency.isBaseCurrency ? 'true' : 'false',
    });
  }, [currency, reset]);

  function onSubmit(data) {
    updateCurrency({
      code,
      currencyData: {
        ...data,
        rate: data.rate ?? 1,
        isBaseCurrency: data.isBaseCurrency === 'true',
      },
    });
  }

  if (isLoadingCurrency) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Update Currency</title>
      </Helmet>

      <Breadcrumb
        paths={[
          { label: 'Home', path: '/' },
          { label: 'Currencies', path: '/currencies' },
          { label: 'Update Currency', path: `/currencies/${code}` },
        ]}
      />
      <PageHeading>Update Currency</PageHeading>

      <CurrencyForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isLoading={isUpdatingCurrency}
        isEditing
      />
    </>
  );
}
