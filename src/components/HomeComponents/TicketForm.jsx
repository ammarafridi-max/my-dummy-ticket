import { toast } from 'react-toastify';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateField } from '../../redux/slices/ticketFormSlice';
import { FaCircle } from 'react-icons/fa';
import { PlaneLandingIcon, PlaneTakeoff, CalendarDaysIcon } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import { trackFlightSearch } from '../../lib/analytics';
import Label from '../FormElements/Label';
import PrimaryButton from '../PrimaryButton';
import SelectAirport from '../FormElements/SelectAirport';
import SelectDate from '../FormElements/SelectDate';
import Counter from '../FormElements/Counter';
import Error from '../Error';

export default function TicketForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessages, setErrorMessages] = useState({});
  const { type, from, to, departureDate, returnDate, quantity } = useSelector(
    state => state.ticketForm
  );

  const isFormValid = () => {
    if (!from) {
      toast.error('From field is required');
      return false;
    }
    if (!to) {
      toast.error('To field is required');
      return false;
    }
    if (!departureDate) {
      toast.error('Departure date is required');
      return false;
    }
    if (type === 'Return' && !returnDate) {
      toast.error('Return date is required');
      return false;
    }
    if (quantity.adults < 1 || quantity.adults + quantity.children + quantity.infants > 9) {
      toast.error('Return date is required');
      return false;
    }
    return true;
  };

  const handleFieldChange = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const handleQuantityChange = (field, value) => {
    const updatedQuantity = {
      ...quantity,
      [field]: quantity[field] + value,
    };
    const totalPassengers =
      updatedQuantity.adults + updatedQuantity.children + updatedQuantity.infants;

    if (totalPassengers > 9 || updatedQuantity.adults < 1) {
      toast.error('Total passengers cannot be less than 1 or exceed 9.');
      return;
    }
    dispatch(updateField({ field: 'quantity', value: updatedQuantity }));
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    localStorage.setItem('routes', JSON.stringify({ from, to }));
    if (isFormValid()) {
      trackFlightSearch({
        type,
        from,
        to,
        departureDate,
        returnDate,
        quantity,
      });
      navigate('/booking/select-flights');
    }
  };

  return (
    <form
      className="m-0 py-7 px-4 md:p-6 rounded-2xl shadow-(--form-shadow) bg-white"
      onSubmit={handleFormSubmit}
    >
      <div className="flex gap-2.5">
        {['One Way', 'Return'].map(tripType => (
          <div
            className="text-[14.5px] w-fit flex items-center mb-5 cursor-pointer font-light"
            key={tripType}
            onClick={() => handleFieldChange('type', tripType)}
          >
            <FaCircle
              className={`mr-2 p-0.75 text-lg rounded-full border border-solid border-black ${type === tripType ? 'text-black' : 'text-transparent'}`}
            />
            {tripType}
          </div>
        ))}
      </div>

      <div className="block md:flex gap-3 md:gap-3.5">
        <div className="w-full md:w-[50%] flex flex-col mb-3 md:mb-3">
          <Label htmlFor="from">From</Label>
          <SelectAirport
            value={from ? from : ''}
            onChange={airport => handleFieldChange('from', airport)}
            icon={<PlaneTakeoff size={20} />}
          />
          {errorMessages?.from && <Error>{errorMessages.from}</Error>}
        </div>
        <div className="w-full md:w-[50%] flex flex-col mb-3 md:mb-3">
          <Label htmlFor="to">To</Label>
          <SelectAirport
            value={to ? to : ''}
            onChange={airport => handleFieldChange('to', airport)}
            icon={<PlaneLandingIcon size={20} />}
          />
          {errorMessages?.to && <Error>{errorMessages.to}</Error>}
        </div>
      </div>

      <div className="flex gap-3 md:gap-3.5">
        <div
          className={`w-full flex flex-col mb-3 md:mb-3 ${type === 'Return' ? 'md:w-[50%]' : 'md:w-full'}`}
        >
          <Label htmlFor="departureDate">Departure Date</Label>
          <SelectDate
            selectedDate={departureDate && formatDate(departureDate)}
            onDateSelect={date => handleFieldChange('departureDate', date)}
            minDate={new Date()}
            icon={<CalendarDaysIcon size={20} />}
          />
          {errorMessages?.departureDate && <Error>{errorMessages.departureDate}</Error>}
        </div>

        {type === 'Return' && (
          <div className="w-full md:w-[50%] flex flex-col mb-3 md:mb-3">
            <Label htmlFor="returnDate">Return Date</Label>
            <SelectDate
              selectedDate={returnDate && formatDate(returnDate)}
              onDateSelect={date => handleFieldChange('returnDate', date)}
              minDate={new Date(departureDate)}
              icon={<CalendarDaysIcon size={20} />}
            />
            {errorMessages?.returnDate && <Error>{errorMessages.returnDate}</Error>}
          </div>
        )}
      </div>

      <QuantityCounter quantity={quantity} onQuantityChange={handleQuantityChange} />

      <div className="w-full flex mt-5">
        <PrimaryButton
          className="w-full"
          type="submit"
          disabled={!from || !to || !departureDate || (type === 'Return' && !returnDate)}
          onClick={handleFormSubmit}
        >
          Search Flights
        </PrimaryButton>
      </div>
    </form>
  );
}

function QuantityCounter({ quantity, onQuantityChange, error }) {
  const categories = [
    { label: 'Adults', ageRange: '(12+)', field: 'adults' },
    { label: 'Children', ageRange: '(2 - 11)', field: 'children' },
    { label: 'Infants', ageRange: '(0 - 1)', field: 'infants' },
  ];

  return (
    <>
      <div className="block md:flex md:gap-3.75">
        {categories.map(({ label, ageRange, field }, i) => (
          <Counter
            key={i}
            ageGroup={label}
            age={ageRange}
            onAdd={() => onQuantityChange(field, 1)}
            onSubtract={() => onQuantityChange(field, -1)}
            value={quantity[field]}
          />
        ))}
      </div>
      {error && <Error>{error}</Error>}
    </>
  );
}
