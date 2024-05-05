import Container from "../Components/Container/Container";
import styles from "./MobileNavigation.module.css";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseIcon from "@mui/icons-material/Close";
import logo from "./logo2.png";
import { useState } from "react";

export default function MobileNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  function handleClick() {
    if (menuOpen === true) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  }
  return (
    <div className={styles.Nav}>
      <Container className="row justify-content-between">
        <button className={styles.MenuContainer} onClick={handleClick}>
          {menuOpen ? <CloseIcon /> : <MenuRoundedIcon />}
        </button>
        {/* <div className={styles.MenuContainer}>{icon}</div> */}
        <div className={styles.LogoContainer}>
          <a href="/">
            <img
              src={logo}
              className={styles.Logo}
              alt="My Dummy Ticket Logo"
            />
          </a>
        </div>
        <div className={styles.MenuContainer}></div>
      </Container>
      {menuOpen && (
        <MenuList
          onClick={() => {
            setMenuOpen(false);
          }}
        />
      )}
    </div>
  );
}

function MenuList({ onClick }) {
  return (
    <div className={styles.MenuList}>
      <a href="#form" onClick={onClick}>
        <div className={styles.MenuItem}>Book Now</div>
      </a>
      <a href="#process" onClick={onClick}>
        <div className={styles.MenuItem}>How It Works</div>
      </a>
      <a href="#contact" onClick={onClick}>
        <div className={styles.MenuItem}>Contact Us</div>
      </a>
    </div>
  );
}
