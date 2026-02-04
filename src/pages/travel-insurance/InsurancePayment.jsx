import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Check, X } from 'lucide-react';
import { useInsuranceApplication } from '../../hooks/insurance/useInsuranceApplication';
import { useDownloadInsurancePolicy } from '../../hooks/insurance/useDownloadInsurancePolicy';
import styled from 'styled-components';
import PrimarySection from '../../components/PrimarySection';
import PrimaryButton from '../../components/PrimaryButton';
import Container from '../../components/Container';
import Paragraph from '../../components/Paragraph';
import PageTitle from '../../components/PageTitle';
import Loading from '../../components/Loading';

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
      <PrimarySection className="py-9 max-w-320 mx-auto">
        <Container>
          <IconContainer type="error">
            <X />
          </IconContainer>
          <PageTitle className="text-center">Payment Not Found!</PageTitle>
          <Text textAlign="center" fontSize="22px" mb="15px">
            We could not locate a payment associated with your transaction.
          </Text>
          <Text textAlign="center" fontSize="22px">
            If you've already made a payment, please contact us with your transaction details at{' '}
            <Link href="mailto:info@mydummyticket.ae">info@mydummyticket.ae</Link>.
          </Text>
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

      <PrimarySection className="py-7">
        <Container>
          <IconContainer type="success">
            <Check />
          </IconContainer>
          <PageTitle className="text-center">Thank You for Your Booking!</PageTitle>
          <Text textAlign="center" fontSize="22px" mb="15px">
            Your payment of{' '}
            <strong>
              {currency} {amount}
            </strong>{' '}
            has been successfully processed.
          </Text>
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
    if (type === 'success') return '#e5f3eb';
    if (type === 'error') return '#ffcccc';
  }};
  & svg {
    width: 70px !important;
    height: 70px !important;
    color: ${({ type }) => {
      if (type === 'success') return '#00702e';
      if (type === 'error') return '#990000';
    }};
  }
`;
