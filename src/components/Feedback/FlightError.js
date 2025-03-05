import styled from 'styled-components';
import PrimaryButton from '../Buttons/PrimaryButton';

const Container = styled.div`
  padding-top: 30px;
  text-align: center;
`;

const H1 = styled.h1`
  font-size: 40px;
  @media screen and (max-width: 991px) {
    font-size: 36px;
  }
`;

const P = styled.p`
  font-size: 20px;
  margin: 20px 0;
  font-weight: 300;
`;

export default function FlightError() {
  return (
    <Container>
      <H1>Flights not found</H1>
      <P>
        We're sorry, but we couldn't load the flights at this time. This could be due to a technical
        issue or missing data.
      </P>
      <PrimaryButton as="a" href="/">
        Back to Home
      </PrimaryButton>
    </Container>
  );
}
