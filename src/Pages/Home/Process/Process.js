import styles from './Process.module.css';
import PrimarySection from '../../../components/Section/PrimarySection';
import Container from '../../../components/Container/Container';
import { SectionTitle } from '../../../components/SectionTitle/SectionTitle';

export default function Process() {
  return (
    <PrimarySection pt="0">
      <Container>
        <SectionTitle textAlign="center" subtitle="How it Works" mb="50px">
          Your Dummy Ticket in 3 Easy Steps
        </SectionTitle>
        <div className="row justify-content-between">
          <Card
            number={1}
            title="Select"
            text="Enter your route and dates, select your desired flight and enter all the details listed on our form."
          />
          <Card
            number={2}
            title="Pay"
            text="Once you confirm the details, you can then proceed to payment using Stripe's Checkout"
          />
          <Card
            number={3}
            title="Receive"
            text="After your payment is confirmed, you'll receive your dummy ticket in 10 minutes via email."
          />
        </div>
      </Container>
    </PrimarySection>
  );
}

function Card(props) {
  return (
    <div className={styles.Card}>
      <div className={`row align-items-center`}>
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
