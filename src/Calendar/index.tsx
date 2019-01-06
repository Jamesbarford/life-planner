import * as React from "react";
import { NormaliseDate } from "../Dates/helpers";

interface CalendarState {
  day: number;
  month: number;
  year: number;
}

export class Calendar extends React.Component<{}, CalendarState> {

  state = {
    day: NormaliseDate.currentDayNumerical(),
    month: NormaliseDate.currentMonthNumerical(),
    year: NormaliseDate.getYear()
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

  nextYear = () => this.setState({ year: this.state.year + 1 });

  previousYear = () => this.setState({ year: this.state.year - 1 });

  render() {
    const {
      day,
      month,
      year
    } = this.state

    console.log({day, month, year})
    return (
      <>
        <div>current month: {NormaliseDate.getCurrentMonthName(month)}</div>
        <div>number of days in month: {NormaliseDate.getNumberOfDaysInMonth(month, year)}</div>
        <button onClick={this.previousMonth}> previousMonth</button>
        <div>current year: {year}</div>
        <button onClick={this.previousYear}> previousYear </button>
      </>
    );
  }
}