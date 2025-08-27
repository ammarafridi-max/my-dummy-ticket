import {
  FaStripe,
  FaGooglePay,
  FaApplePay,
  FaCcVisa,
  FaCcMastercard,
} from 'react-icons/fa';
import Container from './Container';

export default function Footer() {
  return (
    <footer className="py-5 bg-primary-700">
      <Container className="py-7.5 bg-transparent box-border font-nunito">
        <div className="w-full gap-3 md:gap-5 mx-auto mb-3.5 pb-3.5 flex items-center justify-center border-b-1 border-solid border-gray-200 ">
          {icons.map((icon, i) => (
            <div key={i} className="text-white text-[35px] md:text-[40px]">
              {icon}
            </div>
          ))}
        </div>
        <div>
          <div className="text-center text-white font-light text-[14px] md:text-[16px]">
            © 2025 TRAVL Technologies. All Rights Reserved.
          </div>
          <div className="flex items-center justify-center gap-2.5 text-[14px] font-bold text-white">
            <a href="/terms-and-conditions" className="color-white">
              Terms & Conditions
            </a>
            <span>|</span>
            <a href="/privacy-policy" className="color-white">
              Privacy Policy
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

const icons = [
  <FaStripe />,
  <FaGooglePay />,
  <FaApplePay />,
  <FaCcVisa />,
  <FaCcMastercard />,
];
