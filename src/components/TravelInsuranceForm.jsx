import { FaCircle, FaGlobeAfrica, FaInfo } from 'react-icons/fa';
import { CalendarDaysIcon } from 'lucide-react';
import { formatDate } from '../utils/formatDate';
import { InsuranceContext } from '../context/InsuranceContext';
import { useContext } from 'react';
import Label from './FormElements/Label';
import SelectDate from './FormElements/SelectDate';
import SearchableSelect from './FormElements/SearchableSelect';
import Counter from './FormElements/Counter';
import PrimaryButton from './PrimaryButton';

export default function TravelInsuranceForm() {
  const {
    REGIONS,
    groups,
    ageCategories,
    journeyType,
    setJourneyType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    region,
    setRegion,
    group,
    setGroup,
    quantity,
    handleQuantityChange,
    validateForm,
    handleSubmit,
  } = useContext(InsuranceContext);

  return (
    <form className="m-0 py-7 px-4 md:p-6 rounded-2xl shadow-md bg-white">
      <div className="flex gap-5">
        {[
          { id: 'single', label: 'Single' },
          { id: 'annual', label: 'Annual' },
        ].map(tripType => (
          <button
            key={tripType.id}
            type="button"
            onClick={() => setJourneyType(tripType.id)}
            className="text-[14.5px] w-fit flex items-center mb-5 cursor-pointer font-light"
          >
            <FaCircle
              className={`mr-2 p-0.75 text-lg rounded-full border border-black ${
                journeyType === tripType.id ? 'text-black' : 'text-transparent'
              }`}
            />
            {tripType.label}
          </button>
        ))}
      </div>

      <div className="block md:flex gap-3 md:gap-3.5">
        <div className="w-full md:w-1/2 flex flex-col gap-1 mb-3 md:mb-3">
          <Label htmlFor="startDate">Start Date</Label>
          <SelectDate
            selectedDate={startDate && formatDate(startDate)}
            onDateSelect={setStartDate}
            minDate={new Date()}
            icon={<CalendarDaysIcon size={20} />}
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-1 mb-3 md:mb-3">
          <Label htmlFor="endDate">End Date</Label>
          <SelectDate
            selectedDate={endDate && formatDate(endDate)}
            onDateSelect={setEndDate}
            minDate={new Date(startDate)}
            icon={<CalendarDaysIcon size={20} />}
          />
        </div>
      </div>

      <div className="block md:flex gap-3 md:gap-3.5">
        <div className="w-full flex flex-col gap-1 mb-3 md:mb-3">
          <Label htmlFor="region">Region</Label>
          <SearchableSelect
            icon={<FaGlobeAfrica />}
            items={REGIONS}
            value={region}
            placeholder="Search for regions..."
            onChange={setRegion}
            minSearchLength={0}
          />
        </div>
      </div>

      <div className="block md:flex md:gap-3.75">
        {ageCategories.map(({ label, ageRange, field }) => (
          <Counter
            key={field}
            ageGroup={label}
            age={ageRange}
            value={quantity[field]}
            onAdd={() => handleQuantityChange(field, 1)}
            onSubtract={() => handleQuantityChange(field, -1)}
          />
        ))}
      </div>

      <div className='mt-4'>
        <div className='flex gap-3 items-center text-gray-900/60 text-sm font-light'>
          <FaInfo className='text-[12px]' />
          <p>By proceeding, you confirm that you are a resident/citizen of the UAE.</p>
        </div>
      </div>

      <div className="w-full flex mt-4">
        <PrimaryButton
          className="w-full"
          type="submit"
          size='small'
          disabled={!startDate || !endDate || !region.id || !group}
          onClick={handleSubmit}
        >
          Search Policies
        </PrimaryButton>
      </div>
    </form>
  );
}
