import styles from "./HeroForm.module.css";
import Input from "../Components/FormElements/Input";
import Label from "../Components/FormElements/Label";
import { useState } from "react";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import Success from "../Components/Feedback/Success";
import Error from "../Components/Feedback/Error";

export default function HeroForm() {
  const [feedback, setFeedback] = useState("");

  const [ticketType, setTicketType] = useState("One Way");
  const [formState, setFormState] = useState("Active");
  const [price, setPrice] = useState(49);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [passport, setPassport] = useState("");

  const customerData = {
    firstName,
    lastName,
    email,
    number,
    from,
    to,
    departureDate,
    arrivalDate,
    passport,
  };

  const uploadToCloudinary = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      `${process.env.REACT_APP_CLOUDINARY_PRESENT_NAME}`
    );

    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("File uploaded to Cloudinary:", data);
        setPassport(data.secure_url);
      })
      .catch((error) => {
        console.error("Error uploading file to Cloudinary:", error);
      });
  };

  function handleForm(e) {
    e.preventDefault();

    // Check if data is incomplete
    if (!firstName || !email || !number) {
      setFeedback(
        <Error>
          First name, last name, email address, and phone number are required
        </Error>
      );

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
            // Show success feedback
            setFeedback(
              <Success>
                Form submitted successfully. We'll contact you soon!
              </Success>
            );
            setFormState("Active");
          } else {
            return response.json().then((data) => {
              throw new Error(data.error);
            });
          }
        })
        .catch((error) => {
          console.log("Error:", error);
          setFeedback(
            <Error>Error submitting form. Please try again later</Error>
          );
          setFormState("Active");
          setTimeout(function () {
            setFeedback("");
          }, 10000);
        });
    }
  }

  return (
    <form className={styles.Form} method="post">
      {/* Return / One way */}
      <div className={`row justify-content-start`}>
        <p
          className={`${styles.Type} ${
            ticketType === "One Way" && styles.Active
          }`}
          onClick={() => {
            setTicketType("One Way");
            setPrice(49);
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
          <Label htmlFor="lastName">
            <span className={styles.Required}>*</span>Last Name
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
            <Label htmlFor="arrivalDate">Return Date</Label>
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

      {/* Attach documents */}
      {/* <div className={styles.Row}>
        <div className={styles.Input}>
          <Label htmlFor="passport">Passport Copy</Label>
          <Input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              uploadToCloudinary(file);
            }}
            name="passport"
            id="passport"
          />
        </div>
      </div> */}

      {/* Feedback and Button */}
      {feedback}
      <div className="text-center mt-4">
        {formState === "Active" && (
          <PrimaryButton type="submit" onClick={handleForm}>
            Proceed to Payment (AED {price})
          </PrimaryButton>
        )}
        {formState === "Loading" && (
          <div class="spinner-border" role="status">
            <span class="sr-only"></span>
          </div>
        )}
      </div>
    </form>
  );
}
