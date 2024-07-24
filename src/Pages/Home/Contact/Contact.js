import styles from "./Contact.module.css";
import PrimarySection from "../../Components/Section/PrimarySection";
import Container from "../../Components/Container/Container";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { WhatsApp } from "@mui/icons-material";

export default function Contact() {
  return (
    <PrimarySection py="75px" id="contact">
      <Container>
        <h2 className="section-heading">Contact Us</h2>
        <div className="row">
          <div className={`col-12 col-lg-4 ${styles.CardsContainer}`}>
            <div className={styles.ContactCard}>
              <a href="tel:+971506045355">
                <div className={styles.IconContainer}>
                  <CallRoundedIcon className={styles.Icon} />
                </div>
                <p className={styles.Text}>+971 50 604 5355</p>
              </a>
            </div>
            <div className={styles.ContactCard}>
              <a href="mailto:info@mydummyticket.ae">
                <div className={styles.IconContainer}>
                  <EmailRoundedIcon className={styles.Icon} />
                </div>
                <p className={styles.Text}>info@mydummyticket.ae</p>
              </a>
            </div>
            <div className={styles.ContactCard}>
              <a href="https://api.whatsapp.com/send?phone=971506045355&text=Hi.%20I%20need%20a%20dummy%20ticket.">
                <div className={styles.IconContainer}>
                  <WhatsApp className={styles.Icon} />
                </div>
                <p className={styles.Text}>Chat with us</p>
              </a>
            </div>
          </div>
          <div className="col-12 col-lg-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.5169888101905!2d55.35569517468733!3d25.286828828065786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5c89fbf4c7bf%3A0xeb51121eac30f9a!2sAbraj%20Al%20Mamzar%20Block%20A!5e0!3m2!1sen!2sae!4v1716027929446!5m2!1sen!2sae"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={styles.Map}
              title="MyDummyTicket.ae store location"
            ></iframe>
          </div>
        </div>
      </Container>
    </PrimarySection>
  );
}
