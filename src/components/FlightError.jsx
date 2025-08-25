import PrimaryButton from './PrimaryButton';
import { X } from 'lucide-react';

export default function FlightError() {
  return (
    <div className="pt-2 text-center">
      <div
        className="flex items-center justify-center w-[110px] h-[110px] rounded-full mx-auto mb-7.5 bg-red-600"
        type="error"
      >
        <X className="w-[60px] h-[60px] text-white" />
      </div>
      <h1 className="text-4xl font-nunito">Flights not found</h1>
      <p className="text-xl my-5 font-light font-nunito">
        We&apos;re sorry, but we couldn&apos;t load the flights at this time.
        This could be due to a technical issue or missing data.
      </p>
      <PrimaryButton href="/">Back to Home</PrimaryButton>
    </div>
  );
}
