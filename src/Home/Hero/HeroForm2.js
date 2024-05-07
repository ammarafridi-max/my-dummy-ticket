import styles from "./TicketForm.module.css";
import Input from "../../Components/FormElements/Input";
import Label from "../../Components/FormElements/Label";
import { useState, useEffect } from "react";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import Success from "../../Components/Feedback/Success";
import Error from "../../Components/Feedback/Error";
import stripe from "./stripe.png";
import Counter from "../../Components/FormElements/Counter";
import Select from "../../Components/FormElements/Select";

export default function HeroForm2() {
  const today = new Date().toISOString().split("T")[0];
  const [feedback, setFeedback] = useState("");
  const [formState, setFormState] = useState("Active");

  const [passengers, setPassengers] = useState([
    { title: "", firstName: "", lastName: "" },
  ]);

  const [ticketType, setTicketType] = useState("One Way");
  const [ticketId, setTicketId] = useState("price_1PCSArIy9CRhj2A0xXopFs0u"); // One Way
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(49);

  const customerData = {
    ticketType,
    ticketId,
    email,
    number,
    from,
    to,
    departureDate,
    arrivalDate,
    quantity,
  };

  function handleForm(e) {
    e.preventDefault();
    console.log(passengers);

    // Check if data is incomplete
    // if (!email || !number || !from || !to || !departureDate) {
    //   setFeedback(<Error>All fields are mandatory</Error>);

    //   // Proceed to sending data to backend
    // } else {
    //   setFormState("Loading");
    //   fetch(process.env.REACT_APP_BACKEND_URL, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(customerData),
    //   })
    //     .then((response) => {
    //       if (response.ok) {
    //         return response.json();
    //       } else {
    //         return response.json().then((data) => {
    //           throw new Error(data.error);
    //         });
    //       }
    //     })
    //     .then((data) => {
    //       window.location.href = `${data.url}`;
    //     })
    //     .catch((error) => {
    //       setFeedback(
    //         <Error>Error submitting form. Please try again later</Error>
    //       );
    //       setFormState("Active");
    //       console.log(error);
    //     });
    // }
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setFeedback(
        <Success>Order placed! You will receive an email confirmation.</Success>
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

      {/* From / To */}
      <div className="row">
        <div className={styles.Input}>
          <Label htmlFor="from">From</Label>
          <Input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
            name="from"
            id="from"
            autoComplete="on"
          />
        </div>

        <div className={styles.Input}>
          <Label htmlFor="To">To</Label>
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

      {/* Contact */}

      <div className="row">
        <div className={styles.Input}>
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            name="email"
            id="email"
            autoComplete="on"
            placeholder="Email Address"
          />
        </div>

        <div className={styles.Input}>
          <Label htmlFor="number">Phone Number</Label>
          <Input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            name="number"
            id="number"
            placeholder="Phone Number"
          />
        </div>
      </div>

      {/* Dates */}

      <div className="row">
        <div className={styles.Input}>
          <Label htmlFor="departureDate">Departure Date</Label>
          <Input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            name="departureDate"
            id="departureDate"
            required
            min={today}
          />
        </div>

        <div className={styles.Input}>
          {ticketType === "Return" && (
            <>
              <Label htmlFor="arrivalDate">Return Date</Label>
              <Input
                type="date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                name="arrivalDate"
                id="arrivalDate"
                required
                min={departureDate}
              />
            </>
          )}
        </div>
      </div>

      {/* Passenger Detail */}

      {/* Quantity */}
      <div className={styles.Input}>
        <Label>
          <span className={styles.Required}>*</span>Number Of Passengers
        </Label>
        <Counter
          onAdd={(e) => {
            e.preventDefault();
            setQuantity((current) => (current < 6 ? current + 1 : current));
          }}
          onSubtract={(e) => {
            e.preventDefault();
            setQuantity((current) => (current > 1 ? current - 1 : current));
          }}
        >
          {quantity}
        </Counter>
      </div>

      {/* Names */}
      {Array.from({ length: quantity }).map((_, index) => (
        <div key={index}>
          <p className={styles.PassengerNumber}>Passenger {index + 1}</p>
          <div className="row">
            <div className={styles.Title}>
              <Select
                id={`title${index}`}
                onChange={(e) =>
                  setPassengers((prevPassengers) =>
                    prevPassengers.map((passenger, i) =>
                      i === index
                        ? { ...passenger, title: e.target.value }
                        : passenger
                    )
                  )
                }
              >
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
                <option value="Master">Master</option>
              </Select>
            </div>
            <div className={styles.Name}>
              <Input
                type="text"
                required
                name={`firstName${index}`}
                id={`firstName${index}`}
                placeholder="First Name"
                onChange={(e) =>
                  setPassengers((prevPassengers) =>
                    prevPassengers.map((passenger, i) =>
                      i === index
                        ? { ...passenger, firstName: e.target.value }
                        : passenger
                    )
                  )
                }
              />
            </div>

            <div className={styles.Name}>
              <Input
                type="text"
                name={`lastName${index}`}
                id={`lastName${index}`}
                required
                placeholder="Last Name"
                onChange={(e) =>
                  setPassengers((prevPassengers) =>
                    prevPassengers.map((passenger, i) =>
                      i === index
                        ? { ...passenger, lastName: e.target.value }
                        : passenger
                    )
                  )
                }
              />
            </div>
          </div>
        </div>
      ))}

      {/* Feedback and Button */}
      {feedback}
      <div className="text-center mt-4">
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
