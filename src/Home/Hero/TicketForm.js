import { useState, useEffect } from "react";
import styles from "./TicketForm.module.css";
import Error from "../../Components/Feedback/Error";
import Input from "../../Components/FormElements/Input";
import Label from "../../Components/FormElements/Label";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import Counter from "../../Components/FormElements/Counter";
import SelectTitle from "../../Components/FormElements/SelectTitle";
import Number from "../../Components/FormElements/Number";
import TextArea from "../../Components/FormElements/TextArea";
import SelectAirport from "../../Components/FormElements/SelectAirport";
import { FaPlaneDeparture, FaPlaneArrival, FaCircle } from "react-icons/fa";

export default function TicketForm() {
  const today = new Date().toISOString().split("T")[0];
  const [feedback, setFeedback] = useState("");
  const [formState, setFormState] = useState("Active");

  const date = new Date().toLocaleDateString("default", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [passengers, setPassengers] = useState([]);
  const [type, setType] = useState("One Way");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState({ code: "", digits: "" });
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [quantity, setQuantity] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [message, setMessage] = useState("");
  const price = 49;

  useEffect(() => {
    const newPassengers = [];
    let adults = 0;
    let children = 0;
    let infants = 0;

    passengers.forEach((passenger) => {
      if (passenger.type === "Adult" && adults < quantity.adults) {
        newPassengers.push(passenger);
        adults += 1;
      } else if (passenger.type === "Child" && children < quantity.children) {
        newPassengers.push(passenger);
        children += 1;
      } else if (passenger.type === "Infant" && infants < quantity.infants) {
        newPassengers.push(passenger);
        infants += 1;
      }
    });

    while (adults < quantity.adults) {
      newPassengers.push({
        type: "Adult",
        title: "Mr.",
        firstName: "",
        lastName: "",
      });
      adults += 1;
    }
    while (children < quantity.children) {
      newPassengers.push({
        type: "Child",
        title: "Mr.",
        firstName: "",
        lastName: "",
      });
      children += 1;
    }
    while (infants < quantity.infants) {
      newPassengers.push({
        type: "Infant",
        title: "Mr.",
        firstName: "",
        lastName: "",
      });
      infants += 1;
    }

    setPassengers(newPassengers);
  }, [quantity]);

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
    message,
  };

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
          try {
            const url = new URL(data.url);
            window.location.href = data.url;
          } catch (error) {
            throw new Error("Invalid URL provided.");
          }
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

  const updatePassenger = (index, field, value) => {
    setPassengers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  return (
    <form className={styles.Form} onSubmit={handleForm}>
      <div className={styles.Row}>
        <div className="row">
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
      </div>

      <div className="row">
        <div className={styles.Input}>
          <Label htmlFor="from" required>
            From
          </Label>
          <SelectAirport
            icon={<FaPlaneDeparture />}
            value={from}
            onChange={setFrom}
          />
        </div>
        <div className={styles.Input}>
          <Label htmlFor="to" required>
            To
          </Label>
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

      <div>
        <Count
          adultCount={quantity.adults}
          childrenCount={quantity.children}
          infantCount={quantity.infants}
          onAdultAdd={() => {
            setQuantity((q) => ({
              ...q,
              adults: q.adults < 10 ? q.adults + 1 : q.adults,
            }));
          }}
          onAdultSubtract={() => {
            setQuantity((q) => ({
              ...q,
              adults: q.adults > 1 ? q.adults - 1 : q.adults,
            }));
          }}
          onChildrenAdd={() =>
            setQuantity((q) => ({
              ...q,
              children: q.children < 10 ? q.children + 1 : q.children,
            }))
          }
          onChildrenSubtract={() =>
            setQuantity((q) => ({
              ...q,
              children: q.children > 0 ? q.children - 1 : q.children,
            }))
          }
          onInfantAdd={() =>
            setQuantity((q) => ({
              ...q,
              infants: q.infants < 10 ? q.infants + 1 : q.infants,
            }))
          }
          onInfantSubtract={() =>
            setQuantity((q) => ({
              ...q,
              infants: q.infants > 0 ? q.infants - 1 : q.infants,
            }))
          }
        />
      </div>

      {(() => {
        let adultCount = 0;
        let childCount = 0;
        let infantCount = 0;

        return passengers.map((passenger, index) => {
          let label;
          if (passenger.type === "Adult") {
            adultCount += 1;
            label = `Adult ${adultCount}`;
          } else if (passenger.type === "Child") {
            childCount += 1;
            label = `Child ${childCount}`;
          } else if (passenger.type === "Infant") {
            infantCount += 1;
            label = `Infant ${infantCount}`;
          }

          return (
            <div key={index}>
              <Label required>{label}</Label>
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
          );
        });
      })()}

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

      <div className="row">
        <div className={styles.TextArea}>
          <Label optional>Message</Label>
          <TextArea
            value={message}
            placeholder="Additional information (reason for dummy tickets, specific airline, flight time)"
            onChange={setMessage}
          />
        </div>
      </div>

      {feedback}

      <div className="text-center mt-4">
        {formState === "Active" && (
          <PrimaryButton type="submit">
            Submit{" "}
            <span className={styles.Total}>
              (AED{" "}
              {price * (quantity.adults + quantity.children + quantity.infants)}
              )
            </span>
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

function Count(props) {
  return (
    <div className={`row ${styles.CountSection} p-0 mx-0`}>
      <div className={styles.Count}>
        <p className={styles.Gender}>
          Adults <span className={styles.Age}>(12+)</span>
        </p>
        <Counter
          className={styles.Counter}
          onAdd={props.onAdultAdd}
          onSubtract={props.onAdultSubtract}
        >
          {props.adultCount}
        </Counter>
      </div>
      <div className={styles.Count}>
        <p className={styles.Gender}>
          Children <span className={styles.Age}>(2 - 11)</span>
        </p>
        <Counter
          className={styles.Counter}
          onAdd={props.onChildrenAdd}
          onSubtract={props.onChildrenSubtract}
        >
          {props.childrenCount}
        </Counter>
      </div>
      <div className={styles.Count}>
        <p className={styles.Gender}>
          Infants <span className={styles.Age}>(0 - 1)</span>
        </p>
        <Counter
          className={styles.Counter}
          onAdd={props.onInfantAdd}
          onSubtract={props.onInfantSubtract}
        >
          {props.infantCount}
        </Counter>
      </div>
    </div>
  );
}
