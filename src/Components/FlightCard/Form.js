import { FaEnvelope } from "react-icons/fa";
import { formatDate } from "../../utils/formatDate";
import PrimaryButton from "../Buttons/PrimaryButton";
import Error from "../Feedback/Error";
import Input from "../FormElements/Input";
import Label from "../FormElements/Label";
import Number from "../FormElements/Number";
import SelectDate from "../FormElements/SelectDate";
import SelectTitle from "../FormElements/SelectTitle";
import TextArea from "../FormElements/TextArea";
import styles from "./Form.module.css";

// Helper Component for Passenger formData
function PassengerData({
  passenger,
  index,
  label,
  handleUpdatePassenger,
  errors,
}) {
  return (
    <div className={styles.passengerData}>
      <Label>{label}</Label>
      <div className={styles.passengerFields}>
        <SelectTitle
          className={styles.title}
          value={passenger.title}
          onChange={(e) =>
            handleUpdatePassenger(index, "title", e.target.value)
          }
        />
        <Input
          className={styles.firstName}
          type="text"
          required
          name={`firstName${index}`}
          id={`firstName${index}`}
          placeholder="First Name"
          value={passenger.firstName}
          onChange={(e) =>
            handleUpdatePassenger(index, "firstName", e.target.value)
          }
        />
        <Input
          className={styles.lastName}
          type="text"
          required
          name={`lastName${index}`}
          id={`lastName${index}`}
          placeholder="Last Name"
          value={passenger.lastName}
          onChange={(e) =>
            handleUpdatePassenger(index, "lastName", e.target.value)
          }
        />
      </div>
      {errors && (
        <>
          {errors.firstName && <Error>{errors.firstName}</Error>}
          {errors.lastName && <Error>{errors.lastName}</Error>}
        </>
      )}
    </div>
  );
}

// Helper Component for Ticket Validity Options
function TicketValidityOptions({ ticketValidity, handleValidityChange }) {
  const options = [
    { value: "48 Hours", label: "48 Hours" },
    { value: "7 Days", label: "7 Days (+ 20 AED)" },
    { value: "14 Days", label: "14 Days (+ 26 AED)" },
  ];

  return (
    <div className={styles.ticketValiditySection}>
      <Label htmlFor="ticketValidity">Choose Ticket Validity</Label>
      <div className={styles.ticketValidityBox}>
        {options.map((option) => (
          <label className={styles.option}>
            <input
              type="radio"
              name="ticketValidity"
              value={option.value}
              checked={ticketValidity === option.value}
              onChange={handleValidityChange}
              className={styles.radioInput}
            />
            <div className={styles.ticketValidityBox1}>{option.label}</div>
          </label>
        ))}
      </div>
    </div>
  );
}

// Helper Component for Receipt Options
function ReceiptOptions({
  receiveNow,
  setReceiveNow,
  receiptDate,
  setReceiptDate,
}) {
  return (
    <div className={styles.receiptSection}>
      <Label>When would you like to receive the ticket?</Label>
      <div className={styles.radioGroup}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="receiveTicket"
            checked={receiveNow}
            onChange={() => setReceiveNow(true)}
            className={styles.radioInput}
          />
          <span className={styles.radioText}>I need it now</span>
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="receiveTicket"
            checked={!receiveNow}
            onChange={() => setReceiveNow(false)}
            className={styles.radioInput}
          />
          <span className={styles.radioText}>On a later date</span>
        </label>
      </div>
      {!receiveNow && (
        <div className="row">
          <div className="col-12 col-lg-6">
            <SelectDate
              selectedDate={receiptDate && formatDate(receiptDate)}
              onDateSelect={setReceiptDate}
              minDate={new Date()}
              placeholder="Select receipt date"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function Form({
  passengers,
  handleUpdatePassenger,
  passengerErrors,
  email,
  handleEmailChange,
  emailError,
  phoneNumber,
  setPhoneNumber,
  ticketValidity,
  handleValidityChange,
  receiveNow,
  setReceiveNow,
  receiptDate,
  setReceiptDate,
  errorMessage,
  message,
  setMessage,
  handleSubmit,
  flightError,
}) {
  // Calculate counts beforehand
  let adultCount = 0;
  let childCount = 0;
  let infantCount = 0;

  return (
    <div className={styles.form}>
      {/* Passenger Details */}
      <div className="row mb-3">
        {passengers.map((passenger, index) => {
          // Increment count based on passenger type
          let label = "";
          if (passenger.type === "Adult") {
            label = `Adult ${++adultCount}`;
          } else if (passenger.type === "Child") {
            label = `Child ${++childCount}`;
          } else if (passenger.type === "Infant") {
            label = `Infant ${++infantCount}`;
          }

          return (
            <PassengerData
              key={index}
              passenger={passenger}
              index={index}
              label={label}
              handleUpdatePassenger={handleUpdatePassenger}
              errors={passengerErrors[index]}
            />
          );
        })}
      </div>

      {/* Contact Section */}
      <div className="row">
        <div className="col-12 col-lg-6">
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            name="email"
            id="email"
            autoComplete="on"
            icon={<FaEnvelope />}
            placeholder="Enter email address"
          />
          {emailError && <Error>{emailError}</Error>}
        </div>
        <div className="col-12 col-lg-6">
          <Label htmlFor="number" required>
            Phone Number
          </Label>
          <Number
            codeValue={phoneNumber.code}
            codeOnChange={(e) =>
              setPhoneNumber({ ...phoneNumber, code: e.target.value })
            }
            digitsValue={phoneNumber.digits}
            digitsOnChange={(e) =>
              setPhoneNumber({ ...phoneNumber, digits: e.target.value })
            }
          />
        </div>
      </div>

      {/* Ticket Validity */}
      <TicketValidityOptions
        ticketValidity={ticketValidity}
        handleValidityChange={handleValidityChange}
      />

      {/* Receipt Options */}
      <ReceiptOptions
        receiveNow={receiveNow}
        setReceiveNow={setReceiveNow}
        receiptDate={receiptDate}
        setReceiptDate={setReceiptDate}
      />

      {/* Error Message */}
      {errorMessage && <Error>{errorMessage}</Error>}

      {/* Special Requests */}
      <div className="row">
        <div className={styles.TextArea}>
          <Label optional>Special Requests</Label>
          <TextArea
            value={message}
            placeholder="Special requests"
            onChange={setMessage}
          />
        </div>
      </div>

      {/* Submit Button */}
      <PrimaryButton className={styles.finalizeBtn} onClick={handleSubmit}>
        Select Flight and Review
      </PrimaryButton>
      {flightError && <Error>{flightError}</Error>}
    </div>
  );
}
