import PrimaryButton from "../Components/Buttons/PrimaryButton";
import styles from "./Navigation.module.css";
import logo from "./logo2.png";

export default function Navigation() {
  return (
    <header className={styles.Header}>
      <nav
        className={`col-11 col-lg-10 mx-auto row justify-content-between align-items-center ${styles.Nav}`}
      >
        <div className={styles.LogoDiv}>
          <a href="/">
            <img
              src={logo}
              className={styles.Logo}
              alt="MyDummyTicket.ae logo"
            />
          </a>
        </div>
        <div className={styles.NavLinks}>
          <a href="/#form" className={styles.NavLink}>
            Book
          </a>
          <a href="#process" className={styles.NavLink}>
            How It Works
          </a>
          <a href="#contact" className={styles.NavLink}>
            Contact
          </a>
          {/* <a href="/" className={styles.NavLink}>
            FAQ
          </a> */}
        </div>
        <div className={styles.CTADiv}>
          <a
            href="https://api.whatsapp.com/send?phone=971569964924&text=Hi.%20I%20need%20a%20dummy%20ticket."
            target="_blank"
            rel="noreferrer"
          >
            <PrimaryButton>Contact Us</PrimaryButton>
          </a>
        </div>
      </nav>
    </header>
  );
}
