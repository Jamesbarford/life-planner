import * as React from "react";
import { Moment } from "moment";
import { dayNames, paddingRight } from "../../helpers/dateHelper";
import { CalendarShared } from "../types";
import { classNames } from "../../helpers/util";

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
      <button className="calendar-cell" onClick={() => select(day)}>
        <div
          className={classNames([
            "calendar-cell__inner",
            `${selected ? "today" : ""}`
          ])}
        >
          <span style={{ paddingRight: paddingRight(day) }}>
            {day.format("D")}
          </span>
        </div>
      </button>
    );
  }
}
