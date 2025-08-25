import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { trackPageView } from '../utils/analytics';
import Hero from '../components/HomeComponents/Hero';
import Process from '../components/HomeComponents/Process';
import About from '../components/HomeComponents/About';
import FAQ from '../components/HomeComponents/FAQ';
import Benefits from '../components/HomeComponents/Benefits';
import Testimonials from '../components/HomeComponents/Testimonials';
import Contact from '../components/HomeComponents/Contact';
import Airlines from '../components/HomeComponents/Airlines';

export default function Home() {
  const canonical =
    import.meta.env.MODE === 'development'
      ? 'http://localhost:5173'
      : 'https://www.dummyticket365.com';

  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Dummy Ticket from AED 49 | Verifiable, Quick | My Dummy Ticket
        </title>
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="Dummy tickets are flight reservations travelers use for various purposes, including visa applications. Book yours with My Dummy Ticket. Starting from AED 49."
        />
      </Helmet>
      <Hero />
      <Process />
      <About />
      <Benefits />
      <Testimonials />
      <FAQ />
      <Airlines />
      <Contact />
    </>
  );
}
