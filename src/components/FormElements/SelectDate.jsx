import { useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/general/useOutsideClick';
import Calendar from './Calendar';
import InputWithIcon from './InputWithIcon';
import { compareDateOnly, dateOnlyFromInput } from '../../utils/dateOnly';

export default function SelectDate({
  selectedDate,
  onDateSelect,
  minDate,
  maxDate,
  placeholder,
  icon,
  minYear,
}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const componentRef = useRef(null);

  useOutsideClick(componentRef, () => setShowCalendar(false));

  return (
    <div ref={componentRef}>
      <InputWithIcon
        icon={icon}
        type="text"
        placeholder={placeholder || 'Select date...'}
        value={selectedDate}
        onFocus={() => setShowCalendar(true)}
        readOnly
      />
      {showCalendar && (
        <div>
          <Calendar
            minYear={minYear}
            onDateClick={date => {
              onDateSelect(date);
              setShowCalendar(false);
            }}
            showCalendar={showCalendar}
            setShowCalendar={setShowCalendar}
            isDateDisabled={date => {
              const currentDateOnly = dateOnlyFromInput(date);
              const minDateOnly = dateOnlyFromInput(minDate);
              const maxDateOnly = dateOnlyFromInput(maxDate);

              if (minDateOnly && compareDateOnly(currentDateOnly, minDateOnly) < 0) return true;
              if (maxDateOnly && compareDateOnly(currentDateOnly, maxDateOnly) > 0) return true;
              return false;
            }}
          />
        </div>
      )}
    </div>
  );
}
