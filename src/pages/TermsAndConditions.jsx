import PrimarySection from '../components/PrimarySection';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';
import SectionTitle from '../components/SectionTitle';
import Paragraph from '../components/Paragraph';

export default function TermsAndConditions() {
  return (
    <PrimarySection pb="50px" pt="50px">
      <Container>
        <PageTitle>Terms And Conditions</PageTitle>

        <Paragraph fontSize="20px" mt="20px">
          Welcome to My Dummy Ticket! By using our website
          (https://www.mydummyticket.ae), you agree to comply with and be bound
          by the following terms and conditions. Please read them carefully
          before using our services.
        </Paragraph>

        <SectionTitle fontSize="small" mt="50px" mb="20px" fontWeight="400">
          General Information
        </SectionTitle>

        <Paragraph fontSize="20px">
          <ol>
            <li>
              My Dummy Ticket provides travel-related services, including the
              provision of dummy tickets for visa applications and travel
              planning purposes.
            </li>
            <li>
              Our services are intended for legitimate use only. Misuse of our
              services for fraudulent activities is strictly prohibited and may
              result in legal action.
            </li>
          </ol>
        </Paragraph>

        <SectionTitle fontSize="small" mt="50px" mb="20px" fontWeight="400">
          Use Of Services
        </SectionTitle>

        <Paragraph fontSize="20px">
          <ol>
            <li>
              By accessing or using our website, you warrant that you are at
              least 18 years old or have obtained parental consent to use the
              site.
            </li>
            <li>
              You agree to use our services only for lawful purposes and in
              accordance with these Terms and Conditions.
            </li>
            <li>
              You acknowledge that the dummy tickets provided are not actual
              tickets and cannot be used for boarding or any other purpose
              beyond their intended use.
            </li>
          </ol>
        </Paragraph>

        <SectionTitle fontSize="small" mt="50px" mb="20px" fontWeight="400">
          Payments and Refunds
        </SectionTitle>

        <Paragraph fontSize="20px">
          <ol>
            <li>
              All payments for services must be made via the payment methods
              available on our website.
            </li>
            <li>
              Payments are non-refundable except in cases of system errors where
              the service was not delivered as described.
            </li>
            <li>
              If you encounter any issues with your order, you must contact us
              within 24 hours of purchase.
            </li>
          </ol>
        </Paragraph>

        <SectionTitle fontSize="small" mt="50px" mb="20px" fontWeight="400">
          User Responsibilities
        </SectionTitle>

        <Paragraph fontSize="20px">
          <ol>
            <li>
              You are responsible for providing accurate and complete
              information when placing an order.
            </li>
            <li>
              My Dummy Ticket is not responsible for any consequences arising
              from incorrect or incomplete information provided by you.
            </li>
            <li>
              You agree not to misuse our services, including but not limited to
              using our dummy tickets for illegal purposes.
            </li>
          </ol>
        </Paragraph>

        <SectionTitle fontSize="small" mt="50px" mb="20px" fontWeight="400">
          Intellectual Property
        </SectionTitle>

        <Paragraph fontSize="20px">
          <ol>
            <li>
              All content on the My Dummy Ticket website, including text,
              graphics, logos, and software, is the property of My Dummy Ticket
              and protected by copyright laws.
            </li>
            <li>
              You may not copy, distribute, modify, or create derivative works
              from our website content without prior written consent.
            </li>
          </ol>
        </Paragraph>

        <SectionTitle fontSize="small" mt="50px" mb="20px" fontWeight="400">
          Disclaimer of Liability
        </SectionTitle>

        <Paragraph fontSize="20px">
          <ol>
            <li>
              My Dummy Ticket does not guarantee visa approval or any specific
              outcomes from the use of our services.
            </li>
            <li>
              We are not liable for any direct, indirect, incidental, or
              consequential damages arising from your use of our services.
            </li>
            <li>
              It is your responsibility to ensure that the dummy ticket meets
              the requirements of the relevant authorities or agencies.
            </li>
          </ol>
        </Paragraph>

        <SectionTitle fontSize="small" mt="50px" mb="20px" fontWeight="400">
          Privacy Policy
        </SectionTitle>

        <Paragraph fontSize="20px">
          <ol>
            <li>
              Your privacy is important to us. Please refer to our Privacy
              Policy for details on how we collect, use, and protect your
              personal information.
            </li>
          </ol>
        </Paragraph>

        <SectionTitle fontSize="small" mt="50px" mb="20px" fontWeight="400">
          Amendments to Terms
        </SectionTitle>

        <Paragraph fontSize="20px">
          <ol>
            <li>
              We reserve the right to update or modify these Terms and
              Conditions at any time without prior notice.
            </li>
            <li>
              Continued use of the website following any changes indicates your
              acceptance of the new Terms and Conditions.
            </li>
          </ol>
        </Paragraph>

        <SectionTitle fontSize="small" mt="50px" mb="20px" fontWeight="400">
          Governing Law
        </SectionTitle>

        <Paragraph fontSize="20px">
          <ol>
            <li>
              These Terms and Conditions are governed by and construed in
              accordance with the laws of the United Arab Emirates.
            </li>
            <li>
              Any disputes arising under these Terms and Conditions shall be
              subject to the exclusive jurisdiction of the courts of the UAE.
            </li>
          </ol>
        </Paragraph>
      </Container>
    </PrimarySection>
  );
}
