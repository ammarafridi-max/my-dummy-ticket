import React from 'react';
import { Helmet } from 'react-helmet-async';
import { faqArray, formatFaqArray } from '../data/faqs';
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
      <PrimarySection className="pt-10 pb-10">
        <Container className="block md:grid md:grid-cols-[8fr_4fr]">
          <div>
            <PageTitle className="mb-10">Frequently Asked Questions</PageTitle>
            {formatFaqArray(faqArray, 'dummy ticket').map((faq, i) => (
              <FAQAccordion key={i} question={faq.question}>
                {faq.answer}
              </FAQAccordion>
            ))}
          </div>
          <div></div>
        </Container>
      </PrimarySection>
    </>
  );
}
