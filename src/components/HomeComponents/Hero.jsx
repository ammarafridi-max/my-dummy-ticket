import { FaLock, FaStar, FaPlaneDeparture } from 'react-icons/fa';
import { SiTrustpilot } from 'react-icons/si';
import TicketForm from './TicketForm';
import Container from '../Container';
import PrimarySection from '../PrimarySection';
import { motion } from 'framer-motion';

export default function Hero({
  title = 'Dummy Ticket From AED 49. Verifiable and Legit.',
  subtitle = 'Book verifiable dummy tickets for visa applications. All legitimate reservations come with a PNR code that can be verified directly on airline websites.',
}) {
  return (
    <PrimarySection className="bg-gray-50 py-7 md:py-12" id="form">
      <Container className="flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2 text-left"
        >
          <h1 className="text-[28px] md:text-[44px] leading-[1.2] font-semibold font-outfit text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-[16px] md:text-[18px] text-gray-600 font-outfit font-light max-w-xl">
            {subtitle}
          </p>
        </motion.div>

        {/* Right Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-[45%]"
        >
          <TicketForm />
          {/* <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mt-5 text-gray-600 text-[13px] md:text-[14px] font-nunito font-medium mb-5">
            <Badge icon={<FaLock />} text="Secure Payment via Stripe" />
            <Badge icon={<SiTrustpilot className="text-[#00b67a]" />} text="4.8 on Trustpilot" />
            <Badge icon={<FaPlaneDeparture />} text="Embassy-Verified PNRs" />
          </div> */}
        </motion.div>
      </Container>
    </PrimarySection>
  );
}

function Badge({ icon, text }) {
  return (
    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200 hover:border-gray-300 transition">
      <span className="text-primary-600 text-[15px]">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
