import Container from '../Container';
import PrimarySection from '../PrimarySection';
import TestimonialCard from '../TestimonialCard';
import SectionTitle from '../SectionTitle';

const testimonials = [
  {
    title: 'Stress-Free',
    name: 'David S.',
    img: '/david.webp',
    text: 'My Dummy Ticket made my visa process incredibly smooth and totally stress-free. The booking was fast, the ticket looked real, and I had no issues at the embassy. Great service for anyone needing quick and professional travel documents on short notice.',
    purpose: 'Traveler - Used dummy ticket for visa application',
  },
  {
    title: 'Dependable',
    name: 'Maria K.',
    img: '/maria.webp',
    text: 'I was in a rush and My Dummy Ticket delivered exactly what I needed. The process was simple, the service was reliable, and I had my ticket ready in minutes. It saved me a lot of stress when applying for my visa. Definitely using this again in the future.',
    purpose: 'Tourist - Used dummy ticket for proof of onward travel',
  },
  {
    title: 'Super Fast',
    name: 'Ahmed R.',
    img: '/ahmed.webp',
    text: 'The entire experience with My Dummy Ticket was seamless from start to finish. I got my dummy ticket within minutes, and it worked perfectly for my Schengen visa. Fast response, clear instructions, and great support — highly recommend to travelers in need.',
    purpose: 'Frequent Flyer - Used dummy ticket for Schengen visa',
  },
];

export default function Testimonials() {
  return (
    <PrimarySection>
      <Container>
        <SectionTitle
          textAlign="center"
          subtitle="What our customers say about us"
          mb="8"
        >
          Testimonials
        </SectionTitle>
        <div className="flex md:grid md:grid-cols-3 gap-3.75 overflow-x-scroll md:overflow-visible">
          {testimonials.map((test, i) => (
            <TestimonialCard
              key={i}
              title={test.title}
              name={test.name}
              src={test.img}
              purpose={test.purpose}
            >
              {test.text}
            </TestimonialCard>
          ))}
        </div>
      </Container>
    </PrimarySection>
  );
}
