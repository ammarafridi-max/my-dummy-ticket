import styles from "./HeroForm.module.css";
import Input from "../Components/FormElements/Input";
import Label from "../Components/FormElements/Label";
import { useState } from "react";
import PrimaryButton from "../Components/Buttons/PrimaryButton";

export default function HeroForm() {
  const [feedback, setFeedback] = useState("");
  const [feedbackClass, setFeedbackClass] = useState(styles.Danger);

  const [ticketType, setTicketType] = useState("OneWay");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");

  const customerData = {
    firstName,
    lastName,
    email,
    number,
    from,
    to,
    departureDate,
    arrivalDate,
  };

  function handleForm(e) {
    // Prevent default form function
    e.preventDefault();

    // Check if data is incomplete
    if (!firstName || !lastName || !email || !number) {
      setFeedback("All fields are mandatory");
      setFeedbackClass(styles.Danger);
    } else {
      // Proceed to sending data to backend
      fetch(process.env.REACT_APP_BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      })
        .then((response) => {
          if (response.ok) {
            // Show success feedback
            setFeedback("Form submitted successfully. We'll contact you soon!");
            setFeedbackClass(styles.Success);
            // Reset feedback
            setTimeout(function () {
              setFeedback("");
              setFeedbackClass("");
            }, 3000);
          } else {
            return response.json().then((data) => {
              throw new Error(data.error);
            });
          }
        })
        .catch((error) => {
          console.log("Error:", error);
          setFeedback("Error submitting form. Please try again later");
          setFeedbackClass(styles.Danger);
        });
      setTimeout(function () {
        setFeedback("");
        setFeedbackClass("");
      }, 10000);
    }
  }

  return (
    <form className={styles.Form} method="post">
      {/* Return / One way */}
      <div className={`row justify-content-start`}>
        <p
          className={`${styles.Type} ${
            ticketType === "OneWay" && styles.Active
          }`}
          onClick={() => {
            setTicketType("OneWay");
          }}
        >
          One way
        </p>
        <p
          className={`${styles.Type} ${
            ticketType === "Return" && styles.Active
          }`}
          onClick={() => {
            setTicketType("Return");
          }}
        >
          Return
        </p>
      </div>

      {/* Passenger Name */}
      <div className={styles.Row}>
        <div className={styles.Input}>
          <Label htmlFor="firstName">
            <span className={styles.Required}>*</span>First Name
          </Label>
          <Input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            name="firstName"
            id="firstName"
          />
        </div>
        <div className={styles.Input}>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            name="lastName"
            id="lastName"
          />
        </div>
      </div>
      {/* Contact Detail */}
      <div className={styles.Row}>
        <div className={styles.Input}>
          <Label htmlFor="email">
            <span className={styles.Required}>*</span>Email
          </Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            name="email"
            id="email"
            autoComplete="on"
          />
        </div>
        <div className={styles.Input}>
          <Label htmlFor="number">
            <span className={styles.Required}>*</span>Phone Number
          </Label>
          <Input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            name="number"
            id="number"
          />
        </div>
      </div>

      {/* From / To */}
      <div className={styles.Row}>
        <div className={styles.Input}>
          <Label htmlFor="from">From</Label>
          <Input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
            name="from"
            id="from"
          />
        </div>
        <div className={styles.Input}>
          <Label htmlFor="to">To</Label>
          <Input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
            name="to"
            id="to"
          />
        </div>
      </div>
      {/* Dates */}
      <div className={styles.Row}>
        <div className={styles.Input}>
          <Label htmlFor="departureDate">Departure Date</Label>
          <Input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            name="departureDate"
            id="departureDate"
          />
        </div>
        {ticketType === "Return" && (
          <div className={styles.Input}>
            <Label htmlFor="arrivalDate">Arrival Date</Label>
            <Input
              type="date"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              required
              name="arrivalDate"
              id="arrivalDate"
            />
          </div>
        )}
      </div>
      {/* Feedback */}
      {feedback && (
        <div className={`${styles.Alert} ${feedbackClass}`}>{feedback}</div>
      )}
      <div className="text-center mt-4">
        <PrimaryButton type="submit" onClick={handleForm}>
          Submit
        </PrimaryButton>
      </div>
    </form>
  );
}
