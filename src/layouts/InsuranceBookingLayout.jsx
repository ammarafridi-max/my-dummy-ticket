import React from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa6';
import { HiArrowLeft } from 'react-icons/hi2';
import PrimarySection from '../components/PrimarySection';
import Container from '../components/Container';

export const insuranceSteps = [
  { id: 1, name: 'Select Quote', page: '/travel-insurance/quotes' },
  { id: 2, name: 'Passenger Details', page: '/travel-insurance/passenger-details' },
  { id: 3, name: 'Payment', page: '/travel-insurance/payment' },
];

export default function InsuranceBookingLayout() {
  return (
    <PrimarySection className="bg-gray-50 pb-20">
      <Container>
        <InsuranceStepsSm />
        <InsuranceStepsLg />
        <Outlet />
      </Container>
    </PrimarySection>
  );
}

export function InsuranceStepsLg() {
  const location = useLocation();
  const currentStepIndex = insuranceSteps.findIndex(step => step.page === location.pathname);

  return (
    <div className="hidden lg:flex justify-center gap-16 mx-auto pt-7 pb-10">
      {insuranceSteps.map((item, i) => {
        const isCompleted = i < currentStepIndex;
        const isActive = i === currentStepIndex;

        return (
          <Link
            key={item.id}
            to={item.page}
            onClick={e => {
              if (!isCompleted && !isActive) e.preventDefault();
            }}
            className={`flex flex-col items-center gap-2
              ${!isCompleted && !isActive ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <span
              className={`w-8 h-8 text-sm flex items-center justify-center rounded-full transition-colors
                ${
                  isActive
                    ? 'bg-black text-white'
                    : isCompleted
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-900'
                }
              `}
            >
              {isCompleted ? <FaCheck /> : i + 1}
            </span>

            <span
              className={`text-md
                ${
                  isActive
                    ? 'text-black font-light'
                    : isCompleted
                      ? 'text-primary-900'
                      : 'text-gray-400'
                }
              `}
            >
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export function InsuranceStepsSm() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentStepIndex = insuranceSteps.findIndex(step => step.page === location.pathname);

  const currentStep = insuranceSteps[currentStepIndex];
  const previousStep = insuranceSteps[currentStepIndex - 1];

  return (
    <div className="flex lg:hidden items-center justify-start gap-3 pt-4 pb-6">
      <button
        type="button"
        className="disabled:text-primary-300"
        onClick={() => {
          if (previousStep?.page) {
            navigate(previousStep.page);
          } else {
            navigate(-1);
          }
        }}
      >
        <HiArrowLeft size={20} />
      </button>

      <span className="text-md font-light">
        {currentStepIndex + 1} of {insuranceSteps.length} – {currentStep?.name}
      </span>

      <span className="w-6" />
    </div>
  );
}
