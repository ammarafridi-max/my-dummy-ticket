import PrimarySection from '../PrimarySection';
import Container from '../Container';
import SectionTitle from '../SectionTitle';

const steps = [
  {
    title: 'Route and dates',
    text: 'Enter your departure and arrival cities, select your travel dates, and begin filling out your booking information',
  },
  {
    title: 'Select Flight',
    text: 'View the list of available flights based on your selected route and dates, then choose the option that suits you best',
  },
  {
    title: 'Payment',
    text: 'Double-check all the entered details, select your preferred payment method, and securely complete your booking',
  },
];

export default function Process({
  title = 'Simple, Hassle-Free Process',
  subtitle = 'How it Works',
}) {
  return (
    <PrimarySection className="pt-15" id="process">
      <Container>
        <SectionTitle textAlign="center" subtitle={subtitle} mb="7">
          {title}
        </SectionTitle>

        <div className="flex gap-3.75 md:grid md:grid-cols-3 md:m-0 md:p-0 overflow-scroll">
          {steps.map((step, i) => (
            <div
              className="min-w-80 max-w-full bg-gray-100 py-8 px-6 rounded-lg hover:shadow-xl hover:bg-primary-100 duration-300 hover:scale-102"
              key={i}
            >
              <div className="w-8 h-8 flex items-center justify-center bg-primary-500 text-white text-md font-medium font-outfit rounded-full">
                {i + 1}
              </div>
              <h3 className="capitalize text-[19px] md:text-[20px] font-[500] font-outfit text-left mt-3 mb-2 p-0">
                {step.title}
              </h3>
              <p className="text-[16.5px] font-[300] text-left">{step.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </PrimarySection>
  );
}
