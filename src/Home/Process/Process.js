import styles from "./Process.module.css";
import PrimarySection from "../../Components/Section/PrimarySection";
import Container from "../../Components/Container/Container";

export default function Process() {
  return (
    <PrimarySection className={styles.Section} id="process">
      <Container>
        <h2 className="section-heading">How It Works</h2>
        <div className="row justify-content-between">
          <Card
            number={1}
            title="Submit"
            text="Fill the online form with travelers' names, contact details, preferred date and travel route."
          />
          <Card
            number={2}
            title="Pay"
            text="Our team confirms the details and sends you payment information in
            30 minutes."
          />
          <Card
            number={3}
            title="Receive"
            text="Receive your verifiable dummy flight ticket as a PDF file via both email and WhatsApp instantly."
          />
        </div>
      </Container>
    </PrimarySection>
  );
}

function Card(props) {
  return (
    <div className={styles.Card}>
      <div className={`row ${styles.CardRow}`}>
        <div className="col-2 col-lg-2">
          <div className={styles.NumberDiv}>
            <h3 className={styles.Number}>{props.number}</h3>
          </div>
        </div>
        <div className={`col-10 col-lg-10 ${styles.Content}`}>
          <h4 className={styles.Title}>{props.title}</h4>
          <p className={styles.Text}>{props.text}</p>
        </div>
      </div>
    </div>
  );
}
