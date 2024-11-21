import styles from "./SelectFlights.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlights } from "../../redux/slices/fetchFlight";
import FlightCard from "../../components/FlightCard/FlightCard";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import Container from "../../components/Container/Container";
import Error from "../../components/Feedback/Error";
import Skeleton from "../../components/FlightCard/Skeleton";
import { HelmetProvider } from "react-helmet-async";
import { Helmet } from "react-helmet";

export default function SelectFlights() {
  const dispatch = useDispatch();
  const { flights, session, status } = useSelector((state) => state.flights);
  const [maxFlights, setMaxFlights] = useState(5);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const handleToggleExpand = (id) => {
    if (expandedCardId === id) {
      setExpandedCardId(null);
    } else {
      setExpandedCardId(id);
    }
  };

  useEffect(() => {
    const sessionId = localStorage.getItem("SESSION_ID");
    if (sessionId) {
      dispatch(fetchFlights(sessionId));
    }
  }, [dispatch]);

  function showMoreFlights() {
    if (maxFlights < flights.length) {
      setMaxFlights((cur) => cur + 5);
    }
  }

  const excludedAirlines = [];

  function getFilteredFlights(flights) {
    return flights.filter((flight) =>
      flight.itineraries.every((itinerary) =>
        itinerary.segments.every(
          (segment) => !excludedAirlines.includes(segment.carrierCode)
        )
      )
    );
  }

  const filteredFlight = getFilteredFlights(flights);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Select Your Flight</title>
        </Helmet>
      </HelmetProvider>
      <Container className={styles.container}>
        {status === "loading" && (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        )}
        {status === "succeeded" && filteredFlight.length === 0 && (
          <Error>No flights available</Error>
        )}
        {status === "succeeded" && filteredFlight.length > 0 && (
          <>
            {filteredFlight.slice(0, maxFlights).map((flight, i) => (
              <FlightCard
                key={i}
                data={session}
                flight={flight}
                isExpanded={expandedCardId === i}
                onToggleExpand={() => handleToggleExpand(i)}
              />
            ))}
            {flights.length > maxFlights && (
              <div className="text-center">
                <PrimaryButton onClick={showMoreFlights}>
                  More Flights
                </PrimaryButton>
              </div>
            )}
          </>
        )}
        {status === "failed" && flights.length === 0 && (
          <Error>Something went wrong. Please try again!</Error>
        )}
      </Container>
    </>
  );
}
