import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import { baseURL } from '../../config';
import styles from './PaymentSuccess.module.css';
import PrimarySection from '../../components/Section/PrimarySection';
import Loading from '../../components/Loading/Loading';

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

function Error() {
  return (
    <div className={styles.errorContainer}>
      <h1>Payment Not Found!</h1>
      <p>We could not locate a payment associated with your transaction.</p>
      <p>
        If you’ve already made a payment, please contact us with your
        transaction details at info@mydummyticket.com.
      </p>
    </div>
  );
}

function Success({ currency, amount, sessionId }) {
  return (
    <div className="col-10 col-lg-8 mx-auto">
      <h1 className={styles.title}>Thank You for Your Booking!</h1>
      <div className={styles.Text}>
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
      </div>
    </div>
  );
}
