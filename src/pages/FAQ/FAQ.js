import { Helmet } from 'react-helmet';
import { faqArray } from '../../assets/data/faqs';
import PrimarySection from '../../components/Section/PrimarySection';
import Container from '../../components/Container/Container';
import PageTitle from '../../components/Typography/PageTitle';
import FAQAccordion from '../../components/FAQAccordion/FAQAccordion';

export default function FAQ() {
  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions</title>
      </Helmet>
      <PrimarySection py="50px" pb="10px" mb="0">
        <Container>
          <PageTitle textAlign="center" mb="50px">
            Frequently Asked Questions
          </PageTitle>
          {faqArray.map((faq, i) => (
            <FAQAccordion key={i} question={faq.question}>
              {faq.answer}
            </FAQAccordion>
          ))}
        </Container>
      </PrimarySection>
    </>
  );
}
