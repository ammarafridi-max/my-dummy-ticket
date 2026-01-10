import { FaCircle } from 'react-icons/fa';
import { CalendarDaysIcon } from 'lucide-react';
import { formatDate } from '../utils/formatDate';
import { InsuranceContext } from '../context/InsuranceContext';
import { useContext } from 'react';
import Label from './FormElements/Label';
import SelectDate from './FormElements/SelectDate';
import SearchableSelect from './FormElements/SearchableSelect';
import SegmentedRadioGroup from './FormElements/SegmentedRadioGroup';
import Counter from './FormElements/Counter';
import PrimaryButton from './PrimaryButton';

export default function TravelInsuranceForm() {
  const {
    regions,
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
    onQuantityChange,
    validateForm,
    handleSubmit,
  } = useContext(InsuranceContext);

  return (
    <form className="m-0 py-7 px-4 md:p-6 rounded-2xl shadow-md bg-white">
      <div className="flex gap-5">
        {['Single Trip', 'Annual'].map(tripType => (
          <button
            key={tripType}
            type="button"
            onClick={() => setJourneyType(tripType)}
            className="text-[14.5px] w-fit flex items-center mb-5 cursor-pointer font-light"
          >
            <FaCircle
              className={`mr-2 p-0.75 text-lg rounded-full border border-black ${
                journeyType === tripType ? 'text-black' : 'text-transparent'
              }`}
            />
            {tripType}
          </button>
        ))}
      </div>

      <div className="block md:flex gap-3 md:gap-3.5">
        <div className="w-full md:w-1/2 flex flex-col mb-3 md:mb-3">
          <Label htmlFor="startDate">Start Date</Label>
          <SelectDate
            selectedDate={startDate && formatDate(startDate)}
            onDateSelect={setStartDate}
            minDate={new Date()}
            icon={<CalendarDaysIcon size={20} />}
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col mb-3 md:mb-3">
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
        <div className="w-full flex flex-col mb-3 md:mb-3">
          <Label htmlFor="region">Region</Label>
          <SearchableSelect
            items={regions}
            value={region}
            placeholder="Search for regions..."
            onChange={setRegion}
            minSearchLength={0}
          />
        </div>
      </div>

      <div className="block md:flex gap-3 md:gap-3.5">
        <div className="w-full flex flex-col mb-3 md:mb-3">
          <Label htmlFor="group">Group Type</Label>
          <SegmentedRadioGroup
            name="group"
            value={group}
            options={groups}
            onChange={option => setGroup(option.value)}
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
            onAdd={() => onQuantityChange(field, 1)}
            onSubtract={() => onQuantityChange(field, -1)}
          />
        ))}
      </div>

      <div className="w-full flex mt-3">
        <PrimaryButton
          className="w-full"
          type="submit"
          disabled={!validateForm()}
          onClick={handleSubmit}
        >
          Search Policies
        </PrimaryButton>
      </div>
    </form>
  );
}
