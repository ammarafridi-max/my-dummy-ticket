import styles from "./Navigation.module.css";
import logo from "./logo.png"; // replace with the actual path to your logo
import PrimaryButton from "../Components/Buttons/PrimaryButton"; // replace with the actual import for your PrimaryButton

export const pages = [
  {
    name: "Book",
    link: "/#form",
  },
  {
    name: "Process",
    link: "/#process",
  },
  {
    name: "About",
    link: "/#about",
  },
  {
    name: "FAQ",
    link: "/faq",
  },
  {
    name: "Contact",
    link: "https://api.whatsapp.com/send?phone=971506045355&text=Hi.%20I%20need%20a%20dummy%20ticket.",
  },
];

export default function Navigation() {
  return (
    <header className={styles.Header}>
      <nav
        className={`col-11 col-lg-10 mx-auto row justify-content-between align-items-center ${styles.Nav}`}
      >
        <Logo />
        <NavLinks />
      </nav>
    </header>
  );
}

function Logo() {
  return (
    <div className={styles.LogoDiv}>
      <a href="/">
        <img src={logo} className={styles.Logo} alt="MyDummyTicket.ae logo" />
      </a>
    </div>
  );
}

function NavLinks() {
  return (
    <div className={styles.NavLinks}>
      {pages.map((page, i) => (
        <a
          key={i}
          href={page.link}
          className={`${page.name === "Contact" ? styles.CTA : styles.NavLink}`}
        >
          {page.name}
        </a>
      ))}
    </div>
  );
}
