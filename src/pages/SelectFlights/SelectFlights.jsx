import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvailableFlights } from '../../redux/slices/flights';
import {
  initializePassengers,
  updateField,
} from '../../redux/slices/passengerDetailsSlice';
import { Helmet } from 'react-helmet-async';
import FlightCard from '../../components/FlightCard/FlightCard';
import PrimaryButton from '../../components/PrimaryButton';
import Error from '../../components/Error';
import Skeleton from '../../components/FlightCard/Skeleton';
import FlightError from '../../components/FlightError';

export default function SelectFlights() {
  const dispatch = useDispatch();
  const [maxFlights, setMaxFlights] = useState(5);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const { type, from, to, departureDate, returnDate, quantity } = useSelector(
    (state) => state.passengerDetails
  );
  const { availableFlightsData, searchSessionId, searchStatus } = useSelector(
    (state) => state.availableFlights
  );

  const handleToggleExpand = (id) => {
    setExpandedCardId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    if (quantity) {
      dispatch(initializePassengers());
    }
  }, [dispatch, quantity]);

  useEffect(() => {
    dispatch(
      fetchAvailableFlights({
        type,
        from,
        to,
        departureDate,
        returnDate,
        quantity,
      })
    );
  }, [dispatch, type, from, to, departureDate, returnDate, quantity]);

  const showMoreFlights = () => {
    if (maxFlights < availableFlightsData?.length) {
      setMaxFlights((cur) => cur + 5);
    }
  };

  function handleSelectFlight(flight, index) {
    handleToggleExpand(index);
    const dep = `${flight?.itineraries[0].segments[0].carrierCode} ${flight?.itineraries[0].segments[0].number}`;
    dispatch(updateField({ field: 'departureFlight', value: dep }));

    if (type === 'Return') {
      const ret = `${flight?.itineraries[1].segments[0].carrierCode} ${flight?.itineraries[1].segments[0].number}`;
      dispatch(updateField({ field: 'returnFlight', value: ret }));
    }
  }

  return (
    <>
      <Helmet>
        <title>Select Flights</title>
      </Helmet>
      {searchStatus === 'loading' &&
        Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)}

      {searchStatus === 'succeeded' && availableFlightsData?.length === 0 && (
        <Error>No flights available</Error>
      )}

      {searchStatus === 'succeeded' && availableFlightsData?.length > 0 && (
        <>
          {availableFlightsData.slice(0, maxFlights).map((flight, index) => (
            <FlightCard
              key={index}
              data={searchSessionId}
              flight={flight}
              isExpanded={expandedCardId === index}
              onSelectFlight={() => handleSelectFlight(flight, index)}
            />
          ))}
          {availableFlightsData.length > maxFlights && (
            <div className="text-center">
              <PrimaryButton onClick={showMoreFlights}>
                Load More Flights
              </PrimaryButton>
            </div>
          )}
        </>
      )}
      {searchStatus === 'failed' && <FlightError />}
    </>
  );
}
