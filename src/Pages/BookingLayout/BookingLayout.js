import { Outlet } from "react-router-dom";
import Container from "../../Components/Container/Container";
import PrimarySection from "../../Components/Section/PrimarySection";
import styles from "./BookingLayout.module.css";

export default function BookingLayout() {
  return (
    <>
      <PrimarySection py="50px">
        <Container>
          <BookingContainer>
            <Outlet />
          </BookingContainer>
        </Container>
      </PrimarySection>
    </>
  );
}

function Menu() {
  return (
    <div className={styles.menu}>
      <div className={`${styles.menuItem} ${styles.active}`}>
        <p className={styles.stepNum}>1</p>
        <p>Select Flights</p>
      </div>

      <div className={styles.menuItem}>
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

function BookingContainer({ children }) {
  return <div className={styles.bookingContainer}>{children}</div>;
}
