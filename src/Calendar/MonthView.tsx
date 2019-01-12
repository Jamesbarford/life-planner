import * as React from "react";
import { Moment } from "moment";

// COMPONENTS
import { Week } from "./Week";
import { DayNames } from "./Day";
import { List } from "immutable";

interface MonthViewProps {
  weeks: List<Moment>;
  selectedDay: Moment;
  select: (d: Moment) => void;
}

interface MonthViewState {}

export class MonthView extends React.Component<MonthViewProps, MonthViewState> {
  render() {
    return this.props.weeks.map(week => (
      <Week
        key={week.toString()}
        week={week}
        selectedDay={this.props.selectedDay}
        select={this.props.select}
      />
    ));
  }
}
