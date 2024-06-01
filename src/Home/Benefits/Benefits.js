import Container from "../../Components/Container/Container";
import PrimarySection from "../../Components/Section/PrimarySection";
import styles from "./Benefits.module.css";
import img from "./sample-ticket.png";

export default function Benefits() {
  return (
    <PrimarySection py="75px">
      <Container>
        <h2 className="section-heading">Sample Ticket</h2>
        <div className="col-12 col-lg-6 mx-auto">
          <img src={img} className={styles.Img} />
        </div>
      </Container>
    </PrimarySection>
  );
}
