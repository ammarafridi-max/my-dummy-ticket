import Container from "../../../Components/Container/Container";
import PrimarySection from "../../../Components/Section/PrimarySection";
import styles from "./Testimonials.module.css";
import TestimonialCard from "../../../Components/TestimonialCard/TestimonialCard";
import {
  SectionTitle,
  Subtitle,
} from "../../../Components/SectionTitle/SectionTitle";
import david from "./david.png";
import maria from "./maria.png";
import ahmed from "./ahmed.png";

const testimonials = [
  {
    name: "David S.",
    img: david,
    text: "My Dummy Ticket made my visa application process smooth and stress-free. Their service is reliable and highly recommended for all travelers!",
  },
  {
    name: "Maria K.",
    img: maria,
    text: "Fast, reliable, and easy to use. My Dummy Ticket is a lifesaver for travel documentation. I'll definitely use their service again!",
  },
  {
    name: "Ahmed R.",
    img: ahmed,
    text: "Excellent service! Got my dummy ticket in minutes, perfect for my Schengen visa application. My Dummy Ticket truly understands travelers' needs.",
  },
];

export default function Testimonials() {
  return (
    <PrimarySection pt="100px" className={styles.section}>
      <Container>
        <SectionTitle
          textAlign="center"
          subtitle="What our customers say about us"
        >
          Testimonials
        </SectionTitle>
        <div className="row">
          {testimonials.map((test) => (
            <div className="col-12 col-lg-4">
              <TestimonialCard name={test.name} src={test.img}>
                {test.text}
              </TestimonialCard>
            </div>
          ))}
        </div>
      </Container>
    </PrimarySection>
  );
}
