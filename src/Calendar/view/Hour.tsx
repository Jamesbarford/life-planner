import * as React from "react";
import { List } from "immutable";
import { Moment } from "moment";
import { CalendarShared } from "../types";

interface HourViewProps extends CalendarShared {
  hours: List<Moment>;
}

export class HourView extends React.Component<HourViewProps> {
  render() {
    const { hours, select } = this.props;
    return hours.map(hour => (
      <button
        key={hour.toISOString()}
        className="calendar-cell"
        onClick={() => select(hour)}
      >
        <div className="calendar-cell__inner">
          <span>{hour.format("HH")}</span>
        </div>
      </button>
    ));
  }
}
