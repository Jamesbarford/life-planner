import * as React from "react";
import { dayNames } from "../helpers/dateHelper";
import { Moment } from "moment";
import { classNames } from "../helpers/util";
import { CalendarShared } from ".";

export const DayNames: React.FunctionComponent = () => (
  <div className="row day-names">
    {dayNames.map(day => (
      <span key={day} className="day">
        {day.slice(0, 3)}
      </span>
    ))}
  </div>
);

interface DayProps extends CalendarShared {
  day: Moment;
}

export class Day extends React.Component<DayProps> {
  render() {
    const { select, selectedDay, day } = this.props;
    const selected = selectedDay.toISOString() === day.toISOString();

    return (
      <button
        className={classNames(["calendar-cell", selected ? "today" : ""])}
        onClick={() => select(day)}
      >
        {day.format("DD MMM YYYY")}
      </button>
    );
  }
}
