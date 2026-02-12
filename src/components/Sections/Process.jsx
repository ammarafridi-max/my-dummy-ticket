import PrimarySection from '../PrimarySection';
import Container from '../Container';
import SectionTitle from '../SectionTitle';

const stepsTemplate = [
  {
    title: 'Enters Routes and dates',
    text: 'Enter your departure and arrival cities, select your travel dates, and begin filling out your booking information within a simple, guided form',
  },
  {
    title: 'Select Your Flight',
    text: 'View the list of available flights based on your selected route and dates, then choose the option that suits you best with real airline itineraries',
  },
  {
    title: 'Payment',
    text: 'Double-check all the entered details, select your preferred payment method, and securely complete your booking with instant confirmation delivery',
  },
];

export default function Process({
  title = 'Simple, Hassle-Free Process',
  subtitle = 'How it Works',
  keyword = 'dummy ticket',
  steps = stepsTemplate,
}) {
  return (
    <PrimarySection className="py-10 md:py-12 lg:py-15" id="process">
      <Container>
        <SectionTitle textAlign="center" subtitle={subtitle} mb="7">
          {title}
        </SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:m-0 md:p-0">
          {steps.map((step, i) => (
            <div className="min-w-80 max-w-full rounded-xl duration-300" key={i}>
              <div className="w-9 h-9 flex items-center justify-center bg-white text-primary-500 border-[1.5px] border-primary-500 text-md font-medium font-outfit rounded-full">
                {i + 1}
              </div>
              <h3 className="text-[18px] lg:text-[20px] font-light text-gray-900/90 capitalize font-outfit text-left my-3 p-0">
                {step.title}
              </h3>
              <p className="text-[16px] text-gray-900/55 font-light leading-6.5">
                {step.text.replaceAll('{keyword}', keyword)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </PrimarySection>
  );
}
