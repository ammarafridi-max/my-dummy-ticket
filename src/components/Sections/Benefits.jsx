import Container from '../Container';
import PrimarySection from '../PrimarySection';
import SectionTitle from '../SectionTitle';

export default function Benefits({
  title = 'Why Choose My Dummy Ticket?',
  subtitle = 'Trusted supplier based in Dubai',
  benefits,
}) {
  return (
    <PrimarySection className="py-10 md:py-12 lg:py-15" id="benefits">
      <Container>
        <SectionTitle textAlign="center" subtitle={subtitle} mb="7">
          {title}
        </SectionTitle>
        <div className="flex flex-col gap-8 md:grid md:grid-cols-3 md:gap-10">
          {benefits.map((item, i) => (
            <div className="w-full md:mb-0 font-outfit" key={i}>
              <div className="w-9 h-9 flex items-center justify-center bg-white text-primary-500 border-[1.5px] border-primary-500 text-lg font-medium font-outfit rounded-full">
                <item.icon />
              </div>
              <h3 className="text-[18px] lg:text-[20px] font-light text-gray-900/90 capitalize font-outfit text-left my-3 p-0">
                {item?.title}
              </h3>
              <p className="text-[16px] text-gray-900/55 font-light leading-6.5">{item?.text}</p>
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
