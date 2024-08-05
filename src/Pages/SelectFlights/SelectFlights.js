import { useEffect, useState } from "react";
import styles from "./SelectFlights.module.css";
import Container from "../../Components/Container/Container";
import PrimarySection from "../../Components/Section/PrimarySection";
import FlightCard from "../../Components/FlightCard/FlightCard";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import { useFlights } from "../../Services/useFlights";
import { useSearchParams } from "react-router-dom";

export default function SelectFlights() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const from = encodeURIComponent(searchParams.get("from"));
  const to = encodeURIComponent(searchParams.get("to"));
  const departureDate = encodeURIComponent(searchParams.get("departureDate"));
  const returnDate = encodeURIComponent(searchParams.get("returnDate"));

  const {
    isLoading,
    errorText,
    flights,
    showMoreFlights,
    handleSelectFlight,
    maxFlights,
    selectedFlight,
  } = useFlights(type, from, to, departureDate, returnDate, type);

  return (
    <>
      <h2 className={styles.pageTitle}>Select Your Flight</h2>
      {isLoading && <p>Loading flights...</p>}
      {errorText && <p>{errorText}</p>}
      {flights.map((flight, i) => {
        while (i <= maxFlights) {
          return (
            <FlightCard
              itineraries={flight.itineraries}
              onSelectFlight={() => {
                handleSelectFlight(i);
              }}
              selected={selectedFlight === i}
            />
          );
        }
      })}
      {flights.length > 1 && maxFlights < 19 && (
        <div className="text-center">
          <PrimaryButton onClick={showMoreFlights}>More Flights</PrimaryButton>
        </div>
      )}
    </>
  );
}

function Menu() {
  return (
    <div className={styles.menu}>
      <div className={styles.menuItem}>
        <p className={styles.stepNum}>1</p>
        <p>Select Flights</p>
      </div>
      <div className={styles.menuItem}>
        <p className={styles.stepNum}>2</p>
        <p>Passenger Details</p>
      </div>
      <div className={styles.menuItem}>
        <p className={styles.stepNum}>3</p>
        <p>Payment</p>
      </div>
    </div>
  );
}

function FlightContainer({ children }) {
  return <div className={styles.flightContainer}>{children}</div>;
}
