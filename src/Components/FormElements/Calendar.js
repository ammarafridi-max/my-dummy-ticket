import React, { useState } from "react";
import styles from "./Calendar.module.css"; // Using CSS Modules
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

// Helper function to format dates to "yyyy-mm-dd"
const formatToDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Calendar = ({ onDateClick, isDateDisabled }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const renderHeader = () => {
    return (
      <div className={styles.header}>
        <div className={`${styles.col} ${styles.colStart}`}>
          <div
            className={styles.icon}
            onClick={() =>
              setCurrentDate((prevDate) => {
                const newDate = new Date(prevDate);
                newDate.setMonth(newDate.getMonth() - 1);
                return newDate;
              })
            }
          >
            <FaChevronCircleLeft />
          </div>
        </div>
        <div className={`${styles.col} ${styles.colCenter}`}>
          <span>
            {currentDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
        <div
          className={`${styles.col} ${styles.colEnd}`}
          onClick={() =>
            setCurrentDate((prevDate) => {
              const newDate = new Date(prevDate);
              newDate.setMonth(newDate.getMonth() + 1);
              return newDate;
            })
          }
        >
          <div className={styles.icon}>
            <FaChevronCircleRight />
          </div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className={`${styles.days} ${styles.row}`}>
        {days.map((day) => (
          <div className={`${styles.col} ${styles.colCenter}`} key={day}>
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
        const dayClone = new Date(day); // Clone the date object here
        const disabled = isDateDisabled && isDateDisabled(dayClone);
        const formattedDate = formatToDateString(dayClone); // Format to "yyyy-mm-dd"
        days.push(
          <div
            className={`${styles.col} ${styles.cell} ${
              dayClone.getMonth() !== currentDate.getMonth()
                ? styles.disabled
                : ""
            } ${disabled ? styles.disabled : ""}`}
            key={formattedDate}
            onClick={() => !disabled && onDateClick(formattedDate)} // Pass formatted date
          >
            <span className={styles.number}>{dayClone.getDate()}</span>
          </div>
        );
        day.setDate(day.getDate() + 1);
      }
      rows.push(
        <div className={styles.row} key={day.toISOString()}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className={styles.body}>{rows}</div>;
  };

  return (
    <div className={styles.calendar}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
