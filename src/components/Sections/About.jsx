import { MdOutlineAirplaneTicket, MdOutlineHealthAndSafety, MdOutlineHotel } from 'react-icons/md';
import PrimarySection from '../PrimarySection';
import Container from '../Container';
import SectionTitle from '../SectionTitle';

export default function About({
  title = 'About Us',
  text = 'We are a licensed travel agency based in Dubai, UAE. We offer air tickets, hotel bookings, travel insurance, flight and hotel reservations, airport transfers, tours, and holiday packages to thousands of satisfied customers annually. Our documentation is accepted by VFS, BLS, and embassies.',
  keyword = 'dummy ticket',
}) {
  return (
    <PrimarySection className="py-14 md:py-10 lg:py-10" id="about">
      <Container className="flex flex-col lg:grid lg:grid-cols-[7fr_5fr] lg:items-center gap-8 lg:gap-12">
        <div className="w-full">
          <SectionTitle className="mb-7">{title}</SectionTitle>
          <p className="text-[16px] text-gray-700 font-light leading-7">{text}</p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <Stat text="10k+" label="Annual customers" />
            <Stat text="Minutes" label="Average delivery" />
          </div>

          <IconWithText
            icon={<MdOutlineAirplaneTicket />}
            title="Dummy Tickets"
            description="Our flight reservations come with a PNR that can be used to verify their validity. We use a format that visa officers accept, making it suitable for VFS and BLS submissions without buying an actual ticket."
          />
          <IconWithText
            icon={<MdOutlineHotel />}
            title="Dummy Hotel Bookings"
            description="We also provide hotel reservations on request. Our hotel reservations are legitimate reservations using a format that are accepted by embassies."
          />
          <IconWithText
            icon={<MdOutlineHealthAndSafety />}
            title="Travel Insurance"
            description="We provide comprehensive travel insurance policies covering medical emergencies, trip cancellations, and travel delays. These are genuine documents and not reservations, unlike hotel and flights."
          />
        </div>
        <Gallery keyword={keyword} />
      </Container>
    </PrimarySection>
  );
}

function Gallery({ keyword }) {
  return (
    <div className="w-full min-h-[380px] lg:min-h-[540px] grid grid-cols-2 gap-4 lg:p-0">
      <div className="flex flex-col gap-3.75">
        <div className="relative bg-gray-100 rounded-2xl h-[100%] overflow-hidden">
          <img
            src="/happy-traveler1.webp"
            className="w-full h-full object-cover object-center"
            alt="Happy couple with their approved visas"
          />
          <div className="absolute inset-x-3 bottom-3 rounded-xl bg-white/85 px-3 py-2 text-[12px] font-medium text-gray-700 backdrop-blur-sm">
            Verified {keyword} documentation
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3.75">
        <div className="bg-gray-100 rounded-2xl h-[25%] overflow-hidden p-5.5">
          <img
            src="/travel-icon.webp"
            className="w-full h-full object-contain object-center"
            alt="Travel icon"
          />
        </div>
        <div className="bg-gray-100 rounded-2xl h-[75%] overflow-hidden">
          <img
            src="/happy-traveler2.webp"
            className="w-full h-full object-cover object-center"
            alt="A happy couple with their flight reservations"
          />
        </div>
      </div>
    </div>
  );
}

const IconWithText = ({ icon, title, description }) => (
  <div className="grid grid-cols-[auto_1fr] gap-4 items-center mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
    <div className="w-[40px] h-[40px] text-xl rounded-xl bg-primary-500 text-white flex items-center justify-center">
      {icon}
    </div>
    <p className="text-[15px] text-gray-600 font-light leading-6.5">
      <span className="font-medium text-gray-900">{title}: </span>
      {description}
    </p>
  </div>
);

function Stat({ text, label }) {
  return (
    <div className="rounded-2xl border border-primary-100 bg-primary-50/50 px-4 py-3">
      <p className="text-[20px] font-semibold text-primary-700 leading-none">{text}</p>
      <p className="mt-1 text-[13px] text-gray-600">{label}</p>
    </div>
  );
}
