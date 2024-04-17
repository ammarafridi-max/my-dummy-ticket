import styles from "./Process.module.css";
import PrimarySection from "../Components/Section/PrimarySection";
import Container from "../Components/Container/Container";

export default function Process() {
  return (
    <PrimarySection
      py="75px"
      className={styles.Section}
      backgroundColor="purple"
      id="process"
    >
      <Container>
        <h2 className={styles.Heading}>How It Works</h2>
        <div className="row justify-content-between">
          <div className={styles.StepsCol}>
            <div className={styles.StepsHeadingDiv}>
              <h3 className={styles.StepsNumber}>1</h3>
            </div>
            <h4 className={styles.StepsHeading}>Submit form</h4>
            <p className={styles.StepsText}>
              Fill the online form with traveler name, contact details,
              preferred date and travel route.
            </p>
          </div>

          <div className={styles.StepsCol}>
            <div className={styles.StepsHeadingDiv}>
              <h3 className={styles.StepsNumber}>2</h3>
            </div>
            <h4 className={styles.StepsHeading}>Payment</h4>
            <p className={styles.StepsText}>
              Our team confirms the details and sends you payment information in
              30 minutes. Pay by secure payment link or bank transfer.
            </p>
          </div>

          <div className={styles.StepsCol}>
            <div className={styles.StepsHeadingDiv}>
              <h3 className={styles.StepsNumber}>3</h3>
            </div>
            <h4 className={styles.StepsHeading}>Get your dummy ticket</h4>
            <p className={styles.StepsText}>
              Get your verifiable dummy ticket as a PDF file by email and
              Whatsapp!
            </p>
          </div>
        </div>
      </Container>
    </PrimarySection>
  );
}
