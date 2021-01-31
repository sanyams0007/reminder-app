import React, { useState, useEffect } from "react";
import { datesGenerator } from "dates-generator";
import "./Calender.css";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
//import { colors } from '@material-ui/core';

const months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calender = (props) => {
  const d = new Date();
  //new Date(`${dateTime.date} ${dateTime.time}`)
  const [selectedDate, setSelectedDate] = useState(new Date(`${props.value}`));
  //setSelectedDate(new Date(`${props.value}`));
  console.log("from calender ", props.value);
  console.log("selected ", selectedDate);
  const [dates, setDates] = useState([]);
  const [calendar, setCalendar] = useState({
    month: selectedDate.getMonth(),
    year: selectedDate.getFullYear(),
  });

  useEffect(() => {
    const body = {
      month: calendar.month,
      year: calendar.year,
    };
    const {
      dates,
      nextMonth,
      nextYear,
      previousMonth,
      previousYear,
    } = datesGenerator(body);
    setDates([...dates]);
    setCalendar({
      ...calendar,
      nextMonth,
      nextYear,
      previousMonth,
      previousYear,
    });
    //handleDate(props.value);
    //setSelectedDate(new Date(`${props.value}`))
    //props.updateValue(selectedDate.toLocaleDateString());
  }, [selectedDate]);

  const onClickNext = () => {
    const body = { month: calendar.nextMonth, year: calendar.nextYear };
    const {
      dates,
      nextMonth,
      nextYear,
      previousMonth,
      previousYear,
    } = datesGenerator(body);

    setDates([...dates]);
    setCalendar({
      ...calendar,
      month: calendar.nextMonth,
      year: calendar.nextYear,
      nextMonth,
      nextYear,
      previousMonth,
      previousYear,
    });
  };

  const onClickPrevious = () => {
    const body = { month: calendar.previousMonth, year: calendar.previousYear };
    const {
      dates,
      nextMonth,
      nextYear,
      previousMonth,
      previousYear,
    } = datesGenerator(body);

    setDates([...dates]);
    setCalendar({
      ...calendar,
      month: calendar.previousMonth,
      year: calendar.previousYear,
      nextMonth,
      nextYear,
      previousMonth,
      previousYear,
    });
  };

  const onSelectDate = (date) => {
    props.updateValue(
      new Date(date.year, date.month, date.date).toLocaleDateString()
    );
    //console.log(props.value);
    setSelectedDate(new Date(date.year, date.month, date.date));
    //props.updateValue(new Date(date.year, date.month, date.date).toLocaleDateString());
    //props.updateValue(selectedDate.toLocaleDateString());
  };

  return (
    <div className="calender_container">
      <p>when would you like to get reminded?</p>
      <div className="calender_header">
        {/* new Date(each.year, each.month, each.date + 1).getTime() < d.getTime() */}
        {calendar.year < d.getFullYear() ? (
          <ChevronLeftIcon
            className="btn_month"
            style={{ display: null }}
          ></ChevronLeftIcon>
        ) : (
          <ChevronLeftIcon
            onClick={onClickPrevious}
            className="btn_month"
          ></ChevronLeftIcon>
        )}

        <p className="month_text">
          {`${months[calendar.month]} ${calendar.year}`}
        </p>
        <ChevronRightIcon
          onClick={onClickNext}
          className="btn_month"
        ></ChevronRightIcon>
      </div>

      <div className="calender">
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              {days.map((day) => (
                <td key={day}>
                  <div className="weekday">{day}</div>
                </td>
              ))}
            </tr>

            {dates.length > 0 &&
              dates.map((week) => (
                <tr key={JSON.stringify(week[0])}>
                  {week.map((each) => (
                    <td key={JSON.stringify(each)} className="date">
                      {new Date(
                        each.year,
                        each.month,
                        each.date + 1
                      ).getTime() < d.getTime() ? (
                        <div className="pastdate">{each.date}</div>
                      ) : (
                        <div onClick={() => onSelectDate(each)}>
                          {each.date}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="calender_footer">
        {calendar.year < d.getFullYear() && selectedDate.getDate() < d.getDate()
          ? "Please Select a Valid Date"
          : `Selected Date: ${selectedDate.toLocaleDateString()}`}
      </div>
    </div>
  );
};

export default Calender;
