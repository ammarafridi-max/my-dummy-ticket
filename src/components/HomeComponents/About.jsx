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
    <PrimarySection className="pb-15 lg:pb-20" id="about">
      <Container className="flex flex-col lg:grid lg:grid-cols-[7fr_5fr] lg:items-center gap-5">
        <div className="w-full">
          <SectionTitle className="mb-6 lg:mb-6">{title}</SectionTitle>
          <p className="text-[16px] text-gray-900/70 font-light leading-6.5">{text}</p>
          <IconWithText
            icon={<MdOutlineAirplaneTicket />}
            title="Flight Reservations"
            description="Our flight reservations come with a PNR that can be used to verify their validity. We use a format that visa officers accept, making it suitable for VFS and BLS submissions without buying an actual ticket."
          />
          <IconWithText
            icon={<MdOutlineHotel />}
            title="Hotel Reservations"
            description="We also provide hotel reservations on request. Our hotel reservations are legitimate reservations using a format that are accepted by embassies."
          />
          <IconWithText
            icon={<MdOutlineHealthAndSafety />}
            title="Travel Insurance"
            description="We provide comprehensive travel insurance policies covering medical emergencies, trip cancellations, and travel delays. These are genuine documents and not reservations, unlike hotel and flights."
          />
        </div>
        <Gallery />
      </Container>
    </PrimarySection>
  );
}

function Gallery() {
  return (
    <div className="w-full min-h-[400px] lg:min-h-[500px] grid grid-cols-2 gap-3.75 lg:p-0">
      <div className="flex flex-col gap-3.75">
        <div className="bg-gray-100 rounded-sm h-[20%] overflow-hidden p-5.5"></div>
        <div className="bg-gray-100 rounded-sm h-[80%] overflow-hidden">
          <img
            src="/happy-traveler1.webp"
            className="w-full h-full object-cover object-center"
            alt="Happy couple with their approved visas"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3.75">
        <div className="bg-gray-100 rounded-sm h-[80%] overflow-hidden">
          <img
            src="/happy-traveler2.webp"
            className="w-full h-full object-cover object-center"
            alt="A happy couple with their flight reservations"
          />
        </div>
        <div className="bg-gray-100 rounded-sm h-[20%] overflow-hidden p-5.5">
          <img
            src="/travel-icon.webp"
            className="w-full h-full object-contain object-center"
            alt="Travel icon"
          />
        </div>
      </div>
    </div>
  );
}

const IconWithText = ({ icon, title, description }) => (
  <div className="grid grid-cols-[auto_1fr] gap-5 items-center mt-6">
    <div className="w-[40px] h-[40px] text-xl rounded-full bg-primary-500 text-white flex items-center justify-center">
      {icon}
    </div>
    <p className="text-[16px] text-gray-900/70 font-light leading-6.5">
      <span className="font-medium">{title}: </span>
      {description}
    </p>
  </div>
);
