import { faqArray } from '../../data/faqs';
import SectionTitle from '../SectionTitle';
import PrimarySection from '../PrimarySection';
import Container from '../Container';
import FAQAccordion from '../FAQAccordion';
import PrimaryButton from '../PrimaryButton';

export default function FAQ() {
  return (
    <PrimarySection id="faq" className="pt-25">
      <Container>
        <SectionTitle
          textAlign="center"
          subtitle="Common questions answered"
          mb="8"
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
        <div className="flex items-center justify-center">
          <PrimaryButton as="a" mt="30px" href="/faq">
            Read More FAQs
          </PrimaryButton>
        </div>
      </Container>
    </PrimarySection>
  );
}
