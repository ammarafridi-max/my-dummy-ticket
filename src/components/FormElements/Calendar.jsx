import { useEffect, useRef, useState } from 'react';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';

const formatToDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function Calendar({
  onDateClick,
  isDateDisabled,
  showCalendar,
  setShowCalendar,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const componentRef = useRef(null);

  const handleMonthChange = (delta) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + delta);
      return newDate;
    });
  };

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

  const renderHeader = () => (
    <div className="flex justify-between w-full p-4 bg-primary-700 text-white font-medium font-nunito text-sm sm:text-base">
      <div
        className="flex-1 flex justify-start items-center cursor-pointer text-2xl"
        onClick={() => handleMonthChange(-1)}
      >
        <FaChevronCircleLeft />
      </div>
      <div className="flex-1 flex justify-center items-center text-center text-lg">
        {currentDate.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        })}
      </div>
      <div
        className="flex-1 flex justify-end items-center cursor-pointer text-2xl"
        onClick={() => handleMonthChange(1)}
      >
        <FaChevronCircleRight />
      </div>
    </div>
  );

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="flex w-full py-2 bg-gray-100 text-[14px] sm:text-[13px] font-normal mb-0">
        {days.map((day) => (
          <div key={day} className="flex-1 text-center">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const monthEnd = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const startDate = new Date(monthStart);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    const endDate = new Date(monthEnd);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const rows = [];
    let days = [];
    let day = new Date(startDate);

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const dayClone = new Date(day);
        const formattedDate = formatToDateString(dayClone);
        const isDisabled = isDateDisabled && isDateDisabled(dayClone);
        const isOutOfMonth = dayClone.getMonth() !== currentDate.getMonth();

        days.push(
          <div
            key={formattedDate}
            onClick={() => !isDisabled && onDateClick(formattedDate)}
            className={`flex-1 min-h-[50px] flex items-center justify-center text-sm sm:text-xs cursor-pointer transition m-1
              ${isDisabled || isOutOfMonth ? 'text-gray-400 bg-white cursor-default' : 'bg-white'}
               hover:text-white`}
          >
            <span
              className={`flex items-center justify-center w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-gray-200 transition
                ${isDisabled || isOutOfMonth ? 'bg-white' : ''}
                hover:bg-primary-500 hover:text-white`}
            >
              {dayClone.getDate()}
            </span>
          </div>
        );
        day.setDate(day.getDate() + 1);
      }

      rows.push(
        <div key={day.toISOString()} className="flex w-full">
          {days}
        </div>
      );
      days = [];
    }

    return <div className="flex flex-col w-full">{rows}</div>;
  };

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/60 flex items-center justify-center px-4 font-nunito"
      onClick={() => setShowCalendar(false)}
    >
      <div
        className="w-full max-w-[360px] sm:max-w-[350px] bg-white rounded-lg shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
}
