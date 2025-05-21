import styled from 'styled-components';
import PrimarySection from '../../components/PrimarySection';
import Container from '../../components/Container';
import SectionTitle from '../../components/SectionTitle';
import PrimaryButton from '../../components/PrimaryButton';
import Paragraph from '../../components/Paragraph';

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  gap: 30px;
  background-color: var(--grey-color-100);
  padding: 50px;
  border-radius: 20px;
  @media only screen and (max-width: 991px) {
    padding: 50px 30px;
    display: block;
  }
`;

const LeftContainer = styled.div`
  width: 60%;
  @media only screen and (max-width: 991px) {
    width: 100%;
    margin-bottom: 50px;
  }
`;

const ImageContainer = styled.div`
  width: 40%;
  @media only screen and (max-width: 991px) {
    width: 100%;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px 50px;
`;

export default function Contact() {
  return (
    <PrimarySection id="contact" pt="0" pb="10px">
      <StyledContainer>
        <LeftContainer>
          <SectionTitle subtitle="Still got questions?" type="secondary">
            Contact Us Now!
          </SectionTitle>
          <Paragraph fontSize="18px" py="25px">
            Still have questions or doubts about our service? Feel free to send
            us an email. We'd be happy to help you out.
          </Paragraph>
          <PrimaryButton as="a" href="mailto:info@mydummyticket.ae">
            Email Us
          </PrimaryButton>
        </LeftContainer>
        <ImageContainer>
          <Img src="/contact-img.webp" alt="Contact Dummy Ticket 365 Now" />
        </ImageContainer>
      </StyledContainer>
    </PrimarySection>
  );
}
