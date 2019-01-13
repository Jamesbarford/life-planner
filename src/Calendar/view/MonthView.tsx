import * as React from "react";
import { Moment } from "moment";
import { List } from "immutable";

// COMPONENTS
import { Week } from "./Week";

// TYPES
import { CalendarShared } from "../types";

interface MonthViewProps extends CalendarShared {
  weeks: List<Moment>;
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
