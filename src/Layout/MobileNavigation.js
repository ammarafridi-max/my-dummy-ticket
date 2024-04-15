import Container from "../Components/Container/Container";
import styles from "./MobileNavigation.module.css";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import logo from "./logo2.png";

export default function MobileNavigation() {
  return (
    <div className={styles.Nav}>
      <Container className="row justify-content-between">
        <div className={styles.MenuContainer}>
          <MenuRoundedIcon />
        </div>
        <div className={styles.LogoContainer}>
          <a href="/">
            <img src={logo} className={styles.Logo} />
          </a>
        </div>
        <div className={styles.MenuContainer}></div>
      </Container>
    </div>
  );
}
