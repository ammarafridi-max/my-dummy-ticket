import { Outlet, useLocation } from "react-router-dom";
import Container from "../../components/Container/Container";
import PrimarySection from "../../components/Section/PrimarySection";
import styles from "./BookingLayout.module.css";

export default function BookingLayout() {
  return (
    <>
      <PrimarySection py="50px" backgroundColor="white">
        <Container>
          <Menu />
          <Outlet />
        </Container>
      </PrimarySection>
    </>
  );
}

function Menu() {
  const { pathname } = useLocation();

  return (
    <div className={styles.menu}>
      <div
        className={`${styles.menuItem} ${
          pathname === "/booking/select-flights" && styles.active
        }`}
      >
        <p className={styles.stepNum}>1</p>
        <p>Select Flights</p>
      </div>

      <div
        className={`${styles.menuItem} ${
          pathname === "/booking/review-details" && styles.active
        }`}
      >
        <p className={styles.stepNum}>2</p>
        <p>Review Details</p>
      </div>
      <div className={styles.menuItem}>
        <p className={styles.stepNum}>3</p>
        <p>Payment</p>
      </div>
    </div>
  );
}
