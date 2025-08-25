import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { HiChevronRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import PrimarySection from './PrimarySection';

export default function BookingLayout() {
  return (
    <PrimarySection className="bg-gray-100 pb-20">
      <div className="w-[95%] md:w-[70%] mx-auto">
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
  const currentIndex = steps.findIndex((step) => step.pathname === pathname);

  return (
    <div className="w-full pt-6 pb-6 md:pt-10 md:pb-10 flex items-center justify-center gap-3 md:gap-5 rounded-sm bg-transparent">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <Link
            key={i}
            className="w-fit p-0 font-nunito flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 bg-transparent text-gray-700 cursor-pointer"
            to={currentIndex >= i ? step.pathname : '#'}
          >
            <p
              className={`w-[25px] h-[25px] hidden md:flex md:w-[30px] md:h-[30px] text-[11px] md:text-[15px] text-primary-900 rounded-full font-semibold items-center justify-center ${pathname === step.pathname ? 'bg-accent-500 text-white' : 'bg-gray-800 text-white'}  `}
            >
              {i + 1}
            </p>
            <span
              className={`text-[14px] md:text-[17px] ${pathname === step.pathname ? 'font-semibold text-accent-500' : 'font-normal'}`}
            >
              {step.name}
            </span>
          </Link>
          {i < steps.length - 1 && (
            <HiChevronRight className="text-gray-400 text-xl md:text-2xl" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

const obj = {
  departureFlight: {
    segments: [
      {
        from: 'DXB',
        fromTerminal: '3',
        to: 'LHR',
        toTerminal: '1',
        departure: '2025-09-09T14:15:00',
        arrival: '2025-09-09T18:40:00',
        carrierCode: 'EK',
        flightNumber: 3,
        aircraftCode: '388',
        duration: 'PT7H25M',
      },
      {
        from: 'LHR',
        fromTerminal: '1',
        to: 'ATH',
        toTerminal: '1',
        departure: '2025-09-09T14:15:00',
        arrival: '2025-09-09T18:40:00',
        carrierCode: 'EK',
        flightNumber: 3,
        aircraftCode: '388',
      },
    ],
  },
};
