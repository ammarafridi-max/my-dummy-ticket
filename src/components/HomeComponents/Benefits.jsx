import {
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiCheck,
} from 'react-icons/hi2';
import Container from '../Container';
import PrimarySection from '../PrimarySection';

export default function Benefits({ keyword = 'dummy ticket' }) {
  return (
    <PrimarySection className="pt-20" id="benefits">
      <Container>
        <div className="flex flex-col gap-8 md:grid md:grid-cols-3 md:gap-10">
          <IconCard
            icon={<HiCheck />}
            title="Reliable"
            text={`We issue ${keyword}s through official airline systems, ensuring they are 100% genuine, verifiable, and widely accepted by embassies and consulates.`}
          />
          <IconCard
            icon={<HiOutlineClock />}
            title="Fast Delivery"
            text={`With our fast and automated system, you’ll receive your verifiable ${keyword} by email within minutes—no long waits, no complications.`}
          />
          <IconCard
            icon={<HiOutlineCurrencyDollar />}
            title="Great Value"
            text={`Starting from just USD 13, our ${keyword}s combine affordability with professional quality, helping travelers save money without compromising reliability.`}
          />
        </div>
      </Container>
    </PrimarySection>
  );
}

function IconCard({ icon, title, text }) {
  return (
    <div className="w-full text-left md:text-center md:mb-0">
      <div className="flex items-center justify-center w-fit text-2xl text-primary-500 bg-primary-50 p-3 md:mx-auto rounded-full overflow-hidden">
        {icon}
      </div>
      <h3 className="text-lg mt-3 mb-2 p-0 font-medium font-outfit">{title}</h3>
      <p className="text-[16px] font-light leading-6">{text}</p>
    </div>
  );
}
