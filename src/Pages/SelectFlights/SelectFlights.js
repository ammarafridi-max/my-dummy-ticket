import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlights } from "../../redux/slices/fetchFlight";
import styles from "./SelectFlights.module.css";
import FlightCard from "../../Components/FlightCard/FlightCard";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import Error from "../../Components/Feedback/Error";

export default function SelectFlights() {
  const dispatch = useDispatch();
  const { flights, session, status, error } = useSelector(
    (state) => state.flights
  );
  const [maxFlights, setMaxFlights] = useState(4);

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

  return (
    <>
      <h2 className={styles.pageTitle}>Select Your Flight</h2>

      {status === "loading" && <p>Loading flights...</p>}

      {status === "failed" && <p>{error}</p>}

      {status === "succeeded" && flights.length === 0 && (
        <Error>No flights available</Error>
      )}

      {status === "succeeded" && flights.length > 0 && (
        <>
          {flights.slice(0, maxFlights).map((flight, i) => (
            <FlightCard key={i} data={session} flight={flight} />
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
    </>
  );
}
