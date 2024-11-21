import styles from "./About.module.css";
import PrimarySection from "../../../components/Section/PrimarySection";
import Container from "../../../components/Container/Container";
import { SectionTitle } from "../../../components/SectionTitle/SectionTitle";
import ticketIcon from "../../../assets/Images/ticket-icon.png";
import hotelIcon from "../../../assets/Images/hotel-icon.png";
import shieldIcon from "../../../assets/Images/shield-icon.png";
import trustpilot from "../../../assets/Images/trustpilot.png";
import travelIcon from "../../../assets/Images/travel-icon.png";
import happyTraveler1 from "../../../assets/Images/happy-traveler1.png";
import happyTraveler2 from "../../../assets/Images/happy-traveler2.png";

export default function About() {
  return (
    <PrimarySection id="about" backgroundColor="white">
      <Container className="row justify-content-between">
        <div className="col-12 col-md-6 col-lg-7">
          <SectionTitle mb="40px" subtitle="About My Dummy Ticket">
            Who We Are
          </SectionTitle>
          <p>
            MyDummyTicket.ae is a service of Travl Technologies LLC, a licenced
            travel agency based in Dubai, UAE. We provide travel services to
            thousands of happy customers every year including air tickets, hotel
            bookings, travel insurance, dummy flight bookings for visa
            applications, airport transfers, tours and holiday packages.
          </p>
          <IconWithText
            src={ticketIcon}
            title={"Dummy Tickets"}
            description="Simply, dummy tickets are flight reservations that people use for various purposes, such as to show as proof of onward travel when applying for a visa or at the airport. These are not confirmed flight tickets."
          />
          <IconWithText
            src={hotelIcon}
            title={"Hotel Reservations"}
            description="Similar to dummy tickets, we provide verifiable hotel reservations that are mostly used for visa purposes to show that the traveler has planned their stay in the country they're planning to visit."
          />
          <IconWithText
            src={shieldIcon}
            title={"Travel Insurance"}
            description="We provide real and genuine travel insurance that is accepted worldwide for our customers. Our travel insurance policies cover medical emergencies, trip cancellations, and unexpected travel delays."
          />
        </div>
        <Gallery />
      </Container>
    </PrimarySection>
  );
}

function IconWithText({ src, title, description }) {
  return (
    <div className={styles.iconWithText}>
      <img src={src} className={styles.icon} />
      <p>
        <span className="semi-bold">{title}: </span>
        {description}
      </p>
    </div>
  );
}

function Gallery() {
  return (
    <div
      className={`col-12 col-md-6 col-lg-5 row mx-auto p-0 ${styles.gallery}`}
    >
      <div className={styles.grid1}>
        <div className={styles.img1}>
          <a
            href="https://www.trustpilot.com/review/mydummyticket.ae"
            target="_blank"
          >
            Rated 4.5+ on{" "}
            <img src={trustpilot} className={styles.trustpilotIcon} />
          </a>
        </div>
        <div className={styles.img2}>
          <img src={happyTraveler1} />
        </div>
      </div>
      <div className={styles.grid2}>
        <div className={styles.img1}>
          <img src={happyTraveler2} />
        </div>
        <div className={styles.img2}>
          <img src={travelIcon} className={styles.travelIcon} />
        </div>
      </div>
    </div>
  );
}
