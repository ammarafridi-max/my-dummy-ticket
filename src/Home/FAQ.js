import styles from "./FAQ.js";
import PrimarySection from "../Components/Section/PrimarySection";
import Container from "../Components/Container/Container";
import FAQCard from "../Components/FAQCard/FAQCard";

export default function FAQ() {
  return (
    <PrimarySection pt="100px" id="faqs">
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
          Yes, you can use a dummy ticket as part of your Schengen visa
          application to demonstrate proof of onward travel. However, it's
          essential to ensure that the dummy ticket meets the requirements set
          by the consulate or embassy processing your visa application.
        </FAQCard>
        <FAQCard question="Can I use dummy tickets to board a flight?">
          No, dummy tickets cannot be used for boarding flights. They do not
          hold any value as actual tickets and are not recognized by airlines
          for travel purposes. Most of our customers only use it to show it as
          proof of travel for visa purposes.
        </FAQCard>
        <FAQCard question="Are dummy tickets legal?">
          Yes, dummy tickets are completely legal and acceptable. They will help
          you get your visa. My Dummy Ticket provides legitimate and accepted
          dummy ticket services for visa applications.
        </FAQCard>
        <FAQCard question="Are there any risks associated with using a dummy ticket for a Schengen visa application?">
          No, there aren't any risks associated with using a dummy ticket for a
          Schengen visa application. While using a dummy ticket may fulfill the
          immediate requirement for proof of onward travel, some consulates or
          embassies may require applicants to provide actual flight reservations
          before granting the visa. It's essential to carefully consider the
          consulate or embassy's requirements and seek guidance if uncertain. My
          Dummy Ticket ensures compliance with visa application standards.
        </FAQCard>
      </Container>
    </PrimarySection>
  );
}
