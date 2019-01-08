import * as React from "react";
import { DateHelper } from "./dateHelper";
import { Moment } from "moment";

interface MonthViewState {
  day: number;
  month: number;
  year: number;
  date: string | number | Moment;
  numberOfDays: Array<number>;
}

export class MonthView extends React.Component<{}, MonthViewState> {

  state = {
    day: DateHelper.getTodayNumeric(),
    month: DateHelper.getMonthNumeric(),
    year: DateHelper.getYear(),
    date: DateHelper.getDate(),
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
    const daysInMonth = DateHelper.getNumberOfDaysInMonth(month, year);
    for(let i = 0; i < daysInMonth; i++) dayArray.push(i + normaliseDay);

    return dayArray;
  }

  render() {
    const { day, month, year, date } = this.state;

    return (
      <div>
        <ul>
        {this.state.numberOfDays.map((day) => (
          <li key={day}>{`${DateHelper.formatDate(day)} ${DateHelper.getMonthString(month)} ${year}`}</li>
        ))}
        </ul>
      </div>
    );
  }
}
