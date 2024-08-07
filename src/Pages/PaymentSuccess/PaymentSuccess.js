import styles from "./PaymentSuccess.module.css";
import PrimarySection from "../../Components/Section/PrimarySection";
import PageTitle from "../../Components/PageTitle/PageTitle";
import img from "./sample-ticket.png";

export default function PaymentSuccess() {
  return (
    <PrimarySection py="100px">
      <div className="col-10 col-lg-8 mx-auto">
        <PageTitle textAlign="center">Payment Successful</PageTitle>
        <div className={styles.Text}>
          <p>Thank you for booking your dummy ticket with us!</p>
          <p>
            We are working on your flight reservation and will have it sent to
            your email address as a PDF file.
          </p>
          <p>
            In the meanwhile, if you have any queries, feel free to{" "}
            <a href="https://api.whatsapp.com/send?phone=971506045355&text=Hi.%20I%20need%20a%20dummy%20ticket.">
              message us
            </a>
            , or <a href="mailto:info@mydummyticket.ae">email us.</a>
          </p>
          <p>
            If you also need a dummy hotel booking or a genuine travel
            insurance, contact us now.
          </p>
          <p>
            For your reference, here's how your flight reservation will look
            like:
          </p>
          <img src={img} className={styles.Img} alt="A sample dummy ticket" />
        </div>
      </div>
    </PrimarySection>
  );
}
