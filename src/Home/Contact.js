import styles from "./Contact.module.css";
import PrimarySection from "../Components/Section/PrimarySection";
import Container from "../Components/Container/Container";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { WhatsApp } from "@mui/icons-material";

export default function Contact() {
  return (
    <PrimarySection py="75px" id="contact">
      <Container>
        <h2 className="text-center mb-5">Contact Us</h2>
        <div className="row">
          <div className={`col-lg-5 ${styles.CardsContainer}`}>
            <div className={styles.ContactCard}>
              <a href="tel:97165355055">
                <div className={styles.IconContainer}>
                  <CallRoundedIcon className={styles.Icon} />
                </div>
                <p className={styles.Text}>+971 6 535 5055</p>
              </a>
            </div>
            <div className={styles.ContactCard}>
              <a href="mailto:info@citytours.ae">
                <div className={styles.IconContainer}>
                  <EmailRoundedIcon className={styles.Icon} />
                </div>
                <p className={styles.Text}>info@citytours.ae</p>
              </a>
            </div>
            <div className={styles.ContactCard}>
              <a href="https://api.whatsapp.com/send?phone=97165355055&text=Hi.%20I%20need%20a%20dummy%20ticket.">
                <div className={styles.IconContainer}>
                  <WhatsApp className={styles.Icon} />
                </div>
                <p className={styles.Text}>Chat with us</p>
              </a>
            </div>
          </div>
          <div className="col-lg-7">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.2800426536546!2d55.43706777468754!3d25.294793627742163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5ee5fff76919%3A0x3bbe0c327f6b61b9!2sCity%20Tours%20LLC!5e0!3m2!1sen!2sae!4v1713194591927!5m2!1sen!2sae"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              className={styles.Map}
            ></iframe>
          </div>
        </div>
      </Container>
    </PrimarySection>
  );
}