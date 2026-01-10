import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  FaCheckCircle,
  FaMoneyBillWave,
  FaClock,
  FaFileAlt,
  FaBolt,
  FaUserTie,
} from 'react-icons/fa';
import Hero from '../../components/HomeComponents/Hero';

const Process = lazy(() => import('../../components/HomeComponents/Process'));
const About = lazy(() => import('../../components/HomeComponents/About'));
const Benefits = lazy(() => import('../../components/HomeComponents/Benefits'));
const FAQ = lazy(() => import('../../components/HomeComponents/FAQ'));
const Contact = lazy(() => import('../../components/HomeComponents/Contact'));
const BlogPosts = lazy(() => import('../../components/HomeComponents/BlogPosts'));

const benefits = [
  {
    title: 'Real Etihad PNR for Verification',
    text: "We can generate a legitimate booking in the airline’s reservation system via a 6-character booking reference (PNR), which can show your reservation live on etihad.com’s 'Manage My Booking' page, usually, that consular officers check.",
    icon: FaCheckCircle,
  },
  {
    title: 'Pay Only AED 49',
    text: 'A flexible Etihad ticket can cost over AED 2,500 for a single route. Our verified reservation costs just AED 49. You can fulfill the same visa requirements for less than 2% of the price.',
    icon: FaMoneyBillWave,
  },
  {
    title: 'Extended Validity',
    text: 'Unlike airlines, which hold options that expire in 24–72 hours, we offer reservations that stay active for 7 or 14 days. This fits the standard visa processing timeline.',
    icon: FaClock,
  },
  {
    title: 'Visa-Friendly Formatting',
    text: 'We create a suitable format for our visa itineraries as per the standard layout that visa officers expect at VFS, BLS, or embassy counters, including all necessary flight and passenger details.',
    icon: FaFileAlt,
  },
  {
    title: 'Fast Delivery',
    text: 'Our automated system delivers your Etihad itinerary to your email within 10–15 minutes, 24/7. There is no waiting for business hours.',
    icon: FaBolt,
  },
  {
    title: 'Direct Support from a Specialist',
    text: 'If you need a confirmation letter or have a specific embassy query, you can communicate with our team that specializes in visa documentation for GCC residents and global travelers.',
    icon: FaUserTie,
  },
];

const pageData = {
  meta: {
    title: 'Etihad Dummy Ticket From AED 49 | Verifiable PNR for Visa',
    description:
      'Get an official Etihad Airways dummy ticket with a live, verifiable PNR for visa applications. Accepted by embassies and visa centers. Starting from AED 49.',
    canonical: 'https://www.mydummyticket.ae/etihad-dummy-ticket',
  },
  sections: {
    hero: {
      title: 'Etihad Dummy Ticket for Visa Applications',
      subtitle:
        'Get an official Etihad Airways flight reservation with a live booking reference for your visa application. Our Etihad dummy tickets provide a real, verifiable flight reservation with a valid PNR that shows your travel intent, without the financial commitment.',
    },
    process: {
      title: 'How Our Etihad Dummy Ticket Service Works',
      subtitle:
        'We follow a simple 3-step process to guarantee an approved Etihad flight reservation that meets your visa application requirements.',
    },
    about: {
      title: 'About Us',
      text: 'We are a licensed travel agency based in Dubai, UAE. We offer air tickets, hotel bookings, travel insurance, flight and hotel reservations, airport transfers, tours, and holiday packages to thousands of satisfied customers annually. Our documentation is accepted by VFS, BLS, and embassies.',
    },
    benefits: {
      title: 'Why Choose My Dummy Ticket for Etihad Flight Proof?',
      subtitle:
        'Buying a real Etihad Airways ticket before visa approval is quite risky financially. My Dummy Ticket provides verifiable, Etihad itineraries that keep your application strong.',
      benefits,
    },
    faqs: {
      title: 'Frequently Asked Questions',
      subtitle: '',
      faqs: [
        {
          question: 'Is an Etihad dummy ticket valid for a Schengen or UK visa?',
          answer:
            'Yes, completely. Our Etihad dummy tickets fulfill the proof of booked flight requirement for all major visa types, including Schengen visas, UK visitor visas, US B1/B2 visas, and Canadian TRVs.',
        },
        {
          question: 'What if the embassy asks for a paid receipt or ticket?',
          answer:
            'Embassies require proof of a concrete travel plan, not proof of payment. A verifiable airline reservation is the globally accepted standard for this purpose.',
        },
        {
          question: 'What’s the difference between your service and booking directly with Etihad?',
          answer:
            'Booking a flexible or refundable ticket directly with Etihad costs more and may carry restrictions. Our service is designed specifically to support visa applications with a cost-effective, verifiable reservation.',
        },
        {
          question: 'Do you offer refunds if my visa is denied?',
          answer:
            'As we provide an immediate digital documentation service, we do not offer refunds once the Etihad dummy ticket has been generated and sent.',
        },
      ],
    },
    contact: {
      title: 'Book Your Etihad Dummy Ticket Confidently',
      subtitle: '',
      text: 'Don’t risk your visa submission with incomplete travel evidence or overpay for a flight you might not use. Get your embassy-ready, verifiable Etihad dummy ticket today at My Dummy Ticket.',
    },
  },
};

export default function EtihadDummyTicket() {
  return (
    <>
      <Helmet>
        <title>{pageData.meta.title}</title>
        <link rel="canonical" href={pageData.meta.canonical} />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={pageData.meta.description} />
      </Helmet>

      <Hero title={pageData.sections.hero.title} subtitle={pageData.sections.hero.subtitle} />

      <Suspense fallback={null}>
        <Process
          title={pageData.sections.process.title}
          subtitle={pageData.sections.process.subtitle}
        />
      </Suspense>

      <Suspense fallback={null}>
        <About title={pageData.sections.about.title} />
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

      <Suspense fallback={null}>
        <BlogPosts />
      </Suspense>

      <Suspense fallback={null}>
        <Contact
          title={pageData.sections.contact.title}
          subtitle={pageData.sections.contact.subtitle}
          text={pageData.sections.contact.text}
        />
      </Suspense>
    </>
  );
}
