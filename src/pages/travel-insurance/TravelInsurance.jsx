import { Helmet } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import Hero from '../../components/Sections/Hero';
import TravelInsuranceForm from '../../components/TravelInsuranceForm';
const Process = lazy(() => import('../../components/Sections/Process'));
const About = lazy(() => import('../../components/Sections/About'));

const keyword = 'travel insurance';

const pageData = {
  meta: {
    title: 'Travel Insurance - Instant Delivery',
    description:
      'Dummy tickets are flight reservations travelers use for various purposes, including visa applications. Book yours with My Dummy Ticket. Starting from AED 49.',
    canonical: 'https://www.mydummyticket.ae/travel-insurance',
  },
  sections: {
    hero: {
      title: 'Travel Insurance for UAE Residents',
      subtitle:
        'Book legitimate and genuine outbound travel insurance from the UAE for residents and citizens. Our travel insurances are accepted across the world, including embassies for visa applications.',
      form: <TravelInsuranceForm />,
    },
    process: {
      title: 'How to book your travel insurance?',
      subtitle:
        "Get your dummy ticket for Schengen visa in 3 quick, simple, and hassle-free steps. Here's how it works:",
      keyword,
    },
    about: {
      title: 'About us',
    },
  },
};

export default function TravelInsurance() {
  return (
    <>
      <Helmet>
        <title>{pageData.meta.title}</title>
        <link rel="canonical" href={pageData.meta.canonical} />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={pageData.meta.description} />
      </Helmet>
      <Hero
        title={pageData.sections.hero.title}
        subtitle={pageData.sections.hero.subtitle}
        form={pageData.sections.hero.form}
      />
      <Suspense fallback={null}>
        <Process
          title={pageData.sections.process.title}
          subtitle={pageData.sections.process.subtitle}
        />
      </Suspense>
      <Suspense fallback={null}>
        <About title={pageData.sections.about.title} />
      </Suspense>
    </>
  );
}
