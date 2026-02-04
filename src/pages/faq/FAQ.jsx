import { Helmet } from 'react-helmet-async';
import { faqArray, formatFaqArray } from '../../data/faqs';
import PrimarySection from '../../components/PrimarySection';
import Container from '../../components/Container';
import FAQAccordion from '../../components/FAQAccordion';
import PageHero from '../../components/Sections/PageHero';

const pageData = {
  meta: {
    title: 'Frequently Asked Questions',
    description:
      'Dummy tickets are flight reservations travelers use for various purposes, including visa applications. Book yours with My Dummy Ticket. Starting from AED 49.',
    canonical: 'https://www.mydummyticket.ae/faq',
  },
  breadcrumb: [
    { label: 'Home', path: '/' },
    { label: 'FAQs', path: '/faq' },
  ],
  sections: {
    hero: {
      title: 'Frequently Asked Questions',
      subtitle:
        'Our FAQs section answers the most common questions about dummy tickets, including validity, usage, and verification. It’s designed to give you clear, quick, and reliable information so you can proceed with confidence.',
    },
  },
};

export default function FAQ() {
  return (
    <>
      <Helmet>
        <title>{pageData.meta.title}</title>
        <link rel="canonical" href={pageData.meta.canonical} />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={pageData.meta.description} />
      </Helmet>
      <PageHero
        paths={pageData?.breadcrumb}
        title={pageData?.sections?.hero?.title}
        subtitle={pageData?.sections?.hero?.subtitle}
      />
      <PrimarySection className="py-10 lg:py-15 bg-white">
        <Container>
          <div className="flex flex-col lg:items-center lg:justify-center lg:max-w-240 lg:mx-auto gap-5">
            {formatFaqArray(faqArray, 'dummy ticket').map((faq, i) => (
              <FAQAccordion key={i} question={faq?.question}>
                {faq.answer}
              </FAQAccordion>
            ))}
          </div>
        </Container>
      </PrimarySection>
    </>
  );
}
