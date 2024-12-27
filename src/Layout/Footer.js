import styles from './Footer.module.css';
import { WhatsApp } from '@mui/icons-material';
import Container from '../components/Container/Container';
import PrimarySection from '../components/Section/PrimarySection';
import { FaStripe, FaGooglePay, FaApplePay, FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import Paragraph from '../components/Typography/Paragraph';

export default function Footer() {
  return (
    <footer>
      <PrimarySection py="50px">
        <Container className={styles.footerContainer}>
          <PartnerImages />
          <CopyrightText />
        </Container>
      </PrimarySection>
    </footer>
  );
}

function PartnerImages() {
  return (
    <div className={styles.partnerImgs}>
      <FaStripe className={styles.partnerIcon} />
      <FaGooglePay className={styles.partnerIcon} />
      <FaApplePay className={styles.partnerIcon} />
      <FaCcVisa className={styles.partnerIcon} />
      <FaCcMastercard className={styles.partnerIcon} />
    </div>
  );
}

function CopyrightText() {
  return (
    <>
      <Paragraph color="white" textAlign="center">
        © 2024 TRAVL Technologies. All Rights Reserved.
      </Paragraph>
      <Paragraph className={styles.legalLinks} color="white" textAlign="center">
        <a href="/terms-and-conditions" className="color-white">
          Terms & Conditions
        </a>
        {'     '}|{'     '}
        <a href="/privacy-policy" className="color-white">
          Privacy Policy
        </a>
      </Paragraph>
    </>
  );
}

function Chat() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=971569964924&text=Hi.%20I%20need%20a%20dummy%20ticket."
      target="_blank"
      rel="noreferrer"
    >
      <div className={styles.WhatsAppIcon}>
        <WhatsApp fontSize="medium" />
      </div>
    </a>
  );
}

function Amadeus() {
  return <></>;
}

function Sabre() {
  return (
    <svg viewBox="0 0 74 18" className={styles.gdsIcon} role="img" title="Sabre">
      <title id="partner-sabre">Sabre</title>
      <path d="M73.292 13.738c-.909 2.518-3.4 4.174-7.475 4.174-3.4 0-6.675-1.96-5.866-6.379a7.97 7.97 0 0 1 8.184-6.222c4.487 0 6.445 3.018 5.716 6.536l-.17.8h-8.434a3.4 3.4 0 0 0-.14.892c0 1.058.57 1.431 1.3 1.431a1.87 1.87 0 0 0 1.749-1.235h5.136m-4.3-3.6.06-.274a1.21 1.21 0 0 0-.752-1.544 1.3 1.3 0 0 0-.5-.066c-.909 0-1.679.637-1.949 1.891h3.148m-9.828-4.625a3.8 3.8 0 0 0-3 1.666H56l.18-1.519H50.8l-.33 1.548 3-.3-.07.288-3 .48-2.178 9.877h5.846s.6-2.832 1-4.5c.59-2.655 2.079-3.253 3.058-3.253a2.42 2.42 0 0 1 1.489.47l1-4.419a2.8 2.8 0 0 0-1.369-.333M5.989 10.6c-2.358-.733-4.127-2.085-4.127-4.662C1.862 2.175 5.7.059 10.855 0c4.345 0 7.225 1.764 6.716 5.3h-6.216c.22-.98-.35-1.519-1.409-1.519a1.5 1.5 0 0 0-1.559.9c-.14.705.31 1.146 1.419 1.44l2.5.676c2.618.735 3.867 2.263 4.187 3.87l-7.775.784-2.728-.862m.22 4.086.52-2.41H.043c-.46 4.1 2.818 5.732 7 5.732 4 0 8.3-1.323 9.253-4.9L6.209 14.688m34.436-8.152a5.27 5.27 0 0 1 3.368-1.225 3.92 3.92 0 0 1 3.8 2.175l-13.6 1.382L36.018.451h5.846l-1.319 6.075h.08M40.3 9.26a5.8 5.8 0 0 0-.929 2.312c-.52 2.352 0 2.94.759 2.94.949 0 1.749-.882 2.138-2.94.25-1.3.21-2.254-.15-2.636l5.886-.911a6.9 6.9 0 0 1 .06 3.42c-.859 4.223-3.5 6.447-6.445 6.447-1.329 0-2.788-.343-3.4-1.734h-.12l-.47 1.372H32.33l1.57-7.271 6.425-.98m-14.64 4.086a1.79 1.79 0 0 1-1.659 1.607 1.06 1.06 0 0 1-1.058-1.059 1 1 0 0 1 .059-.332 1.83 1.83 0 0 1 2-1.215h1l-.21.98m-1.481-4.077a1.57 1.57 0 0 1 1.459-1.323.987.987 0 0 1 .945 1.03 1 1 0 0 1-.036.214l-.09.451 5.476-.559c-.41-2.744-3-3.919-6.066-3.919-4.527 0-6.685 2.2-7.115 4.155l-.06.274h5.416zm-6.865 3.655a4.5 4.5 0 0 0-.24 1.529 3.524 3.524 0 0 0 3.579 3.467q.109 0 .218-.008a5.37 5.37 0 0 0 4-1.489h.08l-.08 1.137h5.486l1.349-6.193a8 8 0 0 0 .13-.764l-14.52 2.322"></path>
    </svg>
  );
}

function GdsPartners() {
  return (
    <div className={styles.gdsPartners}>
      <div className="mx-2">
        <Amadeus />
      </div>
      <div className="mx-2">
        <Sabre />
      </div>
    </div>
  );
}
