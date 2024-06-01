// import styles from "./Home.module.css";
import { useState } from "react";
import PrimarySection from "../../Components/Section/PrimarySection";
import Container from "../../Components/Container/Container";
import TicketForm from "./TicketForm";
import HotelForm from "./HotelForm";
import styles from "./Hero.module.css";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import Checklist from "../Checklist/Checklist";

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
        Get your dummy ticket from
        <span className={styles.Price}> AED 49</span>
      </h1>
      <p className={styles.HeroText}>
        Our dummy tickets are used for visa applications or as proof of onward
        travel. All come with a unique PNR code that can be used to verify on
        airline websites.
      </p>
      <Checklist className={styles.ChecklistBox} />
    </div>
  );
}

function FormContent() {
  const [currentForm, setCurrentForm] = useState("ticket");
  const [formType, setFormType] = useState(<TicketForm />);

  return (
    <div className="col-12 col-lg-6 m-0 p-0">
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
            <LocalAirportRoundedIcon />
          </div>
          {currentForm === "ticket" && <p className={styles.BtnText}>Flight</p>}
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
            <HotelRoundedIcon />
          </div>
          {currentForm === "hotel" && <p className={styles.BtnText}>Hotel</p>}
        </div>

        <div
          className={`${styles.Btn} ${
            currentForm === "insurance" && styles.Active
          }`}
          onClick={() => {
            setFormType(<HotelForm />);
            setCurrentForm("insurance");
          }}
        >
          <div className={styles.Icon}>
            <HealthAndSafetyIcon />
          </div>
          {currentForm === "insurance" && (
            <p className={styles.BtnText}>Insurance</p>
          )}
        </div>
      </div> */}

      {/* Form */}
      {formType}
    </div>
  );
}
