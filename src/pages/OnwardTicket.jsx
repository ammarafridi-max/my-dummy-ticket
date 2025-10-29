import { useEffect } from 'react';
import { trackPageView } from '../utils/analytics';
import { faqArray, formatFaqArray } from '../data/faqs';
import { formatTestimonialsArray, testimonials } from '../data/testimonials';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/HomeComponents/Hero';
import Process from '../components/HomeComponents/Process';
import About from '../components/HomeComponents/About';
import Benefits from '../components/HomeComponents/Benefits';
import Testimonials from '../components/HomeComponents/Testimonials';
import FAQ from '../components/HomeComponents/FAQ';
import Contact from '../components/HomeComponents/Contact';

export default function OnwardTicket() {
  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Onward Ticket From AED 49 | Instant, Verifiable, & Affordable
        </title>
        <link rel="canonical" href="https://www.mydummyticket/onward-ticket" />
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="Travelers use onward tickets for travel purposes, such as to show as proof of onward travel at airports. Book yours with us now. Starting from USD 13."
        />
      </Helmet>
      <Hero
        title="Onward Ticket from AED 49. Verifiable and Legit."
        subtitle="Book your onward ticket for all kinds of purposes instantly. All onward tickets come with a PNR code that can be verified directly on airline websites."
      />
      <Process
        title="Your Onward Ticket in 3 Easy Steps"
        subtitle="How To Book Your Onward Ticket"
      />
      <About />
      <Benefits keyword="onward ticket" />
      <Testimonials
        testimonials={formatTestimonialsArray(testimonials, 'onward ticket')}
      />
      <FAQ faqs={formatFaqArray(faqArray, 'onward ticket')} />
      <Contact />
    </>
  );
}
