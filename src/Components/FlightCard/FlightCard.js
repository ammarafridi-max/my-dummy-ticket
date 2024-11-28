import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import styles from "./FlightCard.module.css";
import Form from "./Form";
import PrimaryButton from "../Buttons/PrimaryButton";
import {
  updateFlightDetails,
  selectFlightError,
} from "../../redux/slices/selectFlightSlice";
import FlightDetails from "./FlightDetails";
import { baseURL } from "../../config";

// Utility function for generating passengers
function generatePassengerList(quantity) {
  const passengers = [];
  [
    ["Adult", quantity.adults],
    ["Child", quantity.children],
    ["Infant", quantity.infants],
  ].forEach(([type, count]) => {
    for (let i = 0; i < count; i++) {
      passengers.push({ type, title: "Mr.", firstName: "", lastName: "" });
    }
  });
  return passengers;
}

export default function FlightCard({ flight, isExpanded, onToggleExpand }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const flightError = useSelector(selectFlightError);
  const { formData } = useSelector((state) => state.ticketForm);

  // State variables
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState({ code: "", digits: "" });
  const [passengers, setPassengers] = useState([]);
  const [passengerErrors, setPassengerErrors] = useState([]);
  const [ticketValidity, setTicketValidity] = useState("48 Hours");
  const [receiveNow, setReceiveNow] = useState(true);
  const [receiptDate, setReceiptDate] = useState("");
  const [dummyPrice, setDummyPrice] = useState(
    49 * (formData.quantity.adults + formData.quantity.children)
  );
  const [errorMessage, setErrorMessage] = useState("");

  const departureFlight = `${flight.itineraries[0].segments[0].carrierCode} ${flight.itineraries[0].segments[0].number}`;
  const returnFlight =
    formData.type === "Return"
      ? `${flight.itineraries[1]?.segments[0].carrierCode} ${flight.itineraries[1]?.segments[0].number}`
      : null;

  // Update passengers on formData change
  useEffect(() => {
    setPassengers(generatePassengerList(formData.quantity));
  }, [formData]);

  // Handlers
  const handleUpdatePassenger = (index, field, value) => {
    setPassengers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
    setPassengerErrors((prevErrors) => {
      const updatedErrors = [...prevErrors];
      if (field === "firstName" || field === "lastName") {
        updatedErrors[index] = {
          ...updatedErrors[index],
          [field]: value.trim() ? "" : `${field} is required`,
        };
      }
      return updatedErrors;
    });
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleValidityChange = (e) => {
    const validity = e.target.value;
    setTicketValidity(validity);
    setDummyPrice(
      validity === "7 Days"
        ? 69 * (formData.quantity.adults + formData.quantity.children)
        : validity === "14 Days"
        ? 75 * (formData.quantity.adults + formData.quantity.children)
        : 49 * (formData.quantity.adults + formData.quantity.children)
    );
  };

  const handleSelectDate = (date) => setReceiptDate(date);

  // Validation functions
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/.test(email);
  const validatePassengers = () => {
    const errors = passengers.map(({ firstName, lastName }) => ({
      firstName: firstName
        ? /^[A-Za-z\s]+$/.test(firstName.trim())
          ? ""
          : "Only letters and spaces allowed"
        : "First name required",
      lastName: lastName
        ? /^[A-Za-z\s]+$/.test(lastName.trim())
          ? ""
          : "Only letters and spaces allowed"
        : "Last name required",
    }));
    setPassengerErrors(errors);
    return errors.every((err) => !Object.values(err).some(Boolean));
  };
  const validateReceiptInfo = () => receiveNow || receiptDate;

  const validateForm = () => {
    const isValid = [
      validatePassengers(),
      validateReceiptInfo(),
      validateEmail(email),
    ].every(Boolean);
    setErrorMessage(isValid ? "" : "Please complete all required fields.");
    return isValid;
  };

  // Submit form
  const handleSubmit = async () => {
    const { type, from, to, departureDate, returnDate, quantity } = formData;

    const updatedFormData = {
      type,
      passengers,
      email,
      phoneNumber,
      message,
      from,
      to,
      flightDetails: { departureFlight, returnFlight },
      departureDate,
      returnDate,
      quantity,
      status: "REVIEW_ORDER",
      ticketValidity,
      ticketAvailability: {
        immediate: receiveNow,
        receiptDate: !receiveNow ? receiptDate : null,
      },
      totalAmount: dummyPrice,
    };

    if (validateForm()) {
      try {
        const res = await fetch(`${baseURL}/api/ticket/create-ticket`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedFormData),
        });
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        localStorage.setItem("SESSION_ID", data.sessionId);
        console.log("Ticket created:", data);
        navigate("/booking/review-details");
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to create the ticket. Please try again.");
      }
    } else {
      console.log("Validation failed");
    }
  };

  return (
    <div className={styles.container}>
      {/* Flight Details */}
      <div className="row align-items-center justify-content-between">
        <div className="col-12 col-lg-9">
          {flight.itineraries.map((itinerary) => (
            <FlightDetails
              key={itinerary.id}
              itinerary={itinerary}
              airlineInfo={flight.airlineDetails[0]}
            />
          ))}
        </div>
        <div className="col-12 col-lg-3 text-center">
          <p className={styles.price}>AED {dummyPrice}</p>
          <PrimaryButton onClick={onToggleExpand} disabled={isExpanded}>
            {isExpanded ? "Selected" : "Select Flight"}
          </PrimaryButton>
        </div>
      </div>

      {/* Form */}
      {isExpanded && (
        <Form
          formData={formData}
          passengers={passengers}
          adultCount={formData.quantity.adults}
          childCount={formData.quantity.children}
          infantCount={formData.quantity.infants}
          email={email}
          setEmail={setEmail}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          ticketValidity={ticketValidity}
          receiptDate={receiptDate}
          receiveNow={receiveNow}
          handleEmailChange={handleEmailChange}
          passengerErrors={passengerErrors}
          flightError={flightError}
          errorMessage={errorMessage}
          handleUpdatePassenger={handleUpdatePassenger}
          emailError={validateEmail(email)}
          handleSubmit={handleSubmit}
          handleValidityChange={handleValidityChange}
          handleSelectDate={handleSelectDate}
          setReceiptDate={setReceiptDate}
          setMessage={setMessage}
          setReceiveNow={setReceiveNow}
        />
      )}
    </div>
  );
}
