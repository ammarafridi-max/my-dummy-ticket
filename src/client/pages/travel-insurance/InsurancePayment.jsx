import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Check, X, Download, FileText } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useInsuranceApplication } from '../../../hooks/insurance/useInsuranceApplication';
import { useInsuranceDocuments } from '../../../hooks/insurance/useInsuranceDocuments';
import { confirmInsurancePaymentApi } from '../../../services/apiInsurance';
import styled from 'styled-components';
import PrimarySection from '../../../components/PrimarySection';
import PrimaryButton from '../../../components/PrimaryButton';
import Container from '../../../components/Container';
import Paragraph from '../../../components/Paragraph';
import PageTitle from '../../../components/PageTitle';
import Loading from '../../../components/Loading';

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
      } catch (_) {
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
      <PrimarySection className="py-9 max-w-320 mx-auto">
        <Container>
          <IconContainer type="error">
            <X />
          </IconContainer>
          <PageTitle className="text-center">We couldn’t verify your payment</PageTitle>
          <Text textAlign="center" fontSize="22px" mb="15px">
            We couldn’t find a successful payment linked to this booking.
          </Text>
          <Text textAlign="center" fontSize="22px">
            If you’ve already paid, please contact us with your transaction details at{' '}
            <Link href="mailto:info@mydummyticket.ae">info@mydummyticket.ae</Link>.
          </Text>
        </Container>
      </PrimarySection>
    </>
  );
}

function Success({ insuranceApplication }) {
  const currency = insuranceApplication?.amountPaid?.currency;
  const amount = insuranceApplication?.amountPaid?.amount;
  const policyId = insuranceApplication?.policyId;
  const { insuranceDocuments, isLoadingInsuranceDocuments, refetch } =
    useInsuranceDocuments(policyId);

  function handleDownloadAll(docs) {
    if (!Array.isArray(docs) || docs.length === 0) return;
    docs.forEach((doc, index) => {
      if (!doc?.url) return;
      setTimeout(() => {
        window.open(doc.url, '_blank', 'noopener,noreferrer');
      }, index * 300);
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

      <PrimarySection className="py-7">
        <Container>
          <IconContainer type="success">
            <Check />
          </IconContainer>
          <PageTitle className="text-center">Payment confirmed</PageTitle>
          <Text textAlign="center" fontSize="22px" mb="15px">
            We’ve received your payment of{' '}
            <strong>
              {currency} {amount}
            </strong>{' '}
            and your policy is now active. You can download your documents below, and we’ll also
            email them to you shortly.
          </Text>
          <div className="flex flex-col items-center justify-center mt-7 gap-3">
            {isLoadingInsuranceDocuments && (
              <Text textAlign="center" fontSize="18px" mb="0">
                Preparing your documents...
              </Text>
            )}

            {!isLoadingInsuranceDocuments && insuranceDocuments?.length > 0 && (
              <>
                <Text textAlign="center" fontSize="18px" mb="0">
                  Download your policy documents below:
                </Text>
                <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-sm">
                  <div className="flex justify-between items-center mb-4 gap-3">
                    <div className="flex items-center gap-2 text-gray-800">
                      <FileText size={18} />
                      <span className="text-sm font-medium">Your Documents</span>
                    </div>
                    <PrimaryButton
                      type="button"
                      onClick={() => handleDownloadAll(insuranceDocuments)}
                      className="flex items-center gap-2 text-sm shadow-sm !bg-gray-100 !text-gray-900 !border-gray-200 hover:!bg-gray-200"
                    >
                      <Download size={16} />
                      Download all
                    </PrimaryButton>
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    {insuranceDocuments.map((doc, index) => (
                      <PrimaryButton
                        key={`${doc?.url || 'doc'}-${index}`}
                        onClick={() => window.location.assign(doc.url)}
                        className="w-full flex items-center justify-between gap-3 text-base shadow-sm hover:shadow-md !bg-gray-100 !text-gray-900 !border-gray-200 hover:!bg-gray-200"
                      >
                        <span className="flex items-center gap-2">
                          <FileText size={16} />
                          {doc?.name || `Document ${index + 1}`}
                        </span>
                        <span className="flex items-center gap-2 text-gray-700">
                          <Download size={16} />
                        </span>
                      </PrimaryButton>
                    ))}
                  </div>
                </div>
              </>
            )}

            {!isLoadingInsuranceDocuments && (!insuranceDocuments || insuranceDocuments.length === 0) && (
              <>
                <Text textAlign="center" fontSize="18px" mb="0">
                  Your documents are still being generated. Please try again in a moment.
                </Text>
                <PrimaryButton
                  type="button"
                  onClick={() => refetch()}
                  className="flex items-center gap-2 text-sm shadow-sm !bg-gray-100 !text-gray-900 !border-gray-200 hover:!bg-gray-200"
                >
                  Try again
                </PrimaryButton>
              </>
            )}
          </div>
        </Container>
      </PrimarySection>
    </>
  );
}

const Text = styled(Paragraph)`
  margin-top: 20px;
  font-weight: 300;
  @media screen and (max-width: 991px) {
    font-size: 19px;
  }
`;

const Link = styled.a`
  font-weight: 600;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 130px;
  height: 130px;
  border-radius: 100%;
  margin: 0 auto;
  margin-bottom: 30px;
  background-color: ${({ type }) => {
    if (type === 'success') return '#cfeedd';
    if (type === 'error') return '#ffcccc';
  }};
  & svg {
    width: 70px !important;
    height: 70px !important;
    color: ${({ type }) => {
      if (type === 'success') return '#0b5d2c';
      if (type === 'error') return '#990000';
    }};
  }
`;
