import { useContext, useEffect, useState } from 'react';
import { transformItinerary } from '../../utils/transformItinerary';
import { useFlights } from '../../hooks/flight/useFlights';
import { Helmet } from 'react-helmet-async';
import { TicketContext } from '../../context/TicketContext';
import FlightCard from '../../components/FlightCard';
import PrimaryButton from '../../components/PrimaryButton';
import Error from '../../components/Error';
import FlightSkeleton from '../../components/FlightSkeleton';
import FlightError from '../../components/FlightError';

export default function SelectFlights() {
  const [maxFlights, setMaxFlights] = useState(5);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const { type, from, to, departureDate, returnDate, quantity, setDepartureFlight, setReturnFlight, setPassengers, initializePassengers } = useContext(TicketContext)
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

  function handleSelectFlight(flight, index) {
    handleToggleExpand(index);
    setDepartureFlight(transformItinerary(flight.itineraries[0]))
    if (type === 'Return' && flight.itineraries[1]) {
      setReturnFlight(transformItinerary(flight.itineraries[1]))
    }
  }

  useEffect(() => {
    if (quantity) {
      initializePassengers(quantity, setPassengers)
    }
  }, [])
  
  return (
    <>
      <Helmet>
        <title>Select Flights</title>
        <meta name="robots" content="none" />
      </Helmet>
      {isLoadingFlights && Array.from({ length: 3 }).map((_, i) => <FlightSkeleton key={i} />)}

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
              <PrimaryButton onClick={() => {
                if (maxFlights < flights?.length) {
                  setMaxFlights(cur => cur + 5);
                }
              }}>Load More Flights</PrimaryButton>
            </div>
          )}
        </>
      )}

      {flights?.length === 0 && <Error>No flights available</Error>}
    </>
  );
}
