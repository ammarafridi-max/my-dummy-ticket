import React, { useState } from "react";
import { formatDate } from "../../../../utils/formatDate";
import styles from "./TicketForm.module.css";
import Error from "../../../../components/Feedback/Error";
import Label from "../../../../components/FormElements/Label";
import PrimaryButton from "../../../../components/Buttons/PrimaryButton";
import Counter from "../../../../components/FormElements/Counter";
import SelectAirport from "../../../../components/FormElements/SelectAirport";
import SelectDate from "../../../../components/FormElements/SelectDate";
import Number from "../../../../components/FormElements/Number";
import { FaPlaneDeparture, FaPlaneArrival, FaCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchFlights } from "../../../../redux/slices/ticketFormSlice";

export default function TicketForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formState } = useSelector((state) => state.ticketForm);
  const [type, setType] = useState("One Way");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState();
  const [number, setNumber] = useState({ code: "", digits: "" });
  const [errorMessages, setErrorMessages] = useState({});
  const [quantity, setQuantity] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const isFormValid = () => {
    const errors = {};
    if (!from) errors.from = "From field is required";
    if (!to) errors.to = "To field is required";
    if (!departureDate) errors.departureDate = "Departure Date is required";
    if (from === to) errors.to = "From and To locations cannot be the same";
    if (type === "Return" && !returnDate)
      errors.returnDate = "Return Date is required";
    if (!number.digits) errors.codenumber = "Please enter a valid phone number";
    if (!number.code) errors.digitsnumber = "Please select phone number code";
    if (
      quantity.adults < 1 ||
      quantity.adults + quantity.children + quantity.infants > 9
    ) {
      errors.quantity =
        "Total passengers cannot exceed 9, with at least one adult";
    }
    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // const data = {
    //   type,
    //   from,
    //   to,
    //   departureDate,
    //   returnDate,
    //   number,
    //   quantity,
    // };
    // console.log(data);
    if (isFormValid()) {
      dispatch(
        searchFlights({
          type,
          from,
          to,
          departureDate,
          number,
          quantity,
          ...(type === "Return" && returnDate ? { returnDate } : {}),
        })
      ).then((result) => {
        if (searchFlights.fulfilled.match(result)) {
          navigate(`/booking/select-flights`);
        }
      });
    }
  };

  const handleQuantityChange = (field, value) => {
    setQuantity((prev) => {
      const updated = { ...prev, [field]: prev[field] + value };
      const total = updated.adults + updated.children + updated.infants;
      if (total <= 9 && updated.adults >= 1) {
        setErrorMessages((e) => ({ ...e, quantity: "" }));
        return updated;
      }
      setErrorMessages((e) => ({
        ...e,
        quantity: "Total passengers cannot be less than 1 and exceed 9.",
      }));
      return prev;
    });
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <div className="row">
          {["One Way", "Return"].map((tripType) => (
            <p
              key={tripType}
              className={styles.type}
              onClick={() => setType(tripType)}
            >
              <FaCircle
                className={`${styles.DotIcon} ${
                  type === tripType && styles.Active
                }`}
              />
              {tripType}
            </p>
          ))}
        </div>

        <div className="row">
          <div className={styles.Input}>
            <Label htmlFor="from" required>
              From
            </Label>
            <SelectAirport
              value={from}
              onChange={(value) => setFrom(value)}
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
              onChange={(value) => setTo(value)}
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
              selectedDate={departureDate && formatDate(departureDate)}
              onDateSelect={setDepartureDate}
              minDate={new Date()}
            />
            {errorMessages.departureDate && (
              <Error>{errorMessages.departureDate}</Error>
            )}
          </div>
          {type === "Return" && (
            <div className={styles.Input}>
              <Label htmlFor="returnDate" required>
                Return Date
              </Label>
              <SelectDate
                selectedDate={returnDate && formatDate(returnDate)}
                onDateSelect={setReturnDate}
                minDate={new Date(departureDate)}
              />
              {errorMessages.returnDate && (
                <Error>{errorMessages.returnDate}</Error>
              )}
            </div>
          )}
        </div>

        <QuantityCounter
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          error={errorMessages.quantity}
        />

        <Label htmlFor="number" required>
          Phone Number
        </Label>
        <Number
          codeValue={number.code}
          codeOnChange={(e) => setNumber({ ...number, code: e.target.value })}
          digitsValue={number.digits}
          digitsOnChange={(e) =>
            setNumber({ ...number, digits: e.target.value })
          }
        />
        {errorMessages.codenumber && <Error>{errorMessages.codenumber}</Error>}
        {errorMessages.digitsnumber && (
          <Error>{errorMessages.digitsnumber}</Error>
        )}

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

function QuantityCounter({ quantity, onQuantityChange, error }) {
  const categories = [
    { label: "Adults", ageRange: "(12+)", field: "adults" },
    { label: "Children", ageRange: "(2 - 11)", field: "children" },
    { label: "Infants", ageRange: "(0 - 1)", field: "infants" },
  ];

  return (
    <>
      <div className={styles.CountSection}>
        {categories.map(({ label, ageRange, field }) => (
          <Counter
            ageGroup={label}
            age={ageRange}
            onAdd={() => onQuantityChange(field, 1)}
            onSubtract={() => onQuantityChange(field, -1)}
            value={quantity[field]}
          />
        ))}
      </div>
      {error && <Error>{error}</Error>}
    </>
  );
}
