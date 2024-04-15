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
          <img src={logo} className={styles.Logo} />
        </div>
        <div className={styles.NavLinks}>
          <a href="#form" className={styles.NavLink}>
            Inquiry
          </a>
          <a href="/" className={styles.NavLink}>
            Process
          </a>
          <a href="/" className={styles.NavLink}>
            About
          </a>
          <a href="/" className={styles.NavLink}>
            Contact
          </a>
        </div>
        <div className={styles.CTADiv}>
          <a
            href="https://api.whatsapp.com/send?phone=97165355055&text=Hi.%20I%20need%20a%20dummy%20ticket."
            target="_blank"
          >
            <PrimaryButton>Contact Us</PrimaryButton>
          </a>
        </div>
      </nav>
    </header>
  );
}