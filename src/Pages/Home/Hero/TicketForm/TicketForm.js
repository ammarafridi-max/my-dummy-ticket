import styles from "./TicketForm.module.css";
import React, { useState } from "react";
import { formatDate } from "../../../../utils/formatDate";
import { useSelector, useDispatch } from "react-redux";
import {
  updateFormField,
  updateQuantity,
} from "../../../../redux/slices/ticketFormSlice";
import { FaPlaneDeparture, FaPlaneArrival, FaCircle } from "react-icons/fa";
import Label from "../../../../components/FormElements/Label";
import PrimaryButton from "../../../../components/Buttons/PrimaryButton";
import SelectAirport from "../../../../components/FormElements/SelectAirport";
import SelectDate from "../../../../components/FormElements/SelectDate";
import Counter from "../../../../components/FormElements/Counter";
import Error from "../../../../components/Feedback/Error";
import { useNavigate } from "react-router-dom";

export default function TicketForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formData } = useSelector((state) => state.ticketForm);
  const [errorMessages, setErrorMessages] = useState({});

  const isFormValid = () => {
    const errors = {};
    if (!formData.from) errors.from = "From field is required";
    if (!formData.to) errors.to = "To field is required";
    if (!formData.departureDate)
      errors.departureDate = "Departure Date is required";
    if (formData.type === "Return" && !formData.returnDate)
      errors.returnDate = "Return Date is required";
    if (
      formData.quantity.adults < 1 ||
      formData.quantity.adults +
        formData.quantity.children +
        formData.quantity.infants >
        9
    ) {
      errors.quantity =
        "Total passengers cannot exceed 9, with at least one adult.";
    }
    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFieldChange = (field, value) => {
    dispatch(updateFormField({ field, value }));
  };

  const handleQuantityChange = (field, value) => {
    const updatedQuantity = {
      ...formData.quantity,
      [field]: formData.quantity[field] + value,
    };
    const totalPassengers =
      updatedQuantity.adults +
      updatedQuantity.children +
      updatedQuantity.infants;

    if (totalPassengers > 9 || updatedQuantity.adults < 1) {
      setErrorMessages((prev) => ({
        ...prev,
        quantity: "Total passengers cannot be less than 1 or exceed 9.",
      }));
    } else {
      setErrorMessages((prev) => ({ ...prev, quantity: "" }));
      dispatch(updateQuantity(updatedQuantity));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log("Form Data:", formData);
      navigate("/booking/select-flights");
    }
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <div className="row">
          {["One Way", "Return"].map((tripType) => (
            <p
              key={tripType}
              className={styles.type}
              onClick={() => handleFieldChange("type", tripType)}
            >
              <FaCircle
                className={`${styles.DotIcon} ${
                  formData.type === tripType && styles.Active
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
              value={formData.from}
              onChange={(value) => handleFieldChange("from", value)}
              icon={<FaPlaneDeparture />}
            />
            {errorMessages?.from && <Error>{errorMessages.from}</Error>}
          </div>
          <div className={styles.Input}>
            <Label htmlFor="to" required>
              To
            </Label>
            <SelectAirport
              value={formData.to}
              onChange={(value) => handleFieldChange("to", value)}
              icon={<FaPlaneArrival />}
            />
            {errorMessages?.to && <Error>{errorMessages.to}</Error>}
          </div>
        </div>

        <div className="row">
          <div className={styles.Input}>
            <Label htmlFor="departureDate" required>
              Departure Date
            </Label>
            <SelectDate
              selectedDate={
                formData.departureDate && formatDate(formData.departureDate)
              }
              onDateSelect={(date) => handleFieldChange("departureDate", date)}
              minDate={new Date()}
            />
            {errorMessages?.departureDate && (
              <Error>{errorMessages.departureDate}</Error>
            )}
          </div>
          {formData.type === "Return" && (
            <div className={styles.Input}>
              <Label htmlFor="returnDate" required>
                Return Date
              </Label>
              <SelectDate
                selectedDate={
                  formData.returnDate && formatDate(formData.returnDate)
                }
                onDateSelect={(date) => handleFieldChange("returnDate", date)}
                minDate={new Date(formData.departureDate)}
              />
              {errorMessages?.returnDate && (
                <Error>{errorMessages.returnDate}</Error>
              )}
            </div>
          )}
        </div>

        <QuantityCounter
          quantity={formData.quantity}
          onQuantityChange={handleQuantityChange}
        />

        <div className="text-center mt-4">
          <PrimaryButton text="Search Flights" type="submit">
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
        {categories.map(({ label, ageRange, field }, i) => (
          <Counter
            key={i}
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
