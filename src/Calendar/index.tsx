import * as React from "react";
import { DateHelper, TimePoint } from "../Dates/dateHelper";
import { Moment } from "moment";
import { MonthView } from "../Dates/MonthView";

interface CalendarState {
  day: number;
  month: number;
  year: number;
  date: number | string | Moment;
}

export class Calendar extends React.Component<{}, CalendarState> {

  state = {
    day: DateHelper.getTodayNumeric(),
    month: DateHelper.getMonthNumeric(),
    year: DateHelper.getYear(),
    date: DateHelper.getDate()
  }

  previousMonth = () => {
    let previousMonth = this.state.month - 1;
    if (previousMonth === -1) previousMonth = 11;
    return this.setState({ month: previousMonth });
  }

  nextMonth = () => {
    let nextMonth = this.state.month + 1;
    if (nextMonth === 12) nextMonth = 0;
    return this.setState({ month: nextMonth });
  }

  setDate = () => {
    const newDate = DateHelper.setTimePoint(TimePoint.day, 7);
    console.log({newDate});
  }

  nextYear = () => this.setState({ year: this.state.year + 1 });

  previousYear = () => this.setState({ year: this.state.year - 1 });

  render() {
    const {
      day,
      month,
      year
    } = this.state

    this.setDate()

    return (
      <>
        <div>current month: {DateHelper.getMonthString(month)}</div>
        <div>number of days in month: {DateHelper.getNumberOfDaysInMonth(month, year)}</div>
        <button onClick={this.previousMonth}> previousMonth</button>
        <div>current year: {year}</div>
        <button onClick={this.previousYear}> previousYear </button>
        <MonthView />
      </>
    );
  }
}