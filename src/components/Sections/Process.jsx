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
    <PrimarySection className="py-14 md:py-18 lg:py-24" id="process">
      <Container>
        <SectionTitle textAlign="center" subtitle={subtitle} className="mb-10 md:mb-12">
          {title}
        </SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-7">
          {steps.map((step, i) => (
            <div
              className="relative min-w-0 rounded-2xl border border-gray-100 bg-white p-7 md:p-8 shadow-[0_12px_30px_rgba(16,24,40,0.07)]"
              key={i}
            >
              <div className="absolute inset-x-0 top-10 hidden lg:block">
                {i !== steps.length - 1 && (
                  <div className="mx-auto h-px w-4/5 border-t border-dashed border-primary-200" />
                )}
              </div>
              <div className="relative z-10 w-10 h-10 flex items-center justify-center bg-primary-600 text-white text-md font-medium font-outfit rounded-full shadow-sm">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="text-[20px] font-normal text-gray-900 capitalize font-outfit text-left mt-4 mb-2">
                {step.title}
              </h3>
              <p className="text-[16px] text-gray-600 font-light leading-6.5">
                {step.text.replaceAll('{keyword}', keyword)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </PrimarySection>
  );
}
