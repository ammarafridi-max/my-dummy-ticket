import PrimarySection from '../PrimarySection';
import Container from '../Container';
import PageTitle from '../PageTitle';
import TicketForm from './TicketForm';

export default function Hero({
  title = 'Flight Reservations From AED49. Verifiable and Legit.',
  subtitle = 'Book verifiable flight reservations for visa applications. All legitimate reservations come with a PNR code that can be verified directly on airline websites.',
}) {
  return (
    <PrimarySection className="py-1" id="form">
      <Container className="block lg:flex py-2.5 lg:py-7.5 items-center justify-between gap">
        <div className="w-full lg:w-[55%]">
          <PageTitle>{title}</PageTitle>
          <p className="text-[17px] lg:text-[20px] font-regular lg:font-light mt-4 mb-7">
            {subtitle}
          </p>
        </div>
        <div className="w-full lg:w-[45%] bg-white rounded-2xl ">
          <TicketForm />
        </div>
      </Container>
    </PrimarySection>
  );
}
