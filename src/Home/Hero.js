import PrimarySection from "../Components/Section/PrimarySection";
import Container from "../Components/Container/Container";
import HeroForm from "./HeroForm";
// import styles from "./Home.module.css";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <PrimarySection py="50px" className={styles.Hero} id="form">
      <Container className={`row align-items-center`}>
        <div className="col-12 col-lg-5">
          <h1 className={styles.HeroHeading}>
            Get a dummy ticket for AED 49 only!
          </h1>
          <p className={styles.HeroText}>
            Our dummy tickets are used for visa applications or as proof of
            onward travel. All come with a unique PNR code that can be used to
            verify on airline websites.
          </p>
        </div>
        <div className="col-12 col-lg-7">
          <HeroForm />
        </div>
      </Container>
    </PrimarySection>
  );
}
