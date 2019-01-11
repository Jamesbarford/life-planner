import * as React from "react";
import { Moment } from "moment";

// COMPONENTS
import { Week } from "./Week";
import { DayNames } from "./Day";

interface MonthViewProps {
  weeks: Array<Moment>;
  selectedDay: Moment;
  select: (d: Moment) => void;
}

interface MonthViewState {}

export class MonthView extends React.Component<MonthViewProps, MonthViewState> {
  render() {
    return (
      <div className="calendar-wrapper">
        <DayNames />
        {this.props.weeks.map(week => (
          <Week
            key={week.toString()}
            week={week}
            selectedDay={this.props.selectedDay}
            select={this.props.select}
          />
        ))}
      </div>
    );
  }
}
