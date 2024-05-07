import { useState, useEffect } from "react";
import styles from "./TicketForm.module.css";
import stripe from "./stripe.png";
import Input from "../Components/FormElements/Input";
import Label from "../Components/FormElements/Label";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import Error from "../Components/Feedback/Error";
import FeedbackBox from "../Components/Feedback/FeedbackBox";
import TextArea from "../Components/FormElements/TextArea";

export default function TicketForm() {
  const [feedback, setFeedback] = useState();
  const [formState, setFormState] = useState("Active");

  const [ticketType, setTicketType] = useState("One Way");
  const [ticketId, setTicketId] = useState("price_1PCSArIy9CRhj2A0xXopFs0u"); // One Way
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(49);
  const [message, setMessage] = useState("");

  const customerData = {
    ticketType,
    ticketId,
    firstName,
    lastName,
    email,
    number,
    from,
    to,
    departureDate,
    arrivalDate,
    quantity,
    message,
  };

  function handleForm(e) {
    e.preventDefault();

    // Check if data is incomplete
    if (
      !firstName ||
      !lastName ||
      !email ||
      !number ||
      !from ||
      !to ||
      !departureDate
    ) {
      setFeedback(<Error>All fields are mandatory</Error>);

      // Proceed to sending data to backend
    } else {
      setFormState("Loading");
      fetch(process.env.REACT_APP_BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then((data) => {
              throw new Error(data.error);
            });
          }
        })
        .then((data) => {
          window.location.href = `${data.url}`;
        })
        .catch((error) => {
          setFeedback(
            <Error>Error submitting form. Please try again later</Error>
          );
          setFormState("Active");
          console.log(error);
        });
    }
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setFeedback(
        <FeedbackBox>
          Payment successful! Your dummy ticket will soon be sent to you.
        </FeedbackBox>
      );
      setFormState("Inactive");
    }
  }, []);

  return (
    <form className={styles.Form} action="/" method="post">
      {/* Return / One way */}
      <div className={styles.Row}>
        <p
          className={`${styles.Type} ${
            ticketType === "One Way" && styles.Active
          }`}
          onClick={() => {
            setTicketType("One Way");
            setPrice(49);
            setTicketId("price_1PCSArIy9CRhj2A0xXopFs0u");
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
            setPrice(89);
            setTicketId("price_1PCcqAIy9CRhj2A0eB1hR3Nn");
          }}
        >
          Return
        </p>
      </div>

      {/* Names */}

      <div className={`row`}>
        <div className={styles.Input}>
          <Label htmlFor="firstName" required>
            First Name
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
          <Label htmlFor="lastName" required>
            Last Name
          </Label>
          <Input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            name="lastName"
            id="lastName"
            required
          />
        </div>

        {/* Contact */}

        <div className={styles.Input}>
          <Label htmlFor="email" required>
            Email
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
          <Label htmlFor="number" required>
            Phone Number
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

        {/* From / To */}
        <div className={styles.Input}>
          <Label htmlFor="from" required>
            From
          </Label>
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
          <Label htmlFor="to" required>
            To
          </Label>
          <Input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            name="to"
            id="to"
            required
          />
        </div>

        {/* Dates */}
        <div className={styles.Input}>
          <Label htmlFor="departureDate" required>
            Departure Date
          </Label>
          <Input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            name="departureDate"
            id="departureDate"
            required
          />
        </div>

        {ticketType === "Return" && (
          <div className={styles.Input}>
            <Label htmlFor="arrivalDate" required>
              Return Date
            </Label>
            <Input
              type="date"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              name="arrivalDate"
              id="arrivalDate"
              required
            />
          </div>
        )}

        {/* Message */}

        <div className={`${styles.Input} w-100`}>
          <Label htmlFor="departureDate" optional>
            Additional Information{" "}
          </Label>
          <TextArea onChange={(e) => setMessage(e.target.value)}>
            {message}
          </TextArea>
        </div>

        {/* <div className={styles.Input}>
          <Label>
            Number of Travelers
          </Label>
          <Counter
            onAdd={(e) => {
              setQuantity((current) => (current < 12 ? current + 1 : current));
              e.preventDefault();
            }}
            onSubtract={(e) => {
              setQuantity((current) => (current > 1 ? current - 1 : current));
              e.preventDefault();
            }}
          >
            {quantity}
          </Counter>
        </div> */}
      </div>

      {/* Feedback and Button */}
      {feedback}
      <div className="text-center mt-3">
        {formState === "Active" ? (
          <div>
            <PrimaryButton type="submit" onClick={handleForm}>
              Proceed to Payment <strong>(AED {price * quantity})</strong>
            </PrimaryButton>
            <div>
              <img src={stripe} className={styles.StripeImg} />
            </div>
          </div>
        ) : (
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        )}
      </div>
    </form>
  );
}
