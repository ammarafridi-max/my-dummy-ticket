import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import PrimaryButtonOutline from "../../Components/Buttons/PrimaryButtonOutline";
import Container from "../../Components/Container/Container";
import PrimarySection from "../../Components/Section/PrimarySection";
import styles from "./PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <PrimarySection py="150px">
      <Container>
        <div className="text-center">
          <h1 className={styles.title}>404 Error!</h1>
          <h2 className={styles.subTitle}>
            The page you're looking for doesn't exist.
          </h2>
          <PrimaryButton mr="8px" href="/">
            Go to Home
          </PrimaryButton>
          <PrimaryButtonOutline
            mt="20px"
            href="https://api.whatsapp.com/send?phone=971569964924&text=Hi.%20I%20need%20a%20dummy%20ticket."
          >
            Contact Us
          </PrimaryButtonOutline>
        </div>
      </Container>
    </PrimarySection>
  );
}
