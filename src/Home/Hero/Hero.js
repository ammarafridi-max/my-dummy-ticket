// import styles from "./Home.module.css";
import { useState } from "react";
import PrimarySection from "../../Components/Section/PrimarySection";
import Container from "../../Components/Container/Container";
import TicketForm from "./TicketForm";
import HeroForm2 from "./HeroForm2";
import HotelForm from "./HotelForm";
import styles from "./Hero.module.css";
import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import LocalAirportRoundedIcon from "@mui/icons-material/LocalAirportRounded";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

export default function Hero() {
  const [formType, setFormType] = useState(<TicketForm />);
  const [currentForm, setCurrentForm] = useState("ticket");

  return (
    <PrimarySection
      className={styles.HeroSection}
      id="form"
      pt="25px"
      pb="75px"
    >
      <Container
        className={`${styles.HeroDiv} row justify-content-between align-items-center`}
      >
        <div className="col-12 col-lg-5">
          <h1 className={styles.HeroHeading}>
            Get your dummy ticket from
            <span className="primary-color"> AED 49!</span>
          </h1>
          <p className={styles.HeroText}>
            Our dummy tickets are used for visa applications or as proof of
            onward travel. All come with a unique PNR code that can be used to
            verify on airline websites.
          </p>
        </div>
        <div className="col-12 col-lg-6 m-0 p-0">
          <div className="col-12 row m-0 p-0">
            {/* Ticket */}

            <div
              className={`${styles.Btn} ${
                currentForm === "ticket" && styles.Active
              }`}
              onClick={() => {
                setFormType(<TicketForm />);
                setCurrentForm("ticket");
              }}
            >
              <div className={styles.Icon}>
                <LocalAirportRoundedIcon />
              </div>
              {currentForm === "ticket" && (
                <p className={styles.BtnText}>Flight</p>
              )}
            </div>

            {/* Hotel */}

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
              {currentForm === "hotel" && (
                <p className={styles.BtnText}>Hotel</p>
              )}
            </div>

            {/* Insurance */}

            {/* <div
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
            </div> */}
          </div>

          {/* Form */}
          {formType}
        </div>
      </Container>
    </PrimarySection>
  );
}
