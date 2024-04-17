import PrimarySection from "../Components/Section/PrimarySection";
import Container from "../Components/Container/Container";
import HeroForm from "./HeroForm";
// import styles from "./Home.module.css";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.Hero} id="form">
      <div className="col-12 col-lg-11 mx-auto justify-content-between row align-items-center">
        <div className="col-11 col-lg-6 mx-auto">
          <h1 className={styles.HeroHeading}>
            Get a dummy ticket for AED 49 only!
          </h1>
          <p className={styles.HeroText}>
            Our dummy tickets are used for visa applications or as proof of
            onward travel. All come with a unique PNR code that can be used to
            verify on airline websites.
          </p>
        </div>
        <div className="col-lg-6">
          <HeroForm />
        </div>
      </div>
    </section>
  );
}
