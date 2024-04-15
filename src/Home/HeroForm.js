import styles from "./HeroForm.module.css";
import Input from "../Components/FormElements/Input";
import { Option, OptionsDiv } from "../Components/FormElements/Select";
import Select from "../Components/FormElements/Select";
import Label from "../Components/FormElements/Label";
import { useState } from "react";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import airports from "airport-codes/airports.json";

export default function HeroForm() {
  const airportData = ["Dubai, UAE", "Abu Dhabi, UAE", "Sharjah, UAE"];

  const [showFromOptions, setShowFromOptions] = useState(false);
  const [showToOptions, setShowToOptions] = useState(false);
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
    e.preventDefault();

    if (!firstName || !lastName || !email || !number) {
      setFeedback("All fields are mandatory");
      setFeedbackClass(styles.Danger);
    } else {
      fetch("http://localhost:3001/", {
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
      console.log(customerData);
    }
  }

  return (
    <form className={styles.Form} id="form" method="post">
      {/* Return / One way */}
      <div className={`${styles.Row} justify-content-start`}>
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
      {/* Feedback */}
      {feedback && (
        <div className={`${styles.Alert} ${feedbackClass}`}>{feedback}</div>
      )}

      {/* Passenger Name */}
      <div className={styles.Row}>
        <div className={styles.Input}>
          <Label>
            <span className={styles.Required}>*</span>First Name
          </Label>
          <Input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            name="firstName"
          />
        </div>
        <div className={styles.Input}>
          <Label>
            <span className={styles.Required}>*</span>Last Name
          </Label>
          <Input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </div>
      {/* Contact Detail */}
      <div className={styles.Row}>
        <div className={styles.Input}>
          <Label>
            <span className={styles.Required}>*</span>Email
          </Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.Input}>
          <Label>
            <span className={styles.Required}>*</span>Phone Number
          </Label>
          <Input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </div>
      </div>
      {/* From / To Detail */}
      {/* <div className={`row ${styles.Row}`}>
        <div className={styles.Input}>
          <Label mb="5px">From</Label>
          <Select
            placeholder="Select airport"
            value={from}
            onClick={() => {
              setShowFromOptions(true);
            }}
          >
            {showFromOptions && (
              <OptionsDiv>
                {airportData.map((airport) => {
                  return (
                    <Option
                      value={airport}
                      onClick={() => {
                        setFrom(airport);
                        setShowFromOptions(false);
                      }}
                    >
                      {airport}
                    </Option>
                  );
                })}
              </OptionsDiv>
            )}
          </Select>
        </div>

        <div className={styles.Input}>
          <Label mb="5px">To</Label>
          <Select
            placeholder="Select airport"
            value={to}
            onClick={() => {
              setShowToOptions(true);
            }}
          >
            {showToOptions && (
              <OptionsDiv>
                {airportData.map((airport) => {
                  return (
                    <Option
                      value={airport}
                      onClick={() => {
                        setTo(airport);
                        setShowToOptions(false);
                      }}
                    >
                      {airport}
                    </Option>
                  );
                })}
              </OptionsDiv>
            )}
          </Select>
        </div>
      </div> */}
      <div className={styles.Row}>
        <div className={styles.Input}>
          <Label>From</Label>
          <Input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
          />
        </div>
        <div className={styles.Input}>
          <Label>To</Label>
          <Input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>
      </div>
      {/* Dates */}
      <div className={styles.Row}>
        <div className={styles.Input}>
          <Label>Departure Date</Label>
          <Input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>
        {ticketType === "Return" && (
          <div className={styles.Input}>
            <Label>Arrival Date</Label>
            <Input
              type="date"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              required
            />
          </div>
        )}
      </div>
      <div className="text-center mt-4">
        <PrimaryButton type="submit" onClick={handleForm}>
          Submit
        </PrimaryButton>
      </div>
    </form>
  );
}
