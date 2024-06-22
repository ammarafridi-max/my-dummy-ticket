import styles from "./Footer.module.css";
import { WhatsApp } from "@mui/icons-material";

export default function Footer() {
  return (
    <div className={styles.Footer}>
      <CopyrightText />
      <Chat />
    </div>
  );
}

function CopyrightText() {
  return (
    <div className="text-center">
      Copyright © 2024 My Dummy Ticket - All Rights Reserved.
    </div>
  );
}

function Chat() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=971506045355&text=Hi.%20I%20need%20a%20dummy%20ticket."
      target="_blank"
      rel="noreferrer"
    >
      <div className={styles.WhatsAppIcon}>
        <WhatsApp fontSize="medium" />
      </div>
    </a>
  );
}
