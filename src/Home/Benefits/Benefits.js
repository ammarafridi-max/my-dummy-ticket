import Container from "../../Components/Container/Container";
import PrimarySection from "../../Components/Section/PrimarySection";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import styles from "./Benefits.module.css";
import shieldIcon from "./shield-icon.png";
import timeIcon from "./time-icon.png";
import usdIcon from "./usd-icon.png";

export default function Benefits() {
  return (
    <PrimarySection className={styles.Section}>
      <Container>
        <div className="row m-0 p-0 justify-content-between">
          <IconCard
            icon={shieldIcon}
            title="Reliable"
            text="We use official airline reservation systems to generate dummy tickets, making sure that each ticket is genuine and can be verified by consulates and embassies all around the world."
          />
          <IconCard
            icon={timeIcon}
            title="Quick"
            text="Our streamlined process allows you to get your dummy ticket instantly via email. Simply fill out a short form, and within minutes, you will have a verifiable ticket ready for your visa application."
          />
          <IconCard
            icon={usdIcon}
            title="Affordable"
            text="Starting at just AED 49, our service is the most cost-effective solution. We offer the best rates in the market, making it affordable for everyone to obtain a verifiable dummy ticket."
          />
        </div>
        <div className="col-12 text-center mt-5">
          <PrimaryButton href="https://res.cloudinary.com/dbwnuaiyj/image/upload/v1720273527/mdt/sample-ticket_phbzni.png">
            See a sample dummy ticket
          </PrimaryButton>
        </div>
      </Container>
    </PrimarySection>
  );
}

function IconCard({ icon, title, text }) {
  return (
    <div className={styles.IconCard}>
      <div className={styles.Icon}>
        <img src={icon} />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

{
  /* <h2 className="section-heading">Sample Ticket</h2>
        <div className="col-12 col-lg-6 mx-auto">
          <img src={img} className={styles.Img} alt="A sample dummy ticket" />
        </div> */
}
