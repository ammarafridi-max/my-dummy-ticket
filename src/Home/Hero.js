import PrimarySection from "../Components/Section/PrimarySection";
import Container from "../Components/Container/Container";
import HeroForm from "./HeroForm";
import styles from "./Home.module.css";

export default function Hero() {
  return (
    <PrimarySection py="50px" className={styles.Hero} id="form">
      <Container className={`row align-items-center`}>
        <div className="col-12 col-lg-6">
          <h1 className={styles.HeroHeading}>Get a verifiable dummy ticket</h1>
          <p className={styles.HeroText}>
            At MyDummyTicket.ae, we're committed to streamlining your travel
            experience. With our straightforward process and responsive customer
            support, obtaining a dummy ticket has never been easier. Start your
            journey with us today!
          </p>
        </div>
        <div className="col-12 col-lg-6">
          <HeroForm />
        </div>
      </Container>
    </PrimarySection>
  );
}
