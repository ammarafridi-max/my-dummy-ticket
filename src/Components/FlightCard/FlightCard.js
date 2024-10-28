import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./FlightCard.module.css";
import { FaArrowRightLong, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import PrimaryButton from "../Buttons/PrimaryButton";
import { formatISODuration } from "../../Services/formatISODuration";
import { formatISOTime } from "../../Services/formatISOTime";
import { useNavigate } from "react-router-dom";
import Counter from "../../Components/FormElements/Counter";
import Error from "../Feedback/Error";
import Input from "../FormElements/Input";
import Label from "../FormElements/Label";
import SelectTitle from "../FormElements/SelectTitle";
import Number from "../FormElements/Number";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import {
  updateFlightDetails,
  selectFlightError,
  selectFlightStatus,
} from "../../redux/slices/selectFlightSlice";
import SelectDate from "../FormElements/SelectDate";
import { localBaseURL } from "../../config";
import TextArea from "../FormElements/TextArea";

export default function FlightCard({
  data,
  flight,
  key,
  isExpanded,
  onToggleExpand,
}) {
  const [airlineInfo] = flight.airlineDetails;

  const dispatch = useDispatch();
  const flightError = useSelector(selectFlightError);
  const status = useSelector(selectFlightStatus);
  const navigate = useNavigate();
  const [airlineDetail, setAirlineDetail] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [passengers, setPassengers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [passengerDetails, setPassengerDetails] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    email: "",
    mobile: "",
    passengers: [],
  });
  const [selectedOption, setSelectedOption] = useState("48h");

  const [emailError, setEmailError] = useState("");
  const [receiptError, setReceiptError] = useState("");
  const [checkedItems, setCheckedItems] = useState({
    receiveTicketLater: false,
    addNotes: false,
    promoCode: false,
  });

  const totalQuantity = data.quantity.adults + data.quantity.children + data.quantity.infants;
  console.log("totalQuantity ->",totalQuantity);
  

  const initialPrice = 49 * totalQuantity;
  console.log(" totalQuantity price ->>",initialPrice);
  

  const [receiveNow, setReceiveNow] = useState(true);
  const [receiptDate, setReceiptDate] = useState("");
  const [passengerErrors, setPassengerErrors] = useState([]);
  const [dummyPrice, setDummyPrice] = useState(initialPrice);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "7d") {
      setDummyPrice(69 * totalQuantity);
    } else if (event.target.value === "14d") {
      setDummyPrice(75 * totalQuantity);
    } else {
      setDummyPrice(49 * totalQuantity);
    }
  };

  const handleDateSelect = (date) => {
    setReceiptDate(date);
    if (date === "") {
      setErrorMessage("Please select date");
    } else {
      setErrorMessage("");
    }
  };
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  let adultCount = 0;
  let childCount = 0;
  let infantCount = 0;

  const toggleExpand = () => {
    onToggleExpand();
  };

  useEffect(() => {
    const newPassengers = [];
    let adults = 0;
    let children = 0;
    let infants = 0;

    passengers.forEach((passenger) => {
      if (passenger.type === "Adult" && adults < data.quantity.adults) {
        newPassengers.push(passenger);
        adults += 1;
      } else if (
        passenger.type === "Child" &&
        children < data.quantity.children
      ) {
        newPassengers.push(passenger);
        children += 1;
      } else if (
        passenger.type === "Infant" &&
        infants < data.quantity.infants
      ) {
        newPassengers.push(passenger);
        infants += 1;
      }
    });

    while (adults < data.quantity.adults) {
      newPassengers.push({
        type: "Adult",
        title: "Mr.",
        firstName: "",
        lastName: "",
      });
      adults += 1;
    }
    while (children < data.quantity.children) {
      newPassengers.push({
        type: "Child",
        title: "Mr.",
        firstName: "",
        lastName: "",
      });
      children += 1;
    }
    while (infants < data.quantity.infants) {
      newPassengers.push({
        type: "Infant",
        title: "Mr.",
        firstName: "",
        lastName: "",
      });
      infants += 1;
    }

    setPassengers(newPassengers);
  }, [data.quantity]);

  const handlePassengerChange = (e, index) => {
    const { name, value } = e.target;
    setPassengerDetails((prevDetails) => {
      const updatedPassengers = [...prevDetails.passengers];
      updatedPassengers[index] = { ...updatedPassengers[index], [name]: value };
      return { ...prevDetails, passengers: updatedPassengers };
    });
  };

  const validatePassengers = () => {
    const errors = passengers.map((passenger) => {
      let error = {};
      if (!passenger.firstName) {
        error.firstName = "First  name is required.";
      } else if (!passenger.firstName.match(/^[A-Za-z]+$/)) {
        error.firstName =
          "First Name should contain only alphabetical characters.";
      }
      if (!passenger.lastName) {
        error.lastName = "Last name is required.";
      } else if (!passenger.lastName.match(/^[A-Za-z]+$/)) {
        error.lastName =
          "Last Name should contain only alphabetical characters.";
      }
      return error;
    });

    setPassengerErrors(errors);
    return errors.every((error) => Object.keys(error).length === 0);
  };

  const validateReceiptInfo = () => {
    if (!receiveNow) {
      if (!receiptDate) {
        return false;
      } else {
      }
    }
    return true;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setEmailError("Email is required");
    } else if (!e.target.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const validateForm = () => {
    let isValid = true;
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/)) {
      setEmailError("Please enter valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassengers()) {
      isValid = false;
    }

    if (!validateReceiptInfo()) {
      setErrorMessage("Please complete receipt details.");
      isValid = false;
    } else {
      setErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const totalPassengers =
        parseInt(passengerDetails.adults, 10) +
        parseInt(passengerDetails.children, 10) +
        parseInt(passengerDetails.infants, 10);

      if (totalPassengers > 9) {
        setErrorMessage("Total number of passengers cannot exceed 9.");
        return;
      }

      const formData = {
        type: data.type,
        passengers: passengers,
        email: email,
        message: message,
        phoneNumber: data.phoneNumber,
        from: data.from,
        to: data.to,
        flightDetails: flight,
        departureDate: data.departureDate,
        arrivalDate: data.arrivalDate,
        quantity: data.quantity,
        ticketValidity: selectedOption,
        ticketAvailability: {
          immediate: receiveNow,
          receiptDate: receiveNow ? null : receiptDate,
        },
      };

      try {
        const result = await dispatch(
          updateFlightDetails({
            sessionId: data.sessionId,
            flightData: formData,
          })
        ).unwrap();
        if (result.status === 200) {
          navigate("/booking/review-details");
        } else {
          console.error("Failed to update flight details:", result.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const renderPassengerInputs = (count, type) => {
    return Array.from({ length: count }).map((_, index) => (
      <div className={styles.passengerInput} key={index}>
        <label>
          Prefix:
          <select
            name="prefix"
            onChange={(e) => handlePassengerChange(e, index)}
          >
            <option value="">Select</option>
            <option value="Mr">Mr.</option>
            <option value="Mrs">Mrs.</option>
            <option value="Miss">Miss</option>
          </select>
        </label>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            onChange={(e) => handlePassengerChange(e, index)}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            onChange={(e) => handlePassengerChange(e, index)}
          />
        </label>
      </div>
    ));
  };

  const updatePassenger = (index, field, value) => {
    setPassengers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );

    setPassengerErrors((prevErrors) => {
      const updatedErrors = [...prevErrors];

      const fieldNames = {
        firstName: "First Name",
        lastName: "Last Name",
      };

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

  return (
    <div
      className={`${styles.flightCard} ${isExpanded ? styles.expanded : ""}`}
    >
      <div className="row align-items-center">
        <div className={styles.airline}>
          {airlineInfo.logo && airlineInfo.logo ? (
            <>
              <img
                src={`${localBaseURL}${airlineInfo.logo}` || ""}
                alt={airlineInfo.businessName}
                width="200px"
                height="120px"
              />
            </>
          ) : (
            <>
              <p className={styles.businessName}>{airlineInfo.businessName}</p>
            </>
          )}
        </div>
        <div className={`${styles.flightDetail}`}>
          {flight.itineraries.map((itinerary, i) => (
            <div
              className={`row align-items-center justify-content-center ${
                styles.segment
              } ${i >= 1 ? styles.borderBottom : ""}`}
              key={i}
            >
              <div className={styles.airlineLogo}>{airlineDetail}</div>
              <p className={styles.time}>
                {itinerary.segments[0].departure.iataCode}

                <br />
                <span>
                  {formatISOTime(itinerary.segments[0].departure.at).date}
                </span>
                <br />
                <span>
                  {formatISOTime(itinerary.segments[0].departure.at).time}
                </span>
              </p>
              <p className={styles.duration}>
                <span>{formatISODuration(itinerary.duration)}</span>
                <br />
                <FaArrowRightLong />
                <br />
                {itinerary.segments.length === 1 ? (
                  <span>Non-stop</span>
                ) : (
                  <span>{itinerary.segments.length - 1} stop(s)</span>
                )}
              </p>
              <p className={styles.time}>
                {
                  itinerary.segments[itinerary.segments.length - 1].arrival
                    .iataCode
                }
                <br />
                <span>
                  {
                    formatISOTime(
                      itinerary.segments[itinerary.segments.length - 1].arrival
                        .at
                    ).date
                  }
                </span>
                <br />
                <span>
                  {
                    formatISOTime(
                      itinerary.segments[itinerary.segments.length - 1].arrival
                        .at
                    ).time
                  }
                </span>
              </p>
            </div>
          ))}
        </div>
        <div className={styles.cta}>
          <p>
            <s>
              {" "}
              {flight.price.currency} {flight.price.grandTotal}{" "}
            </s>
          </p>
          <p className={styles.price}> AED {dummyPrice}</p>
        </div>
        <div className={styles.viewMoreBtnBox}>
          <button className={styles.viewMoreBtn} onClick={toggleExpand}>
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />} View Details
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className={styles.expandedContent}>
          <h5 className={` ${styles.boldHeading}`}>Passenger Details</h5>
          <div className={styles.passengerCountSection}>
            <Count
              adultCount={data.quantity.adults}
              childrenCount={data.quantity.children}
              infantCount={data.quantity.infants}
            />
          </div>
          <div className={styles.passengerDetailsSection}>
            {passengers.map((passenger, index) => {
              let label;
              if (passenger.type === "Adult") {
                adultCount += 1;
                label = `Adult ${adultCount}`;
              } else if (passenger.type === "Child") {
                childCount += 1;
                label = `Child ${childCount}`;
              } else if (passenger.type === "Infant") {
                infantCount += 1;
                label = `Infant ${infantCount}`;
              }

              return (
                <div key={index} className={styles.passengerInput}>
                  <Label required>{label}</Label>
                  <div className={styles.passengerFormRow}>
                    <SelectTitle
                      value={passenger.title}
                      onChange={(e) =>
                        updatePassenger(index, "title", e.target.value)
                      }
                    />
                    <Input
                      type="text"
                      required
                      name={`firstName${index}`}
                      id={`firstName${index}`}
                      placeholder="First Name"
                      value={passenger.firstName}
                      onChange={(e) =>
                        updatePassenger(index, "firstName", e.target.value)
                      }
                    />

                    <Input
                      type="text"
                      required
                      name={`lastName${index}`}
                      id={`lastName${index}`}
                      placeholder="Last Name"
                      value={passenger.lastName}
                      onChange={(e) =>
                        updatePassenger(index, "lastName", e.target.value)
                      }
                    />
                  </div>
                  {passengerErrors[index]?.firstName && (
                    <Error>{passengerErrors[index].firstName}</Error>
                  )}
                  {passengerErrors[index]?.lastName && (
                    <Error>{passengerErrors[index].lastName}</Error>
                  )}
                </div>
              );
            })}
          </div>
          <div className="row">
            <div className={styles.emailInput}>
              <Label htmlFor="email" required>
                Email Address
              </Label>
              <Input
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                name="email"
                id="email"
                autoComplete="on"
                icon={<FaEnvelope />}
                placeholder="Enter email address"
              />
            </div>
            {emailError && <Error>{emailError}</Error>}
          </div>
          <div className={styles.Input}>
            <Label
              htmlFor="number"
              required
              className={` ${styles.boldHeading}`}
            >
              Phone Number
            </Label>
            <Number
              codeValue={data.phoneNumber.code}
              digitsValue={data.phoneNumber.digits}
              disabled={true}
            />
          </div>
          <div className={styles.ticketValidityInfo}>
            <Label htmlFor="ticketValidity"> Choose Ticket Validity</Label>
            <div className={styles.ticketValidityBox}>
              <label className={styles.option}>
                <input
                  type="radio"
                  name="ticketValidity"
                  value="48h"
                  checked={selectedOption === "48h"}
                  onChange={handleChange}
                  className={styles.radioInput}
                />
                <div className={styles.ticketValidityBox1}>48 hours</div>
              </label>
              <label className={styles.option}>
                <input
                  type="radio"
                  name="ticketValidity"
                  value="7d"
                  checked={selectedOption === "7d"}
                  onChange={handleChange}
                  className={styles.radioInput}
                />
                <div className={styles.ticketValidityBox2}>
                  7 days (+ 20 AED)
                </div>
              </label>
              <label className={styles.option}>
                <input
                  type="radio"
                  name="ticketValidity"
                  value="14d"
                  checked={selectedOption === "14d"}
                  onChange={handleChange}
                  className={styles.radioInput}
                />
                <div className={styles.ticketValidityBox3}>
                  14 days (+ 26 AED)
                </div>
              </label>
            </div>
          </div>
          <div className={styles.container}>
            <Label>When would you like to receive the ticket?</Label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="receiveTicket"
                  checked={receiveNow}
                  onChange={() => setReceiveNow(true)}
                  className={styles.radioInput}
                />
                <span className={styles.radioText}>I need it now</span>
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="receiveTicket"
                  checked={!receiveNow}
                  onChange={() => setReceiveNow(false)}
                  className={styles.radioInput}
                />
                <span className={styles.radioText}>
                  On a later date (recommended when your flight is further out:
                  48+ hours from today)
                </span>
              </label>
            </div>

            {!receiveNow && (
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Receipt date:
                  <SelectDate
                    selectedDate={receiptDate}
                    onDateSelect={handleDateSelect}
                    minDate={new Date()}
                    placeholder="Select receipt date"
                  />
                </label>
              </div>
            )}
          </div>
          {errorMessage && <Error>{errorMessage}</Error>}
          <div className="row">
            <div className={styles.TextArea}>
              <Label optional>Special Requests</Label>
              <TextArea
                value={message}
                placeholder="Special requests"
                onChange={setMessage}
              />
            </div>
          </div>
          <PrimaryButton className={styles.finalizeBtn} onClick={handleSubmit}>
            Select Flight and Review
          </PrimaryButton>
          {flightError && <Error>{flightError}</Error>}{" "}
        </div>
      )}
    </div>
  );
}

function Count(props) {
  return (
    <div className={`row ${styles.CountSection} p-0 mx-0`}>
      <div className={styles.Count}>
        <p className={styles.Gender}>
          Adults <span className={styles.Age}>(12+)</span>
        </p>
        <Counter
          className={styles.Counter}
          onAdd={props.onAdultAdd}
          onSubtract={props.onAdultSubtract}
        >
          {props.adultCount}
        </Counter>
      </div>
      <div className={styles.Count}>
        <p className={styles.Gender}>
          Children <span className={styles.Age}>(2 - 11)</span>
        </p>
        <Counter
          className={styles.Counter}
          onAdd={props.onChildrenAdd}
          onSubtract={props.onChildrenSubtract}
        >
          {props.childrenCount}
        </Counter>
      </div>
      <div className={styles.Count}>
        <p className={styles.Gender}>
          Infants <span className={styles.Age}>(0 - 1)</span>
        </p>
        <Counter
          className={styles.Counter}
          onAdd={props.onInfantAdd}
          onSubtract={props.onInfantSubtract}
        >
          {props.infantCount}
        </Counter>
      </div>
    </div>
  );
}
