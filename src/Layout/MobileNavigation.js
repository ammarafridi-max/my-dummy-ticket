import { useState } from "react";
import { pages } from "./Navigation";
import styles from "./MobileNavigation.module.css";
import logo from "./logo.png";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseIcon from "@mui/icons-material/Close";
import Container from "../Components/Container/Container";

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
        <div className={styles.LogoContainer}>
          <a href="/">
            <img
              src={logo}
              className={styles.Logo}
              alt="My Dummy Ticket Logo"
            />
          </a>
        </div>
        <button className={styles.MenuContainer} onClick={handleClick}>
          {menuOpen ? <CloseIcon /> : <MenuRoundedIcon />}
        </button>
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
      {pages.map((page, i) => (
        <a key={i} href={page.link} onClick={onClick}>
          <div className={styles.MenuItem}>{page.name}</div>
        </a>
      ))}
    </div>
  );
}
