import { useState } from 'react';
import { HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi';

export default function FAQAccordion({ question, children }) {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div className="w-full font-outfit">
      <div
        onClick={() => setShowAnswer((prev) => !prev)}
        className={`w-full rounded-xl px-4 py-2 lg:px-5 lg:py-3 grid grid-cols-[1fr_auto] gap-4 items-center text-left font-light duration-300 cursor-pointer  ${
          showAnswer
            ? 'bg-primary-600 text-white'
            : 'bg-white border border-gray-300 text-black'
        }`}
      >
        <h3 className="text-base lg:text-[17px]">{question}</h3>
        {showAnswer ? (
          <HiOutlineMinus className="text-xl sm:text-2xl" />
        ) : (
          <HiOutlinePlus className="text-xl sm:text-2xl" />
        )}
      </div>
      <div
        className={`font-outfit font-light text-gray-700 text-base lg:text-[17px] px-5 duration-300 ${showAnswer ? 'h-fit pt-4 pb-2' : 'h-0 overflow-hidden'}`}
      >
        {children}
      </div>
    </div>
  );
}
