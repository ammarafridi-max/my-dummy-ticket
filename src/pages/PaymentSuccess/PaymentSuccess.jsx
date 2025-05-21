import React from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { baseURL } from '../../config';
import { Check, X } from 'lucide-react';
import { trackPurchaseEvent } from '../../utils/analytics';
import PrimarySection from '../../components/PrimarySection';
import Container from '../../components/Container';
import Paragraph from '../../components/Paragraph';
import PageTitle from '../../components/PageTitle';
import Loading from '../../components/Loading';
import styled from 'styled-components';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [ticketData, setTicketData] = useState({});
  const currency = ticketData?.amountPaid?.currency;
  const amount = ticketData?.amountPaid?.amount;

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${baseURL}/api/ticket/${sessionId}`);
        if (!res.ok) throw new Error('Could not fetch data');
        const data = await res.json();
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

  return <Success currency={currency} amount={amount} sessionId={sessionId} />;
}

const Text = styled(Paragraph)`
  @media screen and (max-width: 991px) {
    font-size: 19px;
  }
`;

const Link = styled.a`
  font-size: 22px;
`;

function Error() {
  return (
    <>
      <Helmet>
        <title>Payment Not Found</title>
      </Helmet>
      <PrimarySection pt="50px" pb="50px">
        <Container>
          <IconContainer type="error">
            <X />
          </IconContainer>
          <PageTitle textAlign="center" mb="20px">
            Payment Not Found!
          </PageTitle>
          <Text textAlign="center" fontSize="22px" mb="15px">
            We could not locate a payment associated with your transaction.
          </Text>
          <Text textAlign="center" fontSize="22px">
            If you've already made a payment, please contact us with your
            transaction details at{' '}
            <Link href="mailto:info@mydummyticket.com">
              info@mydummyticket.com
            </Link>
            .
          </Text>
        </Container>
      </PrimarySection>
    </>
  );
}

function Success({ currency, amount, sessionId }) {
  useEffect(() => {
    if (currency && amount) {
      if (import.meta.env.MODE !== 'development') {
        trackPurchaseEvent(currency, amount, sessionId);
      }
    }
  }, [currency, amount, sessionId]);

  return (
    <>
      <Helmet>
        <title>Payment Successfully Processed</title>
      </Helmet>
      <PrimarySection pt="50px" pb="50px">
        <Container>
          <IconContainer type="success">
            <Check />
          </IconContainer>
          <PageTitle textAlign="center" mb="20px">
            Thank You for Your Booking!
          </PageTitle>
          <Text textAlign="center" fontSize="22px" mb="15px">
            Your payment of{' '}
            <strong>
              {currency} {amount}
            </strong>{' '}
            has been successfully processed.
          </Text>
          <Text textAlign="center" fontSize="22px">
            You will recieve a receipt of your payment by email, followed by
            your dummy ticket in a second email shortly afterwards. Please
            remember to check your Spam folder too.
          </Text>
        </Container>
      </PrimarySection>
    </>
  );
}

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
