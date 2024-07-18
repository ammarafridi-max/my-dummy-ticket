import styles from "./FAQ.module.css";
import { HelmetProvider, Helmet } from "react-helmet-async";
import PrimarySection from "../Components/Section/PrimarySection";
import Container from "../Components/Container/Container";
import PageTitle from "../Components/PageTitle/PageTitle";
import FAQCard from "../Components/FAQCard/FAQCard";

const faqArray = [
  {
    question: "What is a Dummy Ticket?",
    answer:
      "A dummy ticket is a flight reservation used primarily for visa applications and proof of onward travel. It looks like a real ticket with a verifiable PNR number but is, in fact, a reservation and not intended for actual travel.",
  },
  {
    question: "How can I be sure the dummy ticket is verifiable?",
    answer:
      "Our dummy tickets are legitimate flight reservations. They can be verified directly on the airline's website using the airline reservation code and your surname.",
  },
  {
    question: "What is the cost of a dummy ticket?",
    answer:
      "Our dummy tickets cost AED 49 only for both, one way and return dummy tickets.",
  },
  {
    question: "How long is your dummy ticket valid for?",
    answer:
      "Our dummy tickets are valid for up to 2 weeks, or up to the date of flight departure if the departure date is in less than 2 weeks. If you need a dummy ticket with a longer validity, please contact us. We also offer extendable dummy tickets free of charge.",
  },
  {
    question: "How long does it take to receive my dummy ticket?",
    answer:
      "All of our dummy tickets are created and sent within 30 to 60 minutes of application time. Please note that we send dummy tickets during working hours only (09:00 AM - 09:00 PM).",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept multiple payment methods. You can choose to pay on our website through Stripe's secure Checkout application, transfer money through a payment link, or transfer directly into our bank account (available on request).",
  },
  {
    question: "Is the dummy ticket suitable for all visa applications?",
    answer:
      "Yes, our dummy tickets are suitable for visa applications, including Schengen visas, Turkey visas, Canada visas, and UAE visas.",
  },
  {
    question: "What additional services do you offer?",
    answer:
      "Besides dummy tickets, we also offer dummy hotel bookings, travel insurance (real), visa assistance, and airport transfer arrangement.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact us through multiple channels. You can choose to WhatsApp us (click on the WhatsApp icon to the bottom right of your screen), call us on +971506045355, or email us at info@mydummyticket.ae",
  },
  {
    question: "Is there a money-back guarantee?",
    answer:
      "Yes, we offer a money-back guarantee if the dummy ticket does not meet your requirements. To get your refund, please send us an email, stating the reason for refund.",
  },
];

export default function FAQ() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Frequently Asked Questions</title>
        </Helmet>
      </HelmetProvider>
      <PrimarySection className={styles.Section}>
        <Container>
          <PageTitle textAlign="center" className={styles.Title}>
            Frequently Asked Questions
          </PageTitle>
          <div className="col-12 col-lg-10 p-0 mx-auto">
            {faqArray.map((faq, i) => (
              <FAQCard key={i} question={faq.question}>
                {faq.answer}
              </FAQCard>
            ))}
          </div>
        </Container>
      </PrimarySection>
    </>
  );
}
