import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import { baseURL } from '../../config';
import styles from './PaymentSuccess.module.css';
import PrimarySection from '../../components/Section/PrimarySection';
import Container from '../../components/Container/Container';
import Loading from '../../components/Loading/Loading';
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

  return (
    <>
      <Helmet>
        <title>Payment Successfully Processed</title>
        <meta
          name="description"
          content="Your payment has been successfully processed. Thank you for booking with us!"
        />
      </Helmet>
      <PrimarySection pb="50px" pt="100px" mb="0">
        {error ? (
          <Error />
        ) : (
          <Success currency={currency} amount={amount} sessionId={sessionId} />
        )}
      </PrimarySection>
    </>
  );
}

const ErrorContainer = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & h1 {
    margin-bottom: 20px;
  }
  & p {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

function Error() {
  return (
    <ErrorContainer>
      <h1>Payment Not Found!</h1>
      <p>We could not locate a payment associated with your transaction.</p>
      <p>
        If you’ve already made a payment, please contact us with your
        transaction details at info@mydummyticket.com.
      </p>
    </ErrorContainer>
  );
}

const Title = styled.h1`
  font-size: 40px;
  text-align: center;
  @media screen and (max-width: 991px) {
    font-size: 36px;
  }
`;

const Text = styled.div`
  text-align: center;
  & p {
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 30px;
    font-weight: 300;
  }
`;

function Success({ currency, amount }) {
  return (
    <Container>
      <Title>Thank You for Your Booking!</Title>
      <Text>
        <p>
          Your payment of{' '}
          <strong>
            {currency} {amount}
          </strong>{' '}
          has been successfully processed.
        </p>
        <p>
          You will recieve a receipt of your payment by email, followed by your
          dummy ticket in a second email shortly afterwards. Please remember to
          check your Spam folder too.
        </p>
      </Text>
    </Container>
  );
}
