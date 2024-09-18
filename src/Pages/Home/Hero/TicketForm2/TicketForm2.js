import { useState, useEffect } from "react";
import styles from "./TicketForm2.module.css";
import { useNavigate } from "react-router-dom";
import { FaPlaneDeparture, FaPlaneArrival, FaCircle } from "react-icons/fa";
import Input from "../../../../Components/FormElements/Input";
import Label from "../../../../Components/FormElements/Label";
import SelectAirport from "../../../../Components/FormElements/SelectAirport";
import SelectDate from "../../../../Components/FormElements/SelectDate";
import PrimaryButton from "../../../../Components/Buttons/PrimaryButton";

export default function TicketForm2() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const today = new Date();
  const todayString = today.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const [type, setType] = useState("One Way");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState(todayString);
  const [returnDate, setReturnDate] = useState("");
  const url = `booking/select-flights?type=${type}&from=${from}&to=${to}&departureDate=${departureDate}${
    returnDate && `&returnDate=${returnDate}`
  }`;

  useEffect(() => {
    setBtnDisabled(
      !from || !to || !departureDate || (type === "Return" && !returnDate)
    );
  }, [from, to, departureDate, returnDate, type]);

  function handleForm(event) {
    event.preventDefault();
    if (from && to && departureDate && (type === "One Way" || returnDate)) {
      navigate(url);
    } else {
      //console.log("Please fill out all required fields.");
    }
  }

  return (
    <form className={styles.Form} onSubmit={handleForm}>
      <div className="row m-0">
        <p
          className={styles.Type}
          onClick={() => {
            setType("One Way");
            setReturnDate("");
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

      <div className="row">
        <div className={`col-12 col-lg ${styles.Input}`}>
          <Label>From</Label>
          <SelectAirport
            icon={<FaPlaneDeparture />}
            value={from}
            onChange={setFrom}
          />
        </div>
        <div className={`col-12 col-lg ${styles.Input}`}>
          <Label>To</Label>
          <SelectAirport
            icon={<FaPlaneArrival />}
            value={to}
            onChange={setTo}
          />
        </div>
      </div>
      <div className="row">
        <div className={`col-12 col-lg ${styles.Input}`}>
          <Label htmlFor="departureDate" required>
            Departure Date
          </Label>
          <SelectDate
            selectedDate={departureDate}
            onDateSelect={setDepartureDate}
            minDate={today}
          />
        </div>
        {type === "Return" && (
          <div className={`col-12 col-lg ${styles.Input}`}>
            <Label>Return Date</Label>
            <SelectDate
              selectedDate={returnDate}
              onDateSelect={setReturnDate}
              minDate={new Date(departureDate)}
            />
          </div>
        )}
      </div>

      <div className="text-center">
        <PrimaryButton
          type="submit"
          disabled={btnDisabled}
          className={styles.Btn}
        >
          Search Flights
        </PrimaryButton>
      </div>
    </form>
  );
}
