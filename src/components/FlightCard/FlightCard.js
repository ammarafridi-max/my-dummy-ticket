import styled from 'styled-components';
import Form from './Form';
import PrimaryButton from '../Buttons/PrimaryButton';
import Itinerary from './Itinerary';
import { useHandleForm } from './useHandleForm';

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  border-radius: 30px;
  background-color: white;
  margin-bottom: 20px;
  padding: 20px 20px;
  box-shadow: 0px 0px 5px 1px rgba(220, 220, 220, 1);
  -webkit-box-shadow: 0px 0px 5px 1px rgba(220, 220, 220, 1);
  -moz-box-shadow: 0px 0px 5px 1px rgba(220, 220, 220, 1);
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  @media screen and (max-width: 991px) {
    display: block;
  }
`;

const ItineraryContainer = styled.div`
  width: 75%;
  @media screen and (max-width: 991px) {
    width: 100%;
  }
`;

const CTAContainer = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & button {
    width: 100%;
    padding: 8px 0;
    border-radius: 10px;
  }
  @media screen and (max-width: 991px) {
    width: 100%;
    & button {
      padding: 10px 0;
    }
  }
`;

const Price = styled.p`
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3px;
  & span {
    color: rgb(150, 150, 150);
    font-weight: 300;
    font-size: 16px;
    margin-right: 5px;
  }
  @media screen and (max-width: 991px) {
    margin: 0;
    width: 100%;
    font-size: 18px;
    padding: 5px 0;
    margin-bottom: 10px;
    border-top: 1px solid rgb(200, 200, 200);
    border-bottom: 1px solid rgb(200, 200, 200);
  }
`;

export default function FlightCard({ flight, isExpanded, onToggleExpand }) {
  const { dummyPrice } = useHandleForm();

  return (
    <Wrapper>
      <Row>
        <ItineraryContainer>
          {flight?.itineraries?.map((itinerary) => (
            <Itinerary
              key={itinerary.id}
              itinerary={itinerary}
              airlineInfo={flight.airlineDetails[0]}
            />
          ))}
        </ItineraryContainer>
        <CTAContainer>
          <Price>
            <span>from</span>AED {dummyPrice}
          </Price>
          <PrimaryButton onClick={onToggleExpand} disabled={isExpanded}>
            {isExpanded ? 'Selected' : 'Select Flight'}
          </PrimaryButton>
        </CTAContainer>
      </Row>
      {isExpanded && <Form flight={flight} />}
    </Wrapper>
  );
}
