import styled from 'styled-components';
import { useState } from 'react';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';

const formatToDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const CalendarWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 1000;

  @media screen and (max-width: 991px) {
    max-width: 350px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 12px 20px;
  background-color: var(--primary-color-500);
  color: white;
  font-weight: 500;

  @media screen and (max-width: 991px) {
    padding: 8px 16px;
  }
`;

const Col = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  text-align: center;
`;

const Icon = styled.div`
  cursor: pointer;
  font-size: 1.2rem;
  color: white;
`;

const DaysRow = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0;
  background-color: #f1f1f1;
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 10px;

  @media screen and (max-width: 991px) {
    font-size: 0.8rem;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
`;

const Cell = styled.div`
  flex: 1;
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  ${({ isDisabled, isOutOfMonth }) =>
    (isDisabled || isOutOfMonth) &&
    `
    cursor: auto;
    color: #aaa;
    background-color: white ;
  `}

  &:hover .number {
    background-color: var(--primary-color-500);
    color: white;
  }

  @media screen and (max-width: 991px) {
    font-size: 0.8rem;
  }
`;

const Number = styled.span`
  padding: 5px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(240, 240, 240);
  transition: background-color 0.2s ease, color 0.2s ease;
  &:hover {
    background-color: var(--primary-color-500);
    color: white;
  }

  @media screen and (max-width: 991px) {
    width: 35px;
    height: 35px;
  }
`;

const Calendar = ({ onDateClick, isDateDisabled }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const renderHeader = () => (
    <Header>
      <Col>
        <Icon
          onClick={() =>
            setCurrentDate((prevDate) => {
              const newDate = new Date(prevDate);
              newDate.setMonth(newDate.getMonth() - 1);
              return newDate;
            })
          }
        >
          <FaChevronCircleLeft />
        </Icon>
      </Col>
      <Col>
        {currentDate.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        })}
      </Col>
      <Col>
        <Icon
          onClick={() =>
            setCurrentDate((prevDate) => {
              const newDate = new Date(prevDate);
              newDate.setMonth(newDate.getMonth() + 1);
              return newDate;
            })
          }
        >
          <FaChevronCircleRight />
        </Icon>
      </Col>
    </Header>
  );

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <DaysRow>
        {days.map((day) => (
          <Col key={day}>{day}</Col>
        ))}
      </DaysRow>
    );
  };

  const renderCells = () => {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
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
          <Cell
            key={formattedDate}
            isDisabled={isDisabled}
            isOutOfMonth={isOutOfMonth}
            onClick={() => !isDisabled && onDateClick(formattedDate)}
          >
            <Number>{dayClone.getDate()}</Number>
          </Cell>
        );
        day.setDate(day.getDate() + 1);
      }
      rows.push(<Row key={day.toISOString()}>{days}</Row>);
      days = [];
    }

    return <Body>{rows}</Body>;
  };

  return (
    <CalendarWrapper>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </CalendarWrapper>
  );
};

export default Calendar;
