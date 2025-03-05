import { Helmet } from 'react-helmet';
import Hero from './Hero';
import Process from './Process';
import About from './About';
import FAQ from './FAQ';
import Benefits from './Benefits';
import Testimonials from './Testimonials-v1';
import Contact from './Contact';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>My Dummy Ticket | Verifiable Dummy Ticket for AED 49</title>
      </Helmet>
      <Hero />
      <Process />
      <Benefits />
      <About />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
