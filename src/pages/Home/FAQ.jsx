import { faqArray } from '../../data/faqs';
import SectionTitle from '../../components/SectionTitle';
import PrimarySection from '../../components/PrimarySection';
import Container from '../../components/Container';
import FAQAccordion from '../../components/FAQAccordion';
import PrimaryButton from '../../components/PrimaryButton';
import styled from 'styled-components';

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function FAQ() {
  return (
    <PrimarySection id="faq" pt="0px" pb="100px">
      <Container>
        <SectionTitle
          textAlign="center"
          subtitle="Common questions about dummy tickets"
          mb="50px"
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
        <ButtonDiv>
          <PrimaryButton as="a" mt="30px" href="/faq">
            Read More FAQs
          </PrimaryButton>
        </ButtonDiv>
      </Container>
    </PrimarySection>
  );
}
