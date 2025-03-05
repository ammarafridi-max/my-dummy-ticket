import styled from 'styled-components';
import PrimarySection from '../../components/Section/PrimarySection';
import Container from '../../components/Container/Container';
import SectionTitle from '../../components/Typography/SectionTitle';

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0;
  padding: 0;
  @media screen and (max-width: 991px) {
    display: block;
  }
`;

const StepDiv = styled.div`
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & h3 {
    color: black;
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 15px;
  }
  & p {
    color: black;
    font-size: 17px;
    font-weight: 300;
    text-align: center;
  }
  @media screen and (max-width: 991px) {
    height: 250px;
    & p {
      font-size: 17px;
    }
  }
`;

const Step1Div = styled(StepDiv)`
  clip-path: polygon(100% 0%, 85% 50%, 100% 100%, 15% 100%, 0% 50%, 15% 0);
  background-color: var(--grey-color-200);
  padding: 30px 75px 30px 45px;
  @media screen and (max-width: 991px) {
    clip-path: polygon(50% 20%, 100% 0, 100% 80%, 50% 100%, 0 80%, 0 0);
    padding: 20px;
    padding-bottom: 0;
  }
`;

const Step2Div = styled(StepDiv)`
  clip-path: polygon(85% 0, 100% 50%, 85% 100%, 15% 100%, 0% 50%, 15% 0);
  background-color: var(--grey-color-200);
  padding: 30px 60px 30px 60px;
  @media screen and (max-width: 991px) {
    clip-path: polygon(50% 20%, 100% 0, 100% 80%, 50% 100%, 0 80%, 0 0);
    padding: 20px;
    padding-bottom: 0;
  }
`;

const Step3Div = styled(StepDiv)`
  clip-path: polygon(85% 0, 100% 50%, 85% 100%, 0% 100%, 15% 50%, 0% 0%);
  background-color: var(--grey-color-200);
  padding: 30px 45px 30px 75px;
  @media screen and (max-width: 991px) {
    clip-path: polygon(50% 20%, 100% 0, 100% 80%, 50% 100%, 0 80%, 0 0);
    padding: 20px;
    padding-bottom: 0;
  }
`;

export default function Process() {
  return (
    <PrimarySection pt="0" pb="100px" id="process">
      <Container>
        <SectionTitle textAlign="center" subtitle="How it Works" mb="50px">
          Your Dummy Ticket in 3 Easy Steps
        </SectionTitle>
        <Row>
          <Step1Div>
            <h3>1. Enter Trip Details</h3>
            <p>
              Enter your route and dates, select your desired flight and enter
              all the details listed on our form.
            </p>
          </Step1Div>
          <Step2Div>
            <h3>2. Make The Payment</h3>
            <p>
              Once you confirm the details, you can then proceed to payment
              using Stripe's Checkout.
            </p>
          </Step2Div>
          <Step3Div>
            <h3>3. Receive Your Ticket</h3>
            <p>
              After your payment is confirmed, you'll receive your dummy ticket
              in 10 minutes via email.
            </p>
          </Step3Div>
        </Row>
      </Container>
    </PrimarySection>
  );
}

function Card({ number, title, text }) {
  return (
    <CardItem>
      <CardNumber>{number}</CardNumber>
    </CardItem>
  );
}

const CardItem = styled.div`
  width: 33%;
  display: grid;
  grid-template-columns: auto 11fr;
`;

const CardNumber = styled.div`
  font-size: 18px;
  color: white;
  width: 40px;
  height: 40px;
  background-color: var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
`;

{
  /* <Row>
      <Card
        number={1}
        title="Select"
        text="Enter your route and dates, select your desired flight and enter all the details listed on our form."
      />
      <Card
        number={2}
        title="Pay"
        text="Once you confirm the details, you can then proceed to payment using Stripe's Checkout"
      />
      <Card
        number={3}
        title="Receive"
        text="After your payment is confirmed, you'll receive your dummy ticket in 10 minutes via email."
      />
    </Row> */
}
