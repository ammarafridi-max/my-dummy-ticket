import styles from "./Contact.module.css";
import PrimarySection from "../../../Components/Section/PrimarySection";
import Container from "../../../Components/Container/Container";
import { SectionTitle } from "../../../Components/SectionTitle/SectionTitle";
import img from "../../../Assets/Images/contact-img.png";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";
import PrimaryButtonOutline from "../../../Components/Buttons/PrimaryButtonOutline";

export default function Contact() {
  return (
    <PrimarySection id="contact" pt="0">
      <Container className={`${styles.container} row align-items-center`}>
        <div className="col-12 col-lg-7">
          <SectionTitle subtitle="Still got questions?" mb="25px">
            Contact us
          </SectionTitle>
          <p className="large">
            Still have questions or doubts about our service? Feel free to reach
            out to us on any of the following platforms. We'd be happy to help
            you out.
          </p>
          <div className="mt-4">
            <PrimaryButton
              mr="10px"
              href="/https://api.whatsapp.com/send?phone=971569964924&text=Hi.%20I%20need%20a%20dummy%20ticket."
            >
              Chat With Us
            </PrimaryButton>
            <PrimaryButtonOutline href="mailto:info@citytours.ae">
              Email Us
            </PrimaryButtonOutline>
          </div>
        </div>
        <div className="col-12 col-lg-5">
          <img src={img} className={styles.img} />
        </div>
      </Container>
    </PrimarySection>
  );
}
