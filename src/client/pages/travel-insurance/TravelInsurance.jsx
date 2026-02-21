import { Helmet } from 'react-helmet-async';
import {
  buildFAQPage,
  buildGraph,
  buildOrganization,
  buildService,
  buildWebPage,
  buildWebsite,
} from '../../../lib/schema';
import { lazy, Suspense } from 'react';
import { HiCheck, HiOutlineClock, HiOutlineCurrencyDollar } from 'react-icons/hi2';
import { insuranceFaqs } from '../../../data/faqs';
import Hero from '../../../components/Sections/Hero';
import AllForms from '../../../components/AllForms';
const Process = lazy(() => import('../../../components/Sections/Process'));
const About = lazy(() => import('../../../components/Sections/About'));
const Benefits = lazy(() => import('../../../components/Sections/Benefits'));
const FAQ = lazy(() => import('../../../components/Sections/FAQ'));

const keyword = 'travel insurance';

const benefits = [
  {
    title: 'Embassy-Compliant Coverage',
    text: 'Our travel insurance plans meet embassy and visa requirements, including Schengen-compliant coverage where needed, so your application stays smooth and stress-free.',
    icon: HiCheck,
  },
  {
    title: 'Instant Policy Issuance',
    text: 'Get your travel insurance policy delivered straight to your email within minutes. Fast processing, zero paperwork, and no delays.',
    icon: HiOutlineClock,
  },
  {
    title: 'Affordable & Reliable',
    text: 'Starting from competitive rates, our travel insurance plans provide strong medical and travel coverage without overpaying, giving you protection and peace of mind.',
    icon: HiOutlineCurrencyDollar,
  },
];

const pageData = {
  meta: {
    title: 'Travel Insurance for UAE Residents | Instant Policy Delivery',
    description:
      'Buy travel insurance online with instant policy delivery. Embassy‑compliant coverage for UAE residents and citizens, with quick quotes and secure checkout.',
    canonical: 'https://www.mydummyticket.ae/travel-insurance',
  },
  sections: {
    hero: {
      title: 'Travel Insurance for UAE Residents',
      subtitle:
        'Get travel insurance online with instant delivery. Our policies are genuine, embassy‑compliant, and suitable for visa applications and international travel from the UAE.',
      form: <AllForms defaultTab="insurance" />,
    },
    process: {
      title: 'How to Book Travel Insurance',
      subtitle: 'Get covered in 3 quick steps',
      steps: [
        {
          title: 'Trip Details',
          text: 'Enter your trip start and end dates, choose your destination region, and select the number of adults, children, and seniors traveling.',
        },
        {
          title: "Passengers' Details",
          text: 'Fill in each traveler’s details exactly as per passport, including full name, date of birth, nationality, and passport number, so the policy is issued without errors.',
        },
        {
          title: 'Payment',
          text: 'Review your plan, pay securely online, and receive your travel insurance policy instantly by email. You can download it right away for visa submission or travel.',
        },
      ],
    },
    about: {
      title: 'About Our Travel Insurance',
      text: 'We provide travel insurance for UAE residents and citizens with instant policy delivery, competitive pricing, and coverage that meets embassy requirements. Choose the plan that fits your trip and get insured in minutes.',
    },
    benefits: {
      title: 'Why Book Travel Insurance With Us?',
      subtitle: 'Trusted UAE‑based travel insurance provider',
      benefits,
    },
    faqs: {
      title: 'Travel Insurance FAQs',
      subtitle: 'Common questions about travel insurance',
      faqs: insuranceFaqs,
    },
  },
};

export default function TravelInsurance() {
  const schema = buildGraph([
    buildOrganization(),
    buildWebsite(),
    buildWebPage({
      canonical: pageData.meta.canonical,
      title: pageData.meta.title,
      description: pageData.meta.description,
    }),
    buildService({
      canonical: pageData.meta.canonical,
      name: 'Travel Insurance',
      description: pageData.meta.description,
      areaServed: 'AE',
    }),
    buildFAQPage({
      canonical: pageData.meta.canonical,
      title: pageData.sections.faqs.title,
      description: pageData.meta.description,
      faqs: pageData.sections.faqs.faqs,
    }),
  ]);

  return (
    <>
      <Helmet>
        <title>{pageData.meta.title}</title>
        <link rel="canonical" href={pageData.meta.canonical} />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={pageData.meta.description} />
        <meta
          name="keywords"
          content="travel insurance, travel insurance UAE, travel insurance for UAE residents, instant travel insurance"
        />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
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
          steps={pageData.sections.process.steps}
        />
      </Suspense>
      <Suspense fallback={null}>
        <About title={pageData.sections.about.title} text={pageData.sections.about.text} />
      </Suspense>
      <Suspense fallback={null}>
        <Benefits
          title={pageData.sections.benefits.title}
          subtitle={pageData.sections.benefits.subtitle}
          benefits={pageData.sections.benefits.benefits}
        />
      </Suspense>
      <Suspense fallback={null}>
        <FAQ
          title={pageData.sections.faqs.title}
          subtitle={pageData.sections.faqs.subtitle}
          faqs={pageData.sections.faqs.faqs}
        />
      </Suspense>
    </>
  );
}
