import { useRef, useState, useEffect } from 'react';
import Calendar from './Calendar';
import InputWithIcon from './InputWithIcon';

export default function SelectDate({
  selectedDate,
  onDateSelect,
  minDate,
  placeholder,
  icon,
}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [componentRef]);

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
            onDateClick={(date) => {
              onDateSelect(date);
              setShowCalendar(false);
            }}
            showCalendar={showCalendar}
            setShowCalendar={setShowCalendar}
            isDateDisabled={(date) => minDate && date < minDate}
          />
        </div>
      )}
    </div>
  );
}
