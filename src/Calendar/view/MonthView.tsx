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
    const { weeks, selectedDay, select } = this.props;

    return weeks.map(week => (
      <Week
        key={week.toString()}
        week={week}
        selectedDay={selectedDay}
        select={select}
      />
    ));
  }
}
