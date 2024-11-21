import PrimarySection from "../../../components/Section/PrimarySection";
import Container from "../../../components/Container/Container";
import FAQAccordion from "../../../components/FAQAccordion/FAQAccordion";
import { SectionTitle } from "../../../components/SectionTitle/SectionTitle";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import { faqArray } from "../../FAQ/FAQ";

export default function FAQ() {
  return (
    <PrimarySection id="faq">
      <Container>
        <SectionTitle
          textAlign="center"
          subtitle="Common questions about dummy tickets"
        >
          Frequently Asked Questions
        </SectionTitle>
        {faqArray.map((faq, i) => {
          while (i < 6) {
            return (
              <FAQAccordion key={i} question={faq.question}>
                {faq.answer}
              </FAQAccordion>
            );
          }
        })}
        <div className="text-center">
          <PrimaryButton mt="50px" href="/faq">
            Read More FAQs
          </PrimaryButton>
        </div>
      </Container>
    </PrimarySection>
  );
}
