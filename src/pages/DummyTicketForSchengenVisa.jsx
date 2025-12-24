import { Helmet } from 'react-helmet-async';
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaFileAlt,
  FaHeadset,
  FaMoneyBillWave,
  FaShieldAlt,
} from 'react-icons/fa';
import Hero from '../components/HomeComponents/Hero';
import Process from '../components/HomeComponents/Process';
import Benefits from '../components/HomeComponents/Benefits';
import About from '../components/HomeComponents/About';
import FAQ from '../components/HomeComponents/FAQ';
import Contact from '../components/HomeComponents/Contact';

const benefits = [
  {
    title: 'Verifiable PNRs',
    text: "Our dummy tickets are genuine reservations with an active PNR code that can be verified on the airline's official website. This transparency builds trust and gives visa officers confidence in your documentation.",
    icon: FaCheckCircle,
  },
  {
    title: 'Visa-Friendly Formatting',
    text: 'Our itineraries follow professional formats with clean routes, accurate timing, passenger information, and layouts that align with officer expectations. This keeps your file organized and reduces questioning during appointments.',
    icon: FaFileAlt,
  },
  {
    title: 'Affordable Service',
    text: 'Our packages are affordable whether you choose a flight itinerary or a complete bundle with hotel booking and insurance. Prices start from AED 49, a cost-effective option in the UAE without compromising authenticity.',
    icon: FaMoneyBillWave,
  },
  {
    title: 'No Financial Risk',
    text: 'Buying a real ticket before visa approval can cost thousands, and if denied, you lose your money. With our dummy ticket, you avoid that risk entirely by paying only for the reservation service, not the actual flight.',
    icon: FaShieldAlt,
  },
  {
    title: 'Fast Delivery & Support',
    text: 'We deliver your flight reservation and optional hotel bookings quickly, often within minutes. Our UAE-based support team is responsive and ready to assist with verification or adjustments.',
    icon: FaHeadset,
  },
  {
    title: 'Flexible Validity Options',
    text: 'Choose validity periods that match your visa appointment schedule: 48 hours, 7 days, or 14 days, depending on the availability you select.',
    icon: FaCalendarAlt,
  },
];

const faqs = [
  {
    question:
      'Is it mandatory to show a flight reservation for a Schengen visa application?',
    answer:
      'Yes, most Schengen embassies and visa centers require a confirmed or reserved return flight itinerary as proof of onward and return travel when applying for a Schengen visa. A flight reservation helps visa officers assess your travel plan without requiring you to purchase a non-refundable ticket.',
  },
  {
    question: 'Will a dummy ticket work for a Schengen visa?',
    answer:
      'Yes. A dummy ticket for a Schengen visa is widely accepted when it is a genuine flight reservation with a verifiable PNR code. Embassies and visa centers such as VFS and BLS accept these reservations as valid proof of travel for visa applications.',
  },
  {
    question: 'Do I need to buy an actual flight ticket for a Schengen visa?',
    answer:
      'No, you do not need to buy a real flight ticket before your visa is approved. A dummy flight ticket or flight reservation allows you to submit embassy-ready travel proof while avoiding the financial risk of purchasing a non-refundable airfare.',
  },
  {
    question: 'How long is your dummy ticket valid for a Schengen visa?',
    answer:
      'Our dummy tickets for Schengen visa applications are available with flexible validity options of 48 hours, 7 days, or 14 days. This allows you to choose a validity period that matches your visa appointment and document submission timeline.',
  },
  {
    question:
      'When should I order a dummy ticket for my Schengen visa appointment?',
    answer:
      'It is recommended to order your dummy ticket one to three days before your Schengen visa appointment so the reservation remains active during verification. For urgent or last-minute appointments, same-day express delivery is also available.',
  },
  {
    question: 'Do you offer refunds if my Schengen visa is rejected?',
    answer:
      'As dummy tickets are a document-preparation service, refunds are not offered after delivery. However, if any correction or update is required due to an error on our side, we will revise the reservation at no additional cost.',
  },
];

export default function DummyTicketForSchengenVisa() {
  return (
    <>
      <Helmet>
        <title>
          Dummy Ticket for Schengen Visa From AED 49 | Accepted by VFS
        </title>
        <link
          rel="canonical"
          href="https://www.mydummyticket/dummy-ticket-schengen-visa"
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="Book your dummy flight ticket for Schengen visa. We provide verifiable dummy tickets with a valid PNR number that are accepted by VFS. Starting from AED 49."
        />
        <meta
          name="keywords"
          content="dummy ticket, dummy ticket for schengen visa, dummy air ticket for schengen visa, dummy flight ticket for schengen visa"
        />
      </Helmet>
      <Hero
        title="Dummy Tickets For Schengen Visa"
        subtitle="Book your verifiable dummy ticket for your Schengen visa from AED 49. Our dummy tickets come with a 6-digit PNR number that can be used to verify ticket details at airline and reservation systems, and they are accepted by VFS, BLS, and embassies for visa applications."
      />
      <Process
        title="How to book your dummy ticket?"
        subtitle="Get your dummy ticket for Schengen visa in 3 quick, simple, and hassle-free steps. Here's how it works:"
      />
      <About />
      <Benefits
        title="Benefits of Choosing Our Dummy Tickets for Your Schengen Visa"
        subtitle="This is why we believe you should book your dummy ticket with us"
        keyword="dummy ticket"
        benefits={benefits}
      />
      <FAQ
        title="Frequently Asked Questions"
        subtitle="Commonly asked questions about dummy tickets for Schengen visa"
        faqs={faqs}
      />
      <Contact
        title="Reserve Your Dummy Ticket with Us"
        subtitle="Contact us now"
        text="Still not sure whether you should book a dummy ticket or get a real flight ticket? Get in touch with us now and let us help you clear your doubts."
      />
    </>
  );
}
