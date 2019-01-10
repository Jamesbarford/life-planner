import * as React from "react";
import * as moment from "moment";
import { Moment, unitOfTime } from "moment";

// HELPERS
import { TimePoint, calculate } from "../helpers/dateHelper";

// COMPONENTS
import { Week } from "./Week";
import { DayNames } from "./Day";

interface CalendarState {
  date: Moment;
  months: Array<Moment>;
  selectedDay: Moment;
}

export interface CalendarShared {
  selectedDay: Moment;
  select: (date: Moment) => void;
}

export class Calendar extends React.Component<{}, CalendarState> {
  state = {
    date: moment(),
    months: [] as Array<Moment>,
    selectedDay: moment().startOf(TimePoint.day)
  };

  private cache = (date: Moment) => calculate(date);

  componentDidMount() {
    this.calculateWeeks();
  }

  next = (key: unitOfTime.DurationConstructor) => {
    this.setState({
      date: this.state.date.add(1, key)
    });
    this.calculateWeeks();
  };

  previous = (key: TimePoint) => {
    this.setState({
      date: this.state.date.subtract(1, key as unitOfTime.DurationConstructor)
    });
    this.calculateWeeks();
  };

  calculateWeeks = () => {
    const { date } = this.state;
    const months = this.cache(date)(date);
    this.setState({ months });
  };

  select = (date: Moment) => this.setState({ selectedDay: date });

  render() {
    const { date, months, selectedDay } = this.state;

    return (
      <>
        <button onClick={() => this.previous(TimePoint.month)}>
          previous month
        </button>
        <button onClick={() => this.next(TimePoint.month)}> next month</button>
        <div>current year: {date.format("YYYY")}</div>
        <button onClick={() => this.previous(TimePoint.year)}>
          previous year
        </button>
        <button onClick={() => this.next(TimePoint.year)}> next year </button>
        <div className="calendar-wrapper">
          <DayNames />
          {months.map(month => (
            <Week
              key={month.toString()}
              month={month}
              monthIndex={month.month()}
              selectedDay={selectedDay}
              select={this.select}
            />
          ))}
        </div>
      </>
    );
  }
}
