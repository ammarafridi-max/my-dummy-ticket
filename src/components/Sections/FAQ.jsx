import SectionTitle from '../SectionTitle';
import PrimarySection from '../PrimarySection';
import Container from '../Container';
import FAQAccordion from '../FAQAccordion';
import PrimaryLink from '../PrimaryLink';

export default function FAQ({
  title = 'Frequently Asked Questions',
  subtitle = 'Common questions answered',
  faqs,
}) {
  return (
    <PrimarySection id="faq" className="py-10 md:py-12 lg:py-15">
      <Container>
        <SectionTitle textAlign="center" subtitle={subtitle} mb="8">
          {title}
        </SectionTitle>
        <div className="mt-12 flex flex-col gap-3 overflow-x-scroll lg:overflow-x-visible">
          {faqs?.map((faq, i) => {
            while (i < 6) {
              return (
                <FAQAccordion key={i} question={faq.question}>
                  {faq.answer}
                </FAQAccordion>
              );
            }
          })}
        </div>
        <div className="flex items-center justify-center mt-10">
          <PrimaryLink size="small" to="/faq">
            Read More FAQs
          </PrimaryLink>
        </div>
      </Container>
    </PrimarySection>
  );
}
