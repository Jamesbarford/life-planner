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
  weeks: Array<Moment>;
  selectedDay: Moment;
  currentMonth: number;
}

export class Calendar extends React.Component<{}, CalendarState> {
  private cache = (date: Moment) => calculate(date);

  state = {
    date: moment().startOf(TimePoint.day),
    weeks: [] as Array<Moment>,
    selectedDay: moment().startOf(TimePoint.day),
    currentMonth: moment().month()
  };

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
    const weeks = this.cache(date)(date);
    this.setState({ weeks });
  };

  select = (date: Moment) => this.setState({ selectedDay: date });

  render() {
    const { date, weeks, selectedDay } = this.state;
    const { month, year } = TimePoint;

    return (
      <>
        <button onClick={() => this.previous(month)}>previous month</button>
        <button onClick={() => this.next(month)}> next month</button>
        <div>current year: {date.format("YYYY")}</div>
        <button onClick={() => this.previous(year)}>previous year</button>
        <button onClick={() => this.next(year)}> next year </button>
        <div className="calendar-wrapper">
          <DayNames />
          {weeks.map(week => (
            <Week
              key={week.toString()}
              week={week}
              selectedDay={selectedDay}
              select={this.select}
            />
          ))}
        </div>
      </>
    );
  }
}
