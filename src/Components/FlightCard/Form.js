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

export default function Form({
  data,
  passengers,
  adultCount,
  childCount,
  infantCount,
  handleUpdatePassenger,
  passengerErrors,
  email,
  handleEmailChange,
  emailError,
  ticketValidity,
  handleChange,
  receiveNow,
  setReceiveNow,
  receiptDate,
  setReceiptDate,
  handleSelectDate,
  handleValidityChange,
  errorMessage,
  message,
  setMessage,
  handleSubmit,
  flightError,
}) {
  return (
    <div className={styles.form}>
      <div className="row mb-3">
        {passengers.map((passenger, index) => {
          let label;
          if (passenger.type === "Adult") {
            adultCount += 0;
            label = `Adult ${adultCount}`;
          } else if (passenger.type === "Child") {
            childCount += 0;
            label = `Child ${childCount}`;
          } else if (passenger.type === "Infant") {
            infantCount += 0;
            label = `Infant ${infantCount}`;
          }
          return (
            <div key={index} className={styles.passengerData}>
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
              {passengerErrors[index] && (
                <>
                  {passengerErrors[index].firstName && (
                    <Error>{passengerErrors[index].firstName}</Error>
                  )}
                  {passengerErrors[index].lastName && (
                    <Error>{passengerErrors[index].lastName}</Error>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
      {/* Contact */}
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
          {/* {emailError && <Error>{emailError}</Error>} */}
        </div>
        <div className="col-12 col-lg-6">
          <Label htmlFor="number">Phone Number</Label>
          <Number
            codeValue={data.phoneNumber.code}
            digitsValue={data.phoneNumber.digits}
            disabled={true}
          />
        </div>
      </div>
      {/* Validity */}
      <div className={styles.ticketValiditySection}>
        <Label htmlFor="ticketValidity"> Choose Ticket Validity</Label>
        <div className={styles.ticketValidityBox}>
          <label className={styles.option}>
            <input
              type="radio"
              name="ticketValidity"
              value="48 Hours"
              checked={ticketValidity === "48 Hours"}
              onChange={handleValidityChange}
              className={styles.radioInput}
            />
            <div className={styles.ticketValidityBox1}>48 Hours</div>
          </label>
          <label className={styles.option}>
            <input
              type="radio"
              name="ticketValidity"
              value="7 Days"
              checked={ticketValidity === "7 Days"}
              onChange={handleValidityChange}
              className={styles.radioInput}
            />
            <div className={styles.ticketValidityBox2}>7 Days (+ 20 AED)</div>
          </label>
          <label className={styles.option}>
            <input
              type="radio"
              name="ticketValidity"
              value="14 Days"
              checked={ticketValidity === "14 Days"}
              onChange={handleValidityChange}
              className={styles.radioInput}
            />
            <div className={styles.ticketValidityBox3}>14 Days (+ 26 AED)</div>
          </label>
        </div>
      </div>
      {/* Receipt option */}
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
      {errorMessage && <Error>{errorMessage}</Error>}
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
      <PrimaryButton className={styles.finalizeBtn} onClick={handleSubmit}>
        Select Flight and Review
      </PrimaryButton>
      {flightError && <Error>{flightError}</Error>}{" "}
    </div>
  );
}
