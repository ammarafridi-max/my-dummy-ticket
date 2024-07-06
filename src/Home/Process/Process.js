import styles from "./Process.module.css";
import PrimarySection from "../../Components/Section/PrimarySection";
import Container from "../../Components/Container/Container";

export default function Process() {
  return (
    <PrimarySection className={styles.Section} id="process">
      <Container>
        <h2 className="section-heading color-white">How It Works</h2>
        <div className="row justify-content-between">
          <Card
            number={1}
            title="Submit"
            text="Fill the online form with travelers' names, contact details, preferred date and travel route."
          />
          <Card
            number={2}
            title="Pay"
            text="Once your details are entered, you will be directed to Stripe's secure Checkout page."
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
            <p className={styles.Number}>{props.number}</p>
          </div>
        </div>
        <div className={`col-10 col-lg-10 ${styles.Content}`}>
          <h3 className={styles.Title}>{props.title}</h3>
          <p className={styles.Text}>{props.text}</p>
        </div>
      </div>
    </div>
  );
}
