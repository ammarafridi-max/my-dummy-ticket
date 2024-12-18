import Container from "../../../components/Container/Container";
import PrimarySection from "../../../components/Section/PrimarySection";
import TestimonialCard from "../../../components/TestimonialCard/TestimonialCard";
import { SectionTitle } from "../../../components/SectionTitle/SectionTitle";
import david from "../../../assets/Images/david.webp";
import maria from "../../../assets/Images/maria.webp";
import ahmed from "../../../assets/Images/ahmed.webp";

const testimonials = [
  {
    title: "Hassle-free",
    name: "David S.",
    img: david,
    text: "My Dummy Ticket made my visa application process smooth and hassle-free. Their service is reliable and highly recommended for all travelers.",
  },
  {
    title: "Reliable",
    name: "Maria K.",
    img: maria,
    text: "Fast service, reliable, and easy to book. My Dummy Ticket is a lifesaver for travel documentation. I really recommend them and will use their service again!",
  },
  {
    title: "Lightning Fast",
    name: "Ahmed R.",
    img: ahmed,
    text: "Excellent service! Got my dummy ticket in minutes, perfect for my Schengen visa application. My Dummy Ticket truly understands travelers' needs.",
  },
];

export default function Testimonials() {
  return (
    <PrimarySection pt="100px" backgroundColor="white">
      <Container>
        <SectionTitle
          textAlign="center"
          subtitle="What our customers say about us"
        >
          Testimonials
        </SectionTitle>
        <div className="row">
          {testimonials.map((test, i) => (
            <div className="col-12 col-lg-4" key={i}>
              <TestimonialCard
                title={test.title}
                name={test.name}
                src={test.img}
              >
                {test.text}
              </TestimonialCard>
            </div>
          ))}
        </div>
      </Container>
    </PrimarySection>
  );
}
