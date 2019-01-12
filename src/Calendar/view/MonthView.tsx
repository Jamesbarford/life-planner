import * as React from "react";
import { Moment } from "moment";
import { List } from "immutable";

// COMPONENTS
import { Week } from "./Week";

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
