import styles from "./FAQ.module.css";
import { HelmetProvider, Helmet } from "react-helmet-async";
import PrimarySection from "../../Components/Section/PrimarySection";
import Container from "../../Components/Container/Container";
import PageTitle from "../../Components/PageTitle/PageTitle";
import FAQCard from "../../Components/FAQCard/FAQCard";

export const faqArray = [
  {
    question: "What is a dummy ticket?",
    answer:
      "A dummy ticket is a flight reservation used primarily for visa applications and proof of onward travel. It looks like a real ticket with a verifiable PNR number but is, in fact, a reservation and not intended for actual travel.",
  },
  {
    question: "How can I verify the dummy ticket?",
    answer:
      "Our dummy tickets are legitimate flight reservations. They can be verified directly on the airline's website using the airline reservation code and your surname. It's important to note that some airlines do not display reservation information on their website.",
  },
  {
    question: "How much does a dummy ticket cost?",
    answer:
      "Our dummy tickets cost AED 49 only for both, one way and return dummy tickets.",
  },
  {
    question: "How long is your dummy ticket valid for?",
    answer:
      "Our dummy tickets are valid for up to 2 weeks, or up to the date of flight departure or less if the departure date is in less than 2 weeks. If you need a dummy ticket with a longer validity, please contact us. We also offer extendable dummy tickets.",
  },
  {
    question: "How long does it take to receive my dummy ticket?",
    answer:
      "All of our dummy tickets are created and sent within 10 to 15 minutes of application time. Please note that we send dummy tickets during working hours only (09:00 AM - 09:00 PM). If you need it urgently, please send us an email",
  },
  {
    question: "Do dummy tickets work for Schengen visas?",
    answer:
      "Absolutely! Dummy tickets are basically flight reservations that allow embassies and VFS to ensure that the traveler has planned their return from the destination they're visiting. It helps gain their confidence and improves the chances of getting your Schengen visa.",
  },
  {
    question: "Will my visa get rejected due to dummy tickets?",
    answer:
      "Not at all. Dummy tickets are completely fine and acceptable by VFS and embassies. They will improve your chances of getting your visa approved.",
  },
  {
    question: "I need hotel reservations too. Can you provide that?",
    answer:
      "Yes, we do. We specialize in all kinds of travel documentation and assistance, which means that we provide dummy tickets, hotel reservations, travel insurance, trip itinerary and all other related documents needed to get your visa approved.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept multiple payment methods. You can choose to pay on our website through Stripe's secure Checkout application, transfer money through a payment link, or transfer directly into our bank account (available on request).",
  },
  {
    question: "Is the dummy ticket suitable for all visa applications?",
    answer:
      "Yes, our dummy tickets are suitable and acceptable for all kinds of visa applications, including but not limited to Schengen, Turkey, Canada, Thailand, UAE, and UK visas.",
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
