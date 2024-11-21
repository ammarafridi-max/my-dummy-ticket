import styles from "./Contact.module.css";
import PrimarySection from "../../../components/Section/PrimarySection";
import Container from "../../../components/Container/Container";
import { SectionTitle } from "../../../components/SectionTitle/SectionTitle";
import img from "../../../assets/Images/contact-img.png";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import PrimaryButtonOutline from "../../../components/Buttons/PrimaryButtonOutline";

export default function Contact() {
  return (
    <PrimarySection id="contact" pt="0" pb="10px">
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
          <ContactButtons />
        </div>
        <div className="col-12 col-lg-5">
          <img src={img} className={styles.img} />
        </div>
      </Container>
    </PrimarySection>
  );
}

function ContactButtons() {
  return (
    <div className="mt-4">
      <PrimaryButton href="mailto:info@citytours.ae">Email Us</PrimaryButton>
    </div>
  );
}
