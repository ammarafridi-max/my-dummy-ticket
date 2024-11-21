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

export default function FlightCard({
  data,
  flight,
  isExpanded,
  onToggleExpand,
}) {
  const totalQuantity = data.quantity.adults + data.quantity.children;
  const dispatch = useDispatch();
  const flightError = useSelector(selectFlightError);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [passengers, setPassengers] = useState([]);
  const [passengerErrors, setPassengerErrors] = useState([]);
  const [ticketValidity, setTicketValidity] = useState("48 Hours");
  const [receiveNow, setReceiveNow] = useState(true);
  const [receiptDate, setReceiptDate] = useState("");
  const [dummyPrice, setDummyPrice] = useState(49 * totalQuantity);
  const [errorMessage, setErrorMessage] = useState("");
  const departureFlight = `${flight.itineraries[0].segments[0].carrierCode} ${flight.itineraries[0].segments[0].number}`;
  const returnFlight =
    data.type === "Return" &&
    `${flight.itineraries[1]?.segments[0].carrierCode} ${flight.itineraries[1]?.segments[0].number}`;

  useEffect(() => {
    setPassengers(generatePassengerList(data.quantity));
  }, [data]);

  // Input changes handling

  const handleUpdatePassenger = (index, field, value) => {
    setPassengers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
    setPassengerErrors((prevErrors) => {
      const updatedErrors = [...prevErrors];
      const fieldNames = { firstName: "First Name", lastName: "Last Name" };
      if (field === "firstName" || field === "lastName") {
        updatedErrors[index] = {
          ...updatedErrors[index],
          [field]:
            value.trim() === "" ? `${fieldNames[field]} is required` : "",
        };
      }
      return updatedErrors;
    });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  function handleValidityChange(e) {
    setTicketValidity(e.target.value);
    setDummyPrice(
      e.target.value === "7 Days"
        ? 69 * totalQuantity
        : e.target.value === "14 Days"
        ? 75 * totalQuantity
        : 49 * totalQuantity
    );
  }

  const handleSelectDate = (date) => {
    setReceiptDate(date);
  };

  // Form validation

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/.test(email);
  }

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

  const validateReceiptInfo = () => {
    return receiveNow || receiptDate;
  };

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
    const formData = {
      type: data.type,
      passengers,
      email,
      phoneNumber: data.phoneNumber,
      message,
      from: data.from,
      to: data.to,
      flightDetails: {
        departureFlight: departureFlight,
        returnFlight: returnFlight || null,
      },
      departureDate: formatDate(data.departureDate),
      returnDate: formatDate(data.returnDate),
      quantity: data.quantity,
      ticketValidity: ticketValidity,
      ticketAvailability: {
        immediate: receiveNow,
        receiptDate: !receiveNow ? receiptDate : null,
      },
      totalAmount: dummyPrice,
    };
    if (validateForm()) {
      try {
        const result = await dispatch(
          updateFlightDetails({
            sessionId: data.sessionId,
            flightData: formData,
          })
        ).unwrap();
        if (result.status === 200) navigate("/booking/review-details");
        else console.error("Failed to update flight details:", result.message);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
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

      {isExpanded && (
        <Form
          data={data}
          passengers={passengers}
          adultCount={data.quantity.adults}
          childCount={data.quantity.children}
          infantCount={data.quantity.infants}
          email={email}
          setEmail={setEmail}
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

// FlightDetails Component
