import React, { Suspense, lazy, useState } from "react";
import PrimarySection from "../../../Components/Section/PrimarySection";
import Container from "../../../Components/Container/Container";
import styles from "./Hero.module.css";
import TicketForm from "./TicketForm/TicketForm";
import HotelForm from "./HotelForm/HotelForm";
import { IoIosAirplane } from "react-icons/io";
import { MdHotel } from "react-icons/md";

export default function Hero() {
  return (
    <PrimarySection className={styles.HeroSection} id="form">
      <div className="col-12 col-lg-10 row justify-content-between align-items-center mx-auto">
        <div className="col-10 col-lg-6 mx-auto">
          <TextContent />
        </div>
        <Form />
      </div>
    </PrimarySection>
  );
}

function Form() {
  const [currentForm, setCurrentForm] = useState("ticket");

  return (
    <div className={`col-12 col-lg-6 ${styles.form}`}>
      <div className={`row ${styles.iconContainer}`}>
        <div
          className={`${styles.iconWithText} ${
            currentForm === "ticket" && styles.active
          }`}
          onClick={() => setCurrentForm("ticket")}
        >
          <IoIosAirplane className={styles.icon} />
          <p>Flights</p>
        </div>

        <div
          className={`${styles.iconWithText} ${
            currentForm === "hotel" && styles.active
          }`}
          onClick={() => setCurrentForm("hotel")}
        >
          <MdHotel className={styles.icon} />
          <p>Hotels</p>
        </div>
      </div>
      {currentForm === "ticket" && <TicketForm />}
      {currentForm === "hotel" && <HotelForm />}
    </div>
  );
}

const TextContent = React.memo(() => {
  return (
    <div className={styles.Content}>
      <h1 className={styles.HeroHeading}>
        Get your dummy ticket for <span className={styles.Price}>AED 49</span>
      </h1>
      <p className={styles.HeroText}>
        Book confirmed flight reservations for visa application from licensed
        Dubai agency (
        <a
          href="https://app.invest.dubai.ae/DUL/98A318CC-6751-4CDB-A958-9FF407AF6049"
          target="_blank"
          rel="noreferrer"
          title="Verify My Dummy Ticket's official license here."
        >
          verify here
        </a>
        ). All bookings have a PNR code that you can check on airline websites.
      </p>
    </div>
  );
});
