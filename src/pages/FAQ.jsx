import React from 'react';
import { Helmet } from 'react-helmet-async';
import { faqArray } from '../data/faqs';
import PrimarySection from '../components/PrimarySection';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';
import FAQAccordion from '../components/FAQAccordion';

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
