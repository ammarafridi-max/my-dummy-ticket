import PrimarySection from '../components/PrimarySection';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';
import SectionTitle from '../components/SectionTitle';
import Paragraph from '../components/Paragraph';

export default function PrivacyPolicy() {
  return (
    <PrimarySection pb="50px">
      <Container>
        <PageTitle>Privacy Policy</PageTitle>

        <Paragraph fontSize="20px" mt="20px">
          At My Dummy Ticket, your privacy is of utmost importance to us. This
          Privacy Policy outlines how we collect, use, and protect your personal
          information when you use our website (https://www.mydummyticket.ae).
        </Paragraph>

        <SectionTitle fontSize="small" mt="50px" mb="20px" fontWeight="400">
          Information We Collect
        </SectionTitle>

        <Paragraph fontSize="20px">
          <ol>
            <li>
              We collect personal information that you provide to us when
              placing an order, including your name, email address, phone
              number, and payment details.
            </li>
            <li>
              We may also collect non-personal information such as your IP
              address, browser type, and operating system for analytics and
              improvement purposes.
            </li>
          </ol>
        </Paragraph>

        <SectionTitle fontSize="small" mt="50px" mb="20px" fontWeight="400">
          How We Use Your Information
        </SectionTitle>

        <Paragraph fontSize="20px">
          <ol>
            <li>
              To process your orders and deliver the services you have
              requested.
            </li>
            <li>
              To communicate with you regarding your orders, updates, and
              support requests.
            </li>
            <li>
              To improve our website, services, and user experience through
              analytics and feedback.
            </li>
          </ol>
        </Paragraph>

        <SectionTitle fontSize="small" mt="50px" mb="20px" fontWeight="400">
          Sharing Your Information
        </SectionTitle>

        <Paragraph fontSize="20px">
          <ol>
            <li>
              We do not sell, rent, or share your personal information with
              third parties except as required to fulfill your order or comply
              with legal obligations.
            </li>
            <li>
              Third-party services we use for payment processing or analytics
              are required to maintain the confidentiality of your information.
            </li>
          </ol>
        </Paragraph>

        <SectionTitle fontSize="small" mt="50px" mb="20px" fontWeight="400">
          Data Security
        </SectionTitle>

        <Paragraph fontSize="20px">
          <ol>
            <li>
              We implement appropriate security measures to protect your
              personal information from unauthorized access, alteration,
              disclosure, or destruction.
            </li>
            <li>
              However, no method of transmission over the internet or electronic
              storage is completely secure. We cannot guarantee absolute
              security.
            </li>
          </ol>
        </Paragraph>

        <SectionTitle fontSize="small" mt="50px" mb="20px" fontWeight="400">
          Your Rights
        </SectionTitle>

        <Paragraph fontSize="20px">
          <ol>
            <li>
              You have the right to access, correct, or delete your personal
              information by contacting us at info@mydummyticket.ae.
            </li>
            <li>
              You may also opt out of receiving marketing communications by
              following the unsubscribe instructions in our emails.
            </li>
          </ol>
        </Paragraph>

        <SectionTitle fontSize="small" mt="50px" mb="20px" fontWeight="400">
          Changes to This Privacy Policy
        </SectionTitle>

        <Paragraph fontSize="20px">
          <ol>
            <li>
              We reserve the right to update or modify this Privacy Policy at
              any time without prior notice.
            </li>
            <li>
              Any changes will be effective immediately upon posting on our
              website.
            </li>
          </ol>
        </Paragraph>

        <SectionTitle fontSize="small" mt="50px" mb="20px" fontWeight="400">
          Contact Us
        </SectionTitle>

        <Paragraph fontSize="20px">
          If you have any questions or concerns about this Privacy Policy,
          please contact us at:
          <br />
          <br />
          Email: info@mydummyticket.ae
          <br />
          Address: Abraj Al Mamzar, Al Mamzar, Dubai, United Arab Emirates
        </Paragraph>
      </Container>
    </PrimarySection>
  );
}
