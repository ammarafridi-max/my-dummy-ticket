import { Helmet } from 'react-helmet-async';
import Benefits from '../components/HomeComponents/Benefits';
import Contact from '../components/HomeComponents/Contact';
import Hero from '../components/HomeComponents/Hero';
import Process from '../components/HomeComponents/Process';
import PrimarySection from '../components/PrimarySection';

export default function FlightReservation() {
  return (
    <>
      <Helmet>
        <title>Flight Reservation from USD 12 | Book Now!</title>
        <link
          rel="canonical"
          href="https://www.dummyticket365.com/flight-reservation"
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="Dummy tickets are flight reservations travelers use for various purposes, including visa applications. Book yours with My Dummy Ticket. Starting from AED 49."
        />
      </Helmet>
      <Hero
        title="Flight Reservations from USD 12. Instant & Legit."
        subtitle="Book your flight reservation with us and travel stress-free and with great flexibility. Our reservations are used by thousands every month and come with a valid PNR that can be verified on reservation systems."
      />
      <Process />
      <Benefits keyword="flight reservation" />
      <PrimarySection py="0" pt="100px">
        <Contact />
      </PrimarySection>
    </>
  );
}
