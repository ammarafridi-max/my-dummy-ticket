import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaCheck, FaX } from 'react-icons/fa6';
import { useMutation } from '@tanstack/react-query';
import { Download, FileText } from 'lucide-react';
import { useInsuranceApplication } from '../../../hooks/insurance/useInsuranceApplication';
import { useInsuranceDocuments } from '../../../hooks/insurance/useInsuranceDocuments';
import { confirmInsurancePaymentApi } from '../../../services/apiInsurance';
import PrimarySection from '../../../components/PrimarySection';
import PrimaryButton from '../../../components/PrimaryButton';
import Container from '../../../components/Container';
import PageTitle from '../../../components/PageTitle';
import Loading from '../../../components/Loading';
import { formatAmount } from '../../../utils/currency';

const pageData = {
  meta: {
    title: 'Payment - Travel Insurance',
    description: 'Compare travel insurance plans and choose the coverage that fits your trip.',
    canonical: 'https://www.mydummyticket.ae/travel-insurance/payment',
  },
};

export default function InsurancePayment() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const redirectPaymentStatus = searchParams.get('paymentStatus');
  const [syncTried, setSyncTried] = useState(false);
  const {
    insuranceApplication,
    isLoadingInsuranceApplication,
    isErrorInsuranceApplication,
    refetch,
  } = useInsuranceApplication(sessionId);
  const { mutateAsync: confirmPayment, isPending: isConfirmingPayment } = useMutation({
    mutationFn: confirmInsurancePaymentApi,
  });

  useEffect(() => {
    const sync = async () => {
      if (!sessionId) return;
      if (syncTried) return;
      if (!insuranceApplication) return;
      if (insuranceApplication.paymentStatus !== 'UNPAID') return;
      if (redirectPaymentStatus !== 'PAID') return;

      setSyncTried(true);
      try {
        await confirmPayment(sessionId);
      } catch (error) {
        void error;
      } finally {
        refetch();
      }
    };

    sync();
  }, [sessionId, syncTried, insuranceApplication, redirectPaymentStatus, confirmPayment, refetch]);

  if (!sessionId) return <Error />;

  if (isLoadingInsuranceApplication || isConfirmingPayment) return <Loading />;

  if (
    isErrorInsuranceApplication ||
    !insuranceApplication ||
    insuranceApplication?.paymentStatus === 'UNPAID'
  )
    return <Error />;

  return <Success insuranceApplication={insuranceApplication} />;
}

function Error() {
  return (
    <>
      <Helmet>
        <title>Payment Not Found</title>
      </Helmet>
      <PrimarySection className="py-10 md:pt-5 md:pb-15 bg-gray-50">
        <Container>
          <div className="w-30 h-30 flex items-center justify-center bg-red-500/20 text-red-800 mx-auto rounded-full text-5xl mb-10">
            <FaX />
          </div>
          <PageTitle className="text-center">Payment Not Found!</PageTitle>
          <p className="text-center text-lg md:text-[20px] font-extralight mt-5">
            We could not locate a payment associated with your transaction.
          </p>
          <p className="text-center text-lg md:text-[20px] font-extralight mt-5">
            If you've already made a payment, please contact us with your transaction details at{' '}
            <a className="font-semibold" href="mailto:info@mydummyticket.ae">
              info@mydummyticket.ae
            </a>
            .
          </p>
        </Container>
      </PrimarySection>
    </>
  );
}

function Success({ insuranceApplication }) {
  const { insuranceDocuments, isLoadingInsuranceDocuments, refetch } = useInsuranceDocuments(
    insuranceApplication?.policyId
  );
  const currency = insuranceApplication?.amountPaid?.currency || 'AED';
  const amount = insuranceApplication?.amountPaid?.amount;

  function handleDownloadAll(docs) {
    if (!Array.isArray(docs) || docs.length === 0) return;
    docs.forEach((doc, index) => {
      if (!doc?.url) return;
      setTimeout(() => {
        window.open(doc.url, '_blank', 'noopener,noreferrer');
      }, index * 250);
    });
  }

  return (
    <>
      <Helmet>
        <title>{pageData.meta.title}</title>
        <link rel="canonical" href={pageData.meta.canonical} />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content={pageData.meta.description} />
      </Helmet>

      <PrimarySection className="py-10 md:pt-5 md:pb-15 bg-gray-50">
        <Container>
          <div className="w-30 h-30 flex items-center justify-center bg-green-500/20 text-green-800 mx-auto rounded-full text-5xl mb-10">
            <FaCheck />
          </div>
          <PageTitle className="text-center">Thank You for Your Booking!</PageTitle>
          <p className="text-center text-lg md:text-[20px] font-extralight mt-5">
            Payment confirmed. We have successfully received your payment of{' '}
            <strong>
              {currency} {formatAmount(amount)}
            </strong>{' '}
            for your travel insurance policy.
          </p>

          <div className="mt-8 mx-auto w-full lg:max-w-xl rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
              <div className="flex items-center gap-2 text-gray-800">
                <FileText size={18} />
                <span className="text-sm sm:text-base font-medium">Policy Documents</span>
              </div>
              <PrimaryButton
                type="button"
                size="small"
                onClick={() => handleDownloadAll(insuranceDocuments)}
                disabled={isLoadingInsuranceDocuments || !insuranceDocuments?.length}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2"
              >
                <Download size={16} />
                Download All
              </PrimaryButton>
            </div>

            {isLoadingInsuranceDocuments && (
              <p className="text-center text-sm sm:text-base text-gray-600">
                Preparing documents...
              </p>
            )}

            {!isLoadingInsuranceDocuments && insuranceDocuments?.length > 0 && (
              <div className="flex flex-col gap-3">
                {insuranceDocuments.map((doc, index) => (
                  <PrimaryButton
                    key={`${doc?.url || 'doc'}-${index}`}
                    type="button"
                    size="small"
                    onClick={() => window.open(doc.url, '_blank', 'noopener,noreferrer')}
                    className="w-full inline-flex items-center justify-between gap-2"
                  >
                    <span className="inline-flex flex-1 items-center gap-2 text-left truncate">
                      <FileText size={15} />
                      {doc?.name || `Document ${index + 1}`}
                    </span>
                    <Download size={15} />
                  </PrimaryButton>
                ))}
              </div>
            )}

            {!isLoadingInsuranceDocuments &&
              (!insuranceDocuments || insuranceDocuments.length === 0) && (
                <div className="flex flex-col items-center gap-3">
                  <p className="text-center text-sm sm:text-base text-gray-600">
                    Documents are still being generated. Please try again shortly.
                  </p>
                  <PrimaryButton type="button" size="small" onClick={() => refetch()}>
                    Refresh Documents
                  </PrimaryButton>
                </div>
              )}
          </div>
        </Container>
      </PrimarySection>
    </>
  );
}
