import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  initializePassengers,
  transformItinerary,
  updateField,
} from '../../redux/slices/ticketFormSlice';
import { Helmet } from 'react-helmet-async';
import { useFlights } from '../../hooks/useFlights';
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
    state => state.ticketForm
  );
  const { flights, isLoadingFlights, isErrorFlights } = useFlights({
    type,
    from,
    to,
    departureDate,
    returnDate,
    quantity,
  });

  const handleToggleExpand = id => {
    setExpandedCardId(prevId => (prevId === id ? null : id));
  };

  useEffect(() => {
    if (quantity) {
      dispatch(initializePassengers());
    }
  }, [dispatch, quantity]);

  const showMoreFlights = () => {
    if (maxFlights < flights?.length) {
      setMaxFlights(cur => cur + 5);
    }
  };

  function handleSelectFlight(flight, index) {
    handleToggleExpand(index);

    const departureFlightObj = transformItinerary(flight.itineraries[0]);
    dispatch(updateField({ field: 'departureFlight', value: departureFlightObj }));

    if (type === 'Return' && flight.itineraries[1]) {
      const returnFlightObj = transformItinerary(flight.itineraries[1]);
      dispatch(updateField({ field: 'returnFlight', value: returnFlightObj }));
    }
  }

  return (
    <>
      <Helmet>
        <title>Select Flights</title>
      </Helmet>
      {isLoadingFlights && Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)}

      {isErrorFlights && <FlightError />}

      {flights?.length > 0 && (
        <>
          {flights.slice(0, maxFlights).map((flight, index) => (
            <FlightCard
              key={index}
              flight={flight}
              isExpanded={expandedCardId === index}
              onSelectFlight={() => handleSelectFlight(flight, index)}
            />
          ))}
          {flights.length > maxFlights && (
            <div className="text-center mt-3">
              <PrimaryButton onClick={showMoreFlights}>Load More Flights</PrimaryButton>
            </div>
          )}
        </>
      )}

      {flights?.length === 0 && <Error>No flights available</Error>}
    </>
  );
}
