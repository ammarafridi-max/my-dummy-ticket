import Container from '../Container';
import PrimarySection from '../PrimarySection';
import TestimonialCard from '../TestimonialCard';
import SectionTitle from '../SectionTitle';

export default function Testimonials({
  title = 'Testimonials',
  subtitle = 'What our customers say about us',
  testimonials,
}) {
  return (
    <PrimarySection className="pt-15 md:pt-10">
      <Container>
        <SectionTitle textAlign="center" subtitle={subtitle} mb="8">
          {title}
        </SectionTitle>
        <div className="flex overflow-scroll md:grid md:grid-cols-3 gap-5">
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
