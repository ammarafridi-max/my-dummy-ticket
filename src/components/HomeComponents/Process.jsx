import PrimarySection from '../PrimarySection';
import Container from '../Container';
import SectionTitle from '../SectionTitle';

const steps = [
  {
    title: 'Route and dates',
    text: 'Enter your route and dates, select your desired flight and enter all the details listed on our form',
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

export default function Process() {
  return (
    <PrimarySection className="pt-10" id="process">
      <Container>
        <SectionTitle textAlign="center" subtitle="How it Works" mb="7">
          Simple, Hassle-Free Process
        </SectionTitle>

        <div className="flex gap-3.75 md:grid md:grid-cols-3 md:m-0 md:p-0 overflow-scroll">
          {steps.map((step, i) => (
            <div
              className="min-w-80 max-w-full bg-gray-100 py-10 px-7.5 rounded-lg hover:shadow-xl hover:bg-gray-200 duration-300 hover:scale-102"
              key={i}
            >
              <div className="w-10 h-10 bg-primary-500 text-white text-lg font-medium flex items-center justify-center rounded-4xl">
                {i + 1}
              </div>
              <h3 className="text-[18px] font-[600] font-merriweather text-left mt-5 mb-2.5 p-0 capitalize">
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
