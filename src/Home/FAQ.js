import styles from "./FAQ.js";
import PrimarySection from "../Components/Section/PrimarySection";
import Container from "../Components/Container/Container";
import FAQCard from "../Components/FAQCard/FAQCard";

export default function FAQ() {
  return (
    <PrimarySection pt="75px" id="faqs">
      <Container>
        <h2 className="section-heading">Frequently Asked Questions</h2>
        <FAQCard question="What is a dummy ticket?">
          Dummy tickets are temporary flight reservations or bookings created
          for visa application purposes or to satisfy travel requirements. They
          are not actual tickets and cannot be used for travel. My Dummy Ticket
          is a reliable service provider offering dummy tickets for various
          travel needs.
        </FAQCard>
        <FAQCard question="Who needs a dummy ticket?">
          Dummy tickets are often required by visa authorities or immigration
          offices as proof of onward travel or as part of visa application
          documents. They demonstrate your intention to leave the country after
          your visit. If you're applying for a visa, My Dummy Ticket can assist
          you in obtaining the necessary documentation.
        </FAQCard>
        <FAQCard question="Can I use a dummy ticket for my Schengen visa application?">
          Yes, you can use a dummy ticket as part of your Schengen or other visa
          applications to demonstrate proof of return travel.
        </FAQCard>
        <FAQCard question="Are dummy tickets legal?">
          Yes, dummy tickets are completely legal and acceptable. They will help
          you get your visa. My Dummy Ticket provides legitimate and accepted
          dummy ticket services for visa applications.
        </FAQCard>
        <FAQCard question="Is my payment data secure?">
          Yes, absolutely. All payments made on our website are made through
          Stripe's secure Checkout application. We not collect any payment card
          data.
        </FAQCard>
        <FAQCard question="Do you have a cash payment option?">
          Yes, you can pay directly into our official bank account. We will
          share the details with you. Please connect with us by email or
          WhatsApp.
        </FAQCard>
      </Container>
    </PrimarySection>
  );
}
