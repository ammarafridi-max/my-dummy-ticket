import React, { useRef, useState, useEffect } from "react";
import styles from "./SelectDate.module.css";
import { FaCalendarAlt } from "react-icons/fa";
import Calendar from "./Calendar";

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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
      <div className={styles.SelectDiv}>
        <FaCalendarAlt className={styles.Icon} />
        <input
          type="text"
          placeholder={placeholder || "Select date..."}
          className={styles.Input}
          value={selectedDate}
          onFocus={() => setShowCalendar(true)}
          readOnly
        />
      </div>
      {showCalendar && (
        <div className={styles.CalendarContainer}>
          <Calendar
            onDateClick={handleDateClick}
            isDateDisabled={isDateDisabled}
          />
        </div>
      )}
    </div>
  );
}
