import React from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { BASEURL } from '../config';
import { Check, X } from 'lucide-react';
import { trackPurchaseEvent } from '../utils/analytics';
import styled from 'styled-components';
import PrimarySection from '../components/PrimarySection';
import Container from '../components/Container';
import Paragraph from '../components/Paragraph';
import PageTitle from '../components/PageTitle';
import Loading from '../components/Loading';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [ticketData, setTicketData] = useState({});
  const type = ticketData?.type;
  const quantity =
    ticketData?.quantity?.adults + ticketData?.quantity?.children;
  const ticketValidity = ticketData?.ticketValidity;
  const currency = ticketData?.amountPaid?.currency;
  const amount = ticketData?.amountPaid?.amount;

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASEURL}/api/ticket/${sessionId}`);
        if (!res.ok) throw new Error('Could not fetch data');
        const data = await res.json();

        if (data?.data?.paymentStatus === 'UNPAID') return setError(true);

        setError(false);
        setTicketData(data.data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [sessionId]);

  if (isLoading) return <Loading />;

  if (error) return <Error />;

  return (
    <Success
      type={type}
      quantity={quantity}
      ticketValidity={ticketValidity}
      currency={currency}
      amount={amount}
      sessionId={sessionId}
    />
  );
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
            If you've already made a payment, please contact us with your
            transaction details at{' '}
            <Link href="mailto:info@dummyticket365.com">
              info@dummyticket365.com
            </Link>
            .
          </Text>
        </Container>
      </PrimarySection>
    </>
  );
}

function Success({
  type,
  quantity,
  ticketValidity,
  currency,
  amount,
  sessionId,
}) {
  let price = 0;
  if (ticketValidity === '2 Days') {
    price = 49;
  } else if (ticketValidity === '7 Days') {
    price = 69;
  } else if (ticketValidity === '14 Days') {
    price = 79;
  }

  useEffect(() => {
    if (currency && amount) {
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
      </Helmet>
      <PrimarySection className="py-7">
        <Container>
          <IconContainer type="success">
            <Check />
          </IconContainer>
          <PageTitle className="text-center">
            Thank You for Your Booking!
          </PageTitle>
          <Text textAlign="center" fontSize="22px" mb="15px">
            Your payment of{' '}
            <strong>
              {currency} {amount}
            </strong>{' '}
            has been successfully processed.
          </Text>
          <Text textAlign="center" fontSize="22px" mb="25px">
            You will recieve a receipt of your payment by email, followed by
            your dummy ticket in a second email shortly afterwards. Please
            remember to check your spam folder too.
          </Text>
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
