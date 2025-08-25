import React from 'react';
import Form from './Form';
import Itinerary from './Itinerary';
import PrimaryButtonOutline from '../PrimaryButtonOutline';

export default function FlightCard({ flight, isExpanded, onSelectFlight }) {
  return (
    <div className="w-full rounded-2xl bg-white mb-5 p-3 md:p-3.75 transition-[box-shadow_0.3s_ease] shadow-(--flight-shadow) hover:shadow-(--flight-shadow-hover)">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-1 md:gap-7.5">
        <div className="w-full flex-1 px-3">
          {flight?.itineraries?.map((itinerary, i) => (
            <Itinerary
              key={i}
              itinerary={itinerary}
              airlineInfo={flight.airlineDetails[0]}
            />
          ))}
        </div>

        <div className="w-full md:w-1/4 flex md:block pt-1 md:pt-2.5 md:border-t-0 px-3">
          <div className="w-[40%] md:w-full flex flex-col md:flex-row gap-1 items-baseline justify-center font-nunito text-left md:text-center md:py-2">
            <p className="text-lg font-bold text-black mb-[-8px]">AED 49</p>
            <p className="text-sm font-light text-gray-400">/ person</p>
          </div>
          <PrimaryButtonOutline
            className="w-[60%] md:w-full"
            onClick={onSelectFlight}
            disabled={isExpanded}
          >
            {isExpanded ? 'Selected' : 'Select Flight'}
          </PrimaryButtonOutline>
        </div>
      </div>
      {isExpanded && <Form flight={flight} />}
    </div>
  );
}
