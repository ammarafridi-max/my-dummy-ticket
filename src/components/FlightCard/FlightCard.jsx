import React from 'react';
import styled from 'styled-components';
import Form from './Form';
import Itinerary from './Itinerary';
import PrimaryButtonOutline from '../PrimaryButtonOutline';

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  border-radius: 20px;
  background-color: white;
  margin-bottom: 20px;
  padding: 0px 15px;
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
  width: 70%;
  @media screen and (max-width: 991px) {
    width: 100%;
  }
`;

const CTAContainer = styled.div`
  width: 30%;
  padding: 25px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  & button {
    width: 100%;
    padding: 8px 0;
    border-radius: 5px;
  }
  @media screen and (max-width: 991px) {
    width: 100%;
    & button {
      padding: 10px 0;
    }
  }
`;

const Price = styled.h6`
  font-weight: 800;
  font-size: 16px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  & span {
    color: var(--grey-color-500);
    font-weight: 400;
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

export default function FlightCard({ flight, isExpanded, onSelectFlight }) {
  return (
    <Wrapper>
      <Row>
        <ItineraryContainer>
          {flight?.itineraries?.map((itinerary, i) => (
            <Itinerary
              key={i}
              itinerary={itinerary}
              airlineInfo={flight.airlineDetails[0]}
            />
          ))}
        </ItineraryContainer>
        <CTAContainer>
          <Price>AED 49 / person</Price>
          <PrimaryButtonOutline onClick={onSelectFlight} disabled={isExpanded}>
            {isExpanded ? 'Selected' : 'Select Flight'}
          </PrimaryButtonOutline>
        </CTAContainer>
      </Row>
      {isExpanded && <Form flight={flight} />}
    </Wrapper>
  );
}
