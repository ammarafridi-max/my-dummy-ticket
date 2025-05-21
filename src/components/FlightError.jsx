import styled from 'styled-components';
import PrimaryButton from './PrimaryButton';
import { X } from 'lucide-react';

const Container = styled.div`
  padding-top: 30px;
  text-align: center;
`;

const H1 = styled.h1`
  font-size: 36px;
  @media screen and (max-width: 991px) {
    font-size: 36px;
  }
`;

const P = styled.p`
  font-size: 20px;
  margin: 20px 0;
  font-weight: 300;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 110px;
  border-radius: 100%;
  margin: 0 auto;
  margin-bottom: 30px;
  background-color: ${({ type }) => {
    if (type === 'success') return '#e5f3eb';
    if (type === 'error') return '#ffcccc';
  }};
  & svg {
    width: 60px !important;
    height: 60px !important;
    color: ${({ type }) => {
      if (type === 'success') return '#00702e';
      if (type === 'error') return '#990000';
    }};
  }
`;

export default function FlightError() {
  return (
    <Container>
      <IconContainer type="error">
        <X />
      </IconContainer>
      <H1>Flights not found</H1>
      <P>
        We&apos;re sorry, but we couldn&apos;t load the flights at this time.
        This could be due to a technical issue or missing data.
      </P>
      <PrimaryButton as="a" href="/">
        Back to Home
      </PrimaryButton>
    </Container>
  );
}
