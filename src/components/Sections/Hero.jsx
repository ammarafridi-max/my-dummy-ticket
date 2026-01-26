import { motion } from 'framer-motion';
import Container from '../Container';
import PrimarySection from '../PrimarySection';

export default function Hero({ title, subtitle, form, sectionId = 'form' }) {
  return (
    <PrimarySection className="bg-gray-50 py-7 md:py-12" id={sectionId}>
      <Container className="flex flex-col lg:flex-row items-center justify-between gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2 text-left"
        >
          <h1 className="text-[28px] md:text-[44px] leading-[1.2] font-semibold font-outfit text-gray-900 mb-4">
            {title}
          </h1>

          {subtitle && (
            <p className="text-[16px] md:text-[17px] text-gray-900/70 font-outfit font-light leading-7">
              {subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-[45%]"
        >
          {form}
        </motion.div>
      </Container>
    </PrimarySection>
  );
}
