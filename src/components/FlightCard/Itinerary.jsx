import React from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { formatISODuration } from '../../utils/formatISODuration';
import { formatISOTime } from '../../utils/formatISOTime';
import { baseURL } from '../../config';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  background-color: white;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  &:nth-of-type(2) {
    border-top: 1px solid rgb(200, 200, 200);
    margin-bottom: 0px;
  }
  @media screen and (max-width: 991px) {
    gap: 30px;
  }
`;

export default function Itinerary({ itinerary, airlineInfo }) {
  return (
    <Wrapper>
      <AirlineLogo airlineInfo={airlineInfo} />
      <DepartureData itinerary={itinerary} />
      <Duration itinerary={itinerary} />
      <ReturnData itinerary={itinerary} />
    </Wrapper>
  );
}

const AirlineLogoDiv = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & img {
    width: 100%;
  }
`;

function AirlineLogo({ airlineInfo }) {
  return (
    <AirlineLogoDiv>
      <img
        src={`${baseURL}${airlineInfo.logo}` || ''}
        alt={`${airlineInfo.commonName} Logo`}
      />
    </AirlineLogoDiv>
  );
}

const DepartureDataDiv = styled.div`
  width: fit-content;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
  & span {
    font-size: 13px;
    font-weight: 400;
  }
  @media screen and (max-width: 991px) {
    font-size: 16px;
    & span {
      font-size: 14px;
    }
  }
`;

function DepartureData({ itinerary }) {
  return (
    <DepartureDataDiv>
      {itinerary?.segments[0].departure.iataCode}
      <br />
      <span>{formatISOTime(itinerary?.segments[0].departure.at).date}</span>
      <br />
      <span>{formatISOTime(itinerary?.segments[0].departure.at).time}</span>
    </DepartureDataDiv>
  );
}

const DurationDiv = styled.div`
  width: fit-content;
  height: fit-content;
  text-align: center;
  color: rgb(150, 150, 150);
  font-size: 14px;
  font-weight: 300;
  line-height: 1.2;
`;

function Duration({ itinerary }) {
  return (
    <DurationDiv>
      <span>{formatISODuration(itinerary.duration)}</span>
      <br />
      <FaArrowRightLong />
      <br />
      {itinerary.segments.length === 1 && <span>Non-stop</span>}
      {itinerary.segments.length === 2 && (
        <span>Stop in {itinerary.segments.at(0).arrival.iataCode}</span>
      )}
      {itinerary.segments.length >= 3 && <span>Multiple stops</span>}
    </DurationDiv>
  );
}

const ReturnDataDiv = styled.div`
  width: fit-content;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
  & span {
    font-size: 13px;
    font-weight: 400;
  }
  @media screen and (max-width: 991px) {
    font-size: 16px;
    & span {
      font-size: 14px;
    }
  }
`;

function ReturnData({ itinerary }) {
  return (
    <ReturnDataDiv>
      {itinerary.segments[itinerary.segments.length - 1].arrival.iataCode}
      <br />
      <span>
        {
          formatISOTime(
            itinerary.segments[itinerary.segments.length - 1].arrival.at
          ).date
        }
      </span>
      <br />
      <span>
        {
          formatISOTime(
            itinerary.segments[itinerary.segments.length - 1].arrival.at
          ).time
        }
      </span>
    </ReturnDataDiv>
  );
}
