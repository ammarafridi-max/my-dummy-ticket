import { Helmet } from 'react-helmet-async';
import Hero from './Hero';
import Process from './Process';
import About from './About';
import FAQ from './FAQ';
import Benefits from './Benefits';
import Testimonials from './Testimonials';
import Contact from './Contact';

export default function Home() {
  const canonical =
    import.meta.env.MODE === 'development'
      ? 'http://localhost:5173'
      : 'https://mydummyticket.ae';

  return (
    <>
      <Helmet>
        <title>My Dummy Ticket | Verifiable Dummy Ticket for AED 49</title>
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <Hero />
      <Process />
      <About />
      <Benefits />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
