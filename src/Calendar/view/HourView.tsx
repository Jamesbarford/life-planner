import * as React from "react";
import { List } from "immutable";
import { Moment } from "moment";
import { CalendarShared } from "../types";

interface HourViewProps extends CalendarShared {
  hours: List<Moment>;
}

export class HourView extends React.Component<HourViewProps> {
  render() {
    const { hours, select, selectedDay } = this.props;
    return (
      <>
        <div className="hour-header">
          <div className="hour-header__inner">
            <span>{selectedDay.format("ddd").toUpperCase()}</span>
            <span className="today" style={{ height: "46px", width: "46px" }}>
              {selectedDay.format("Do")}
            </span>
          </div>
        </div>
        {hours.map(hour => (
          <button
            key={hour.toISOString()}
            className="calendar-cell hour"
            onClick={() => select(hour)}
          >
            <div className="calendar-cell__hour">
              <span className="cell-hour">{hour.format("H a")}</span>
              <hr className="hour-line" />
            </div>
          </button>
        ))}
      </>
    );
  }
}
