import styles from "./TicketForm2.module.css";
import Input from "../../../Components/FormElements/Input";
import Label from "../../../Components/FormElements/Label";
import SelectAirport from "../../../Components/FormElements/SelectAirport";
import { useState } from "react";
import { FaPlaneDeparture, FaPlaneArrival, FaCircle } from "react-icons/fa";
import SelectDate from "../../../Components/FormElements/SelectDate";

export default function TicketForm2() {
  const today = new Date();
  const todayString = today.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const [type, setType] = useState("One Way");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState(todayString);
  const [returnDate, setReturnDate] = useState("");

  return (
    <form className={styles.Form}>
      <div className={styles.Row}>
        <p
          className={styles.Type}
          onClick={() => {
            setType("One Way");
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
        <div className={styles.Input}>
          <Label>From</Label>
          <SelectAirport
            icon={<FaPlaneDeparture />}
            value={from}
            onChange={setFrom}
          />
        </div>
        <div className={styles.Input}>
          <Label>To</Label>
          <SelectAirport
            icon={<FaPlaneArrival />}
            value={to}
            onChange={setTo}
          />
        </div>
      </div>

      <div className="row">
        <div className={styles.Input}>
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
          <div className={styles.Input}>
            <Label>Return Date</Label>
            <SelectDate
              selectedDate={returnDate}
              onDateSelect={setReturnDate}
              minDate={new Date(departureDate)}
            />
          </div>
        )}
      </div>
    </form>
  );
}
