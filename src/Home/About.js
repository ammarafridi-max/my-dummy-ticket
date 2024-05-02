import styles from "./About.module.css";
import PrimarySection from "../Components/Section/PrimarySection";
import Container from "../Components/Container/Container";

export default function About() {
  return (
    <PrimarySection py="50px">
      <Container>
        <div className="row">
          <div className={`col-12 col-lg-5 ${styles.Gallery}`}>
            <div className={styles.Column}></div>
          </div>
          <div className="col-12 col-lg-7 my-5">
            <h2 className="section-heading text-start">About Us</h2>
            <p>
              My Dummy Ticket is a service provider based in the United Arab
              Emirates that assists travelers with getting a dummy ticket as
              proof of travel for various purposes, especially for visa
              procedures. Every year, we helps thousands of such travelers get
              their dummy tickets within 30 minutes after confirmation.
              <br />
              <br />
              Our mission is to help thousands of travelers get their dummy
              bookings with ease so they can focus on other aspects of travel
              planning.
            </p>
          </div>
        </div>
      </Container>
    </PrimarySection>
  );
}
