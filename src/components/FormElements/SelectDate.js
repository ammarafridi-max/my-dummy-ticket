import { useRef, useState, useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import styled from 'styled-components';
import Calendar from './Calendar';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 0px 15px;
  border-radius: var(--input-radius-md);
  transition-duration: 0.3s;
  position: relative;
  margin: 0;
  box-shadow: var(--input-box-shadow);
  -webkit-box-shadow: var(--input-box-shadow);
  -moz-box-shadow: var(--input-box-shadow);
`;

const Icon = styled(FaCalendarAlt)`
  font-size: 16px;
  margin: 0;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 12px 15px;
  padding-right: 0;
  background-color: transparent;
  border: none;
  outline: none;
  overflow: hidden;
`;

export default function SelectDate({
  selectedDate,
  onDateSelect,
  minDate,
  placeholder,
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

  const handleDateClick = (date) => {
    onDateSelect(date);
    setShowCalendar(false);
  };

  const isDateDisabled = (date) => {
    return minDate && date < minDate;
  };

  return (
    <div ref={componentRef}>
      <Wrapper>
        <Icon />
        <Input
          type="text"
          placeholder={placeholder || 'Select date...'}
          value={selectedDate}
          onFocus={() => setShowCalendar(true)}
          readOnly
        />
      </Wrapper>
      {showCalendar && (
        <div>
          <Calendar
            onDateClick={handleDateClick}
            isDateDisabled={isDateDisabled}
          />
        </div>
      )}
    </div>
  );
}
