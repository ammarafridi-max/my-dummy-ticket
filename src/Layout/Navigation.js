import styles from "./Navigation.module.css";
import logo from "../assets/Images/logo.png"; // replace with the actual path to your logo

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
    link: "#faq",
  },
  {
    name: "Contact Us",
    link: "mailto:info@mydummyticket.ae",
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
        <img
          src={logo}
          className={styles.Logo}
          alt="My Dummy Ticket Logo"
          title="My Dummy Ticket Logo"
        />
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
          className={`${
            page.name === "Contact Us" ? styles.CTA : styles.NavLink
          }`}
          title={page.name}
        >
          {page.name}
        </a>
      ))}
    </div>
  );
}
