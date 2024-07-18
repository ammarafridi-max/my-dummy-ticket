// import styles from "./Home.module.css";
import { useState } from "react";
import PrimarySection from "../../Components/Section/PrimarySection";
import Container from "../../Components/Container/Container";
import TicketForm from "./TicketForm";
import HotelForm from "./HotelForm";
import styles from "./Hero.module.css";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import {
  LocalAirportRounded,
  HotelRounded,
  HealthAndSafetyRounded,
} from "@mui/icons-material";
import Checklist from "../Checklist/Checklist";
import TicketForm2 from "./TicketForm2/TicketForm2";

export default function Hero() {
  return (
    <PrimarySection className={styles.HeroSection} id="form">
      <Container className={`row justify-content-between align-items-center`}>
        <TextContent />
        <FormContent />
      </Container>
    </PrimarySection>
  );
}

function TextContent() {
  return (
    <div className={`col-12 col-lg-5 ${styles.Content}`}>
      <h1 className={styles.HeroHeading}>
        Get your dummy ticket for
        <span className={styles.Price}> AED 49</span>
      </h1>
      <p className={styles.HeroText}>
        Book confirmed flight reservations for visa application from licenced
        Dubai agency (
        <a
          href="https://app.invest.dubai.ae/DUL/98A318CC-6751-4CDB-A958-9FF407AF6049"
          target="_blank"
          rel="noreferrer"
        >
          verify here
        </a>
        ). All bookings have a PNR code that you can check on airline websites.
      </p>
      <Checklist className={styles.ChecklistBox} />
    </div>
  );
}

function FormContent() {
  const [currentForm, setCurrentForm] = useState("ticket");
  const [formType, setFormType] = useState(<TicketForm />);

  return (
    <div className={`col-12 col-lg-6 ${styles.Form}`}>
      {/* <div className="col-12 row m-0 p-0">
        <div
          className={`${styles.Btn} ${
            currentForm === "ticket" && styles.Active
          }`}
          onClick={() => {
            setFormType(<TicketForm />);
            setCurrentForm("ticket");
          }}
        >
          <div className={styles.BtnIcon}>
            <LocalAirportRounded />
          </div>
          <p className={styles.BtnText}>Flight</p>
        </div>

        <div
          className={`${styles.Btn} ${
            currentForm === "hotel" && styles.Active
          }`}
          onClick={() => {
            setFormType(<HotelForm />);
            setCurrentForm("hotel");
          }}
        >
          <div className={styles.Icon}>
            <HotelRounded />
          </div>
          <p className={styles.BtnText}>Hotel</p>
        </div>
      </div> */}

      {/* Form */}
      {formType}
    </div>
  );
}
