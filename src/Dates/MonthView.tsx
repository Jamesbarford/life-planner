import * as React from "react";
import { NormaliseDate } from "./helpers";

interface MonthViewState {
  day: number;
  month: number;
  year: number;
  date: number;
  numberOfDays: Array<number>;
}

export class MonthView extends React.Component<{}, MonthViewState> {

  state = {
    day: NormaliseDate.currentDayNumerical(),
    month: NormaliseDate.currentMonthNumerical(),
    year: NormaliseDate.getYear(),
    date: NormaliseDate.getDate(),
    numberOfDays: [1]
  }

  componentDidMount() {
    const numberOfDays = this.numberOfDaysToArray();
    this.setState({ numberOfDays });
  }

  numberOfDaysToArray = () => {
    const { month, year } = this.state;
    const dayArray: Array<number> = [];
    const normaliseDay = 1;
    const daysInMonth = NormaliseDate.getNumberOfDaysInMonth(month, year);
    for(let i = 0; i < daysInMonth; i++) dayArray.push(i + normaliseDay);

    return dayArray;
  }

  render() {
    const { day, month, year, date } = this.state;

    return (
      <div>
        <ul>
        {this.state.numberOfDays.map((day) => (
          <li key={day}>{`${day} ${NormaliseDate.getCurrentMonthName(month)} ${year}`}</li>
        ))}
        </ul>
      </div>
    );
  }
}