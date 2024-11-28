import styles from "./PaymentSuccess.module.css";
import PrimarySection from "../../components/Section/PrimarySection";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Helmet } from "react-helmet";
import { baseURL } from "../../config";
import Loading from "../../components/Loading/Loading";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [ticketData, setTicketData] = useState({});
  const currency = ticketData?.amountPaid?.currency;
  const amount = ticketData?.amountPaid?.amount;

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${baseURL}/api/ticket/get-form-details`, {
          headers: { "X-Session-ID": sessionId },
        });
        if (!res.ok) throw new Error("Could not fetch data");
        const data = await res.json();
        console.log(data);
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

    // Google Ads Conversion Tracking

    if (!error && amount && currency && sessionId) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "purchase",
        ecommerce: {
          transaction_id: sessionId,
          value: amount,
          currency: currency,
        },
        send_to: "AW-16572643061/hMxgCK7muLEZEPXtud49",
      });
    }
  }, [sessionId, amount, currency]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Payment Successfully Processed</title>
          <meta
            name="description"
            content="Your payment has been successfully processed. Thank you for booking with us!"
          />
        </Helmet>
      </HelmetProvider>
      <PrimarySection pb="50px" pt="100px" mb="0">
        {error ? <Error /> : <Success currency={currency} amount={amount} />}
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
        transaction details at reservation@citytours.ae.
      </p>
    </div>
  );
}

function Success({ currency, amount }) {
  return (
    <div className="col-10 col-lg-8 mx-auto">
      <h1 className={styles.title}>Thank You for Your Booking!</h1>
      <div className={styles.Text}>
        <p>
          Your payment of{" "}
          <strong>
            {currency} {amount}
          </strong>{" "}
          has been successfully processed. We appreciate your trust in us for
          your travel needs.
        </p>
        <h2>What next?</h2>
        <p>
          You’ll soon receive a confirmation email with your dummy ticket
          attached. Please check your inbox and spam folder. Ensure all the
          details on your dummy ticket are correct. If you spot any error or
          wrong information, contact us immediately.
        </p>
      </div>
    </div>
  );
}
