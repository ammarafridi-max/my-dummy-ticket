import { useState, useEffect } from "react";
import styles from "./TicketForm.module.css";
import Success from "../../Components/Feedback/Success";
import Error from "../../Components/Feedback/Error";
import Input from "../../Components/FormElements/Input";
import Label from "../../Components/FormElements/Label";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import stripe from "./stripe.png";
import Counter from "../../Components/FormElements/Counter";
import SelectTitle from "../../Components/FormElements/SelectTitle";
import Number from "../../Components/FormElements/Number";

export default function HeroForm2() {
  const today = new Date().toISOString().split("T")[0];
  const [feedback, setFeedback] = useState("");
  const [formState, setFormState] = useState("Active");

  const [passengers, setPassengers] = useState([
    { title: "", firstName: "", lastName: "" },
  ]);
  const [type, setType] = useState("One Way");
  const [ticketId, setTicketId] = useState("price_1PCSArIy9CRhj2A0xXopFs0u"); // One Way
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState({ code: "", digits: "" });
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(49);

  const customerData = {
    type,
    price,
    passengers,
    email,
    number: `${number.code}${number.digits}`,
    from,
    to,
    departureDate,
    arrivalDate,
    quantity,
  };

  function handleForm(e) {
    e.preventDefault();

    // Check if data is incomplete
    if (!email || !number || !from || !to || !departureDate) {
      setFeedback(<Error>All fields are mandatory</Error>);

      // Proceed to sending data to backend
    } else {
      setFormState("Loading");
      fetch(`${process.env.REACT_APP_BACKEND_URL}/ticket`, {
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
        });
    }
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
          className={`${styles.Type} ${type === "One Way" && styles.Active}`}
          onClick={() => {
            setType("One Way");
            setPrice(49);
          }}
        >
          One way
        </p>
        <p
          className={`${styles.Type} ${type === "Return" && styles.Active}`}
          onClick={() => {
            setType("Return");
            setPrice(89);
          }}
        >
          Return
        </p>
      </div>

      {/* From / To */}

      <div className="row">
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
            autoComplete="on"
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
            required
            name="to"
            id="to"
          />
        </div>
      </div>

      {/* Contact */}

      <div className="row">
        <div className={styles.Input}>
          <Label htmlFor="email" required>
            Email Address
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
          <Number
            codeValue={number.code}
            codeOnChange={(e) => {
              setNumber((prev) => ({ ...prev, code: e.target.value }));
            }}
            digitsValue={number.digits}
            digitsOnChange={(e) => {
              setNumber((prev) => ({
                ...prev,
                digits: e.target.value,
              }));
            }}
          />
        </div>
      </div>

      {/* Dates */}

      <div className="row">
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
            min={today}
          />
        </div>

        <div className={styles.Input}>
          {type === "Return" && (
            <>
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
                min={departureDate}
              />
            </>
          )}
        </div>
      </div>

      {/* Passenger Detail */}

      {/* Quantity */}

      <div className={styles.Input}>
        <Label required>Number Of Passengers</Label>
        <Counter
          onAdd={(e) => {
            e.preventDefault();
            setQuantity((current) => (current < 6 ? current + 1 : current));
            if (quantity < 6) {
              setPassengers((prevPassengers) => [
                ...prevPassengers,
                { title: "", firstName: "", lastName: "" },
              ]);
            }
          }}
          onSubtract={(e) => {
            e.preventDefault();
            setQuantity((current) => (current > 1 ? current - 1 : current));
            if (quantity > 1) {
              setPassengers((prevPassengers) => prevPassengers.slice(0, -1));
            }
          }}
        >
          {quantity}
        </Counter>
      </div>

      {/* Names */}

      {passengers.map((passenger, index) => (
        <div key={index}>
          <Label required>Passenger {index + 1}</Label>

          <div className="row">
            <div className={styles.Title}>
              <SelectTitle
                value={passenger.title}
                onChange={(e) =>
                  setPassengers((prevPassengers) =>
                    prevPassengers.map((p, i) =>
                      i === index ? { ...p, title: e.target.value } : p
                    )
                  )
                }
              />
            </div>

            <div className={styles.Name}>
              <Input
                type="text"
                required
                name={`firstName${index}`}
                id={`firstName${index}`}
                placeholder="First Name"
                value={passenger.firstName}
                onChange={(e) =>
                  setPassengers((prevPassengers) =>
                    prevPassengers.map((p, i) =>
                      i === index ? { ...p, firstName: e.target.value } : p
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
                value={passenger.lastName}
                onChange={(e) =>
                  setPassengers((prevPassengers) =>
                    prevPassengers.map((p, i) =>
                      i === index ? { ...p, lastName: e.target.value } : p
                    )
                  )
                }
              />
            </div>
          </div>
        </div>
      ))}

      {/* Feedback */}

      {feedback}

      {/* Button */}

      <div className="text-center mt-4">
        {formState === "Active" && (
          <div>
            <PrimaryButton type="submit" onClick={handleForm}>
              Proceed to Payment <strong>(AED {price * quantity})</strong>
            </PrimaryButton>
            <div>
              <img src={stripe} className={styles.StripeImg} />
            </div>
          </div>
        )}
        {formState === "Loading" && (
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        )}
      </div>
    </form>
  );
}
