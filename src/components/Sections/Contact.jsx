import PrimarySection from '../PrimarySection';
import Container from '../Container';
import SectionTitle from '../SectionTitle';
import PrimaryLink from '../PrimaryLink';
import Paragraph from '../Paragraph';

export default function Contact({
  title = 'Contact Us Now',
  subtitle = 'Still got questions?',
  text = "Still have questions or doubts about our service? Feel free to send us an email. We'd be happy to help you out.",
}) {
  return (
    <PrimarySection id="contact" className="mt-10 mb-15">
      <Container>
        <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-100 p-6 md:p-12 rounded-2xl">
          <div className="w-full md:w-3/5 mb-8 md:mb-0">
            <SectionTitle subtitle={subtitle} className="mb-7 lg:mb-6">
              {title}
            </SectionTitle>
            <p className="text-lg lg:text-lg font-nunito font-light">{text}</p>
            <PrimaryLink size="small" href="mailto:info@mydummyticket.ae" className="mt-5">
              Send Us An Email
            </PrimaryLink>
          </div>

          <div className="w-full md:w-2/5">
            <img
              src="/contact-img.webp"
              alt="Contact MDT Now"
              className="w-full h-full object-cover rounded-[5px_50px_5px_50px]"
            />
          </div>
        </div>
      </Container>
    </PrimarySection>
  );
}
