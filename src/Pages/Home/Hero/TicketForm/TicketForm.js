import React, { useState } from "react";
import styles from "./TicketForm.module.css";
import Error from "../../../../Components/Feedback/Error";
import Label from "../../../../Components/FormElements/Label";
import PrimaryButton from "../../../../Components/Buttons/PrimaryButton";
import Counter from "../../../../Components/FormElements/Counter";
import TextArea from "../../../../Components/FormElements/TextArea";
import SelectAirport from "../../../../Components/FormElements/SelectAirport";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCircle,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import SelectDate from "../../../../Components/FormElements/SelectDate";
import Input from "../../../../Components/FormElements/Input";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  searchFlights,
  setErrorMessages,
  setQuantity,
} from "../../../../redux/slices/ticketFormSlice";
import Number from "../../../../Components/FormElements/Number";

export default function TicketForm() {
  const today = new Date().toISOString().split("T")[0];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { formState, feedback } = useSelector((state) => state.ticketForm);

  const [type, setType] = useState("One Way");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [number, setNumber] = useState({ code: "", digits: "" });
  const [errorMessages, setErrorMessages] = useState({
    from: "",
    to: "",
    departureDate: "",
    arrivalDate: "",
    codenumber: "",
    digitsnumber: "",
    quantity: "",
  });
  const [quantity, setQuantity] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const handleForm = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    dispatch(
      searchFlights({
        type,
        from,
        to,
        departureDate,
        arrivalDate,
        quantity,
        number,
      })
    ).then((result) => {
      if (searchFlights.fulfilled.match(result)) {
        navigate(`/booking/select-flights`);
      }
    });
  };

  const isFormValid = () => {
    let valid = true;
    let errors = { ...errorMessages };

    for (let key in errors) {
      errors[key] = "";
    }

    if (!from) {
      errors.from = "From field is required";
      valid = false;
    }

    if (!to) {
      errors.to = "To field is required";
      valid = false;
    }

    if (!departureDate) {
      errors.departureDate = "Departure Date is required";
      valid = false;
    }

    if (from && to && from === to) {
      errors.from = "From and To locations cannot be the same";
      errors.to = "From and To locations cannot be the same";
      valid = false;
    }

    if (type === "Return" && !arrivalDate) {
      errors.arrivalDate = "Return Date is required for round trip";
      valid = false;
    }

    if (!number.digits) {
      errors.codenumber = "Please enter valid phone number";
    }
    if (!number.code) {
      errors.digitsnumber = "Please select phone number code ";
    }

    if (
      quantity.adults < 1 ||
      quantity.adults + quantity.children + quantity.infants > 9
    ) {
      errors.quantity =
        "Total number of passengers cannot exceed 9 and there must be at least one adult";
      valid = false;
    }

    setErrorMessages(errors);
    return valid;
  };

  const handleCodeChange = async (e) => {
    setNumber({ ...number, code: e.target.value });
    if (e.target.value === "") {
      setErrorMessages("Please select phone number code ");
    } else {
      setErrorMessages("");
    }
  };


  const handleDigitsChange = (e) => {
    const value = e.target.value;
  
    // Check if the input is empty
    if (value === "") {
      setErrorMessages("Please enter a valid phone number.");
    } 
    // Check if the input contains only numeric digits
    else if (!/^[0-9]*$/.test(value)) {
      setErrorMessages("Phone Number should contain only numeric digits.");
    } 
    // If everything is valid
    else {
      setErrorMessages("");
      setNumber({ ...number, digits: value });
    }
  };
  

  const onQuantityChange = (type, amount) => {
    setQuantity((q) => {
      const newQuantity = { ...q, [type]: q[type] + amount };
      const total =
        newQuantity.adults + newQuantity.children + newQuantity.infants;

      if (type === "adults" && newQuantity.adults < 1) return q;
      if (type !== "adults" && newQuantity[type] < 0) return q;
      if (total > 9) {
        setErrorMessages((prev) => ({
          ...prev,
          quantity: "Total number of passengers cannot exceed 9.",
        }));
        return q;
      }

      setErrorMessages((prev) => ({ ...prev, quantity: "" }));
      return newQuantity;
    });
  };

  const handleChange = (field, value) => {
    switch (field) {
      case "from":
        setFrom(value);
        setErrorMessages((prev) => ({ ...prev, from: "" }));
        break;
      case "to":
        setTo(value);
        setErrorMessages((prev) => ({ ...prev, to: "" }));
        break;
      case "departureDate":
        setDepartureDate(value);
        setErrorMessages((prev) => ({ ...prev, departureDate: "" }));
        break;
      case "arrivalDate":
        setArrivalDate(value);
        setErrorMessages((prev) => ({ ...prev, arrivalDate: "" }));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <form className={styles.Form} onSubmit={handleForm}>
        <div className={styles.Row}>
          <div className="row">
            <p
              className={styles.Type}
              onClick={() => {
                setType("One Way");
                setArrivalDate("");
              }}
            >
              <FaCircle
                className={`${styles.DotIcon} ${
                  type === "One Way" && styles.Active
                }`}
              />
              One Way
            </p>
            <p
              className={styles.Type}
              onClick={() => {
                setType("Return");
              }}
            >
              <FaCircle
                className={`${styles.DotIcon} ${
                  type === "Return" && styles.Active
                }`}
              />
              Return
            </p>
          </div>
        </div>

        <div className="row">
          <div className={styles.Input}>
            <Label htmlFor="from" required>
              From
            </Label>
            <SelectAirport
              value={from}
              onChange={(value) => handleChange("from", value)}
              id="from"
              icon={<FaPlaneDeparture />}
            />
            {errorMessages.from && <Error>{errorMessages.from}</Error>}
          </div>
          <div className={styles.Input}>
            <Label htmlFor="to" required>
              To
            </Label>
            <SelectAirport
              value={to}
              onChange={(value) => handleChange("to", value)}
              id="to"
              icon={<FaPlaneArrival />}
            />
            {errorMessages.to && <Error>{errorMessages.to}</Error>}
          </div>
        </div>

        <div className="row">
          <div className={styles.Input}>
            <Label htmlFor="departureDate" required>
              Departure Date
            </Label>
            <SelectDate
              selectedDate={departureDate}
              onDateSelect={(value) => handleChange("departureDate", value)}
              minDate={new Date()}
            />
            {errorMessages.departureDate && (
              <Error>{errorMessages.departureDate}</Error>
            )}
          </div>
          {type === "Return" && (
            <div className={styles.Input}>
              <Label htmlFor="arrivalDate" required>
                Return Date
              </Label>
              <SelectDate
                selectedDate={arrivalDate}
                onDateSelect={(value) => handleChange("arrivalDate", value)}
                minDate={new Date(departureDate)}
              />
              {errorMessages.arrivalDate && (
                <Error>{errorMessages.arrivalDate}</Error>
              )}
            </div>
          )}
        </div>

        <div>
          <Count quantity={quantity} onQuantityChange={onQuantityChange} />
          {errorMessages.quantity && <Error>{errorMessages.quantity}</Error>}
        </div>

        <div className="row">
          <div className={styles.emailInput}>
            <Label htmlFor="number" required>
              Phone Number
            </Label>

            <Number
              codeValue={number.code}
              codeOnChange={handleCodeChange}
              digitsValue={number.digits}
              digitsOnChange={handleDigitsChange}
            />
            {errorMessages.codenumber && (
              <Error>{errorMessages.codenumber}</Error>
            )}
            {errorMessages.digitsnumber && (
              <Error>{errorMessages.digitsnumber}</Error>
            )}
          </div>
        </div>
        <div className="text-center mt-4">
          <PrimaryButton
            text="Search Flights"
            type="submit"
            disabled={formState === "Loading"}
          >
            Search Flights
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}

function Count({ quantity, onQuantityChange }) {
  return (
    <div className={`row ${styles.CountSection} p-0 mx-0`}>
      <div className={styles.Count}>
        <p className={styles.Gender}>
          Adults <span className={styles.Age}>(12+)</span>
        </p>
        <Counter
          className={styles.Counter}
          onAdd={() => onQuantityChange("adults", 1)}
          onSubtract={() => onQuantityChange("adults", -1)}
        >
          {quantity.adults}
        </Counter>
      </div>
      <div className={styles.Count}>
        <p className={styles.Gender}>
          Children <span className={styles.Age}>(2 - 11)</span>
        </p>
        <Counter
          className={styles.Counter}
          onAdd={() => onQuantityChange("children", 1)}
          onSubtract={() => onQuantityChange("children", -1)}
        >
          {quantity.children}
        </Counter>
      </div>
      <div className={styles.Count}>
        <p className={styles.Gender}>
          Infants <span className={styles.Age}>(0 - 1)</span>
        </p>
        <Counter
          className={styles.Counter}
          onAdd={() => onQuantityChange("infants", 1)}
          onSubtract={() => onQuantityChange("infants", -1)}
        >
          {quantity.infants}
        </Counter>
      </div>
    </div>
  );
}
