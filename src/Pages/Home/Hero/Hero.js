import React, { Suspense, lazy } from "react";
import PrimarySection from "../../../Components/Section/PrimarySection";
import Container from "../../../Components/Container/Container";
import styles from "./Hero.module.css";

// Lazy load TicketForm component
const TicketForm = lazy(() => import("./TicketForm/TicketForm"));

const Hero = () => {
  return (
    <PrimarySection className={styles.HeroSection} id="form">
      <div className="col-12 col-lg-10 row justify-content-between align-items-center mx-auto">
        <div className="col-10 col-lg-6 mx-auto">
          <TextContent />
        </div>
        <div className="col-12 col-lg-6 mx-auto">
          <Suspense fallback={<div>Loading form...</div>}>
            <TicketForm />
          </Suspense>
        </div>
      </div>
    </PrimarySection>
  );
};

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

export default Hero;

// function FormContent() {
//   const [currentForm, setCurrentForm] = useState("ticket");
//   const [formType, setFormType] = useState(<TicketForm2 />);

//   return (
//     <div className={`col-12 col-lg-12 ${styles.Form}`}>
//       <div className="col-12 row m-0 p-0">
//         <div
//           className={`${styles.Btn} ${
//             currentForm === "ticket" && styles.Active
//           }`}
//           onClick={() => {
//             setFormType(<TicketForm />);
//             setCurrentForm("ticket");
//           }}
//         >
//           <div className={styles.BtnIcon}>
//             <LocalAirportRounded />
//           </div>
//           <p className={styles.BtnText}>Flight</p>
//         </div>

//         <div
//           className={`${styles.Btn} ${
//             currentForm === "hotel" && styles.Active
//           }`}
//           onClick={() => {
//             setFormType(<HotelForm />);
//             setCurrentForm("hotel");
//           }}
//         >
//           <div className={styles.Icon}>
//             <HotelRounded />
//           </div>
//           <p className={styles.BtnText}>Hotel</p>
//         </div>
//       </div>

//       {/* Form */}
//       {formType}
//     </div>
//   );
// }
