import Container from '../Container';
import PrimarySection from '../PrimarySection';
import { HiCheckCircle, HiStar } from 'react-icons/hi2';

export default function Hero({ title, subtitle, form, sectionId = 'form' }) {
  return (
    <PrimarySection
      className="relative overflow-hidden bg-[linear-gradient(160deg,#f5fbfb_0%,#eef4ff_52%,#fff9f4_100%)] pt-24 pb-14 md:pt-30 md:pb-16 lg:pt-30 lg:pb-20"
      id={sectionId}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary-200/45 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-accent-100/60 blur-3xl" />
      </div>

      <Container className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-9 lg:gap-14">
        <div className="w-full lg:w-1/2 text-left">
          {/* <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/75 px-3 py-1 text-[12px] font-medium text-primary-700 backdrop-blur-sm">
            <HiStar className="text-accent-500" />
            Trusted by thousands of visa travelers
          </div> */}

          <h1 className="mt-4 text-[30px] md:text-[48px] leading-[1.1] font-medium font-outfit text-gray-900 mb-5">
            {title}
          </h1>

          {subtitle && (
            <p className="text-[16px] md:text-[18px] text-gray-900/70 font-outfit font-light leading-7">
              {subtitle}
            </p>
          )}

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ValuePill text="Verifiable PNR details" />
            <ValuePill text="Instant email delivery" />
            <ValuePill text="Embassy-ready format" />
            <ValuePill text="24/7 customer support" />
          </div>
        </div>

        <div className="w-full lg:w-[46%] rounded-3xl">{form}</div>
      </Container>
    </PrimarySection>
  );
}

function ValuePill({ text }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-white/80 bg-white/75 px-3 py-2 text-[13px] text-gray-700 shadow-sm backdrop-blur-sm">
      <HiCheckCircle className="text-primary-600" />
      <span>{text}</span>
    </div>
  );
}
