import { lazy, Suspense } from 'react';
import { faqArray, formatFaqArray } from '../data/faqs';
import { testimonials } from '../data/testimonials';
import { Helmet } from 'react-helmet-async';
import { HiCheck, HiOutlineClock, HiOutlineCurrencyDollar } from 'react-icons/hi2';
import Hero from '../components/HomeComponents/Hero';
const Process = lazy(() => import('../components/HomeComponents/Process'));
const About = lazy(() => import('../components/HomeComponents/About'));
const Benefits = lazy(() => import('../components/HomeComponents/Benefits'));
const Testimonials = lazy(() => import('../components/HomeComponents/Testimonials'));
const FAQ = lazy(() => import('../components/HomeComponents/FAQ'));
const Contact = lazy(() => import('../components/HomeComponents/Contact'));

const keyword = 'flight reservation';

const benefits = [
  {
    title: 'Accepted by VFS',
    text: 'We issue flight reservations through official airline systems, ensuring they are 100% genuine, verifiable, and widely accepted by embassies and consulates.',
    icon: HiCheck,
  },
  {
    title: 'Instant Delivery',
    text: 'Our automated process ensures you receive your flight reservation by email within minutes—quick, seamless, and completely hassle-free.',
    icon: HiOutlineClock,
  },
  {
    title: 'Great Value',
    text: 'Starting from just AED 49, we offer high-quality, embassy-compliant flight reservations at an affordable price, so you save money without sacrificing reliability.',
    icon: HiOutlineCurrencyDollar,
  },
];

const pageData = {
  meta: {
    title: 'Flight Reservation From AED 49 | Instant, Genuine & Verifiable PNR',
    description:
      'Get a genuine flight reservation with a valid PNR for travel documentation purposes. Issued by official airline systems. Instant delivery from AED 49.',
    canonical: 'https://www.mydummyticket.ae/flight-reservation',
  },
  sections: {
    hero: {
      title: 'Book a Genuine Flight Reservation from AED 49',
      subtitle:
        'Get genuine flight reservations issued through official airline systems with a valid, verifiable PNR. Our flight reservations are legitimate bookings created for travel documentation purposes, not fake or falsified tickets.',
    },
    process: {
      title: 'How To Book Your Flight Reservation?',
      subtitle: 'Get your reservation in 3 easy and simple steps',
      keyword,
    },
    about: {
      title: 'About Us',
      text: 'We are an international travel services provider offering verifiable flight reservations and related travel documentation for travelers worldwide. Our services are used by thousands of customers each year for onward travel, immigration checks, and airline requirements. All reservations follow accepted airline formats and include a valid PNR code for verification',
      keyword,
    },
    benefits: {
      title: 'Why Choose Us?',
      subtitle: 'Trusted supplier of flight reservations in the UAE',
      benefits,
    },
    testimonials: {
      title: 'Testimonials',
      subtitle: 'What our customers say about us',
      testimonials,
    },
    faqs: {
      title: 'Frequently Asked Questions',
      subtitle: 'Common questions answered',
      faqs: formatFaqArray(faqArray, keyword),
    },
    blogs: {
      title: 'Blog Posts',
      subtitle: 'Recently published blog posts',
    },
  },
};

export default function FlightReservation() {
  return (
    <>
      <Helmet>
        <title>{pageData?.meta?.title}</title>
        <link rel="canonical" href={pageData?.meta?.canonical} />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={pageData?.meta?.description} />
      </Helmet>
      <Hero title={pageData.sections.hero.title} subtitle={pageData.sections.hero.subtitle} />
      <Suspense fallback={null}>
        <Process
          title={pageData.sections['process'].title}
          subtitle={pageData.sections['process'].subtitle}
        />
      </Suspense>
      <Suspense fallback={null}>
        <About
          title={pageData.sections['about'].title}
          keyword={pageData.sections['about'].keyword}
        />
      </Suspense>
      <Suspense fallback={null}>
        <Benefits
          title={pageData.sections['benefits'].title}
          subtitle={pageData.sections['benefits'].subtitle}
          benefits={pageData.sections['benefits'].benefits}
        />
      </Suspense>
      <Suspense fallback={null}>
        <Testimonials
          title={pageData.sections['testimonials'].title}
          subtitle={pageData.sections['testimonials'].subtitle}
          testimonials={pageData.sections['testimonials'].testimonials}
        />
      </Suspense>
      <Suspense fallback={null}>
        <FAQ
          title={pageData.sections['faqs'].title}
          subtitle={pageData.sections['faqs'].subtitle}
          faqs={pageData.sections['faqs'].faqs}
        />
      </Suspense>
      <Suspense fallback={null}>
        <Contact />
      </Suspense>
    </>
  );
}
