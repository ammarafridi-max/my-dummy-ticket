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
        <div className="block md:grid md:grid-cols-3 gap-10">
          <IconCard
            icon={<HiCheck />}
            title="Reliable"
            text={`We use official airline reservation systems to create genuine and verifiable ${keyword}s, ensuring they are accepted by consulates and embassies worldwide.`}
          />
          <IconCard
            icon={<HiOutlineClock />}
            title="Quick"
            text={`Our streamlined process lets you receive a verifiable ${keyword} instantly. Simply complete a short form, and your ticket will be delivered via email within minutes.`}
          />
          <IconCard
            icon={<HiOutlineCurrencyDollar />}
            title="Great Value"
            text={`Starting at only AED 49, we provide high-quality ${keyword}s at the best rates, making them accessible and affordable for everyone.`}
          />
        </div>
      </Container>
    </PrimarySection>
  );
}

function IconCard({ icon, title, text }) {
  return (
    <div className="w-full mb-12 text-center md:mb-0">
      <div className="w-fit text-3xl text-primary-500 flex items-center justify-center bg-primary-50 p-3.75 mx-auto rounded-full overflow-hidden">
        {icon}
      </div>
      <h3 className="text-lg my-4.5 p-0 font-bold font-merriweather md:text-[18px]">
        {title}
      </h3>
      <p className="text-center text-[17px] font-light leading-6">{text}</p>
    </div>
  );
}
