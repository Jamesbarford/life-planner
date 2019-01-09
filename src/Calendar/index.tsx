import * as React from 'react';
import * as moment from 'moment';
import { Moment } from 'moment';
import { cloneDeep } from "lodash";

// HELPERS
import { TimePoint } from "../helpers/dateHelper";

// COMPONENTS
import { Week } from "./Week";
import { DayNames } from "./Day";

interface CalendarState {
  date: Moment;
}

export class Calendar extends React.Component<{}, CalendarState> {

  state = { date: moment() };

  previousMonth = () => {
    this.setState({
      date: this.state.date.subtract(1, TimePoint.month)
    });
  }

  nextMonth = () => {
    this.setState({
      date: this.state.date.add(1, TimePoint.month)
    });
  }

  nextYear = () => {
    this.setState({
      date: this.state.date.add(1, TimePoint.year)
    });
  }

  previousYear = () => {
    this.setState({
      date: this.state.date.subtract(1, TimePoint.year)
    });
  }

  calculateWeeks = () => {
    const { date } = this.state;
    let done = false;
    let count = 0;
    let monthIndex = date.month();
    const weeks: Array<Moment> = [];
    const mutableDate = date.clone()
      .startOf(TimePoint.month)
      .add(-1, "w")
      .day("Sunday");

    while (!done) {
      mutableDate.add(1, "w");
      weeks.push(cloneDeep(mutableDate));
      done = count++ > 2 && monthIndex !== mutableDate.month();
      monthIndex = mutableDate.month();
    }
    return weeks;
  }

  render() {
    const { date } = this.state;
    const weeks = this.calculateWeeks();

    return (
      <>
        <button onClick={this.previousMonth}> previous month</button>
        <button onClick={this.nextMonth}> next month</button>
        <div>current year: {date.format("YYYY")}</div>
        <button onClick={this.previousYear}> previous year </button>
        <button onClick={this.nextYear}> next year </button>
        <DayNames />
        {weeks.map(week => ( <Week key={week.toString()} week={week} month={week.month()}/> ))}
      </>
    );
  }
}