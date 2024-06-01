import styles from "./About.module.css";
import PrimarySection from "../../Components/Section/PrimarySection";
import Container from "../../Components/Container/Container";
import img from "./about.png";

export default function About() {
  return (
    <PrimarySection py="75px" id="about">
      <Container className="row align-items-center justify-content-between">
        <h2 className={`section-heading ${styles.Heading}`}>About Us</h2>
        <p className={styles.AboutText}>
          MyDummyTicket.ae is a service of{" "}
          <a
            href="https://app.invest.dubai.ae/DUL/98A318CC-6751-4CDB-A958-9FF407AF6049"
            target="_blank"
            className={styles.Link}
          >
            Travl Technologies LLC
          </a>
          , a licenced travel agency based in Dubai, UAE. We provide travel
          services to thousands of happy customers every year including air
          tickets, hotel bookings, travel insurance, dummy flight bookings for
          visa applications, airport transfers, tours and holiday packages.
        </p>
      </Container>
    </PrimarySection>
  );
}
