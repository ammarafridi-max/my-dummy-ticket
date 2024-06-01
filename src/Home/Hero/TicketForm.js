import { useState, useEffect, useContext } from "react";
import styles from "./TicketForm.module.css";
import Success from "../../Components/Feedback/Success";
import Error from "../../Components/Feedback/Error";
import Input from "../../Components/FormElements/Input";
import Label from "../../Components/FormElements/Label";
import Select from "../../Components/FormElements/Select";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import Counter from "../../Components/FormElements/Counter";
import SelectTitle from "../../Components/FormElements/SelectTitle";
import Number from "../../Components/FormElements/Number";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaRegDotCircle,
  FaCircle,
} from "react-icons/fa";

export default function TicketForm() {
  const today = new Date().toISOString().split("T")[0];

  const [feedback, setFeedback] = useState("");
  const [formState, setFormState] = useState("Active");

  const date = new Date().toLocaleDateString("default", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [passengers, setPassengers] = useState([
    { title: "", firstName: "", lastName: "" },
  ]);
  const [type, setType] = useState("One Way");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState({ code: "", digits: "" });
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(49);

  const customerData = {
    creation: {
      date,
      time: new Date().toLocaleTimeString(),
    },
    type,
    currency: "aed",
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

  // ---------- Handle form submission ----------

  const handleForm = (e) => {
    e.preventDefault();

    if (
      !email ||
      !number.code ||
      !number.digits ||
      !from ||
      !to ||
      !departureDate
    ) {
      setFeedback(<Error>All fields are mandatory</Error>);
    } else {
      submitForm();
    }
  };

  // ---------- Submit form data to the backend ----------

  const submitForm = () => {
    setFormState("Loading");
    fetch(`${process.env.REACT_APP_BACKEND_URL}/ticket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.url) {
          window.location.href = data.url;
        } else {
          throw new Error(data.error);
        }
      })
      .catch(() => {
        setFeedback(
          <Error>Error submitting form. Please try again later</Error>
        );
        setFormState("Active");
      });
  };

  // Update passenger details

  const updatePassenger = (index, field, value) => {
    setPassengers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  // ---------- Component ----------

  return (
    <form className={styles.Form} onSubmit={handleForm}>
      {/* Ticket Type */}

      <div className={styles.Row}>
        <div className="row">
          <p
            className={styles.Type2}
            onClick={() => {
              setType("One Way");
              setPrice(49);
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
            className={styles.Type2}
            onClick={() => {
              setType("Return");
              setPrice(69);
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

      {/* From / To Inputs */}
      <div className="row">
        <div className={styles.Input}>
          <Label htmlFor="from" required>
            From
          </Label>
          {/* <Select /> */}
          <Input
            icon={<FaPlaneDeparture />}
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
            icon={<FaPlaneArrival />}
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
        {type === "Return" && (
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
              min={departureDate}
            />
          </div>
        )}
      </div>

      {/* Passenger Details */}
      <div className={styles.Input}>
        <Label required>Number Of Passengers</Label>
        <Counter
          onAdd={(e) => {
            e.preventDefault();
            if (quantity < 12) {
              setQuantity(quantity + 1);
              setPassengers([
                ...passengers,
                { title: "", firstName: "", lastName: "" },
              ]);
            }
          }}
          onSubtract={(e) => {
            e.preventDefault();
            if (quantity > 1) {
              setQuantity(quantity - 1);
              setPassengers(passengers.slice(0, -1));
            }
          }}
        >
          {quantity}
        </Counter>
      </div>
      {passengers.map((passenger, index) => (
        <div key={index}>
          <Label required>Passenger {index + 1}</Label>
          <div className="row mb-2">
            <div className={styles.Title}>
              <SelectTitle
                value={passenger.title}
                onChange={(e) =>
                  updatePassenger(index, "title", e.target.value)
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
                  updatePassenger(index, "firstName", e.target.value)
                }
              />
            </div>
            <div className={styles.Name}>
              <Input
                type="text"
                required
                name={`lastName${index}`}
                id={`lastName${index}`}
                placeholder="Last Name"
                value={passenger.lastName}
                onChange={(e) =>
                  updatePassenger(index, "lastName", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      ))}

      {/* Contact Details */}
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
            codeOnChange={(e) => setNumber({ ...number, code: e.target.value })}
            digitsValue={number.digits}
            digitsOnChange={(e) =>
              setNumber({ ...number, digits: e.target.value })
            }
          />
        </div>
      </div>

      {/* Feedback */}
      {feedback}

      {/* Submit Button */}
      <div className="text-center mt-4">
        {formState === "Active" && (
          <PrimaryButton type="submit">
            Submit{" "}
            <span className={styles.Total}>(AED {price * quantity})</span>
          </PrimaryButton>
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

{
  /* {["One Way", "Return"].map((ticketType) => (
          <p
            key={ticketType}
            className={`${styles.Type} ${type === ticketType && styles.Active}`}
            onClick={() => {
              setType(ticketType);
              setPrice(ticketType === "One Way" ? 49 : 69);
            }}
          >
            {ticketType}
          </p>
        ))} */
}
