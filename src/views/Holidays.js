import React, { useState } from "react";
import { useHolidayListContext } from "components/ContextProvider/HolidayListContext";
import Breadcrumb from "./Breadcrumb";
import { months } from "constant";
import { daysOfWeek } from "constant";

export default function Holidays() {
  const [year, setYear] = useState(new Date().getFullYear());



  const holidays = useHolidayListContext(); // Get holiday data from context

  // Convert holiday list to a lookup object for fast checking
  const holidayLookup = holidays.reduce((acc, holiday) => {
    const [monthStr, day] = holiday.date.split(" ");
    const monthIndex = months.findIndex((m) => m.startsWith(monthStr)); // Match "Jan" -> 0
    if (monthIndex !== -1) {
      acc[`${year}-${monthIndex}-${parseInt(day)}`] = holiday.name; // Store as "2024-1-3"
    }
    return acc;
  }, {});


  // Function to generate days for each month
  const generateMonthDays = (monthIndex) => {
    const firstDay = new Date(year, monthIndex, 1).getDay(); // First day of the month
    const totalDays = new Date(year, monthIndex + 1, 0).getDate(); // Total days in the month
    const today = new Date(); // Get today's date

    let days = [];

    // Empty slots before first day
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${monthIndex}-${i}`} className="empty"></div>);
    }

    // Generate days
    for (let day = 1; day <= totalDays; day++) {
      const isToday = today.getFullYear() === year && today.getMonth() === monthIndex && today.getDate() === day;
      const isHoliday = holidayLookup[`${year}-${monthIndex}-${day}`];

      days.push(
        <div key={`day-${monthIndex}-${day}`} className={`day ${isToday ? "today" : ""} ${isHoliday ? "holiday" : ""}`}>
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-fluid calendar-box">
      <Breadcrumb />
      {/* Holidays Section */}
      <div className="holidays-section">
        <h5>Holidays List - {year}</h5>
        <div className="holidays-grid">
          {holidays.map((holiday, index) => (
            <div key={index} className="holiday-item">
              <span>{holiday.name}</span>
              <span>{holiday.date}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="calendar-container">
        <h3 className="year-heading">{year}</h3>

        <div className="year-grid">
          {months.map((month, index) => (
            <div key={month} className="month">
              <h5>{month}</h5>
              <div className="weekdays">
                {daysOfWeek.map((day) => (
                  <div key={day} className="weekday">{day}</div>
                ))}
              </div>
              <div className="days-grid">{generateMonthDays(index)}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};


