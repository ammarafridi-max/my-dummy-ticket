import { lazy, Suspense } from 'react';
import { faqArray, formatFaqArray } from '../data/faqs';
import { Helmet } from 'react-helmet-async';
import { HiCheck, HiOutlineClock, HiOutlineCurrencyDollar } from 'react-icons/hi';
import Hero from '../components/HomeComponents/Hero';
const Process = lazy(() => import('../components/HomeComponents/Process'));
const About = lazy(() => import('../components/HomeComponents/About'));
const Benefits = lazy(() => import('../components/HomeComponents/Benefits'));
const Testimonials = lazy(() => import('../components/HomeComponents/Testimonials'));
const FAQ = lazy(() => import('../components/HomeComponents/FAQ'));
const Contact = lazy(() => import('../components/HomeComponents/Contact'));
const BlogPosts = lazy(() => import('../components/HomeComponents/BlogPosts'));

const keyword = 'onward ticket';

const testimonials = [
  {
    title: 'Stress-Free',
    name: 'David S.',
    img: '/david.webp',
    text: 'MDT made my visa process incredibly smooth and totally stress-free. The booking was fast, the ticket looked real, and I had no issues at the embassy. Great service for anyone needing quick and professional travel documents on short notice.',
    purpose: 'Traveler from the United States',
  },
  {
    title: 'Dependable',
    name: 'Maria K.',
    img: '/maria.webp',
    text: 'I was in a rush and MDT delivered exactly what I needed. The process was simple, the service was reliable, and I had my ticket ready in minutes. It saved me a lot of stress when applying for my visa. Definitely using this again in the future.',
    purpose: 'Tourist from the United Kingdom',
  },
  {
    title: 'Super Fast',
    name: 'Ahmed R.',
    img: '/ahmed.webp',
    text: 'The entire experience with MDT was seamless from start to finish. I got my onward ticket within minutes, and it worked perfectly for my Schengen visa. Fast response, clear instructions, and great support — highly recommend to travelers in need.',
    purpose: 'Frequent Flyer from India',
  },
];

const benefits = [
  {
    title: 'Accepted by VFS',
    text: 'We issue onward tickets through official airline systems, ensuring they are 100% genuine, verifiable, and widely accepted by embassies and consulates.',
    icon: HiCheck,
  },
  {
    title: 'Instant Delivery',
    text: 'Our automated process ensures you receive your onward ticket by email within minutes—quick, seamless, and completely hassle-free.',
    icon: HiOutlineClock,
  },
  {
    title: 'Great Value',
    text: 'Starting from just AED 49, we offer high-quality, embassy-compliant onward tickets at an affordable price, so you save money without sacrificing reliability.',
    icon: HiOutlineCurrencyDollar,
  },
];

const pageData = {
  meta: {
    title: 'Onward Ticket From AED 49 | Instant, Genuine, & Affordable',
    description:
      'Travelers use onward tickets for travel purposes, such as to show as proof of onward travel at airports. Book yours with us now. Starting from USD 13.',
    canonical: 'https://www.mydummyticket.ae/onward-ticket',
  },
  sections: {
    hero: {
      title: 'Book a Your Onward Ticket from AED 49.',
      subtitle:
        'Get onward tickets issued through official airline systems with a valid, verifiable PNR. Our flight reservations are legitimate bookings created for travel documentation purposes, not fake or falsified tickets.',
    },
    process: {
      title: 'Your Onward Ticket, Ready in 3 Easy Steps',
      subtitle: 'How To Book Your Reservation',
      keyword,
    },
    about: {
      title: 'About Us',
      text: 'We are an international travel services provider offering verifiable flight reservations and related travel documentation for travelers worldwide. Our services are used by thousands of customers each year for onward travel, immigration checks, and airline requirements. All reservations follow accepted airline formats and include a valid PNR code for verification',
      keyword,
    },
    benefits: {
      title: 'Why Choose My Dummy Ticket?',
      subtitle: 'Trusted supplier based in Dubai',
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

export default function OnwardTicket() {
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
        <BlogPosts
          title={pageData.sections['blogs'].title}
          subtitle={pageData.sections['blogs'].subtitle}
        />
      </Suspense>
      <Suspense fallback={null}>
        <Contact />
      </Suspense>
    </>
  );
}
