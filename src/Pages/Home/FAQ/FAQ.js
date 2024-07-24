import styles from "./FAQ.module.css";
import PrimarySection from "../../../Components/Section/PrimarySection";
import Container from "../../../Components/Container/Container";
import FAQCard from "../../../Components/FAQCard/FAQCard";
import { SectionTitle } from "../../../Components/SectionTitle/SectionTitle";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";

export default function FAQ() {
  return (
    <PrimarySection id="faqs" pt="0" className={styles.Section}>
      <Container>
        <SectionTitle
          textAlign="center"
          subtitle="Common questions about dummy tickets"
        >
          Frequently Asked Questions
        </SectionTitle>
        <FAQCard question="What is a dummy ticket?">
          A dummy ticket is a flight reservation used primarily for visa
          applications and proof of onward travel. It looks like a real ticket
          with a verifiable PNR number but is not intended for actual travel.
        </FAQCard>
        <FAQCard question="How can I be sure the dummy ticket is verifiable?">
          Our dummy tickets are legitimate flight reservations. They can be
          verified directly on the airline's website using the airline
          reservation code and your surname.
        </FAQCard>
        <FAQCard question="What is the cost of a dummy ticket?">
          Prices for dummy tickets start at AED 49 and can go up depending on
          additional features like confirmed e-ticket numbers or extended
          validity periods.
        </FAQCard>
        <FAQCard question="How long does it take to receive my dummy ticket?">
          With My Dummy Ticket, you can get your dummy ticket within 30 - 60
          minutes. Please note that we provide this service during our working
          hours every day (09:00 AM - 09:00 PM).
        </FAQCard>
        <FAQCard question="What payment methods do you accept?">
          We accept multiple payment methods. You can choose to pay on our
          website through Stripe's secure Checkout application, transfer money
          through a payment link, or transfer directly into our bank account
          (available on request).
        </FAQCard>
        <FAQCard question="Is the dummy ticket suitable for all visa applications?">
          Yes, our dummy tickets are suitable for all kinds of visit visa
          applications. Most of our customers use our dummy ticket for Schengen,
          Turkey, UAE, and Canada visa applications.
        </FAQCard>
        <div className="text-center">
          <PrimaryButton mt="50px" href="/faq">
            Read More FAQs
          </PrimaryButton>
        </div>
      </Container>
    </PrimarySection>
  );
}

{
  /* <FAQCard question="What is a dummy ticket?">
            A dummy ticket is a flight reservation used primarily for visa
            applications and proof of onward travel. It looks like a real ticket
            with a verifiable PNR number but is not intended for actual travel.
          </FAQCard>
          <FAQCard question="Who needs a dummy ticket?">
            Dummy tickets are often required by visa authorities or immigration
            offices as proof of onward travel or as part of visa application
            documents. They demonstrate your intention to leave the country
            after your visit. If you're applying for a visa, My Dummy Ticket can
            assist you in obtaining the necessary documentation.
          </FAQCard>
          <FAQCard question="Can I use a dummy ticket for Schengen visa?">
            Yes, you can use a dummy ticket as part of your Schengen or other
            visa applications to demonstrate proof of return travel.
          </FAQCard>
          <FAQCard question="Are dummy tickets legal?">
            Yes, dummy tickets are completely legal and acceptable. They will
            help you get your visa. My Dummy Ticket provides legitimate and
            accepted dummy ticket services for visa applications.
          </FAQCard>
          <FAQCard question="Is my payment data secure?">
            Yes, absolutely. All payments made on our website are made through
            Stripe's secure Checkout application. We not collect any payment
            card data.
          </FAQCard>
          <FAQCard question="Do you have a cash payment option?">
            Yes, you can pay directly into our official bank account. We will
            share the details with you. Please connect with us by email or
            WhatsApp.
          </FAQCard> */
}
