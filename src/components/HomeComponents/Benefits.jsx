import Container from '../Container';
import PrimarySection from '../PrimarySection';
import SectionTitle from '../SectionTitle';

export default function Benefits({
  title = 'Why Choose My Dummy Ticket?',
  subtitle = 'Trusted supplier based in Dubai',
  benefits,
}) {
  return (
    <PrimarySection className="pt-5 pb-15 lg:pb-20 lg:pt-10" id="benefits">
      <Container>
        <SectionTitle textAlign="center" subtitle={subtitle} mb="7">
          {title}
        </SectionTitle>
        <div className="flex flex-col gap-8 md:grid md:grid-cols-3 md:gap-10">
          {benefits.map((item, i) => (
            <div className="w-full md:mb-0 font-outfit" key={i}>
              <div className="w-10 h-10 flex items-center justify-center bg-white text-primary-500 border border-primary-500 text-md font-medium font-outfit rounded-full">
                <item.icon />
              </div>
              <h3 className="text-[19px] lg:text-[20px] font-[400] capitalize my-4 p-0">
                {item?.title}
              </h3>
              <p className="text-[16px] text-gray-900/70 font-light leading-6.5">{item?.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </PrimarySection>
  );
}

// function IconCard({ icon, title, text }) {
//   return (

//   );
// }
