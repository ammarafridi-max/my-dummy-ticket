import PrimarySection from '../PrimarySection';
import Container from '../Container';

const airlines = [
  {
    name: 'We provide Emirates dummy tickets',
    src: '/EK.png',
  },
  {
    name: 'We provide Etihad dummy tickets',
    src: '/EY.png',
  },
  {
    name: 'We provide Air France dummy tickets',
    src: '/AF.png',
  },
  {
    name: 'We provide KLM Airline dummy tickets',
    src: '/KL.jpg',
  },
  {
    name: 'We provide Swiss Air dummy tickets',
    src: '/LX.png',
  },
  {
    name: 'We provide Qatar Airways dummy tickets',
    src: '/QR.png',
  },
  {
    name: 'We provide Singapore Airways dummy tickets',
    src: '/SQ.png',
  },
  {
    name: 'We provide Turkish Airlines dummy tickets',
    src: '/TK.png',
  },
  // {
  //   name: 'Oman Air',
  //   src: '/WY.png',
  // },
];

export default function Airlines() {
  return (
    <PrimarySection className="bg-gray-100 py-10 my-15">
      <Container className="grid grid-cols-4 md:grid-cols-8 gap-3.75 md:gap-12.5 items-center justify-center">
        {airlines.map((airline, i) => (
          <img
            key={i}
            className="w-full object-contain p-1.25 grayscale-100 opacity-70"
            src={airline.src}
            alt={airline.name}
          />
        ))}
      </Container>
    </PrimarySection>
  );
}
