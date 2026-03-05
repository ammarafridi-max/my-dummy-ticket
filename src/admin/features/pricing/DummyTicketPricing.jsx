import { Helmet } from 'react-helmet-async';
import { useEffect, useMemo, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import Loading from '../../../components/Loading';
import Label from '../../../components/FormElements/Label';
import Input from '../../../components/FormElements/Input';
import PrimaryButton from '../../../components/PrimaryButton';
import { useAdminDummyTicketPricing } from '../../../hooks/pricing/useAdminDummyTicketPricing';
import { useUpdateDummyTicketPricing } from '../../../hooks/pricing/useUpdateDummyTicketPricing';
import { normalizePricingOptions } from '../../../utils/dummyTicketPricing';

export default function DummyTicketPricing() {
  const { pricing, isLoadingPricing, isErrorPricing, pricingError } = useAdminDummyTicketPricing();
  const { updatePricing, isUpdatingPricing } = useUpdateDummyTicketPricing();
  const defaultOptions = useMemo(() => normalizePricingOptions(pricing), [pricing]);
  const [formOptions, setFormOptions] = useState([]);

  useEffect(() => {
    if (defaultOptions.length > 0) {
      setFormOptions(defaultOptions);
    }
  }, [defaultOptions]);

  function handlePriceChange(validity, value) {
    setFormOptions((current) =>
      current.map((option) =>
        option.value === validity
          ? {
              ...option,
              price: value,
            }
          : option,
      ),
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    const options = formOptions.map((option, index) => ({
      validity: option.value,
      price: Number(option.price),
      isActive: true,
      sortOrder: index,
    }));

    updatePricing({
      currency: pricing?.currency || 'AED',
      options,
    });
  }

  if (isLoadingPricing) return <Loading />;

  if (isErrorPricing) {
    return (
      <p className="mt-6 bg-white p-6 rounded-lg shadow text-sm text-gray-700">
        {pricingError?.message || 'Could not load pricing'}
      </p>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dummy Ticket Pricing</title>
      </Helmet>

      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Pricing', href: '/pricing' },
        ]}
      />
      <PageHeading>Dummy Ticket Pricing</PageHeading>

      <form className="mt-6 bg-white rounded-xl shadow p-6 max-w-2xl" onSubmit={handleSubmit}>
        <div className="space-y-5">
          {formOptions.map((option) => (
            <div key={option.value} className="grid grid-cols-2 items-center gap-4">
              <div>
                <Label>{option.label}</Label>
              </div>
              <div>
                <Input
                  type="number"
                  min={0}
                  step="1"
                  value={option.price}
                  onChange={(e) => handlePriceChange(option.value, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <PrimaryButton type="submit" size="small" disabled={isUpdatingPricing}>
            {isUpdatingPricing ? 'Saving...' : 'Save Pricing'}
          </PrimaryButton>
        </div>
      </form>
    </>
  );
}
