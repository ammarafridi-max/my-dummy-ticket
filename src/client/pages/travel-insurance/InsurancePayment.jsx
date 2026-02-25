import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaCheck, FaX } from 'react-icons/fa6';
import { useInsuranceApplication } from '../../../hooks/insurance/useInsuranceApplication';
import { useDownloadInsurancePolicy } from '../../../hooks/insurance/useDownloadInsurancePolicy';
import PrimarySection from '../../../components/PrimarySection';
import PrimaryButton from '../../../components/PrimaryButton';
import Container from '../../../components/Container';
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
  const { insuranceApplication, isLoadingInsuranceApplication, isErrorInsuranceApplication } =
    useInsuranceApplication(sessionId);

  if (!sessionId) return <Error />;

  if (isLoadingInsuranceApplication) return <Loading />;

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
  const { downloadPolicy } = useDownloadInsurancePolicy();
  const currency = insuranceApplication?.amountPaid?.currency;
  const amount = insuranceApplication?.amountPaid?.amount;
  const policyId = insuranceApplication?.policyId;

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
            Your payment of{' '}
            <strong>
              {currency} {amount}
            </strong>{' '}
            has been successfully processed.
          </p>
          <div className="flex items-center justify-center mt-7">
            <PrimaryButton onClick={() => downloadPolicy(policyId)}>
              Download Your Insurance
            </PrimaryButton>
          </div>
        </Container>
      </PrimarySection>
    </>
  );
}
