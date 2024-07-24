import styles from "./TicketForm.module.css";
import Input from "../../../Components/FormElements/Input";
import Label from "../../../Components/FormElements/Label";
import { useState } from "react";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";
import Error from "../../../Components/Feedback/Error";
import Counter from "../../../Components/FormElements/Counter";

export default function HotelForm() {
  const [feedback, setFeedback] = useState();
  const [formState, setFormState] = useState("Active");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const price = 49;

  const customerData = {
    firstName,
    lastName,
    email,
    number,
    city,
    checkinDate,
    checkoutDate,
    quantity,
  };

  function handleForm(e) {
    e.preventDefault();

    // Check if data is incomplete
    if (
      !firstName ||
      !lastName ||
      !email ||
      !number ||
      !city ||
      !checkinDate ||
      !checkoutDate
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

  // useEffect(() => {
  //   const query = new URLSearchParams(window.location.search);
  //   if (query.get("success")) {
  //     setFeedback(
  //       <FeedbackBox>
  //         Payment successful! Your dummy ticket will soon be sent to you.
  //       </FeedbackBox>
  //     );
  //     setFormState("Inactive");
  //   }
  // }, []);

  return (
    <form className={styles.Form} action="/" method="post">
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
          <Label htmlFor="city" required>
            City
          </Label>
          <Input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            name="city"
            id="city"
          />
        </div>

        {/* Dates */}
        <div className={styles.Input}>
          <Label htmlFor="checkinDate" required>
            Check In Date
          </Label>
          <Input
            type="date"
            value={checkinDate}
            onChange={(e) => setCheckinDate(e.target.value)}
            name="checkinDate"
            id="checkinDate"
            required
          />
        </div>

        <div className={styles.Input}>
          <Label htmlFor="checkoutDate" required>
            Check Out Date
          </Label>
          <Input
            type="date"
            value={checkoutDate}
            onChange={(e) => setCheckoutDate(e.target.value)}
            name="checkoutDate"
            id="checkoutDate"
            required
          />
        </div>

        <div className={styles.Input}>
          <Label>Number of Travelers</Label>
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
        </div>
      </div>

      {/* Feedback and Button */}
      {feedback}
      <div className="text-center mt-3">
        {formState === "Active" ? (
          <div>
            <PrimaryButton type="submit" onClick={handleForm}>
              Proceed to Payment <strong>(AED {price * quantity})</strong>
            </PrimaryButton>
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
