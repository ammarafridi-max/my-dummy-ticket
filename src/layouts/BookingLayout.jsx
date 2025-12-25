import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { HiChevronRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import PrimarySection from '../components/PrimarySection';

export default function BookingLayout() {
  return (
    <PrimarySection className="bg-gray-100 pb-20">
      <div className="w-[95%] lg:w-[70%] mx-auto">
        <Menu />
        <Outlet />
      </div>
    </PrimarySection>
  );
}

function Menu() {
  const { pathname } = useLocation();
  const steps = [
    {
      id: 1,
      name: 'Select Flights',
      pathname: '/booking/select-flights',
    },
    {
      id: 2,
      name: 'Review Details',
      pathname: '/booking/review-details',
    },
    {
      id: 3,
      name: 'Payment',
      pathname: '/booking/payment',
    },
  ];
  const currentIndex = steps.findIndex(step => step.pathname === pathname);

  return (
    <div className="w-full pt-6 pb-6 lg:pt-10 lg:pb-10 flex items-center justify-center gap-3 lg:gap-5 rounded-sm bg-transparent">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <Link
            key={i}
            className="w-fit p-0 font-nunito flex flex-col lg:flex-row items-center justify-center gap-1 lg:gap-3 bg-transparent text-gray-700 cursor-pointer"
            to={currentIndex >= i ? step.pathname : '#'}
          >
            <p
              className={`w-[25px] h-[25px] hidden lg:flex lg:w-[30px] lg:h-[30px] text-[12px] lg:text-[12px] text-primary-900 rounded-full items-center justify-center ${pathname === step.pathname ? 'bg-primary-500 text-white' : 'bg-black/30 text-white'}  `}
            >
              {i + 1}
            </p>
            <span
              className={`text-[14px] lg:text-[16px] ${pathname === step.pathname ? 'text-black font-normal' : 'text-black/50 font-light'}`}
            >
              {step.name}
            </span>
          </Link>
          {i < steps.length - 1 && <HiChevronRight className="text-gray-400 text-xl lg:text-2xl" />}
        </React.Fragment>
      ))}
    </div>
  );
}
