import styles from "./Footer.module.css";
import Container from "../Components/Container/Container";
import { WhatsApp, FacebookRounded } from "@mui/icons-material";

export default function Footer() {
  return (
    <div className={styles.Footer}>
      <Container className={`row justify-content-between ${styles.FooterCols}`}>
        <hr />
        <div className="text-center">
          Copyright © 2024 My Dummy Ticket - All Rights Reserved.
        </div>
      </Container>
      <a
        href="https://api.whatsapp.com/send?phone=971569964924&text=Hi.%20I%20need%20a%20dummy%20ticket."
        target="_blank"
      >
        <div className={styles.WhatsAppIcon}>
          <WhatsApp fontSize="medium" />
        </div>
      </a>
    </div>
  );
}
