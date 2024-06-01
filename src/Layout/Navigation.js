import styles from "./Navigation.module.css";
import logo from "./logo.png"; // replace with the actual path to your logo
import PrimaryButton from "../Components/Buttons/PrimaryButton"; // replace with the actual import for your PrimaryButton

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
          <a href="/#process" className={styles.NavLink}>
            How It Works
          </a>
          <a href="/#about" className={styles.NavLink}>
            About Us
          </a>
          <a href="/#faqs" className={styles.NavLink}>
            FAQs
          </a>
        </div>
        <div className={styles.CTADiv}>
          <a
            href="https://api.whatsapp.com/send?phone=971506045355&text=Hi.%20I%20need%20a%20dummy%20ticket."
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
