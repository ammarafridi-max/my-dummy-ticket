import { faqArray } from '../../data/faqs';
import SectionTitle from '../SectionTitle';
import PrimarySection from '../PrimarySection';
import Container from '../Container';
import FAQAccordion from '../FAQAccordion';
import PrimaryLink from '../PrimaryLink';

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
          <PrimaryLink to="/faq">Read More FAQs</PrimaryLink>
        </div>
      </Container>
    </PrimarySection>
  );
}
