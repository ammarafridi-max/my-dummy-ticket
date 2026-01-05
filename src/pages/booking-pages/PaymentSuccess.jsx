import React from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDummyTicket } from '../../hooks/useDummyTicket';
import { trackPurchaseEvent } from '../../lib/analytics';
import { formatDate } from '../../utils/formatDate';
import { Helmet } from 'react-helmet-async';
import { Check, X } from 'lucide-react';
import styled from 'styled-components';
import PrimarySection from '../../components/PrimarySection';
import Container from '../../components/Container';
import Paragraph from '../../components/Paragraph';
import PageTitle from '../../components/PageTitle';
import Loading from '../../components/Loading';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const { dummyTicket, isLoadingDummyTicket, isErrorDummyTicket } = useDummyTicket(sessionId);

  if (isLoadingDummyTicket) return <Loading />;

  if (isErrorDummyTicket || dummyTicket?.paymentStatus === 'UNPAUD') return <Error />;

  return <Success sessionId={sessionId} dummyTicket={dummyTicket} />;
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

function Success({ sessionId, dummyTicket }) {
  const type = dummyTicket?.type;
  const quantity = dummyTicket?.quantity?.adults + dummyTicket?.quantity?.children;
  const ticketValidity = dummyTicket?.ticketValidity;
  const currency = dummyTicket?.amountPaid?.currency;
  const amount = dummyTicket?.amountPaid?.amount;

  let price = 0;
  if (ticketValidity === '2 Days') {
    price = 49;
  } else if (ticketValidity === '7 Days') {
    price = 69;
  } else if (ticketValidity === '14 Days') {
    price = 79;
  }

  useEffect(() => {
    if (currency && amount && import.meta.env.MODE === 'production') {
      trackPurchaseEvent({
        currency,
        value: amount,
        sessionId,
        items: [{ item_name: `${type} Flight Reservation`, quantity, price }],
      });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Payment Successfully Processed</title>
        <meta name="robots" content="none" />
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
          {!dummyTicket?.ticketDelivery?.immediate && (
            <Text textAlign="center" fontSize="22px" mb="25px">
              Your dummy ticket will be sent to your email address on{' '}
              {formatDate(dummyTicket?.ticketDelivery?.deliveryDate)} since you selected the later
              delivery option. An email regarding the same has been sent your email address, as
              well.
            </Text>
          )}
          {dummyTicket?.ticketDelivery?.immediate && (
            <Text textAlign="center" fontSize="22px" mb="25px">
              You will recieve a receipt of your payment by email, followed by your dummy ticket in
              a second email shortly afterwards. Please remember to check your spam folder too.
            </Text>
          )}
        </Container>
      </PrimarySection>
    </>
  );
}

const Text = styled(Paragraph)`
  margin-top: 20px;
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
