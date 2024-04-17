import styles from "./Process.module.css";
import PrimarySection from "../Components/Section/PrimarySection";
import Container from "../Components/Container/Container";

export default function Process() {
  return (
    <PrimarySection py="75px" backgroundColor="purple" id="process">
      <Container>
        <h2 className={styles.Heading}>How It Works</h2>
        <div className="row justify-content-between">
          <div className={styles.StepsCol}>
            <div className={styles.StepsHeadingDiv}>
              <h3 className={styles.StepsNumber}>1</h3>
            </div>
            <h4 className={styles.StepsHeading}>Fill up the form</h4>
            <p className={styles.StepsText}>
              Fill out our online form with your first name, last name, email,
              and phone number.
            </p>
          </div>

          <div className={styles.StepsCol}>
            <div className={styles.StepsHeadingDiv}>
              <h3 className={styles.StepsNumber}>2</h3>
            </div>
            <h4 className={styles.StepsHeading}>Make the payment</h4>
            <p className={styles.StepsText}>
              Our team confirms your details within 60 minutes and sends you a
              payment link to process your dummy ticket.
            </p>
          </div>

          <div className={styles.StepsCol}>
            <div className={styles.StepsHeadingDiv}>
              <h3 className={styles.StepsNumber}>3</h3>
            </div>
            <h4 className={styles.StepsHeading}>Get your dummy ticket</h4>
            <p className={styles.StepsText}>
              Upon confirmation, we swiftly send your dummy ticket via WhatsApp
              or email, crafted to resemble authentic travel documents.
            </p>
          </div>
        </div>
      </Container>
    </PrimarySection>
  );
}
