import styled from 'styled-components';
import { HiClock, HiCheckCircle, HiCurrencyDollar } from 'react-icons/hi2';
import Container from '../../components/Container/Container';
import PrimarySection from '../../components/Section/PrimarySection';
import Paragraph from '../../components/Typography/Paragraph';

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 50px;
  @media only screen and (max-width: 991px) {
    display: block;
  }
`;

export default function Benefits() {
  return (
    <PrimarySection
      backgroundColor="var(--primary-color-700)"
      pt="50px"
      pb="50px"
    >
      <Container>
        <Row>
          <IconCard
            icon={<HiCheckCircle />}
            title="Reliable"
            text="We use official airline reservation systems to create genuine and verifiable dummy tickets, ensuring they are accepted by consulates and embassies worldwide."
          />
          <IconCard
            icon={<HiClock />}
            title="Quick"
            text="Our streamlined process lets you receive a verifiable dummy ticket instantly. Simply complete a short form, and your ticket will be delivered via email within minutes."
          />
          <IconCard
            icon={<HiCurrencyDollar />}
            title="Affordable"
            text="Starting at only AED 49, we provide high-quality dummy tickets at the best rates, making them accessible and affordable for everyone."
          />
        </Row>
      </Container>
    </PrimarySection>
  );
}

const Card = styled.div`
  text-align: center;
  &:last-of-type {
    margin-bottom: 0px;
  }
  @media only screen and (max-width: 991px) {
    width: 100%;
    margin-bottom: 50px;
  }
`;

const H3 = styled.h3`
  font-size: 22px;
  margin: 10px 0 17.5px 0;
  padding: 0;
  font-weight: 500;
  color: white;
`;

const IconDiv = styled.div`
  color: white;
  font-size: 35px;
  overflow: hidden;
  margin: 0 auto;
`;

function IconCard({ icon, title, text }) {
  return (
    <Card>
      <IconDiv>{icon}</IconDiv>
      <H3>{title}</H3>
      <Paragraph color="white" textAlign="center" fontSize="17px">
        {text}
      </Paragraph>
    </Card>
  );
}

{
  /* <IconCard
  icon={shieldIcon}
  title="Reliable"
  text="We use official airline reservation systems to generate dummy tickets, making sure that each ticket is genuine and can be verified by consulates and embassies all around the world."
  alt="A shield icon, representing the reliability of My Dummy Ticket."
/>
<IconCard
  icon={timeIcon}
  title="Quick"
  text="Our streamlined process allows you to get your dummy ticket instantly via email. Simply fill out a short form, and within minutes, you will have a verifiable ticket ready for your visa application."
  alt="A time icon, highlighting My Dummy Ticket's fast process to get your dummy tickets."
/>
<IconCard
  icon={usdIcon}
  title="Affordable"
  text="Starting at just AED 49, our service is the most cost-effective solution. We offer the best rates in the market, making it affordable for everyone to obtain a verifiable dummy ticket."
  alt="A dollar sign, highlighting My Dummy Ticket's affordable pricing for your traveling needs."
/> */
}
