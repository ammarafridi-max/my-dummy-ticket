import {
  FaStripe,
  FaGooglePay,
  FaApplePay,
  FaCcVisa,
  FaCcMastercard,
  FaCircle,
} from 'react-icons/fa';
import Container from './Container';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 font-nunito">
      <Container className="py-10 md:py-12">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 pb-6 border-b border-gray-700">
          {icons.map((icon, i) => (
            <div
              key={i}
              className="text-gray-300 text-[34px] md:text-[40px] hover:text-white transition-colors duration-200"
            >
              {icon}
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3 text-center">
          <div className="text-[14px] text-gray-400">
            © 2025 <span className="text-white font-medium">TRAVL Technologies</span>. All Rights
            Reserved.
          </div>

          <div className="flex items-center justify-center flex-wrap gap-2 text-[14px] text-gray-400">
            <FooterLink href="/blog">Blog</FooterLink>
            <FaCircle className="text-[5px]" />
            <FooterLink href="/terms-and-conditions">Terms & Conditions</FooterLink>
            <FaCircle className="text-[5px]" />
            <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
            <FaCircle className="text-[5px]" />
            <FooterLink href="/sitemap">Sitemap</FooterLink>
          </div>
        </div>
        <p className="text-center text-sm mt-3 text-gray-400">
          Disclaimer: We only provide genuine flight reservations and do not issue fake or
          counterfeit tickets.
        </p>
      </Container>
    </footer>
  );
}

function FooterLink({ href, children }) {
  return (
    <a href={href} className="hover:text-white transition-colors duration-200">
      {children}
    </a>
  );
}

const icons = [
  <FaStripe key="stripe" />,
  <FaGooglePay key="gpay" />,
  <FaApplePay key="applepay" />,
  <FaCcVisa key="visa" />,
  <FaCcMastercard key="mastercard" />,
];
