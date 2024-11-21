import styles from "./PaymentSuccess.module.css";
import PrimarySection from "../../components/Section/PrimarySection";
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Helmet } from "react-helmet";

export default function PaymentSuccess() {
  // const [searchParams] = useSearchParams();
  // const sessionId = searchParams.get("sessionId");
  // const navigate = useNavigate();

  // if (!sessionId) {
  //   navigate("/");
  // }

  // useEffect(() => {
  //   async function confirmPayment() {
  //     try {
  //       const res = await fetch(
  //         `${process.env.REACT_APP_BACKEND_URL}/api/ticket/updatePaymentStatus`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             sessionId: sessionId,
  //             status: "PAYMENT_DONE",
  //           }),
  //         }
  //       );
  //       if (!res.ok) {
  //         throw new Error("Failed to update payment status");
  //       }
  //       const data = await res.json();
  //       console.log("Payment status updated:", data);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //     }
  //   }
  //   confirmPayment();
  // }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Payment Successfully Processed</title>
        </Helmet>
      </HelmetProvider>
      <PrimarySection pb="50px" mb="0">
        <div className="col-10 col-lg-8 mx-auto">
          <h1 className={styles.title}>Thank You for Your Booking!</h1>
          <div className={styles.Text}>
            <p>
              Your payment has been successfully processed. We appreciate your
              trust in us for your travel needs.
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
      </PrimarySection>
    </>
  );
}
